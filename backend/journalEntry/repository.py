from sqlalchemy.orm import Session
from . import JournalEntryBase
import models

class JournalEntryRepository():
    @staticmethod
    def get_journal_entries(db: Session, skip: int = 0, limit: int = 100): 
        return db.query(models.JournalEntry).offset(skip).limit(limit).all()
    #query to get all journal entries from a user
    @staticmethod
    def get_all_journal_entries(db: Session):
        return db.query(models.JournalEntry).all()
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
    def get_journal_entries_by_user(db: Session, user_id: int, journal_id: int):
        return db.query(models.JournalEntry).filter(models.JournalEntry.user_id == user_id, models.JournalEntry.id == journal_id).first()

    #query to get all journal entries from a user on a specific date
    @staticmethod
    def get_journal_entries_by_date(db: Session, user_id: int, date: str):
        return db.query(models.JournalEntry).filter(models.JournalEntry.user_id == user_id, models.JournalEntry.date == date).all()
    
    #update a journal entry
    # @staticmethod
    # def update_journal_entry(db: Session, user_id: int, journal_id: int):

    #query to delete journal entry
    @staticmethod
    def delete_journal_entry(db: Session, user_id: int, journal_id: int):
        db.query.delete().where(models.JournalEntry.user_id == user_id, models.JournalEntry.id == journal_id)
        (models.JournalEntry.user_id == user_id, models.JournalEntry.id == journal_id)