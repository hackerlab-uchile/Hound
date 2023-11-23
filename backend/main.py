from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from datetime import datetime
import models 
from database import engine, SessionLocal
from sqlalchemy.orm import Session


app = FastAPI()

models.Base.metadata.create_all(bind=engine)

def get_db():
    try: 
        db = SessionLocal
        yield db
    finally:
        db.close()

# Models
class NetworkScan(BaseModel):
    status: int = Field(gt=-1, lt=101)
    signal_started_at: datetime = None
    area_started_at: datetime = None

class LocationScan(BaseModel):
    network_scan_id: str = Field(min_length=1, max_length=100) 
    x: int = Field(gt=-1, lt=101)
    y: int = Field(gt=-1, lt=101)
    z: int = Field(gt=0, lt=101)
    area_started_at: datetime = None

# Models results
SCANS = []


#Routes

@app.get("/scans")
async def get_scans():
    return SCANS 

@app.post("/scans")
def create_scan(network_scan: NetworkScan):
    SCANS.append(network_scan)
    return network_scan

@app.get("/locations")
async def get_locations(db: Session = Depends(get_db)):
    return db.query(models.Locations).all()

@app.post("/locations")
def create_location(location_scan: LocationScan, db: Session = Depends(get_db)):
    location_scan_model = models.LocationScan()
    location_scan_model.network_scan_id = location_scan.network_scan_id
    location_scan_model.x = location_scan.x
    location_scan_model.y = location_scan.y
    location_scan_model.z = location_scan.z
    location_scan_model.area_started_at = location_scan.area_started_at

    db.add(location_scan_model)
    return location_scan
