import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi12() {
  return (
    <MateriLayout title="OOP Basics - Object-Oriented Programming">
      <Section title="Classes and Objects">
        <CodeBlock language="python">
{`# Define a class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name}"

# Create objects (instances)
person1 = Person("Budi", 25)
person2 = Person("Ani", 22)

print(person1.greet())  # Hello, I'm Budi
print(person2.name)     # Ani`}
        </CodeBlock>
      </Section>

      <Section title="Constructor (__init__)">
        <CodeBlock language="python">
{`class Car:
    def __init__(self, brand, model, year):
        self.brand = brand
        self.model = model
        self.year = year
        self.mileage = 0  # Default value
    
    def drive(self, distance):
        self.mileage += distance
        return f"Drove {distance}km"

car = Car("Toyota", "Camry", 2024)
print(car.drive(100))
print(f"Total mileage: {car.mileage}km")`}
        </CodeBlock>
      </Section>

      <Section title="Instance vs Class Attributes">
        <CodeBlock language="python">
{`class Dog:
    # Class attribute (shared by all instances)
    species = "Canis familiaris"
    
    def __init__(self, name, age):
        # Instance attributes (unique to each instance)
        self.name = name
        self.age = age

dog1 = Dog("Buddy", 3)
dog2 = Dog("Max", 5)

print(dog1.species)  # Canis familiaris
print(dog2.species)  # Canis familiaris
print(dog1.name)     # Buddy
print(dog2.name)     # Max

# Modify class attribute
Dog.species = "Dog"
print(dog1.species)  # Dog (affects all instances)`}
        </CodeBlock>
      </Section>

      <Section title="Methods">
        <CodeBlock language="python">
{`class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
    
    # Instance method
    def deposit(self, amount):
        self.balance += amount
        return self.balance
    
    def withdraw(self, amount):
        if amount > self.balance:
            return "Insufficient funds"
        self.balance -= amount
        return self.balance
    
    def get_balance(self):
        return f"${self.balance}"

account = BankAccount("Budi", 1000)
account.deposit(500)
account.withdraw(200)
print(account.get_balance())  # $1300`}
        </CodeBlock>
      </Section>

      <Section title="Inheritance">
        <CodeBlock language="python">
{`# Parent class
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        return "Some sound"

# Child class
class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

dog = Dog("Buddy")
cat = Cat("Whiskers")

print(dog.name)    # Buddy (inherited)
print(dog.speak()) # Woof! (overridden)
print(cat.speak()) # Meow!`}
        </CodeBlock>
      </Section>

      <Section title="super() Function">
        <CodeBlock language="python">
{`class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

class Student(Person):
    def __init__(self, name, age, student_id):
        super().__init__(name, age)  # Call parent constructor
        self.student_id = student_id

student = Student("Budi", 20, "12345")
print(student.name)       # Budi
print(student.student_id) # 12345`}
        </CodeBlock>
      </Section>

      <Section title="Encapsulation (Private Members)">
        <CodeBlock language="python">
{`class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self.__balance = balance  # Private (double underscore)
    
    def deposit(self, amount):
        self.__balance += amount
    
    def get_balance(self):
        return self.__balance

account = BankAccount("Budi", 1000)
# print(account.__balance)  # AttributeError
print(account.get_balance())  # 1000 (via public method)`}
        </CodeBlock>
      </Section>

      <Section title="Property Decorators">
        <CodeBlock language="python">
{`class Person:
    def __init__(self, name, age):
        self._name = name
        self._age = age
    
    @property
    def name(self):
        return self._name
    
    @name.setter
    def name(self, value):
        if not value:
            raise ValueError("Name cannot be empty")
        self._name = value
    
    @property
    def age(self):
        return self._age
    
    @age.setter
    def age(self, value):
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value

person = Person("Budi", 25)
print(person.name)   # Budi (via getter)
person.age = 26      # via setter
# person.age = -5    # ValueError`}
        </CodeBlock>
      </Section>

      <Section title="Special Methods (Magic Methods)">
        <CodeBlock language="python">
{`class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
    
    def __str__(self):
        return f"{self.title} by {self.author}"
    
    def __repr__(self):
        return f"Book('{self.title}', '{self.author}', {self.pages})"
    
    def __len__(self):
        return self.pages
    
    def __eq__(self, other):
        return self.title == other.title

book = Book("Python 101", "John Doe", 300)
print(book)           # Python 101 by John Doe (__str__)
print(len(book))      # 300 (__len__)
print(repr(book))     # Book('Python 101', 'John Doe', 300)`}
        </CodeBlock>
      </Section>

      <Section title="Summary">
        <ul>
          <li>Class: Blueprint untuk objects</li>
          <li>Object: Instance dari class</li>
          <li>__init__: Constructor method</li>
          <li>self: Reference ke instance</li>
          <li>Inheritance: Child class extends parent</li>
          <li>Encapsulation: Private members dengan __prefix</li>
          <li>@property: Getter/setter decorators</li>
          <li>Magic methods: __str__, __repr__, __len__, dll</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
