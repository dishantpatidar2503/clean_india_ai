import random
import shutil
from pathlib import Path

# Original dataset
SOURCE = Path(r"D:\clean_city_ai\clean_city_backend\dataset_downloaded\train")

# New dataset
OUTPUT = Path(r"D:\clean_city_ai\clean_city_backend\dataset_split")

IMAGE_DIR = SOURCE / "images"
LABEL_DIR = SOURCE / "labels"

# Split ratio
TRAIN_RATIO = 0.80
VALID_RATIO = 0.10
TEST_RATIO = 0.10

random.seed(42)

# Image extensions
extensions = {".jpg", ".jpeg", ".png", ".bmp", ".webp"}

images = [
    p for p in IMAGE_DIR.iterdir()
    if p.is_file() and p.suffix.lower() in extensions
]

random.shuffle(images)

total = len(images)

train_end = int(total * TRAIN_RATIO)
valid_end = train_end + int(total * VALID_RATIO)

splits = {
    "train": images[:train_end],
    "valid": images[train_end:valid_end],
    "test": images[valid_end:]
}

print(f"Total images: {total}")
print(f"Train: {len(splits['train'])}")
print(f"Valid: {len(splits['valid'])}")
print(f"Test: {len(splits['test'])}")

# Create folders
for split in splits:
    (OUTPUT / split / "images").mkdir(parents=True, exist_ok=True)
    (OUTPUT / split / "labels").mkdir(parents=True, exist_ok=True)

# Copy images + corresponding labels
for split, split_images in splits.items():

    for image_path in split_images:

        # Copy image
        destination_image = OUTPUT / split / "images" / image_path.name
        shutil.copy2(image_path, destination_image)

        # Find corresponding label
        label_path = LABEL_DIR / f"{image_path.stem}.txt"

        if label_path.exists():
            destination_label = OUTPUT / split / "labels" / label_path.name
            shutil.copy2(label_path, destination_label)
        else:
            print(f"WARNING: Label missing for {image_path.name}")

print("\nDataset split completed!")