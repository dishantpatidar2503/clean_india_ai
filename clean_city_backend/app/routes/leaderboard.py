from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User


router = APIRouter(
    prefix="/leaderboard",
    tags=["Leaderboard"],
)


# ---------------------------------------------------------
# GET LEADERBOARD
# ---------------------------------------------------------

@router.get("/")
def get_leaderboard(
    db: Session = Depends(get_db),
):
    # Only citizens appear on the civic leaderboard.
    users = (
        db.query(User)
        .filter(User.is_municipal_officer == False)
        .order_by(
            User.total_points.desc(),
            User.id.asc(),
        )
        .all()
    )

    leaderboard = []

    for rank, user in enumerate(users, start=1):
        if user.total_points >= 2000:
            badge = "Green Champion"
        elif user.total_points >= 1000:
            badge = "Green Guardian"
        else:
            badge = "Civic Contributor"

        leaderboard.append(
            {
                "rank": rank,
                "user_id": user.id,
                "name": user.name,
                "total_points": user.total_points,
                "badge": badge,
            }
        )

    return leaderboard