import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi24() {
  return (
    <MateriLayout title="Database Integration">
      <Section title="SQLite (Built-in)">
        <CodeBlock language="python">
{`import sqlite3

# Connect to database (creates if not exists)
conn = sqlite3.connect('app.db')
cursor = conn.cursor()

# Create table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER
    )
''')

# Insert data
cursor.execute(
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
    ("Budi", "budi@example.com", 25)
)
conn.commit()

# Query data
cursor.execute("SELECT * FROM users")
users = cursor.fetchall()
for user in users:
    print(user)

# Close connection
conn.close()`}
        </CodeBlock>
      </Section>

      <Section title="Context Manager for Database">
        <CodeBlock language="python">
{`import sqlite3
from contextlib import contextmanager

@contextmanager
def get_db_connection(db_name):
    conn = sqlite3.connect(db_name)
    conn.row_factory = sqlite3.Row  # Dict-like access
    try:
        yield conn
    finally:
        conn.commit()
        conn.close()

# Usage
with get_db_connection('app.db') as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    
    for user in users:
        print(dict(user))  # {'id': 1, 'name': 'Budi', ...}`}
        </CodeBlock>
      </Section>

      <Section title="SQLAlchemy ORM">
        <CodeBlock language="bash">
{`# Install SQLAlchemy
pip install sqlalchemy`}
        </CodeBlock>
        
        <CodeBlock language="python">
{`from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Setup
engine = create_engine('sqlite:///app.db')
Base = declarative_base()
Session = sessionmaker(bind=engine)

# Define model
class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    age = Column(Integer)
    
    def __repr__(self):
        return f"<User(name='{self.name}', email='{self.email}')>"

# Create tables
Base.metadata.create_all(engine)

# Create session
session = Session()

# INSERT
new_user = User(name="Ani", email="ani@example.com", age=22)
session.add(new_user)
session.commit()

# SELECT
users = session.query(User).all()
for user in users:
    print(user)

# SELECT with filter
user = session.query(User).filter_by(name="Ani").first()
print(user)

# UPDATE
user.age = 23
session.commit()

# DELETE
session.delete(user)
session.commit()

session.close()`}
        </CodeBlock>
      </Section>

      <Section title="PostgreSQL with psycopg2">
        <CodeBlock language="bash">
{`# Install psycopg2
pip install psycopg2-binary`}
        </CodeBlock>
        
        <CodeBlock language="python">
{`import psycopg2

# Connect to PostgreSQL
conn = psycopg2.connect(
    host="localhost",
    database="mydb",
    user="postgres",
    password="password"
)

cursor = conn.cursor()

# Create table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10, 2),
        stock INTEGER
    )
''')

# Insert
cursor.execute(
    "INSERT INTO products (name, price, stock) VALUES (%s, %s, %s)",
    ("Laptop", 15000000, 10)
)
conn.commit()

# Select
cursor.execute("SELECT * FROM products")
products = cursor.fetchall()
for product in products:
    print(product)

cursor.close()
conn.close()`}
        </CodeBlock>
      </Section>

      <Section title="SQLAlchemy with Relationships">
        <CodeBlock language="python">
{`from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

Base = declarative_base()

class Author(Base):
    __tablename__ = 'authors'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    
    # Relationship
    books = relationship("Book", back_populates="author")

class Book(Base):
    __tablename__ = 'books'
    
    id = Column(Integer, primary_key=True)
    title = Column(String(100))
    author_id = Column(Integer, ForeignKey('authors.id'))
    
    # Relationship
    author = relationship("Author", back_populates="books")

# Setup
engine = create_engine('sqlite:///library.db')
Base.metadata.create_all(engine)
Session = sessionmaker(bind=engine)
session = Session()

# Create author with books
author = Author(name="J.K. Rowling")
author.books = [
    Book(title="Harry Potter 1"),
    Book(title="Harry Potter 2")
]
session.add(author)
session.commit()

# Query with join
author = session.query(Author).filter_by(name="J.K. Rowling").first()
for book in author.books:
    print(book.title)`}
        </CodeBlock>
      </Section>

      <Section title="Database Migration with Alembic">
        <CodeBlock language="bash">
{`# Install Alembic
pip install alembic

# Initialize
alembic init alembic

# Create migration
alembic revision --autogenerate -m "Create users table"

# Apply migration
alembic upgrade head

# Rollback
alembic downgrade -1`}
        </CodeBlock>
      </Section>

      <Section title="Summary">
        <ul>
          <li>SQLite: Built-in, file-based database</li>
          <li>SQLAlchemy: Popular ORM for Python</li>
          <li>psycopg2: PostgreSQL adapter</li>
          <li>Models: Define database schema as classes</li>
          <li>Relationships: One-to-many, many-to-many</li>
          <li>Alembic: Database migrations</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
