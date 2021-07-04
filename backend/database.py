from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

db_url='xxxxxxx'
db_name='xxxxxx'
db_username='xxxxxx'
db_password='xxxxxx'

SQLALCHEMY_DATABASE_URL = f'postgresql://{db_username}:{db_password}@{db_url}/{db_name}'

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
