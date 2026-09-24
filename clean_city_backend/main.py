from fastapi import FastAPI

app = FastAPI(
    title="CleanCity AI Backend",
    description="AI-based sensor-less waste reporting and municipal management system",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "CleanCity AI Backend is running",
        "status": "success"
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy"
    }