from fastapi import FastAPI

app = FastAPI()

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
