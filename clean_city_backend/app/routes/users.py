from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User

router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.post("/")
def create_user(
    name: str = Form(...),
    email: str = Form(...),
    db: Session = Depends(get_db),
):
    # Check if email already exists
    existing = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="User with this email already exists",
        )

    user = User(
        name=name,
        email=email,
        is_municipal_officer=False,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "message": "User created successfully",
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "role": "CITIZEN",
    }


@router.get("/")
def get_users(db: Session = Depends(get_db)):
    users = db.query(User).all()

    return [
        {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": "MUNICIPAL_OFFICER"
            if user.is_municipal_officer
            else "CITIZEN",
        }
        for user in users
    ]