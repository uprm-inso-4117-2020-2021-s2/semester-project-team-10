from typing import Optional
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship
import datetime

from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    # entry = relationship("Entry", back_populates="owner")

# class Entry(Base):
    # __tablename__="Journal_Entry"

    # id = Column(Integer, primary_key=True, index=True)
    # date = Column(DateTime, default=datetime.datetime.utcnow)
    # content = Column(String)
    # moods = Column(String)
    # username = Column(String, ForeignKey("Users.username"))

    # owner = relationship("User", back_populates="entry")