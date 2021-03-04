from pydantic import BaseModel
from typing import Optional

# Pydantic schemas
class UserBase(BaseModel):
    email: str
    username: str
    # full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    # disabled: Optional[bool] = None

    class Config:
        orm_mode = True