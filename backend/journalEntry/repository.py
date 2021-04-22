from sqlalchemy.orm import Session
from . import JournalEntryBase
import datetime 
import models

class JournalEntryRepository():

    #query to get all journal entries from the logged in user
    @staticmethod
    def get_all_journal_entries(db: Session, user_id: int):
        return db.query(models.JournalEntry).filter(models.JournalEntry.user_id == user_id).all()

    #query to create a new journal entry
    @staticmethod
    def create_journal_entry(db: Session, journal_entry: JournalEntryBase, user_id: int):
        db_journal_entry = models.JournalEntry(**journal_entry.dict(), user_id = user_id)
        db.add(db_journal_entry)
        db.commit()
        db.refresh(db_journal_entry)
        return db_journal_entry

    #query to get a specific journal entry from a user
    @staticmethod
    def get_journal_entry_by_id(db: Session, user_id: int, journal_id: int):
        return db.query(models.JournalEntry).filter(models.JournalEntry.user_id == user_id, models.JournalEntry.id == journal_id).first()
   
    #query to get all journal entries from a user on a specific date
    @staticmethod
    def get_journal_entries_by_date(db: Session, user_id: int, date: str):
        date = datetime.date.fromisoformat(date)
        return db.query(models.JournalEntry).filter(models.JournalEntry.user_id == user_id, models.JournalEntry.date == date).all()
    
    #update a journal entry
    @staticmethod
    def update_journal_entry(db: Session, user_id: int, journal_id: int, newContent: str, newMoods : str):
        query = JournalEntryRepository.get_journal_entry_by_id(db, user_id, journal_id)
        moods = newMoods.split(',')
        query.content = newContent
        query.moods = moods
        db.commit()
        return query

    #query to delete journal entry
    @staticmethod
    def delete_journal_entry(db: Session, user_id: int, journal_id: int):
        query = JournalEntryRepository.get_journal_entry_by_id(db, user_id, journal_id)
        db.delete(query)
        db.commit()
        return "the journal entry " + str(journal_id) + " has been deleted"