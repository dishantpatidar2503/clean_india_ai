from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Dustbin

router = APIRouter(
    prefix="/dustbins",
    tags=["Dustbins"],
)


# GET: all dustbins
@router.get("/")
def get_dustbins(db: Session = Depends(get_db)):
    dustbins = db.query(Dustbin).all()

    return [
        {
            "id": dustbin.id,
            "unique_id": dustbin.unique_id,
            "latitude": dustbin.latitude,
            "longitude": dustbin.longitude,
            "location": dustbin.location,
            "status": dustbin.status,
        }
        for dustbin in dustbins
    ]


# POST: create a new dustbin
@router.post("/")
def create_dustbin(
    unique_id: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    location: str = Form(...),
    db: Session = Depends(get_db),
):
    # Check duplicate dustbin ID
    existing = (
        db.query(Dustbin)
        .filter(Dustbin.unique_id == unique_id)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Dustbin with this unique_id already exists",
        )

    # Create dustbin
    dustbin = Dustbin(
        unique_id=unique_id,
        latitude=latitude,
        longitude=longitude,
        location=location,
        status="AVAILABLE",
    )

    db.add(dustbin)
    db.commit()
    db.refresh(dustbin)

    return {
        "message": "Dustbin created successfully",
        "id": dustbin.id,
        "unique_id": dustbin.unique_id,
        "latitude": dustbin.latitude,
        "longitude": dustbin.longitude,
        "location": dustbin.location,
        "status": dustbin.status,
    }