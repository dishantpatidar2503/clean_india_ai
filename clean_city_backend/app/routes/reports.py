from datetime import datetime
from pathlib import Path
from uuid import uuid4

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import CollectionTeam, Dustbin, Report, User


router = APIRouter(
    prefix="/reports",
    tags=["Reports"],
)


UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


def save_upload_file(upload_file: UploadFile) -> str:
    extension = Path(upload_file.filename or "").suffix

    filename = f"{uuid4().hex}{extension}"
    file_path = UPLOAD_DIR / filename

    with open(file_path, "wb") as buffer:
        buffer.write(upload_file.file.read())

    return str(file_path)


# ---------------------------------------------------------
# CREATE REPORT
# ---------------------------------------------------------

@router.post("/")
def create_report(
    dustbin_id: int = Form(...),
    citizen_id: int = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    photo: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    # -----------------------------------------------------
    # CHECK CITIZEN
    # -----------------------------------------------------

    citizen = (
        db.query(User)
        .filter(User.id == citizen_id)
        .first()
    )

    if not citizen:
        raise HTTPException(
            status_code=404,
            detail="Citizen not found",
        )

    # -----------------------------------------------------
    # CHECK DUSTBIN
    # -----------------------------------------------------

    dustbin = (
        db.query(Dustbin)
        .filter(Dustbin.id == dustbin_id)
        .first()
    )

    if not dustbin:
        raise HTTPException(
            status_code=404,
            detail="Dustbin not found",
        )

    # -----------------------------------------------------
    # VALIDATE ONE-TIME GPS LOCATION
    # -----------------------------------------------------

    if not -90 <= latitude <= 90:
        raise HTTPException(
            status_code=400,
            detail="Invalid latitude. Must be between -90 and 90.",
        )

    if not -180 <= longitude <= 180:
        raise HTTPException(
            status_code=400,
            detail="Invalid longitude. Must be between -180 and 180.",
        )

    # -----------------------------------------------------
    # MAIN LOCK RULE
    # -----------------------------------------------------

    if dustbin.status != "AVAILABLE":
        raise HTTPException(
            status_code=409,
            detail=(
                "Dustbin is currently locked because an active "
                "report is already being processed."
            ),
        )

    # -----------------------------------------------------
    # SAVE CITIZEN PHOTO
    # -----------------------------------------------------

    photo_path = save_upload_file(photo)

    # -----------------------------------------------------
    # GENERATE REPORT ID
    # -----------------------------------------------------

    report_id = f"RPT-{uuid4().hex[:10].upper()}"

    # -----------------------------------------------------
    # CREATE REPORT
    # -----------------------------------------------------

    report = Report(
        report_id=report_id,
        dustbin_id=dustbin.id,
        citizen_id=citizen.id,
        photo_path=photo_path,

        # Location captured only for this report
        latitude=latitude,
        longitude=longitude,

        status="PENDING",
    )

    db.add(report)

    # -----------------------------------------------------
    # LOCK DUSTBIN IMMEDIATELY
    # -----------------------------------------------------

    dustbin.status = "LOCKED"

    db.commit()
    db.refresh(report)

    return {
        "message": "Dustbin report submitted successfully",

        "report_id": report.report_id,

        "dustbin_id": dustbin.id,

        "dustbin_status": dustbin.status,

        "status": report.status,

        # One-time report location
        "latitude": report.latitude,
        "longitude": report.longitude,

        "location_type": "ONE_TIME_REPORT_LOCATION",

        "message_to_citizen": (
            "Dustbin is now locked until the assigned team "
            "uploads the final clean photo."
        ),
    }


# ---------------------------------------------------------
# GET ALL REPORTS
# ---------------------------------------------------------

@router.get("/")
def get_reports(
    db: Session = Depends(get_db),
):
    reports = (
        db.query(Report)
        .order_by(Report.created_at.desc())
        .all()
    )

    return [
        {
            "id": report.id,
            "report_id": report.report_id,
            "dustbin_id": report.dustbin_id,
            "citizen_id": report.citizen_id,
            "team_id": report.team_id,
            "status": report.status,

            # Citizen photo
            "photo_path": report.photo_path,

            # Municipal/team clean photo
            "after_clean_photo_path": report.after_clean_photo_path,

            # Report location
            "latitude": report.latitude,
            "longitude": report.longitude,

            "created_at": report.created_at,
            "accepted_at": report.accepted_at,
            "resolved_at": report.resolved_at,
        }
        for report in reports
    ]


# ---------------------------------------------------------
# GET ONE REPORT
# ---------------------------------------------------------

@router.get("/{report_id}")
def get_report(
    report_id: str,
    db: Session = Depends(get_db),
):
    report = (
        db.query(Report)
        .filter(Report.report_id == report_id)
        .first()
    )

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    return {
        "id": report.id,
        "report_id": report.report_id,
        "dustbin_id": report.dustbin_id,
        "citizen_id": report.citizen_id,
        "team_id": report.team_id,
        "status": report.status,

        # Citizen uploaded photo
        "photo_path": report.photo_path,

        # Municipal/team uploaded clean photo
        "after_clean_photo_path": report.after_clean_photo_path,

        # Location captured at report submission
        "latitude": report.latitude,
        "longitude": report.longitude,

        "location_type": "ONE_TIME_REPORT_LOCATION",

        "created_at": report.created_at,
        "accepted_at": report.accepted_at,
        "resolved_at": report.resolved_at,
    }


# ---------------------------------------------------------
# ACCEPT REPORT BY MUNICIPAL BODY
# ---------------------------------------------------------

@router.post("/{report_id}/accept")
def accept_report(
    report_id: str,
    db: Session = Depends(get_db),
):
    report = (
        db.query(Report)
        .filter(Report.report_id == report_id)
        .first()
    )

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    if report.status != "PENDING":
        raise HTTPException(
            status_code=400,
            detail=(
                f"Report cannot be accepted from status "
                f"{report.status}"
            ),
        )

    report.status = "ACCEPTED"
    report.accepted_at = datetime.utcnow()

    db.commit()
    db.refresh(report)

    return {
        "message": "Report accepted by municipal body",
        "report_id": report.report_id,
        "status": report.status,
    }


# ---------------------------------------------------------
# ASSIGN TEAM
# ---------------------------------------------------------

@router.post("/{report_id}/assign-team")
def assign_team(
    report_id: str,
    team_id: int = Form(...),
    db: Session = Depends(get_db),
):
    report = (
        db.query(Report)
        .filter(Report.report_id == report_id)
        .first()
    )

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

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

    if team.status != "AVAILABLE":
        raise HTTPException(
            status_code=409,
            detail="Selected collection team is not available",
        )

    if report.status not in ["PENDING", "ACCEPTED"]:
        raise HTTPException(
            status_code=400,
            detail=(
                f"Team cannot be assigned when report status "
                f"is {report.status}"
            ),
        )

    # Assign team
    report.team_id = team.id
    report.status = "ASSIGNED"

    # Team becomes busy
    team.status = "BUSY"

    # Dustbin remains LOCKED
    dustbin = (
        db.query(Dustbin)
        .filter(Dustbin.id == report.dustbin_id)
        .first()
    )

    if not dustbin:
        raise HTTPException(
            status_code=404,
            detail="Dustbin not found",
        )

    dustbin.status = "LOCKED"

    db.commit()
    db.refresh(report)

    return {
        "message": "Collection team assigned successfully",
        "report_id": report.report_id,
        "team_id": team.id,
        "report_status": report.status,
        "dustbin_status": dustbin.status,
        "team_status": team.status,
    }


# ---------------------------------------------------------
# START CLEANING
# ---------------------------------------------------------

@router.post("/{report_id}/start-cleaning")
def start_cleaning(
    report_id: str,
    db: Session = Depends(get_db),
):
    report = (
        db.query(Report)
        .filter(Report.report_id == report_id)
        .first()
    )

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    if report.status != "ASSIGNED":
        raise HTTPException(
            status_code=400,
            detail="A team must be assigned before cleaning starts",
        )

    if not report.team_id:
        raise HTTPException(
            status_code=400,
            detail="No collection team assigned",
        )

    report.status = "IN_PROGRESS"

    dustbin = (
        db.query(Dustbin)
        .filter(Dustbin.id == report.dustbin_id)
        .first()
    )

    if dustbin:
        dustbin.status = "LOCKED"

    db.commit()
    db.refresh(report)

    return {
        "message": "Cleaning process started",
        "report_id": report.report_id,
        "status": report.status,
        "dustbin_status": "LOCKED",
    }


# ---------------------------------------------------------
# COMPLETE CLEANING + UPLOAD FINAL PHOTO
# ---------------------------------------------------------

@router.post("/{report_id}/complete")
def complete_report(
    report_id: str,
    after_clean_photo: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    report = (
        db.query(Report)
        .filter(Report.report_id == report_id)
        .first()
    )

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    if report.status != "IN_PROGRESS":
        raise HTTPException(
            status_code=400,
            detail=(
                "Cleaning must be in progress before the final "
                "clean photo can be uploaded"
            ),
        )

    if not report.team_id:
        raise HTTPException(
            status_code=400,
            detail="No collection team assigned",
        )

    # Save clean/empty dustbin photo
    clean_photo_path = save_upload_file(after_clean_photo)

    report.after_clean_photo_path = clean_photo_path
    report.status = "RESOLVED"
    report.resolved_at = datetime.utcnow()

    # Get dustbin
    dustbin = (
        db.query(Dustbin)
        .filter(Dustbin.id == report.dustbin_id)
        .first()
    )

    if not dustbin:
        raise HTTPException(
            status_code=404,
            detail="Dustbin not found",
        )

    # IMPORTANT:
    # Dustbin unlocks ONLY after final photo upload
    dustbin.status = "AVAILABLE"

    # Free collection team
    team = (
        db.query(CollectionTeam)
        .filter(CollectionTeam.id == report.team_id)
        .first()
    )

    if team:
        team.status = "AVAILABLE"

    db.commit()
    db.refresh(report)

    return {
        "message": (
            "Cleaning completed successfully. "
            "Final clean photo uploaded and dustbin unlocked."
        ),
        "report_id": report.report_id,
        "report_status": report.status,
        "dustbin_status": dustbin.status,
        "team_status": team.status if team else None,
        "after_clean_photo_path": report.after_clean_photo_path,
    }