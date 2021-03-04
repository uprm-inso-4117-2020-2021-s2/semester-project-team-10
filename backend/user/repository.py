from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, DateTime
from sqlalchemy.orm import relationship, Session
from database import Base
import datetime
from . import UserCreate
import models

class UserRepository():
    @staticmethod
    def get_user(db: Session, user_id: int):
        return db.query(models.User).filter(models.User.id == user_id).first()

    @staticmethod
    def get_user_by_email(db: Session, email: str):
        return db.query(models.User).filter(models.User.email == email).first()

    @staticmethod
    def get_users(db: Session, skip: int = 0, limit: int = 100):
        return db.query(models.User).offset(skip).limit(limit).all()

    @staticmethod
    def create_user(db: Session, user: UserCreate):
        #hash password TODO
        fake_hashed_password = user.password + "notreallyhashed"
        db_user = models.User(email=user.email, username=user.username, hashed_password=fake_hashed_password)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user