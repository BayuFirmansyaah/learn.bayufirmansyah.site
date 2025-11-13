import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi16() {
  return (
    <MateriLayout
      title="Object-Oriented Programming (OOP)"
      description="Pelajari paradigma pemrograman berorientasi objek di JavaScript"
    >
      <Section title="Pengenalan OOP">
        <p>
          Object-Oriented Programming (OOP) adalah paradigma pemrograman yang mengorganisir kode 
          dalam bentuk objek yang memiliki properties (data) dan methods (behavior).
        </p>
        
        <Note type="info">
          <strong>4 Pilar OOP:</strong> Encapsulation, Abstraction, Inheritance, Polymorphism.
        </Note>

        <h3 className="text-lg font-semibold mb-2 mt-4">Object Literals (Basic)</h3>
        <CodeBlock language="javascript">
{`// Simple object
const person = {
  name: 'Alice',
  age: 25,
  greet() {
    console.log(\`Hello, I'm \${this.name}\`);
  }
};

person.greet();  // "Hello, I'm Alice"

// Factory function
function createPerson(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(\`Hello, I'm \${this.name}\`);
    }
  };
}

const alice = createPerson('Alice', 25);
const bob = createPerson('Bob', 30);`}
        </CodeBlock>
      </Section>

      <Section title="Classes">
        <h3 className="text-lg font-semibold mb-2">Basic Class</h3>
        
        <CodeBlock language="javascript">
{`class Person {
  // Constructor - dipanggil saat instance dibuat
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // Method
  greet() {
    console.log(\`Hello, I'm \${this.name}\`);
  }
  
  haveBirthday() {
    this.age++;
    console.log(\`Happy birthday! Now \${this.age} years old\`);
  }
}

// Create instances
const alice = new Person('Alice', 25);
const bob = new Person('Bob', 30);

alice.greet();  // "Hello, I'm Alice"
bob.haveBirthday();  // "Happy birthday! Now 31 years old"

console.log(alice instanceof Person);  // true`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Getters & Setters</h3>
        <CodeBlock language="javascript">
{`class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }
  
  // Getter
  get area() {
    return this._width * this._height;
  }
  
  get perimeter() {
    return 2 * (this._width + this._height);
  }
  
  // Setter dengan validasi
  set width(value) {
    if (value <= 0) {
      throw new Error('Width must be positive');
    }
    this._width = value;
  }
  
  set height(value) {
    if (value <= 0) {
      throw new Error('Height must be positive');
    }
    this._height = value;
  }
  
  // Getter untuk private properties
  get width() {
    return this._width;
  }
  
  get height() {
    return this._height;
  }
}

const rect = new Rectangle(10, 5);
console.log(rect.area);  // 50 (dipanggil seperti property)
console.log(rect.perimeter);  // 30

rect.width = 20;  // Setter dipanggil
console.log(rect.area);  // 100

// rect.width = -5;  // Error: Width must be positive`}
        </CodeBlock>
      </Section>

      <Section title="Encapsulation">
        <p>
          Encapsulation adalah menyembunyikan detail implementasi dan hanya expose interface publik.
        </p>

        <h3 className="text-lg font-semibold mb-2 mt-4">Private Fields (#)</h3>
        <CodeBlock language="javascript">
{`class BankAccount {
  // Private fields (ES2022)
  #balance = 0;
  #transactions = [];
  
  constructor(owner) {
    this.owner = owner;  // Public field
  }
  
  // Public methods
  deposit(amount) {
    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }
    this.#balance += amount;
    this.#addTransaction('deposit', amount);
    return this.#balance;
  }
  
  withdraw(amount) {
    if (amount <= 0) {
      throw new Error('Amount must be positive');
    }
    if (amount > this.#balance) {
      throw new Error('Insufficient funds');
    }
    this.#balance -= amount;
    this.#addTransaction('withdraw', amount);
    return this.#balance;
  }
  
  getBalance() {
    return this.#balance;
  }
  
  getStatement() {
    return this.#transactions.map(t => 
      \`\${t.type}: $\${t.amount} on \${t.date.toLocaleDateString()}\`
    );
  }
  
  // Private method
  #addTransaction(type, amount) {
    this.#transactions.push({
      type,
      amount,
      date: new Date()
    });
  }
}

const account = new BankAccount('Alice');
account.deposit(1000);
account.withdraw(500);
console.log(account.getBalance());  // 500

// account.#balance;  // SyntaxError: Private field
// account.#addTransaction();  // SyntaxError: Private method`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Weak Encapsulation (Konvensi _)</h3>
        <CodeBlock language="javascript">
{`class User {
  constructor(username, password) {
    this.username = username;
    this._password = password;  // Konvensi: _ = private (tapi tidak enforce)
  }
  
  // Public interface untuk change password
  changePassword(oldPassword, newPassword) {
    if (oldPassword !== this._password) {
      throw new Error('Incorrect password');
    }
    this._password = newPassword;
    console.log('Password changed successfully');
  }
  
  authenticate(password) {
    return password === this._password;
  }
}

const user = new User('alice', 'secret123');
user.changePassword('secret123', 'newSecret456');

// Masih bisa diakses (tidak truly private)
console.log(user._password);  // "newSecret456"`}
        </CodeBlock>
      </Section>

      <Section title="Inheritance">
        <p>Inheritance memungkinkan class mewarisi properties dan methods dari class lain.</p>

        <h3 className="text-lg font-semibold mb-2">Basic Inheritance</h3>
        <CodeBlock language="javascript">
{`// Parent class
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(\`\${this.name} makes a sound\`);
  }
  
  move() {
    console.log(\`\${this.name} is moving\`);
  }
}

// Child class
class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // Call parent constructor
    this.breed = breed;
  }
  
  // Override parent method
  speak() {
    console.log(\`\${this.name} barks: Woof!\`);
  }
  
  // New method
  fetch() {
    console.log(\`\${this.name} is fetching the ball\`);
  }
}

class Cat extends Animal {
  speak() {
    console.log(\`\${this.name} meows: Meow!\`);
  }
}

const dog = new Dog('Buddy', 'Golden Retriever');
const cat = new Cat('Whiskers');

dog.speak();  // "Buddy barks: Woof!"
dog.move();   // "Buddy is moving" (inherited)
dog.fetch();  // "Buddy is fetching the ball"

cat.speak();  // "Whiskers meows: Meow!"

console.log(dog instanceof Dog);     // true
console.log(dog instanceof Animal);  // true`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Calling Parent Methods</h3>
        <CodeBlock language="javascript">
{`class Shape {
  constructor(color) {
    this.color = color;
  }
  
  describe() {
    return \`A \${this.color} shape\`;
  }
}

class Circle extends Shape {
  constructor(color, radius) {
    super(color);
    this.radius = radius;
  }
  
  describe() {
    // Call parent method dengan super
    const parentDesc = super.describe();
    return \`\${parentDesc} with radius \${this.radius}\`;
  }
  
  getArea() {
    return Math.PI * this.radius ** 2;
  }
}

const circle = new Circle('red', 5);
console.log(circle.describe());  // "A red shape with radius 5"
console.log(circle.getArea());   // 78.54`}
        </CodeBlock>
      </Section>

      <Section title="Polymorphism">
        <p>
          Polymorphism memungkinkan objek berbeda merespon method yang sama dengan cara berbeda.
        </p>

        <CodeBlock language="javascript">
{`class Shape {
  getArea() {
    throw new Error('getArea() must be implemented');
  }
  
  getPerimeter() {
    throw new Error('getPerimeter() must be implemented');
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  getArea() {
    return this.width * this.height;
  }
  
  getPerimeter() {
    return 2 * (this.width + this.height);
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  getArea() {
    return Math.PI * this.radius ** 2;
  }
  
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  }
}

class Triangle extends Shape {
  constructor(a, b, c) {
    super();
    this.a = a;
    this.b = b;
    this.c = c;
  }
  
  getArea() {
    const s = this.getPerimeter() / 2;
    return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
  }
  
  getPerimeter() {
    return this.a + this.b + this.c;
  }
}

// Polymorphism in action
const shapes = [
  new Rectangle(10, 5),
  new Circle(7),
  new Triangle(3, 4, 5)
];

shapes.forEach(shape => {
  console.log(\`Area: \${shape.getArea()}\`);
  console.log(\`Perimeter: \${shape.getPerimeter()}\`);
});

// Function yang accept any Shape
function printShapeInfo(shape) {
  if (!(shape instanceof Shape)) {
    throw new Error('Must be a Shape');
  }
  console.log(\`Area: \${shape.getArea().toFixed(2)}\`);
  console.log(\`Perimeter: \${shape.getPerimeter().toFixed(2)}\`);
}

printShapeInfo(new Circle(5));`}
        </CodeBlock>
      </Section>

      <Section title="Static Methods & Properties">
        <p>Static members milik class, bukan instance.</p>

        <CodeBlock language="javascript">
{`class MathUtils {
  // Static properties
  static PI = 3.14159;
  static E = 2.71828;
  
  // Static method
  static add(a, b) {
    return a + b;
  }
  
  static multiply(a, b) {
    return a * b;
  }
  
  static randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

// Call tanpa create instance
console.log(MathUtils.add(5, 3));  // 8
console.log(MathUtils.PI);  // 3.14159

// const utils = new MathUtils();
// utils.add(5, 3);  // Error: add is not a function

// Use case: Factory methods
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  // Static factory method
  static fromJSON(json) {
    const data = JSON.parse(json);
    return new User(data.name, data.email);
  }
  
  static createGuest() {
    return new User('Guest', 'guest@example.com');
  }
}

const json = '{"name":"Alice","email":"alice@example.com"}';
const user1 = User.fromJSON(json);
const user2 = User.createGuest();

// Use case: Counter
class Counter {
  static count = 0;
  
  constructor(name) {
    this.name = name;
    this.id = ++Counter.count;
  }
  
  static getCount() {
    return Counter.count;
  }
  
  static reset() {
    Counter.count = 0;
  }
}

const c1 = new Counter('A');
const c2 = new Counter('B');
console.log(Counter.getCount());  // 2
console.log(c1.id);  // 1
console.log(c2.id);  // 2`}
        </CodeBlock>
      </Section>

      <Section title="Abstract Classes (Pattern)">
        <p>JavaScript tidak punya abstract keyword, tapi kita bisa simulasikan.</p>

        <CodeBlock language="javascript">
{`class Vehicle {
  constructor(brand) {
    if (new.target === Vehicle) {
      throw new Error('Vehicle is abstract, cannot instantiate');
    }
    this.brand = brand;
  }
  
  // Abstract method (must override)
  start() {
    throw new Error('start() must be implemented');
  }
  
  stop() {
    throw new Error('stop() must be implemented');
  }
  
  // Concrete method (dapat digunakan langsung)
  honk() {
    console.log('Beep beep!');
  }
}

class Car extends Vehicle {
  constructor(brand, model) {
    super(brand);
    this.model = model;
  }
  
  start() {
    console.log(\`\${this.brand} \${this.model} engine started\`);
  }
  
  stop() {
    console.log(\`\${this.brand} \${this.model} engine stopped\`);
  }
}

class Motorcycle extends Vehicle {
  constructor(brand, cc) {
    super(brand);
    this.cc = cc;
  }
  
  start() {
    console.log(\`\${this.brand} motorcycle (\${this.cc}cc) started\`);
  }
  
  stop() {
    console.log(\`\${this.brand} motorcycle stopped\`);
  }
}

// const v = new Vehicle('Generic');  // Error: Vehicle is abstract

const car = new Car('Toyota', 'Camry');
car.start();  // "Toyota Camry engine started"
car.honk();   // "Beep beep!"

const moto = new Motorcycle('Honda', 150);
moto.start();  // "Honda motorcycle (150cc) started"`}
        </CodeBlock>
      </Section>

      <Section title="Composition Over Inheritance">
        <p>Sering kali composition lebih flexible daripada inheritance.</p>

        <h3 className="text-lg font-semibold mb-2">Problem dengan Inheritance</h3>
        <CodeBlock language="javascript">
{`// ❌ Deep inheritance hierarchy (fragile)
class Employee { /* ... */ }
class Manager extends Employee { /* ... */ }
class Director extends Manager { /* ... */ }
class VP extends Director { /* ... */ }

// Masalah:
// - Rigid hierarchy
// - Perubahan parent affect semua children
// - Sulit reuse functionality across branches`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">✅ Composition Pattern</h3>
        <CodeBlock language="javascript">
{`// Separate concerns into behaviors
const canEat = (state) => ({
  eat(food) {
    console.log(\`\${state.name} is eating \${food}\`);
  }
});

const canWalk = (state) => ({
  walk() {
    console.log(\`\${state.name} is walking\`);
  }
});

const canSwim = (state) => ({
  swim() {
    console.log(\`\${state.name} is swimming\`);
  }
});

const canFly = (state) => ({
  fly() {
    console.log(\`\${state.name} is flying\`);
  }
});

// Compose behaviors
function createDog(name) {
  const state = { name };
  return {
    ...state,
    ...canEat(state),
    ...canWalk(state),
    ...canSwim(state)
  };
}

function createBird(name) {
  const state = { name };
  return {
    ...state,
    ...canEat(state),
    ...canFly(state)
  };
}

function createFish(name) {
  const state = { name };
  return {
    ...state,
    ...canEat(state),
    ...canSwim(state)
  };
}

const dog = createDog('Buddy');
dog.eat('bone');
dog.walk();
dog.swim();

const bird = createBird('Tweety');
bird.eat('seeds');
bird.fly();

// Flexible: Easy to create new combinations
function createFlyingFish(name) {
  const state = { name };
  return {
    ...state,
    ...canSwim(state),
    ...canFly(state)
  };
}`}
        </CodeBlock>

        <h3 className="text-lg font-semibold mb-2 mt-4">Mixin Pattern</h3>
        <CodeBlock language="javascript">
{`// Mixin untuk add functionality
const timestampMixin = {
  getTimestamp() {
    return this.timestamp;
  },
  
  updateTimestamp() {
    this.timestamp = new Date();
  }
};

const validationMixin = {
  validate() {
    throw new Error('validate() must be implemented');
  }
};

class Post {
  constructor(title, content) {
    this.title = title;
    this.content = content;
    this.timestamp = new Date();
  }
}

// Apply mixins
Object.assign(Post.prototype, timestampMixin, validationMixin);

// Override validate
Post.prototype.validate = function() {
  if (!this.title || !this.content) {
    throw new Error('Title and content required');
  }
  return true;
};

const post = new Post('Hello', 'World');
console.log(post.getTimestamp());
post.updateTimestamp();
post.validate();`}
        </CodeBlock>
      </Section>

      <Section title="Real-World Example: E-commerce">
        <CodeBlock language="javascript">
{`// Product hierarchy
class Product {
  #price;
  
  constructor(id, name, price, category) {
    this.id = id;
    this.name = name;
    this.#price = price;
    this.category = category;
  }
  
  get price() {
    return this.#price;
  }
  
  set price(value) {
    if (value < 0) {
      throw new Error('Price cannot be negative');
    }
    this.#price = value;
  }
  
  getDisplayPrice() {
    return \`$\${this.#price.toFixed(2)}\`;
  }
  
  applyDiscount(percentage) {
    const discount = this.#price * (percentage / 100);
    this.#price -= discount;
    return this.#price;
  }
}

class PhysicalProduct extends Product {
  constructor(id, name, price, category, weight, dimensions) {
    super(id, name, price, category);
    this.weight = weight;
    this.dimensions = dimensions;
  }
  
  getShippingCost() {
    // $5 base + $0.50 per kg
    return 5 + (this.weight * 0.5);
  }
  
  getTotalPrice() {
    return this.price + this.getShippingCost();
  }
}

class DigitalProduct extends Product {
  constructor(id, name, price, category, downloadUrl, fileSize) {
    super(id, name, price, category);
    this.downloadUrl = downloadUrl;
    this.fileSize = fileSize;
  }
  
  getDownloadLink(userId) {
    return \`\${this.downloadUrl}?user=\${userId}&product=\${this.id}\`;
  }
  
  getTotalPrice() {
    return this.price;  // No shipping for digital
  }
}

// Shopping cart
class ShoppingCart {
  #items = [];
  
  addItem(product, quantity = 1) {
    const existing = this.#items.find(item => item.product.id === product.id);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.#items.push({ product, quantity });
    }
  }
  
  removeItem(productId) {
    this.#items = this.#items.filter(item => item.product.id !== productId);
  }
  
  getSubtotal() {
    return this.#items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
  }
  
  getShippingTotal() {
    return this.#items.reduce((sum, item) => {
      const product = item.product;
      if (product instanceof PhysicalProduct) {
        return sum + (product.getShippingCost() * item.quantity);
      }
      return sum;
    }, 0);
  }
  
  getTotal() {
    return this.getSubtotal() + this.getShippingTotal();
  }
  
  getItemCount() {
    return this.#items.reduce((sum, item) => sum + item.quantity, 0);
  }
  
  getItems() {
    return [...this.#items];
  }
}

// Usage
const book = new PhysicalProduct(
  1, 
  'JavaScript Guide', 
  29.99, 
  'Books', 
  0.5,  // 0.5 kg
  { width: 15, height: 23, depth: 2 }
);

const course = new DigitalProduct(
  2,
  'Web Development Course',
  99.99,
  'Education',
  'https://example.com/download',
  250  // 250 MB
);

const cart = new ShoppingCart();
cart.addItem(book, 2);
cart.addItem(course, 1);

console.log('Subtotal:', cart.getSubtotal());
console.log('Shipping:', cart.getShippingTotal());
console.log('Total:', cart.getTotal());
console.log('Items:', cart.getItemCount());`}
        </CodeBlock>
      </Section>

      <Section title="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Prefer Composition Over Inheritance</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Gunakan composition untuk flexibility, inheritance hanya untuk "is-a" relationships.
            </p>
          </div>

          <div>
            <strong>2. Keep Classes Focused (Single Responsibility)</strong>
            <CodeBlock language="javascript">
{`// ❌ Class terlalu banyak tanggung jawab
class User {
  saveToDatabase() { }
  sendEmail() { }
  generateReport() { }
  validateInput() { }
}

// ✅ Separate concerns
class User { }
class UserRepository { }
class EmailService { }
class ReportGenerator { }
class Validator { }`}
            </CodeBlock>
          </div>

          <div>
            <strong>3. Use Private Fields untuk Encapsulation</strong>
            <CodeBlock language="javascript">
{`class Counter {
  #count = 0;  // Private
  
  increment() {
    this.#count++;
  }
  
  getCount() {
    return this.#count;
  }
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Validate di Constructor</strong>
            <CodeBlock language="javascript">
{`class Email {
  constructor(address) {
    if (!this.#isValid(address)) {
      throw new Error('Invalid email address');
    }
    this.address = address;
  }
  
  #isValid(email) {
    return /^[^@]+@[^@]+\\.[^@]+$/.test(email);
  }
}`}
            </CodeBlock>
          </div>

          <div>
            <strong>5. Document Public APIs</strong>
            <CodeBlock language="javascript">
{`class Calculator {
  /**
   * Adds two numbers
   * @param {number} a - First number
   * @param {number} b - Second number
   * @returns {number} Sum of a and b
   */
  add(a, b) {
    return a + b;
  }
}`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <Section title="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Konsep Penting:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Classes:</strong> Template untuk create objects</li>
            <li><strong>Constructor:</strong> Initialize instance properties</li>
            <li><strong>Methods:</strong> Functions milik class</li>
            <li><strong>Encapsulation:</strong> Hide implementation details (# untuk private)</li>
            <li><strong>Inheritance:</strong> extends keyword, super() untuk call parent</li>
            <li><strong>Polymorphism:</strong> Same interface, different implementations</li>
            <li><strong>Static:</strong> Class-level members (bukan instance)</li>
            <li><strong>Getters/Setters:</strong> Controlled access to properties</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">Best Practices:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Prefer composition over inheritance</li>
            <li>Single Responsibility Principle</li>
            <li>Use private fields (#) untuk encapsulation</li>
            <li>Validate di constructor</li>
            <li>Keep inheritance hierarchy shallow</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
