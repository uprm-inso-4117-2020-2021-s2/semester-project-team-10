from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel

from typing import Optional


app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

fake_user_db = {
    "Juan":{
        "username": "Juan",
        "full_name": "Juan del Pueblo",
        "email": "juan@example.com",
        "hashed_password": "fakehashsecret",
        "disabled": False,
    },
    "alice": {
        "username": "alice",
        "full_name": "Alice Wonderland",
        "email": "alice@example.com",
        "hashed_password": "fakehashsecret2",
        "disabled": True, 
    }
}
#TODO make a real hash potentially
def fake_hash_password(password: str):
    return "fakehashed" + password



@app.get("/items/")
async def read_items(token: str = Depends(oauth2_scheme)):
    return {"token": token}

class User(BaseModel):
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    disabled: Optional[bool] = None

class UserInDB(User):
    hashed_password: str

def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        #
        return UserInDB(**user_dict)

def fake_decode_token(token):
    return User(
        username= token + "fakedecoded", 
        email="juan@example.com", 
        full_name= "Juan del Pueblo", disabled = False
    )

async def get_current_user(token:str = Depends(oauth2_scheme)):
    user = fake_decode_token(token)
    return user

async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail = "Inactive user")
    return current_user

@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user_dict = fake_user_db.get(form_data.username)
    if not user_dict:
        raise HTTPException(status_code = 400, detail = "Incorrect username or password")
    user = UserInDB(**user_dict)
    hashed_password = fake_hash_password(form_data.password)
    if not hashed_password == user.hashed_password:
        raise HTTPException(status_code= 400,detail = "Incorrect username or password")

    return{ "access_token": user.username, "token_type": "bearer"}


@app.get("/users/me")
async def read_users_me(currnt_user: User = Depends(get_current_user)):
    return currnt_user
    
@app.get("/")
async def root():
    return {"message": "Hello World"}
@app.post("/login")
def login():
    #TODO
    return "Login route"

@app.post("/register")
def register():
    #TODO
    return "Register route"
