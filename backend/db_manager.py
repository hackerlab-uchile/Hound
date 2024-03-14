from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import main
import requests

is_on_development =True

urlnwid = "https://10.42.0.1/api/networks/get_last_id/"

app = FastAPI()
def get_nwid(response):
    if response.status_code == 200:
        # Extract the JSON data from the response
        return response.json()
    else: 
        return 0

def get_response():
    if(is_on_development):
        nwid_response = get_nwid(requests.get("http://localhost:8000/networks/get_last_id/"))
        return nwid_response
    else:
        nwid_response = get_nwid(requests.get(urlnwid))
        return nwid


nwid = get_response()

@app.get('/get_joint_data')
async def get_joint_data(db1: Session = Depends(get_locations_db), db2: Session = Depends(get_signals_db)):
    data1 = s1.query(models.LocationScans).filter(LocationScans.network_scan_id == nwid).all()
    data2 = s2.query(SignalScans).filter(LocationScans.network_scan_id== nwid).all()

    joined_data = [(row1, row2) for row1 in data1 for row2 in data2 if row1.location_started_at == row2.signal_started_at] 
    return joined_data