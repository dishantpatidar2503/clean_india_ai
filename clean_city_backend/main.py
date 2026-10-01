from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.reports import router as reports_router
from app.routes.users import router as user_router


app = FastAPI(
    title="CleanCity AI Backend",
    description="AI-Based Sensor-less Predictive Waste Management System",
    version="1.0.0",
)


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


app.include_router(reports_router)
app.include_router(user_router)


@app.get("/")
def root():
    return {
        "message": "CleanCity AI Backend is running!"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }