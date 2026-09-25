from fastapi import APIRouter, Depends, Form, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import CollectionTeam


router = APIRouter(
    prefix="/teams",
    tags=["Collection Teams"],
)


@router.post("/")
def create_team(
    team_name: str = Form(...),
    contact_number: str = Form(...),
    area: str = Form(...),
    db: Session = Depends(get_db),
):
    team = CollectionTeam(
        team_name=team_name,
        contact_number=contact_number,
        area=area,
        status="AVAILABLE",
    )

    db.add(team)
    db.commit()
    db.refresh(team)

    return {
        "message": "Collection team created successfully",
        "id": team.id,
        "team_name": team.team_name,
        "contact_number": team.contact_number,
        "area": team.area,
        "status": team.status,
    }


@router.get("/")
def get_teams(
    db: Session = Depends(get_db),
):
    teams = db.query(CollectionTeam).all()

    return [
        {
            "id": team.id,
            "team_name": team.team_name,
            "contact_number": team.contact_number,
            "area": team.area,
            "status": team.status,
        }
        for team in teams
    ]


@router.get("/{team_id}")
def get_team(
    team_id: int,
    db: Session = Depends(get_db),
):
    team = (
        db.query(CollectionTeam)
        .filter(CollectionTeam.id == team_id)
        .first()
    )

    if not team:
        raise HTTPException(
            status_code=404,
            detail="Collection team not found",
        )

    return {
        "id": team.id,
        "team_name": team.team_name,
        "contact_number": team.contact_number,
        "area": team.area,
        "status": team.status,
    }