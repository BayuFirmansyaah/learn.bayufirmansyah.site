import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi21() {
  return (
    <MateriLayout title="Type Hints & Annotations">
      <Section title="Basic Type Hints">
        <CodeBlock language="python">
{`# Function with type hints
def greet(name: str) -> str:
    return f"Hello {name}"

# Variables with type hints
age: int = 25
price: float = 19.99
is_active: bool = True
name: str = "Budi"

# Type hints don't enforce at runtime
result = greet(123)  # No error, but mypy will warn`}
        </CodeBlock>
      </Section>

      <Section title="Collection Types">
        <CodeBlock language="python">
{`from typing import List, Dict, Tuple, Set, Optional

# List
numbers: List[int] = [1, 2, 3, 4, 5]
names: List[str] = ["Budi", "Ani", "Citra"]

# Dict
user: Dict[str, int] = {"age": 25, "score": 100}
prices: Dict[str, float] = {"apple": 0.5, "banana": 0.3}

# Tuple
coordinates: Tuple[float, float] = (10.5, 20.3)
rgb: Tuple[int, int, int] = (255, 128, 0)

# Set
tags: Set[str] = {"python", "coding", "tutorial"}

# Optional (value or None)
def find_user(user_id: int) -> Optional[str]:
    if user_id > 0:
        return f"User{user_id}"
    return None`}
        </CodeBlock>
      </Section>

      <Section title="Union and Any">
        <CodeBlock language="python">
{`from typing import Union, Any

# Union - multiple types
def process_id(user_id: Union[int, str]) -> str:
    return str(user_id)

result1 = process_id(123)      # OK
result2 = process_id("abc")    # OK

# Any - any type (avoid if possible)
def process_data(data: Any) -> Any:
    return data  # Can be anything`}
        </CodeBlock>
      </Section>

      <Section title="Callable">
        <CodeBlock language="python">
{`from typing import Callable

# Function as parameter
def execute(func: Callable[[int, int], int], a: int, b: int) -> int:
    return func(a, b)

def add(x: int, y: int) -> int:
    return x + y

result = execute(add, 5, 3)  # 8`}
        </CodeBlock>
      </Section>

      <Section title="Generic Types">
        <CodeBlock language="python">
{`from typing import TypeVar, Generic

T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self):
        self.items: List[T] = []
    
    def push(self, item: T) -> None:
        self.items.append(item)
    
    def pop(self) -> T:
        return self.items.pop()

# Type-specific stacks
int_stack: Stack[int] = Stack()
int_stack.push(1)
int_stack.push(2)

str_stack: Stack[str] = Stack()
str_stack.push("hello")`}
        </CodeBlock>
      </Section>

      <Section title="Type Checking with mypy">
        <CodeBlock language="bash">
{`# Install mypy
pip install mypy

# Check types
mypy script.py

# Example errors mypy catches:
# error: Argument 1 to "greet" has incompatible type "int"; expected "str"`}
        </CodeBlock>
      </Section>

      <Section title="Practical Example">
        <CodeBlock language="python">
{`from typing import List, Dict, Optional

class User:
    def __init__(self, id: int, name: str, email: str):
        self.id = id
        self.name = name
        self.email = email

def get_user_by_id(
    users: List[User],
    user_id: int
) -> Optional[User]:
    for user in users:
        if user.id == user_id:
            return user
    return None

def get_user_emails(users: List[User]) -> List[str]:
    return [user.email for user in users]

def create_user_map(users: List[User]) -> Dict[int, User]:
    return {user.id: user for user in users}

# Usage
users: List[User] = [
    User(1, "Budi", "budi@example.com"),
    User(2, "Ani", "ani@example.com")
]

user = get_user_by_id(users, 1)
if user:
    print(user.name)  # mypy knows user is not None here`}
        </CodeBlock>
      </Section>

      <Section title="Summary">
        <ul>
          <li>✅ Type hints: Optional but highly recommended</li>
          <li>✅ Basic types: int, str, float, bool</li>
          <li>✅ Collections: List, Dict, Tuple, Set</li>
          <li>✅ Optional: For nullable values</li>
          <li>✅ Union: Multiple possible types</li>
          <li>✅ Callable: Function types</li>
          <li>✅ mypy: Static type checker</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
