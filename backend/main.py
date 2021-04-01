from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlalchemy.orm import Session
from datetime import timedelta

from database import engine, get_db
import models as models
from user import User, UserCreate 
from user.repository import UserRepository
from security.authentication import ACCESS_TOKEN_EXPIRE_MINUTES, create_access_token, authenticate_user, get_current_active_user, Token, OAuth2PasswordRequestForm
from journalEntry import JournalEntry, JournalEntryBase
from journalEntry.repository import JournalEntryRepository

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/users", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = UserRepository.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return UserRepository.create_user(db=db, user=user)

@app.get("/users", response_model=List[User])
def get_all_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = UserRepository.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model=User)
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = UserRepository.get_user(db, user_id=user_id)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.post("/token", response_model=Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me/", response_model=User)
def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@app.get("/journal-entry", response_model=List[JournalEntry])
def get_journal_entries(db: Session = Depends(get_db)):
    return JournalEntryRepository.get_journal_entries(db)

@app.post("/journal-entry/new", response_model=JournalEntry)
def create_journal_entry(journal_entry: JournalEntryBase, db: Session = Depends(get_db), user: User = Depends(get_current_active_user)):
    return JournalEntryRepository.create_journal_entry(db, journal_entry, user.id)