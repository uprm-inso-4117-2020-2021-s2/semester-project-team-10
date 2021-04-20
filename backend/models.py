from typing import Optional
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import ARRAY
import datetime

from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    journal_entries = relationship("JournalEntry", backref="users")

class JournalEntry(Base):
    __tablename__="journal_entry"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, default=datetime.date.today())
    content = Column(String)
    moods = Column(ARRAY(String))
    user_id = Column(Integer, ForeignKey("users.id"))