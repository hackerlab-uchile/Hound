from sqlalchemy import Column, Integer, String, DateTime
from database import Base

class NetworkScan(Base):
    __tablename__ = "network_scan"

    id = Column(Integer, primary_key = True, index = True)
    status = Column(Integer)
    signal_started_at = Column(DateTime) 
    area_started_at = Column(DateTime)  


class LocationScans(Base):
    __tablename__ = "location_scans"

    id = Column(Integer, primary_key = True, index = True)
    network_scan_id = Column(Integer, index = True)
    x = Column(Integer)
    y = Column(Integer)
    z = Column(Integer)
    area_started_at = Column(DateTime)  