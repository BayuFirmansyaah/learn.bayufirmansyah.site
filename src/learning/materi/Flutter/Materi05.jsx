import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi05() {
  return (
    <MateriLayout
      title="OOP dalam Dart"
      intro="Object-Oriented Programming (OOP) membantu mengorganisir code dalam bentuk objects dan classes. Dart fully supports OOP dengan features modern seperti mixins dan extension methods."
    >
      <Section id="classes-objects" heading="Classes & Objects">
        <p>Class adalah blueprint, Object adalah instance dari class.</p>
        <CodeBlock language="dart">
{`// Define a class
class Person {
  String name;
  int age;
  
  // Constructor
  Person(this.name, this.age);
  
  // Method
  void introduce() {
    print('Hi, I am $name, $age years old');
  }
}

// Create objects
var person1 = Person('John', 25);
var person2 = Person('Jane', 23);

person1.introduce();  // Hi, I am John, 25 years old
person2.introduce();  // Hi, I am Jane, 23 years old`}
        </CodeBlock>
      </Section>

      <Section id="constructors" heading="Constructors">
        <CodeBlock language="dart">
{`class User {
  String name;
  int age;
  String? email;
  
  // Default constructor
  User(this.name, this.age, this.email);
  
  // Named constructor
  User.guest() : name = 'Guest', age = 0, email = null;
  
  User.fromEmail(String email) 
    : name = email.split('@')[0], 
      age = 0, 
      email = email;
  
  // Factory constructor
  factory User.admin() {
    return User('Admin', 30, 'admin@app.com');
  }
}

// Usage
var user1 = User('John', 25, 'john@email.com');
var user2 = User.guest();
var user3 = User.fromEmail('jane@email.com');
var admin = User.admin();`}
        </CodeBlock>
      </Section>

      <Section id="inheritance" heading="Inheritance">
        <CodeBlock language="dart">
{`// Parent class
class Animal {
  String name;
  
  Animal(this.name);
  
  void eat() => print('$name is eating');
  void makeSound() => print('Animal sound');
}

// Child class
class Dog extends Animal {
  String breed;
  
  Dog(String name, this.breed) : super(name);
  
  @override
  void makeSound() => print('$name barks: Woof!');
  
  void fetch() => print('$name is fetching');
}

// Usage
var dog = Dog('Buddy', 'Golden Retriever');
dog.eat();        // Buddy is eating (inherited)
dog.makeSound();  // Buddy barks: Woof! (overridden)
dog.fetch();      // Buddy is fetching (own method)`}
        </CodeBlock>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>✅ Classes & Objects - Blueprint dan instances</li>
          <li>✅ Constructors - Default, named, factory</li>
          <li>✅ Properties & Methods - State dan behavior</li>
          <li>✅ Inheritance - extends untuk reuse code</li>
          <li>✅ Abstract classes & Interfaces</li>
          <li>✅ Mixins - Reusable code blocks</li>
        </ul>
        <Note type="success">
          <strong>Next:</strong> Materi Widget Basics - Mulai build UI dengan Flutter!
        </Note>
      </Section>
    </MateriLayout>
  );
}
