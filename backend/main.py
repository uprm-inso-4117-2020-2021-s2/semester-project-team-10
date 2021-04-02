from fastapi import FastAPI, Depends, HTTPException, status
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
#este es el que hicieron sammy y keneth
# @app.get("/journal-entry", response_model=List[JournalEntry])
# def get_journal_entries(db: Session = Depends(get_db)):
#     return JournalEntryRepository.get_journal_entries(db)



#CRUD operations for journal-entry

#get all entries from a user
@app.get("/journal-entry-all", response_model = List[JournalEntry])
def get_all_journal_entries(db: Session = Depends(get_db)):
    
    return JournalEntryRepository.get_all_journal_entries(db)

#get a journal entry by id
# ya este funciona
@app.get("/journal-entry-by-id", response_model = JournalEntry)
def get_journal_entry(journal_id:int, user: User = Depends(get_current_active_user), db: Session = Depends(get_db)):
    result = JournalEntryRepository.get_journal_entries_by_user(db, user.id, journal_id)
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
# @app.put("/journal-entry/update", response_model = JournalEntry)
# def update_journal_entry(user_id: int,journal_id:int, db: Session = Depends(get_db)):
#     return JournalEntryRepository.update_journal_entry(db, user_id, journal_id)

#delete a journal entry
# @app.delete("/journal-entry/delete/{user_id}/{journal_id}")
# def delete_journal_entry(user_id: int,journal_id:int, db: Session = Depends(get_db)):
#     JournalEntryRepository.delete_journal_entry(db, user_id, journal_id)
#     return "entry has been deleted"