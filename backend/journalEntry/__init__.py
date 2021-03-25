from pydantic import BaseModel
from typing import Optional
from datetime import datetime

#Pydantic Schema

class journalEntry(BaseModel):
    id: int
    username: str
    date: Optional[datetime] = None
    moods: list(str)
    content: str