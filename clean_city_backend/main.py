from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import models
from app.database import Base, engine

from app.routes.dustbins import router as dustbin_router
from app.routes.users import router as user_router
from app.routes.teams import router as team_router
from app.routes.reports import router as report_router


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="CleanCity AI Backend",
    description=(
        "AI-based sensor-less waste reporting and "
        "municipal waste management system"
    ),
    version="1.0.0",
)


# ---------------------------------------------------------
# CORS
# ---------------------------------------------------------

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


# ---------------------------------------------------------
# API ROUTES
# ---------------------------------------------------------

app.include_router(dustbin_router)
app.include_router(user_router)
app.include_router(team_router)
app.include_router(report_router)


# ---------------------------------------------------------
# ROOT
# ---------------------------------------------------------

@app.get("/")
def root():
    return {
        "message": "CleanCity AI Backend is running",
        "status": "success",
    }


# ---------------------------------------------------------
# HEALTH CHECK
# ---------------------------------------------------------

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }