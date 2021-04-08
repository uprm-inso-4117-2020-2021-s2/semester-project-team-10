from pydantic import BaseModel
from typing import Optional
from datetime import date

#Pydantic Schema
class JournalEntryBase(BaseModel):
    date: Optional[date] 
    moods: list[str]
    content: str

class JournalEntry(JournalEntryBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True