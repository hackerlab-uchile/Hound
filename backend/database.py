from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.ext.declarative import declarative_base


SQLALCHEMY_LOCATION_DATABASE_URL = "sqlite:///./location_scans.db"
SQLALCHEMY_SIGNAL_DATABASE_URL = "sqlite:///./signal_scans.db"
SQLALCHEMY_NETWORK_DATABASE_URL = "sqlite:///./network_scans.db"

engine_location = create_engine(SQLALCHEMY_LOCATION_DATABASE_URL, connect_args={"check_same_thread": False})
engine_signal = create_engine(SQLALCHEMY_SIGNAL_DATABASE_URL, connect_args={"check_same_thread": False})
engine_network = create_engine(SQLALCHEMY_NETWORK_DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocalLocation = scoped_session(sessionmaker(bind=engine_location))
SessionLocalSignal = scoped_session(sessionmaker(bind=engine_signal))
SessionLocalNetwork = scoped_session(sessionmaker(bind=engine_network))

SessionLocalLocation()
SessionLocalSignal()
SessionLocalNetwork()

Base = declarative_base()