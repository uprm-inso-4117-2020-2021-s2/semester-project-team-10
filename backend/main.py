from fastapi import FastAPI
import models
from sqlalchemy.orm import Session
from database import SessionLocal, engine

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.post("/login")
def login():
    #TODO
    return "Login route"

@app.post("/register")
def register():
    #TODO
    return "Register route"
