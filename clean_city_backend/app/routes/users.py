from fastapi import APIRouter, Depends, Form, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.auth import create_access_token, hash_password, verify_password
from app.database import get_db
from app.models import User


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


# =========================================================
# CREATE CITIZEN
# POST /users/
# =========================================================

@router.post("/", status_code=201)
def create_user(
    name: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):
    # Clean input
    name = name.strip()
    email = email.strip().lower()
    password = password.strip()

    # -----------------------------------------------------
    # Validation
    # -----------------------------------------------------

    if not name:
        raise HTTPException(
            status_code=400,
            detail="Name cannot be empty.",
        )

    if not email:
        raise HTTPException(
            status_code=400,
            detail="Email cannot be empty.",
        )

    if "@" not in email:
        raise HTTPException(
            status_code=400,
            detail="Please enter a valid email address.",
        )

    if len(password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 characters long.",
        )

    # -----------------------------------------------------
    # Check duplicate email
    # -----------------------------------------------------

    try:
        existing_user = (
            db.query(User)
            .filter(User.email == email)
            .first()
        )
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Database read error: {str(e)}",
        )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered.",
        )

    # -----------------------------------------------------
    # Hash password
    # -----------------------------------------------------

    try:
        hashed_password = hash_password(password)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Password hashing error: {str(e)}",
        )

    # -----------------------------------------------------
    # Create citizen
    # -----------------------------------------------------

    try:
        user = User(
            name=name,
            email=email,
            password_hash=hashed_password,
            is_municipal_officer=False,
            municipal_id=None,
            total_points=0,
        )

        db.add(user)
        db.commit()
        db.refresh(user)

    except SQLAlchemyError as e:
        db.rollback()

        raise HTTPException(
            status_code=500,
            detail=f"Database error while creating citizen: {str(e)}",
        )

    return {
        "message": "Citizen registered successfully",
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": "CITIZEN",
        "total_points": user.total_points,
    }


# =========================================================
# CITIZEN LOGIN
# POST /users/citizen-login
# =========================================================

@router.post("/citizen-login")
def citizen_login(
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):
    email = email.strip().lower()

    # -----------------------------------------------------
    # Find user
    # -----------------------------------------------------

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    # -----------------------------------------------------
    # Citizen check
    # -----------------------------------------------------

    if user.is_municipal_officer:
        raise HTTPException(
            status_code=403,
            detail="This account is not a citizen account.",
        )

    # -----------------------------------------------------
    # Password check
    # -----------------------------------------------------

    if not user.password_hash:
        raise HTTPException(
            status_code=400,
            detail="Password is not configured for this account.",
        )

    try:
        valid_password = verify_password(
            password,
            user.password_hash,
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Password verification error: {str(e)}",
        )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    # -----------------------------------------------------
    # Create JWT
    # -----------------------------------------------------

    token = create_access_token(
        user_id=user.id,
        role="CITIZEN",
        municipal_id=None,
    )

    return {
        "message": "Citizen login successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": "CITIZEN",
            "total_points": user.total_points,
        },
    }


# =========================================================
# MUNICIPAL OFFICER LOGIN
# POST /users/officer-login
# =========================================================

@router.post("/officer-login")
def officer_login(
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):
    email = email.strip().lower()

    # -----------------------------------------------------
    # Find user
    # -----------------------------------------------------

    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    # -----------------------------------------------------
    # Officer check
    # -----------------------------------------------------

    if not user.is_municipal_officer:
        raise HTTPException(
            status_code=403,
            detail="This account is not a municipal officer account.",
        )

    # -----------------------------------------------------
    # Password check
    # -----------------------------------------------------

    if not user.password_hash:
        raise HTTPException(
            status_code=400,
            detail="Password is not configured for this account.",
        )

    # -----------------------------------------------------
    # Municipality check
    # -----------------------------------------------------

    if user.municipal_id is None:
        raise HTTPException(
            status_code=400,
            detail="Officer is not assigned to a municipal body.",
        )

    try:
        valid_password = verify_password(
            password,
            user.password_hash,
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Password verification error: {str(e)}",
        )

    if not valid_password:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    # -----------------------------------------------------
    # Create JWT
    # -----------------------------------------------------

    token = create_access_token(
        user_id=user.id,
        role="MUNICIPAL_OFFICER",
        municipal_id=user.municipal_id,
    )

    return {
        "message": "Officer login successful",
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": "MUNICIPAL_OFFICER",
            "municipal_id": user.municipal_id,
        },
    }


# =========================================================
# GET ALL USERS
# GET /users/
# =========================================================

@router.get("/")
def get_users(
    db: Session = Depends(get_db),
):
    users = (
        db.query(User)
        .order_by(User.id.asc())
        .all()
    )

    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": (
                "MUNICIPAL_OFFICER"
                if user.is_municipal_officer
                else "CITIZEN"
            ),
            "municipal_id": user.municipal_id,
            "total_points": user.total_points,
        }
        for user in users
    ]


# =========================================================
# GET USER BY ID
# GET /users/{user_id}
# =========================================================

@router.get("/{user_id}")
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
):
    user = (
        db.query(User)
        .filter(User.id == user_id)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found.",
        )

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": (
            "MUNICIPAL_OFFICER"
            if user.is_municipal_officer
            else "CITIZEN"
        ),
        "municipal_id": user.municipal_id,
        "total_points": user.total_points,
    }