from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from sqlalchemy.orm import Session
from datetime import timedelta

from database import engine, get_db
import models
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
async def root():
    return {"message": "Hello World"}

@app.post("/users", response_model=User)
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = UserRepository.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return UserRepository.create_user(db=db, user=user)

# @app.delete("/user/{user_id}")
# def delete_user_by_id(user_id: int, db: Session = Depends(get_db)):
#     return UserRepository.delete_user_by_id(db, user_id=user_id)

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
    return {"access_token": access_token, "token_type": "Bearer"}

@app.get("/users/me/", response_model=User)
def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

#CRUD operations for journal-entry

#get all entries from a user
@app.get("/journal-entry-all", response_model = List[JournalEntry])
def get_all_journal_entries(db: Session = Depends(get_db), user = Depends(get_current_active_user)):
    return JournalEntryRepository.get_all_journal_entries(db, user.id)

#get a journal entry by id
@app.get("/journal-entry-by-id", response_model = JournalEntry)
def get_journal_entry(journal_id: int, user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    result = JournalEntryRepository.get_journal_entry_by_id(db, user.id, journal_id)
    if result is None:
        raise HTTPException(status_code=404, detail="entry not found")
    else:
        return result

#get all entries from a date
# @app.get("/journal-entry-date", response_model = List[JournalEntry])
# def get_all_journal_entries(user_id: User,date: str, db: Session = Depends(get_db)):
#     return JournalEntryRepository.get_journal_entries_by_date(db, user_id, date)

#create new journal entry
@app.post("/journal-entry/new", response_model=JournalEntry)
def create_journal_entry(journal_entry: JournalEntryBase, db: Session = Depends(get_db), user: User = Depends(get_current_active_user)):
    return JournalEntryRepository.create_journal_entry(db, journal_entry, user.id)

#update the journal entry
@app.put("/journal-entry/update", response_model = JournalEntry)
def update_journal_entry(journal_id:int, newContent: str,newMoods: str, user = Depends( get_current_active_user), db: Session = Depends(get_db)):
    return JournalEntryRepository.update_journal_entry(db, user.id, journal_id, newContent, newMoods)

#delete a journal entry
@app.delete("/journal-entry/delete")
def delete_journal_entry(journal_id: int, user = Depends( get_current_active_user), db: Session = Depends(get_db)):
    return JournalEntryRepository.delete_journal_entry(db, user.id, journal_id)