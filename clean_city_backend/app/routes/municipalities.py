from fastapi import APIRouter, Depends, Form, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import MunicipalBody


router = APIRouter(
    prefix="/municipalities",
    tags=["Municipal Bodies"],
)


# ---------------------------------------------------------
# CREATE MUNICIPAL BODY
# ---------------------------------------------------------

@router.post("/")
def create_municipality(
    name: str = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    db: Session = Depends(get_db),
):
    # Validate latitude
    if not -90 <= latitude <= 90:
        raise HTTPException(
            status_code=400,
            detail="Invalid latitude",
        )

    # Validate longitude
    if not -180 <= longitude <= 180:
        raise HTTPException(
            status_code=400,
            detail="Invalid longitude",
        )

    municipality = MunicipalBody(
        name=name,
        latitude=latitude,
        longitude=longitude,
    )

    db.add(municipality)
    db.commit()
    db.refresh(municipality)

    return {
        "message": "Municipal body created successfully",
        "id": municipality.id,
        "name": municipality.name,
        "latitude": municipality.latitude,
        "longitude": municipality.longitude,
    }


# ---------------------------------------------------------
# GET ALL MUNICIPAL BODIES
# ---------------------------------------------------------

@router.get("/")
def get_municipalities(
    db: Session = Depends(get_db),
):
    municipalities = (
        db.query(MunicipalBody)
        .order_by(MunicipalBody.id.asc())
        .all()
    )

    return [
        {
            "id": municipality.id,
            "name": municipality.name,
            "latitude": municipality.latitude,
            "longitude": municipality.longitude,
        }
        for municipality in municipalities
    ]


# ---------------------------------------------------------
# GET ONE MUNICIPAL BODY
# ---------------------------------------------------------

@router.get("/{municipality_id}")
def get_municipality(
    municipality_id: int,
    db: Session = Depends(get_db),
):
    municipality = (
        db.query(MunicipalBody)
        .filter(MunicipalBody.id == municipality_id)
        .first()
    )

    if not municipality:
        raise HTTPException(
            status_code=404,
            detail="Municipal body not found",
        )

    return {
        "id": municipality.id,
        "name": municipality.name,
        "latitude": municipality.latitude,
        "longitude": municipality.longitude,
    }