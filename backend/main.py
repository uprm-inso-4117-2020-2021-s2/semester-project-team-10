from fastapi import FastAPI, Depends
# from protocols.loginsecurity import *
from typing import List

import models as models
from sqlalchemy.orm import Session
from database import SessionLocal, engine

from user import User, UserCreate
from user.repository import UserRepository

fake_users_db = {
    "johndoe": {
        "username": "johndoe",
        "full_name": "John Doe",
        "email": "johndoe@example.com",
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
        "disabled": False,
    }
}

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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

@app.post("/login")
def login():
    # TODO
    return "Log in route"

#### FROM FAST API TUTORIAL ####
# @app.post("/token", response_model=Token)
# async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    # TODO Authenticate the user with our own db
    # user = authenticate_user(fake_users_db, form_data.username, form_data.password)
    # if not user:
        # raise HTTPException(
            # status_code=status.HTTP_401_UNAUTHORIZED,
            # detail="Incorrect username or password",
            # headers={"WWW-Authenticate": "Bearer"},
        # )
    # access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    # access_token = create_access_token(
        # data={"sub": user.username}, expires_delta=access_token_expires
    # )
    # return {"access_token": access_token, "token_type": "bearer"}

# @app.get("/users/me/", response_model=User)
# async def read_users_me(current_user: User = Depends(get_current_active_user)):
    # return current_user


# @app.get("/users/me/items/")
# async def read_own_items(current_user: User = Depends(get_current_active_user)):
    # return [{"item_id": "Foo", "owner": current_user.username}]

##################################

@app.post("/register")
def register():
    #TODO
    return "Register route"
