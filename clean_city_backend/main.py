from fastapi import FastAPI

from app.database import Base, engine
from app import models
from app.routes.dustbins import router as dustbin_router
from app.routes.users import router as user_router


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="CleanCity AI Backend",
    description="AI-based sensor-less waste reporting and municipal management system",
    version="1.0.0",
)


app.include_router(dustbin_router)
app.include_router(user_router)


@app.get("/")
def root():
    return {
        "message": "CleanCity AI Backend is running",
        "status": "success",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
    }