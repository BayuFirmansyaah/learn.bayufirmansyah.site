import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi13() {
  return (
    <MateriLayout title="OOP Advanced">
      <Section id="multiple-inheritance" heading="Multiple Inheritance">
        <CodeBlock language="python">
{`class A:
    def method_a(self):
        return "Method from A"

class B:
    def method_b(self):
        return "Method from B"

class C(A, B):  # Inherit from both A and B
    def method_c(self):
        return "Method from C"

obj = C()
print(obj.method_a())  # From A
print(obj.method_b())  # From B
print(obj.method_c())  # From C`}
        </CodeBlock>
      </Section>

      <Section id="method-resolution-order-mro" heading="Method Resolution Order (MRO)">
        <CodeBlock language="python">
{`class A:
    def greet(self):
        return "A"

class B(A):
    def greet(self):
        return "B"

class C(A):
    def greet(self):
        return "C"

class D(B, C):
    pass

obj = D()
print(obj.greet())  # B (MRO: D -> B -> C -> A)
print(D.__mro__)    # Shows resolution order`}
        </CodeBlock>
      </Section>

      <Section id="abstract-base-classes" heading="Abstract Base Classes">
        <CodeBlock language="python">
{`from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
    
    @abstractmethod
    def perimeter(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def perimeter(self):
        return 2 * (self.width + self.height)

# shape = Shape()  # TypeError: Can't instantiate abstract class
rect = Rectangle(5, 10)
print(rect.area())  # 50`}
        </CodeBlock>
      </Section>

      <Section id="class-methods-and-static-methods" heading="Class Methods and Static Methods">
        <CodeBlock language="python">
{`class Person:
    count = 0
    
    def __init__(self, name):
        self.name = name
        Person.count += 1
    
    @classmethod
    def get_count(cls):
        return cls.count
    
    @staticmethod
    def is_adult(age):
        return age >= 18

person1 = Person("Budi")
person2 = Person("Ani")

print(Person.get_count())    # 2 (class method)
print(Person.is_adult(25))   # True (static method)`}
        </CodeBlock>
      </Section>

      <Section id="operator-overloading" heading="Operator Overloading">
        <CodeBlock language="python">
{`class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(2, 3)
v2 = Vector(4, 5)
v3 = v1 + v2  # Uses __add__
print(v3)     # Vector(6, 8)`}
        </CodeBlock>
      </Section>

      <Section id="polymorphism" heading="Polymorphism">
        <CodeBlock language="python">
{`class Animal:
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

def make_sound(animal):
    print(animal.speak())

dog = Dog()
cat = Cat()
make_sound(dog)  # Woof!
make_sound(cat)  # Meow!`}
        </CodeBlock>
      </Section>

      <Section id="summary" heading="Summary">
        <ul>
          <li>Multiple inheritance: class C(A, B)</li>
          <li>MRO: Method Resolution Order</li>
          <li>ABC: Abstract Base Classes dengan @abstractmethod</li>
          <li>@classmethod: Operates on class</li>
          <li>@staticmethod: Independent utility functions</li>
          <li>Operator overloading: __add__, __sub__, etc.</li>
          <li>Polymorphism: Same interface, different implementations</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
