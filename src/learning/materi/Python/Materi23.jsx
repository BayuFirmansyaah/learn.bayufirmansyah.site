import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi23() {
  return (
    <MateriLayout title="REST API with FastAPI">
      <Section id="setup-fastapi" heading="Setup FastAPI">
        <CodeBlock language="bash">
{`# Install FastAPI and Uvicorn (ASGI server)
pip install fastapi uvicorn[standard]`}
        </CodeBlock>
      </Section>

      <Section id="hello-world-api" heading="Hello World API">
        <CodeBlock language="python">
{`from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

@app.get("/hello/{name}")
def greet(name: str):
    return {"message": f"Hello {name}"}

# Run: uvicorn main:app --reload
# Visit: http://localhost:8000`}
        </CodeBlock>
      </Section>

      <Section id="request-models-pydantic" heading="Request Models (Pydantic)">
        <CodeBlock language="python">
{`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str
    age: int

@app.post("/users/")
def create_user(user: User):
    return {
        "message": "User created",
        "user": user
    }

# Request body (JSON):
# {
#   "name": "Budi",
#   "email": "budi@example.com",
#   "age": 25
# }`}
        </CodeBlock>
      </Section>

      <Section id="path-and-query-parameters" heading="Path and Query Parameters">
        <CodeBlock language="python">
{`from fastapi import FastAPI

app = FastAPI()

# Path parameter
@app.get("/items/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id}

# Query parameters
@app.get("/search/")
def search(q: str, limit: int = 10):
    return {
        "query": q,
        "limit": limit
    }

# URL: /search/?q=python&limit=5`}
        </CodeBlock>
      </Section>

      <Section id="crud-operations" heading="CRUD Operations">
        <CodeBlock language="python">
{`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Item(BaseModel):
    id: int
    name: str
    price: float

# In-memory database
items_db: List[Item] = []

# CREATE
@app.post("/items/", status_code=201)
def create_item(item: Item):
    items_db.append(item)
    return item

# READ all
@app.get("/items/")
def get_items():
    return items_db

# READ one
@app.get("/items/{item_id}")
def get_item(item_id: int):
    for item in items_db:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

# UPDATE
@app.put("/items/{item_id}")
def update_item(item_id: int, updated_item: Item):
    for i, item in enumerate(items_db):
        if item.id == item_id:
            items_db[i] = updated_item
            return updated_item
    raise HTTPException(status_code=404, detail="Item not found")

# DELETE
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    for i, item in enumerate(items_db):
        if item.id == item_id:
            items_db.pop(i)
            return {"message": "Item deleted"}
    raise HTTPException(status_code=404, detail="Item not found")`}
        </CodeBlock>
      </Section>

      <Section id="response-models" heading="Response Models">
        <CodeBlock language="python">
{`from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class UserIn(BaseModel):
    username: str
    password: str
    email: str

class UserOut(BaseModel):
    username: str
    email: str

@app.post("/users/", response_model=UserOut)
def create_user(user: UserIn):
    # Password tidak di-return
    return user`}
        </CodeBlock>
      </Section>

      <Section id="async-endpoints" heading="Async Endpoints">
        <CodeBlock language="python">
{`from fastapi import FastAPI
import asyncio

app = FastAPI()

@app.get("/slow")
async def slow_endpoint():
    await asyncio.sleep(2)  # Async I/O operation
    return {"message": "Done after 2 seconds"}

@app.get("/fast")
async def fast_endpoint():
    return {"message": "Instant response"}`}
        </CodeBlock>
      </Section>

      <Section id="automatic-documentation" heading="Automatic Documentation">
        <Note type="info">
          FastAPI automatically generates interactive API docs:
          <ul>
            <li>Swagger UI: http://localhost:8000/docs</li>
            <li>ReDoc: http://localhost:8000/redoc</li>
          </ul>
        </Note>
      </Section>

      <Section id="complete-example" heading="Complete Example">
        <CodeBlock language="python">
{`from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, EmailStr
from typing import List, Optional

app = FastAPI(title="User API", version="1.0.0")

class User(BaseModel):
    id: int
    name: str
    email: EmailStr
    age: Optional[int] = None

users_db: List[User] = [
    User(id=1, name="Budi", email="budi@example.com", age=25),
    User(id=2, name="Ani", email="ani@example.com", age=22)
]

@app.get("/")
def root():
    return {"message": "Welcome to User API"}

@app.get("/users/", response_model=List[User])
def get_users(skip: int = 0, limit: int = 10):
    return users_db[skip:skip+limit]

@app.get("/users/{user_id}", response_model=User)
def get_user(user_id: int):
    for user in users_db:
        if user.id == user_id:
            return user
    raise HTTPException(status_code=404, detail="User not found")

@app.post("/users/", response_model=User, status_code=201)
def create_user(user: User):
    users_db.append(user)
    return user

# Run: uvicorn main:app --reload`}
        </CodeBlock>
      </Section>

      <Section id="summary" heading="Summary">
        <ul>
          <li>FastAPI: Modern, fast Python web framework</li>
          <li>Pydantic: Data validation with type hints</li>
          <li>Automatic OpenAPI docs generation</li>
          <li>Async support out of the box</li>
          <li>Type hints for better IDE support</li>
          <li>Easy to build REST APIs quickly</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
