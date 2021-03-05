from passlib.context import CryptContext # To Hash a password
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Function that verifies if a received password matches the hash stored
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# Utility function to hash a password
def get_password_hash(password):
    return pwd_context.hash(password)