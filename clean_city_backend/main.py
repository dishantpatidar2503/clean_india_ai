from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine

from app.routes import (
    users,
    reports,
    dustbins,
    leaderboard,
    municipalities,
    teams,
)


# ============================================================
# FASTAPI APP
# ============================================================

app = FastAPI(
    title="CleanCity AI API",
    description="AI-based smart dustbin reporting system",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# DATABASE
# ============================================================

Base.metadata.create_all(bind=engine)


# ============================================================
# ROUTES
# ============================================================

app.include_router(users.router)
app.include_router(reports.router)
app.include_router(dustbins.router)
app.include_router(leaderboard.router)
app.include_router(municipalities.router)
app.include_router(teams.router)


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():
    return {
        "message": "CleanCity AI Backend is running",
        "status": "OK",
    }


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CleanCity AI Backend",
    }