from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    email: Mapped[str] = mapped_column(String(150), unique=True, nullable=False, index=True)
    is_municipal_officer: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, nullable=False
    )

    reports = relationship("Report", back_populates="citizen")


class Dustbin(Base):
    __tablename__ = "dustbins"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    unique_id: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False, index=True
    )
    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)
    location: Mapped[str] = mapped_column(String(255), nullable=True)

    # AVAILABLE = can receive a new active report
    # LOCKED = already has an active report
    status: Mapped[str] = mapped_column(
        String(20), default="AVAILABLE", nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )

    reports = relationship("Report", back_populates="dustbin")


class CollectionTeam(Base):
    __tablename__ = "collection_teams"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    team_name: Mapped[str] = mapped_column(String(100), nullable=False)
    contact_number: Mapped[str] = mapped_column(String(20), nullable=True)
    area: Mapped[str] = mapped_column(String(150), nullable=True)

    # AVAILABLE / BUSY
    status: Mapped[str] = mapped_column(
        String(20), default="AVAILABLE", nullable=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, nullable=False
    )

    reports = relationship("Report", back_populates="team")


class Report(Base):
    __tablename__ = "reports"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)

    report_id: Mapped[str] = mapped_column(
        String(50), unique=True, nullable=False, index=True
    )

    dustbin_id: Mapped[int] = mapped_column(
        ForeignKey("dustbins.id"), nullable=False
    )

    citizen_id: Mapped[int] = mapped_column(
        ForeignKey("users.id"), nullable=False
    )

    team_id: Mapped[int | None] = mapped_column(
        ForeignKey("collection_teams.id"), nullable=True
    )

    photo_path: Mapped[str] = mapped_column(
        String(500), nullable=False
    )

    latitude: Mapped[float] = mapped_column(Float, nullable=False)
    longitude: Mapped[float] = mapped_column(Float, nullable=False)

    # PENDING / ACCEPTED / ASSIGNED / IN_PROGRESS / RESOLVED / REJECTED
    status: Mapped[str] = mapped_column(
        String(30), default="PENDING", nullable=False
    )

    ai_summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    ai_confidence: Mapped[float | None] = mapped_column(Float, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, nullable=False
    )
    accepted_at: Mapped[datetime | None] = mapped_column(
        DateTime, nullable=True
    )
    resolved_at: Mapped[datetime | None] = mapped_column(
        DateTime, nullable=True
    )

    citizen = relationship("User", back_populates="reports")
    dustbin = relationship("Dustbin", back_populates="reports")
    team = relationship("CollectionTeam", back_populates="reports")