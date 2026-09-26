from datetime import datetime

from sqlalchemy import (
    Boolean,
    DateTime,
    Float,
    ForeignKey,
    Integer,
    String,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


# =========================================================
# USER
# =========================================================

class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    email: Mapped[str] = mapped_column(
        String(150),
        unique=True,
        nullable=False,
        index=True,
    )

    # False = CITIZEN
    # True  = MUNICIPAL_OFFICER
    is_municipal_officer: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )

    # Civic reward points
    total_points: Mapped[int] = mapped_column(
        Integer,
        default=0,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    reports = relationship(
        "Report",
        back_populates="citizen",
    )


# =========================================================
# MUNICIPAL BODY
# =========================================================

class MunicipalBody(Base):
    __tablename__ = "municipal_bodies"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    name: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
    )

    # Municipal office location
    latitude: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    longitude: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    reports = relationship(
        "Report",
        back_populates="municipal_body",
    )


# =========================================================
# DUSTBIN
# =========================================================

class Dustbin(Base):
    __tablename__ = "dustbins"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    unique_id: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )

    latitude: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    longitude: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    location: Mapped[str | None] = mapped_column(
        String(255),
        nullable=True,
    )

    # AVAILABLE / LOCKED
    status: Mapped[str] = mapped_column(
        String(20),
        default="AVAILABLE",
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    updated_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    reports = relationship(
        "Report",
        back_populates="dustbin",
    )


# =========================================================
# COLLECTION TEAM
# =========================================================

class CollectionTeam(Base):
    __tablename__ = "collection_teams"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    team_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    contact_number: Mapped[str | None] = mapped_column(
        String(20),
        nullable=True,
    )

    area: Mapped[str | None] = mapped_column(
        String(150),
        nullable=True,
    )

    # AVAILABLE / BUSY
    status: Mapped[str] = mapped_column(
        String(20),
        default="AVAILABLE",
        nullable=False,
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    reports = relationship(
        "Report",
        back_populates="team",
    )


# =========================================================
# REPORT
# =========================================================

class Report(Base):
    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True,
    )

    report_id: Mapped[str] = mapped_column(
        String(50),
        unique=True,
        nullable=False,
        index=True,
    )

    # -----------------------------------------------------
    # Dustbin
    # -----------------------------------------------------

    dustbin_id: Mapped[int] = mapped_column(
        ForeignKey("dustbins.id"),
        nullable=False,
    )

    # -----------------------------------------------------
    # Citizen
    # -----------------------------------------------------

    citizen_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"),
        nullable=False,
    )

    # -----------------------------------------------------
    # Municipal Body
    # -----------------------------------------------------

    municipal_id: Mapped[int | None] = mapped_column(
        ForeignKey("municipal_bodies.id"),
        nullable=True,
        index=True,
    )

    # -----------------------------------------------------
    # Collection Team
    # -----------------------------------------------------

    team_id: Mapped[int | None] = mapped_column(
        ForeignKey("collection_teams.id"),
        nullable=True,
    )

    # -----------------------------------------------------
    # Photos
    # -----------------------------------------------------

    # Citizen uploaded photo
    photo_path: Mapped[str] = mapped_column(
        String(500),
        nullable=False,
    )

    # Photo uploaded after cleaning
    after_clean_photo_path: Mapped[str | None] = mapped_column(
        String(500),
        nullable=True,
    )

    # -----------------------------------------------------
    # One-time report location
    # -----------------------------------------------------

    latitude: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    longitude: Mapped[float] = mapped_column(
        Float,
        nullable=False,
    )

    # -----------------------------------------------------
    # Report status
    # -----------------------------------------------------

    # PENDING
    # ACCEPTED
    # ASSIGNED
    # IN_PROGRESS
    # RESOLVED
    # REJECTED

    status: Mapped[str] = mapped_column(
        String(30),
        default="PENDING",
        nullable=False,
    )

    # -----------------------------------------------------
    # AI fields
    # -----------------------------------------------------

    ai_summary: Mapped[str | None] = mapped_column(
        Text,
        nullable=True,
    )

    ai_confidence: Mapped[float | None] = mapped_column(
        Float,
        nullable=True,
    )

    # -----------------------------------------------------
    # Timestamps
    # -----------------------------------------------------

    created_at: Mapped[datetime] = mapped_column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )

    accepted_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    resolved_at: Mapped[datetime | None] = mapped_column(
        DateTime,
        nullable=True,
    )

    # =====================================================
    # RELATIONSHIPS
    # =====================================================

    citizen = relationship(
        "User",
        back_populates="reports",
    )

    dustbin = relationship(
        "Dustbin",
        back_populates="reports",
    )

    team = relationship(
        "CollectionTeam",
        back_populates="reports",
    )

    municipal_body = relationship(
        "MunicipalBody",
        back_populates="reports",
    )