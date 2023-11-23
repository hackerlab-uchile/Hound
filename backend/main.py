from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from datetime import datetime
import models 
from database import engine, SessionLocal
from sqlalchemy.orm import Session


app = FastAPI()

models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal
    try:
        yield db
    finally:
        db.close()

# Models
class NetworkScan(BaseModel):
    status: int = Field(gt=-1, lt=101)
    signal_started_at: datetime = None
    area_started_at: datetime = None

class LocationScan(BaseModel):
    network_scan_id: int = Field(gt=-1, lt=101)
    x: int = Field(gt=-101, lt=101)
    y: int = Field(gt=-101, lt=101)
    z: int = Field(gt=-101, lt=101)
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
    return db.query(models.LocationScans).all()

@app.post("/locations")
def create_location(location_scan: LocationScan, db: Session = Depends(get_db)):
    location_scan_model = models.LocationScans()
    location_scan_model.network_scan_id = location_scan.network_scan_id
    location_scan_model.x = location_scan.x
    print("x:", location_scan_model.x)
    location_scan_model.y = location_scan.y
    location_scan_model.z = location_scan.z
    location_scan_model.area_started_at = location_scan.area_started_at
    print("area:", location_scan_model.area_started_at)
    print ("test", location_scan_model, location_scan)

    db.add(location_scan_model)
    db.commit()

    return location_scan
