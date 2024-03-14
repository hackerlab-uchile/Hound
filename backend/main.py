import models 
import scan_manager

from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, Field
from datetime import datetime
from database import engine_location, engine_signal, engine_network, SessionLocalLocation, SessionLocalSignal, SessionLocalNetwork
from sqlalchemy.orm import Session, relationship
from sqlalchemy import select, desc,  and_
from fastapi.middleware.cors import CORSMiddleware
from typing import List

# indicates if the app is on a development enviroment


app = FastAPI(root_path = '/api/')
# app = FastAPI()

# origins = [
#     "http://localhost",
#     "http://localhost:3000",
# ]

app.add_middleware(
    CORSMiddleware,
    allow_origins= ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# checking existence of tables
models.Base.metadata.create_all(bind=engine_location)
models.Base.metadata.create_all(bind=engine_signal)
models.Base.metadata.create_all(bind=engine_network)

# database getters
def get_locations_db():
    db = SessionLocalLocation
    try:
        yield db
    finally:
        db.close()

def get_signals_db():
    db = SessionLocalSignal
    try:
        yield db
    finally:
        db.close()

def get_networks_db():
    db = SessionLocalNetwork
    try:
        yield db
    finally:
        db.close()

# Models
class NetworkScan(BaseModel):
    
    status: int = Field(gt=-1, lt=101)
    signal_started_at: datetime = None
    location_started_at: datetime = None

class LocationScan(BaseModel):
    network_scan_id: int = Field(gt=-1, lt=101)
    x: float = Field(gt=-1000001, lt=1000001)
    y: float = Field(gt=-1000001, lt=1000001)
    z: float = Field(gt=-1000001, lt=1000001)

class SignalScan(BaseModel):
    network_scan_id: int = Field(gt=-1, lt=101)
    station: str = None
    pwr: float = Field(gt=-101, lt=101)

class LocationsList(BaseModel):
    locations: List[LocationScan]

#Routes


# DB creators
@app.post('/networks/create/')
def create_network(network_scan: NetworkScan, db: Session = Depends(get_networks_db)):
    network_scan_model = models.NetworkScans()
    network_scan_model.status = network_scan.status
    network_scan_model.signal_started_at = network_scan.signal_started_at
    network_scan_model.location_started_at = network_scan.location_started_at

    db.add(network_scan_model)
    db.commit()
    return network_scan


@app.post('/locations/create/')
def create_location(location_list: LocationsList, db: Session = Depends(get_locations_db)):
    location_scan_model = models.LocationScans()
    # print(location_list.locations)
    for location_data in location_list.locations:
        location_item = models.LocationScans(**location_data.dict())
        # location_scan_model.network_scan_id = location_data.network_scan_id
        # location_scan_model.x = location_data.x
        # location_scan_model.y = location_data.y
        # location_scan_model.z = location_data.z
        # location_scan_model.location_started_at = location_scan.location_started_at
        db.add(location_item)
    db.commit()
        
    
    return location_data

@app.post('/signals/create/')
def create_signal(signal_scan: SignalScan, db: Session = Depends(get_signals_db)):
    signal_scan_model = models.SignalScans()
    signal_scan_model.network_scan_id = signal_scan.network_scan_id
    signal_scan_model.pwr = signal_scan.pwr
    signal_scan_model.station = signal_scan.station
    # signal_scan_model.signal_started_at = signal_scan.signal_started_at

    db.add(signal_scan_model)
    db.commit()
    return signal_scan


#getters
@app.get('/networks/get/')
async def get_networks(db: Session = Depends(get_networks_db)):
    return db.query(models.NetworkScans).all()

@app.get('/locations/get/')
async def get_locations(db: Session = Depends(get_locations_db)):
    return db.query(models.LocationScans).all()

@app.get('/signals/get/')
async def get_signals(db: Session = Depends(get_signals_db)):
    return db.query(models.SignalScans).all()


# Returns the last id on the network scan
@app.get('/networks/get_last_id/')
async def get_last_network_id(db: Session = Depends(get_networks_db)):
    last_id = db.query(models.NetworkScans).order_by(desc(models.NetworkScans.id)).limit(1)
    last_item_id = db.execute(last_id).scalar()
    return last_item_id.id


# getters by network id

@app.get('/locations/get_by_network_id/{network_id}')
async def get_location_by_instance(network_id: int, db: Session = Depends(get_locations_db)):
    locations = db.query(models.LocationScans).filter(models.LocationScans.network_scan_id == network_id).all()
    return locations

@app.get('/signals/get_by_network_id/{network_id}')
async def get_signal_by_instance(network_id: int, db: Session = Depends(get_signals_db)):
    signals = db.query(models.SignalScans).filter(models.SignalScans.network_scan_id == network_id).all()
    return signals

# Function dedicated to send the start instruction to the other 
@app.post('/start_signal_scan')
def start_scanning():
    scan_manager.run_script()

# Function dedicated to send the start instruction to the other 
@app.post('/stop_signal_scan')
def stop_scanning():
    scan_manager.stop_script()

@app.get('/get_joint_data')
async def get_joint_data(db1: Session = Depends(get_locations_db), db2: Session = Depends(get_signals_db), db: Session = Depends(get_networks_db)):
    nwid = db.execute(db.query(models.NetworkScans).order_by(desc(models.NetworkScans.id)).limit(1)).scalar()

    joined_data = db1.query(models.LocationScans, models.SignalScans).\
        join(models.SignalScans, and_(models.LocationScans.network_scan_id == models.SignalScans.network_scan_id, models.LocationScans.location_started_at == models.SignalScans.signal_started_at)).\
        all()
    return joined_data

