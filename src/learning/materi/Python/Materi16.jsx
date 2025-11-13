import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi16() {
  return (
    <MateriLayout title="Decorators">
      <Section title="What are Decorators?">
        <p>Decorator adalah function yang memodifikasi behavior function/method lain.</p>
        <CodeBlock language="python">
{`def my_decorator(func):
    def wrapper():
        print("Before function call")
        func()
        print("After function call")
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

say_hello()
# Output:
# Before function call
# Hello!
# After function call`}
        </CodeBlock>
      </Section>

      <Section title="Decorator with Arguments">
        <CodeBlock language="python">
{`def repeat(times):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello {name}!")

greet("Budi")
# Output:
# Hello Budi!
# Hello Budi!
# Hello Budi!`}
        </CodeBlock>
      </Section>

      <Section title="Preserving Metadata with functools.wraps">
        <CodeBlock language="python">
{`from functools import wraps

def my_decorator(func):
    @wraps(func)  # Preserves original function metadata
    def wrapper(*args, **kwargs):
        print("Decorated!")
        return func(*args, **kwargs)
    return wrapper

@my_decorator
def example():
    """This is example function"""
    pass

print(example.__name__)  # example (not wrapper)
print(example.__doc__)   # This is example function`}
        </CodeBlock>
      </Section>

      <Section title="Practical Decorators">
        <h3>1. Timer Decorator</h3>
        <CodeBlock language="python">
{`import time
from functools import wraps

def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        end = time.time()
        print(f"{func.__name__} took {end - start:.2f}s")
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(2)
    return "Done"

result = slow_function()  # slow_function took 2.00s`}
        </CodeBlock>

        <h3>2. Logging Decorator</h3>
        <CodeBlock language="python">
{`def log(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__} with {args}, {kwargs}")
        result = func(*args, **kwargs)
        print(f"{func.__name__} returned {result}")
        return result
    return wrapper

@log
def add(a, b):
    return a + b

add(3, 5)
# Output:
# Calling add with (3, 5), {}
# add returned 8`}
        </CodeBlock>

        <h3>3. Cache/Memoization Decorator</h3>
        <CodeBlock language="python">
{`from functools import lru_cache

@lru_cache(maxsize=None)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(50))  # Fast! (cached results)`}
        </CodeBlock>
      </Section>

      <Section title="Class Decorators">
        <CodeBlock language="python">
{`def add_str_method(cls):
    def __str__(self):
        return f"{cls.__name__} instance"
    cls.__str__ = __str__
    return cls

@add_str_method
class MyClass:
    pass

obj = MyClass()
print(obj)  # MyClass instance`}
        </CodeBlock>
      </Section>

      <Section title="Built-in Decorators">
        <CodeBlock language="python">
{`class Person:
    def __init__(self, name):
        self._name = name
    
    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, value):
        if not value:
            raise ValueError("Name cannot be empty")
        self._name = value
    
    @staticmethod
    def is_adult(age):
        return age >= 18
    
    @classmethod
    def from_birth_year(cls, name, birth_year):
        age = 2024 - birth_year
        return cls(name)

p = Person("Budi")
print(p.name)  # Uses @property
p.name = "Ani"  # Uses @setter
print(Person.is_adult(20))  # Static method`}
        </CodeBlock>
      </Section>

      <Section title="Summary">
        <ul>
          <li>Decorator: Function yang memodifikasi function lain</li>
          <li>Syntax: @decorator_name di atas function</li>
          <li>functools.wraps: Preserve function metadata</li>
          <li>Decorator dengan arguments: Nested functions</li>
          <li>Built-in: @property, @staticmethod, @classmethod</li>
          <li>Use cases: logging, timing, caching, validation</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
