from pydantic import BaseModel
from typing import Optional
from datetime import datetime

#Pydantic Schema
class JournalEntryBase(BaseModel):
    date: Optional[datetime] = None
    moods: list[str]
    content: str

class JournalEntry(JournalEntryBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True