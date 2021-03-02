from pydantic import BaseModel

# Create a User Model (A Pydantic User Model)
class User(BaseModel):
    username: str
    email: str

class UserInDB(User):
    hashed_password: str