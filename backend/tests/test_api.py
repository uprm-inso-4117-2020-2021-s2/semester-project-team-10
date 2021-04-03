from fastapi.testclient import TestClient

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from database import Base, get_db
from main import app 

import json

db_url='localhost'
db_name='moody_testing'
db_username='moody'
db_password=''
# db_password='moodypass' If running on a db that requires password
# db_port='8083'          if No port is specefied 5342 is used as default

# SQLALCHEMY_DATABASE_URL = f'postgresql://{db_username}:{db_password}@{db_url}:{db_port}/{db_name}'
SQLALCHEMY_DATABASE_URL = f'postgresql://{db_username}:{db_password}@{db_url}/{db_name}'

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={}
)

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_root():
    response = client.get('/')
    assert response.status_code == 200
    assert response.json() == {'message': 'Hello World'}

# User
def test_create_user():
    response = client.post(
        '/users',
        json={'email':'testing@test.com', 'username':'tester', 'password':'testing' },
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data['email'] == 'testing@test.com'
    assert 'id' in data
    user_id = data['id']

    response = client.get(f'/users/{user_id}')
    assert response.status_code == 200, response.text
    data = response.json()
    assert data['email'] == 'testing@test.com'
    assert data['id'] == user_id

    response = client.post(
        '/users',
        json={'email':'testing@test.com', 'username':'tester', 'password':'testing' },
    )
    assert response.status_code == 400, response.text
    assert response.json() == {"detail": "Email already registered"}

def test_login_for_access_token():
     # LOGIN
    response = client.post(
        '/token',
        data={'username':'tester', 'password':'testing' },
    )
    assert response.status_code == 200, response.text    

def test_get_all_users():
    response = client.get('/users')
    assert response.status_code == 200, response.text

def test_get_user():
    response = client.post(
        '/users',
        json={'email':'testing2@test.com', 'username':'tester2', 'password':'testing2' },
    )
    assert response.status_code == 200, response.text
    data = response.json()
    assert data['email'] == 'testing2@test.com'
    assert 'id' in data
    user_id = data['id']

    response = client.get(f'/users/{user_id}')
    assert response.status_code == 200, response.text
    data = response.json()
    assert data['email'] == 'testing2@test.com'
    assert data['id'] == user_id

    # response = client.delete(f'/users/{user_id}')
    # assert response.status_code == 200, response.text
    
    # hardcoded for now
    response = client.get(f'/users/100')
    assert response.status_code == 404, response.text
    assert response.json() == {"detail": "User not found"}

# Journal Entry
def test_create_journal_entry():
    # LOGIN
    response = client.post(
        '/token',
        data={"username":'tester', "password":'testing' },
    )
    assert response.status_code == 200, response.text
    token = response.json().get("access_token")
    # POST Journal Entry
    response = client.post(
        '/journal-entry/new',
         headers= {"Authorization" : f"Bearer {token}"},
         json={"moods": ["happy","excited"], "content": 'I am trying to be optimistic'},
        )
    assert response.status_code == 200, response.text
    active_user = client.get(
        '/users/me/',
        headers= {"Authorization" : f"Bearer {token}"},
        )
    assert response.json().get("user_id") == active_user.json().get("id")

def test_get_all_journal_entries():
    response = client.post(
        '/token',
        data={"username":'tester', "password":'testing' },
    )
    assert response.status_code == 200, response.text
    token = response.json().get("access_token")
    entries = client.get(
        '/journal-entry-all',
         headers= {"Authorization" : f"Bearer {token}"}
        )
    assert entries.status_code == 200, entries.text
    active_user = client.get(
        '/users/me/',
        headers= {"Authorization" : f"Bearer {token}"},
    )
    for jentry in entries.json():
        assert jentry["user_id"]==active_user.json().get("id")

def test_get_journal_entry_by_id():
    # LOGIN
    response = client.post(
        '/token',
        data={'username':'tester', 'password':'testing' },
    )
    assert response.status_code == 200, response.text
    token = response.json().get("access_token")
    # CREATE ENTRY
    created_entry = client.post(
        '/journal-entry/new',
         headers= {"Authorization" : f"Bearer {token}"},
         json={"moods": ["happy","excited"], "content": 'I am trying to be optimistic'},
        )
    journal_id = created_entry.json().get("id")
    assert created_entry.status_code == 200, created_entry.text
    # CHECK IF CREATED ENTRY BELONGS TO CORRECT USER
    entry_response = client.get(
        '/journal-entry-by-id',
         headers= {"Authorization" : f"Bearer {token}"},
         params={"journal_id" : journal_id},
        )
    assert entry_response.status_code == 200, entry_response.text
    active_user = client.get(
        '/users/me/',
        headers= {"Authorization" : f"Bearer {token}"},
    )
    assert active_user.status_code == 200, active_user.text
    assert entry_response.json().get("id") == created_entry.json().get("id")
    assert entry_response.json().get("user_id") == active_user.json().get("id")
    
def test_update_journal_entry():
    # LOGIN
    response = client.post(
        '/token',
        data={'username':'tester', 'password':'testing' },
    )
    assert response.status_code == 200, response.text
    token = response.json().get("access_token")

    # CREATE ENTRY
    created_entry = client.post(
        '/journal-entry/new',
         headers= {"Authorization" : f"Bearer {token}"},
         json={"moods": ["happy","excited"], "content": 'I am trying to be optimistic'},
        )
    journal_id = created_entry.json().get("id")
    assert created_entry.status_code == 200, created_entry.text

    # UPDATE JOURNAL ENTRY GIVEN AN ID
    entry_response = client.put(
        '/journal-entry/update',
         headers= {"Authorization" : f"Bearer {token}"},
         params={"journal_id" : journal_id, "newContent": 'It is a beautiful day today. I cannot stop thinking about stuff.', "newMoods": 'thoughtful,hungry'},
        )
    assert entry_response.status_code == 200, entry_response.text
    assert entry_response.json().get("id") == created_entry.json().get("id")

def test_delete_journal_entry():
    # LOGIN
    response = client.post(
        '/token',
        data={'username':'tester', 'password':'testing' },
    )
    assert response.status_code == 200, response.text
    token = response.json().get("access_token")

    # CREATE ENTRY
    created_entry = client.post(
        '/journal-entry/new',
         headers= {"Authorization" : f"Bearer {token}"},
         json={"moods": ["happy","excited"], "content": 'I am trying to be optimistic'},
        )
    journal_id = created_entry.json().get("id")
    assert created_entry.status_code == 200, created_entry.text

    # DELETE JOURNAL ENTRY GIVEN AN ID
    entry_response = client.delete(
        '/journal-entry/delete',
         headers= {"Authorization" : f"Bearer {token}"},
         params={"journal_id" : journal_id},
        )
    assert entry_response.status_code == 200, entry_response.text
