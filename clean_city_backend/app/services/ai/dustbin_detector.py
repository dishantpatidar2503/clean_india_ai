from pathlib import Path

from ultralytics import YOLO


# =========================================================
# YOLO MODEL
# =========================================================

# Trained YOLO model ka path
MODEL_PATH = Path("models/best.pt")

# Check karo model file exist karti hai ya nahi
if not MODEL_PATH.exists():
    raise FileNotFoundError(
        f"YOLO model not found at: {MODEL_PATH.resolve()}"
    )

# Model load
model = YOLO(str(MODEL_PATH))


# =========================================================
# DUSTBIN DETECTION
# =========================================================

def detect_dustbin(image_path: str) -> dict:
    """
    Uploaded image me dustbin detect karta hai.
    """

    # YOLO prediction
    results = model.predict(
        source=image_path,
        conf=0.50,
        verbose=False
    )

    result = results[0]

    detections = []

    # Saare detected objects ko process karo
    for box in result.boxes:
        confidence = float(box.conf[0])
        class_id = int(box.cls[0])

        class_name = result.names[class_id]

        detections.append(
            {
                "class": class_name,
                "confidence": round(confidence, 3)
            }
        )

    # Tumhare model me sirf dustbin class hai.
    # Isliye agar koi detection mila hai,
    # to dustbin detect hua maana jayega.
    dustbin_found = len(detections) > 0

    # Highest confidence detection
    best_confidence = max(
        (item["confidence"] for item in detections),
        default=0.0
    )

    return {
        "dustbin_detected": dustbin_found,
        "confidence": best_confidence,
        "detections": detections
    }
