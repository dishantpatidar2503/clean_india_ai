import math

from sqlalchemy.orm import Session

from app.models import MunicipalBody


# =========================================================
# HAVERSINE DISTANCE
# =========================================================

def calculate_distance_km(
    lat1: float,
    lon1: float,
    lat2: float,
    lon2: float,
) -> float:

    earth_radius_km = 6371.0

    lat1_rad = math.radians(lat1)
    lat2_rad = math.radians(lat2)

    delta_lat = math.radians(lat2 - lat1)
    delta_lon = math.radians(lon2 - lon1)

    a = (
        math.sin(delta_lat / 2) ** 2
        + math.cos(lat1_rad)
        * math.cos(lat2_rad)
        * math.sin(delta_lon / 2) ** 2
    )

    c = 2 * math.atan2(
        math.sqrt(a),
        math.sqrt(1 - a)
    )

    return earth_radius_km * c


# =========================================================
# FIND NEAREST MUNICIPAL BODY
# =========================================================

def find_nearest_municipal(
    latitude: float,
    longitude: float,
    db: Session,
):
    """
    Find the nearest municipal body using GPS coordinates.

    Returns:
        (nearest_municipal, distance_km)
    """

    # Validate latitude
    if not -90 <= latitude <= 90:
        raise ValueError(
            "Invalid latitude. Must be between -90 and 90."
        )

    # Validate longitude
    if not -180 <= longitude <= 180:
        raise ValueError(
            "Invalid longitude. Must be between -180 and 180."
        )

    # Get municipal bodies having valid coordinates
    municipalities = (
        db.query(MunicipalBody)
        .filter(
            MunicipalBody.latitude.isnot(None),
            MunicipalBody.longitude.isnot(None),
        )
        .all()
    )

    # No municipal body available
    if not municipalities:
        return None, None

    nearest_municipal = None
    nearest_distance = float("inf")

    # Calculate distance from report location
    # to every municipal body
    for municipal in municipalities:

        distance = calculate_distance_km(
            latitude,
            longitude,
            municipal.latitude,
            municipal.longitude,
        )

        if distance < nearest_distance:
            nearest_distance = distance
            nearest_municipal = municipal

    return nearest_municipal, nearest_distance