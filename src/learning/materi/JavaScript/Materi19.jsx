import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi19() {
  return (
    <MateriLayout
      title="Design Patterns"
      description="Pelajari design patterns populer dalam JavaScript"
    >
      <Section title="Pengenalan Design Patterns">
        <p>
          Design patterns adalah solusi reusable untuk masalah umum dalam software design.
          Terbagi menjadi 3 kategori: Creational, Structural, Behavioral.
        </p>
        
        <Note type="info">
          Design patterns bukan code library atau framework, tapi template untuk solve problems.
        </Note>
      </Section>

      <Section title="1. Module Pattern">
        <p>Encapsulate private data dan expose public API.</p>

        <CodeBlock language="javascript">
{`// IIFE Module Pattern
const Calculator = (function() {
  // Private variables
  let result = 0;
  
  // Private function
  function log(operation, value) {
    console.log(\`\${operation}: \${value}\`);
  }
  
  // Public API
  return {
    add(value) {
      result += value;
      log('Add', value);
      return this;
    },
    
    subtract(value) {
      result -= value;
      log('Subtract', value);
      return this;
    },
    
    multiply(value) {
      result *= value;
      log('Multiply', value);
      return this;
    },
    
    getResult() {
      return result;
    },
    
    reset() {
      result = 0;
      log('Reset', 0);
      return this;
    }
  };
})();

// Usage
Calculator
  .add(10)
  .multiply(2)
  .subtract(5);

console.log(Calculator.getResult());  // 15

// Revealing Module Pattern (cleaner)
const UserModule = (function() {
  let users = [];
  
  function addUser(user) {
    users.push(user);
  }
  
  function removeUser(id) {
    users = users.filter(u => u.id !== id);
  }
  
  function getUser(id) {
    return users.find(u => u.id === id);
  }
  
  function getAllUsers() {
    return [...users];
  }
  
  // Reveal public methods
  return {
    add: addUser,
    remove: removeUser,
    get: getUser,
    getAll: getAllUsers
  };
})();

UserModule.add({ id: 1, name: 'Alice' });
console.log(UserModule.getAll());`}
        </CodeBlock>
      </Section>

      <Section title="2. Singleton Pattern">
        <p>Ensure hanya satu instance of a class exists.</p>

        <CodeBlock language="javascript">
{`// Singleton with class
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    
    this.connection = null;
    Database.instance = this;
  }
  
  connect(url) {
    if (!this.connection) {
      this.connection = \`Connected to \${url}\`;
      console.log(this.connection);
    }
    return this.connection;
  }
  
  disconnect() {
    this.connection = null;
    console.log('Disconnected');
  }
}

const db1 = new Database();
const db2 = new Database();

console.log(db1 === db2);  // true (same instance)

db1.connect('mongodb://localhost');
db2.connect('mongodb://remote');  // Already connected

// Singleton with closure
const AppConfig = (function() {
  let instance;
  
  function createInstance() {
    return {
      apiUrl: 'https://api.example.com',
      timeout: 5000,
      
      get(key) {
        return this[key];
      },
      
      set(key, value) {
        this[key] = value;
      }
    };
  }
  
  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();

console.log(config1 === config2);  // true

config1.set('apiUrl', 'https://new-api.example.com');
console.log(config2.get('apiUrl'));  // "https://new-api.example.com"`}
        </CodeBlock>
      </Section>

      <Section title="3. Factory Pattern">
        <p>Create objects tanpa specify exact class.</p>

        <CodeBlock language="javascript">
{`// Simple Factory
class User {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }
  
  getPermissions() {
    return ['read'];
  }
}

class Admin extends User {
  getPermissions() {
    return ['read', 'write', 'delete'];
  }
}

class Moderator extends User {
  getPermissions() {
    return ['read', 'write'];
  }
}

// Factory
class UserFactory {
  static create(name, role) {
    switch (role) {
      case 'admin':
        return new Admin(name, role);
      case 'moderator':
        return new Moderator(name, role);
      default:
        return new User(name, role);
    }
  }
}

// Usage
const user = UserFactory.create('Alice', 'user');
const admin = UserFactory.create('Bob', 'admin');
const mod = UserFactory.create('Charlie', 'moderator');

console.log(user.getPermissions());    // ['read']
console.log(admin.getPermissions());   // ['read', 'write', 'delete']
console.log(mod.getPermissions());     // ['read', 'write']

// Factory with configuration
class VehicleFactory {
  createVehicle(type, options = {}) {
    const vehicles = {
      car: {
        wheels: 4,
        type: 'car',
        drive() {
          console.log('Driving a car');
        }
      },
      bike: {
        wheels: 2,
        type: 'bike',
        drive() {
          console.log('Riding a bike');
        }
      },
      truck: {
        wheels: 6,
        type: 'truck',
        drive() {
          console.log('Driving a truck');
        }
      }
    };
    
    return { ...vehicles[type], ...options };
  }
}

const factory = new VehicleFactory();
const car = factory.createVehicle('car', { color: 'red' });
const bike = factory.createVehicle('bike', { color: 'blue' });

car.drive();   // "Driving a car"
bike.drive();  // "Riding a bike"`}
        </CodeBlock>
      </Section>

      <Section title="4. Observer Pattern">
        <p>Define subscription mechanism untuk notify multiple objects.</p>

        <CodeBlock language="javascript">
{`class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
    
    // Return unsubscribe function
    return () => this.off(event, callback);
  }
  
  off(event, callback) {
    if (!this.events[event]) return;
    
    this.events[event] = this.events[event].filter(cb => cb !== callback);
  }
  
  emit(event, data) {
    if (!this.events[event]) return;
    
    this.events[event].forEach(callback => {
      callback(data);
    });
  }
  
  once(event, callback) {
    const onceWrapper = (data) => {
      callback(data);
      this.off(event, onceWrapper);
    };
    this.on(event, onceWrapper);
  }
}

// Usage
const emitter = new EventEmitter();

// Subscribe
const unsubscribe = emitter.on('userLogin', (user) => {
  console.log(\`User logged in: \${user.name}\`);
});

emitter.on('userLogin', (user) => {
  console.log(\`Welcome, \${user.name}!\`);
});

// Emit
emitter.emit('userLogin', { name: 'Alice' });

// Unsubscribe
unsubscribe();

// Practical: State management
class Store {
  constructor(initialState = {}) {
    this.state = initialState;
    this.listeners = [];
  }
  
  getState() {
    return this.state;
  }
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  }
  
  subscribe(listener) {
    this.listeners.push(listener);
    
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  notify() {
    this.listeners.forEach(listener => {
      listener(this.state);
    });
  }
}

const store = new Store({ count: 0 });

store.subscribe((state) => {
  console.log('State changed:', state);
});

store.setState({ count: 1 });  // Notifies all subscribers`}
        </CodeBlock>
      </Section>

      <Section title="5. Strategy Pattern">
        <p>Define family of algorithms dan make them interchangeable.</p>

        <CodeBlock language="javascript">
{`// Payment strategies
class CreditCardPayment {
  pay(amount) {
    console.log(\`Paid $\${amount} using Credit Card\`);
  }
}

class PayPalPayment {
  pay(amount) {
    console.log(\`Paid $\${amount} using PayPal\`);
  }
}

class CryptoPayment {
  pay(amount) {
    console.log(\`Paid $\${amount} using Cryptocurrency\`);
  }
}

// Context
class ShoppingCart {
  constructor() {
    this.items = [];
    this.paymentStrategy = null;
  }
  
  addItem(item) {
    this.items.push(item);
  }
  
  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }
  
  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }
  
  checkout() {
    const total = this.getTotal();
    if (!this.paymentStrategy) {
      throw new Error('Payment strategy not set');
    }
    this.paymentStrategy.pay(total);
  }
}

// Usage
const cart = new ShoppingCart();
cart.addItem({ name: 'Book', price: 10 });
cart.addItem({ name: 'Pen', price: 5 });

cart.setPaymentStrategy(new CreditCardPayment());
cart.checkout();  // "Paid $15 using Credit Card"

cart.setPaymentStrategy(new PayPalPayment());
cart.checkout();  // "Paid $15 using PayPal"

// Functional approach
const strategies = {
  credit: (amount) => console.log(\`Paid $\${amount} with Credit Card\`),
  paypal: (amount) => console.log(\`Paid $\${amount} with PayPal\`),
  crypto: (amount) => console.log(\`Paid $\${amount} with Crypto\`)
};

function processPayment(amount, strategy) {
  strategies[strategy](amount);
}

processPayment(100, 'paypal');

// Validation strategies
const validationStrategies = {
  email: (value) => /^[^@]+@[^@]+\\.[^@]+$/.test(value),
  phone: (value) => /^\\d{10}$/.test(value),
  url: (value) => /^https?:\\/\\//.test(value)
};

function validate(value, type) {
  return validationStrategies[type](value);
}

console.log(validate('test@example.com', 'email'));  // true`}
        </CodeBlock>
      </Section>

      <Section title="6. Decorator Pattern">
        <p>Add behavior to objects dynamically.</p>

        <CodeBlock language="javascript">
{`// Class decorator
class Coffee {
  cost() {
    return 5;
  }
  
  description() {
    return 'Coffee';
  }
}

// Decorators
class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost() + 2;
  }
  
  description() {
    return this.coffee.description() + ', Milk';
  }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() {
    return this.coffee.cost() + 1;
  }
  
  description() {
    return this.coffee.description() + ', Sugar';
  }
}

// Usage
let coffee = new Coffee();
console.log(coffee.description(), '-', coffee.cost());  // "Coffee - 5"

coffee = new MilkDecorator(coffee);
console.log(coffee.description(), '-', coffee.cost());  // "Coffee, Milk - 7"

coffee = new SugarDecorator(coffee);
console.log(coffee.description(), '-', coffee.cost());  // "Coffee, Milk, Sugar - 8"

// Functional approach
function withLogging(fn) {
  return function(...args) {
    console.log(\`Calling \${fn.name} with\`, args);
    const result = fn(...args);
    console.log(\`Result:\`, result);
    return result;
  };
}

function withTiming(fn) {
  return function(...args) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(\`\${fn.name} took \${(end - start).toFixed(2)}ms\`);
    return result;
  };
}

function add(a, b) {
  return a + b;
}

const loggedAdd = withLogging(add);
const timedAdd = withTiming(add);
const decoratedAdd = withLogging(withTiming(add));

decoratedAdd(5, 3);`}
        </CodeBlock>
      </Section>

      <Section title="7. Proxy Pattern">
        <p>Control access to an object dengan providing substitute/placeholder.</p>

        <CodeBlock language="javascript">
{`// Validation proxy
const validator = {
  set(target, property, value) {
    if (property === 'age') {
      if (typeof value !== 'number' || value < 0) {
        throw new TypeError('Age must be a positive number');
      }
    }
    
    if (property === 'email') {
      if (!/^[^@]+@[^@]+\\.[^@]+$/.test(value)) {
        throw new TypeError('Invalid email');
      }
    }
    
    target[property] = value;
    return true;
  }
};

const user = new Proxy({}, validator);

user.age = 25;        // OK
user.email = 'test@example.com';  // OK

// user.age = -5;     // Error: Age must be a positive number
// user.email = 'bad';  // Error: Invalid email

// Logging proxy
const loggingHandler = {
  get(target, property) {
    console.log(\`Getting \${property}\`);
    return target[property];
  },
  
  set(target, property, value) {
    console.log(\`Setting \${property} to \${value}\`);
    target[property] = value;
    return true;
  }
};

const obj = new Proxy({}, loggingHandler);
obj.name = 'Alice';   // "Setting name to Alice"
console.log(obj.name);  // "Getting name" then "Alice"

// Cache proxy
function createCachedFunction(fn) {
  const cache = new Map();
  
  return new Proxy(fn, {
    apply(target, thisArg, args) {
      const key = JSON.stringify(args);
      
      if (cache.has(key)) {
        console.log('Cache hit');
        return cache.get(key);
      }
      
      console.log('Cache miss');
      const result = target.apply(thisArg, args);
      cache.set(key, result);
      return result;
    }
  });
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const cachedFib = createCachedFunction(fibonacci);

console.log(cachedFib(10));  // Cache miss
console.log(cachedFib(10));  // Cache hit`}
        </CodeBlock>
      </Section>

      <Section title="8. Command Pattern">
        <p>Encapsulate request as object untuk parametrize clients dan support undo.</p>

        <CodeBlock language="javascript">
{`// Command interface
class Command {
  execute() {
    throw new Error('execute() must be implemented');
  }
  
  undo() {
    throw new Error('undo() must be implemented');
  }
}

// Concrete commands
class AddCommand extends Command {
  constructor(receiver, value) {
    super();
    this.receiver = receiver;
    this.value = value;
  }
  
  execute() {
    this.receiver.add(this.value);
  }
  
  undo() {
    this.receiver.subtract(this.value);
  }
}

class MultiplyCommand extends Command {
  constructor(receiver, value) {
    super();
    this.receiver = receiver;
    this.value = value;
    this.prevValue = null;
  }
  
  execute() {
    this.prevValue = this.receiver.getValue();
    this.receiver.multiply(this.value);
  }
  
  undo() {
    this.receiver.setValue(this.prevValue);
  }
}

// Receiver
class Calculator {
  constructor() {
    this.value = 0;
  }
  
  add(val) {
    this.value += val;
  }
  
  subtract(val) {
    this.value -= val;
  }
  
  multiply(val) {
    this.value *= val;
  }
  
  getValue() {
    return this.value;
  }
  
  setValue(val) {
    this.value = val;
  }
}

// Invoker
class CommandManager {
  constructor() {
    this.history = [];
    this.current = -1;
  }
  
  execute(command) {
    // Remove any commands after current position
    this.history = this.history.slice(0, this.current + 1);
    
    command.execute();
    this.history.push(command);
    this.current++;
  }
  
  undo() {
    if (this.current < 0) {
      console.log('Nothing to undo');
      return;
    }
    
    const command = this.history[this.current];
    command.undo();
    this.current--;
  }
  
  redo() {
    if (this.current >= this.history.length - 1) {
      console.log('Nothing to redo');
      return;
    }
    
    this.current++;
    const command = this.history[this.current];
    command.execute();
  }
}

// Usage
const calculator = new Calculator();
const manager = new CommandManager();

manager.execute(new AddCommand(calculator, 10));
console.log(calculator.getValue());  // 10

manager.execute(new MultiplyCommand(calculator, 2));
console.log(calculator.getValue());  // 20

manager.undo();
console.log(calculator.getValue());  // 10

manager.redo();
console.log(calculator.getValue());  // 20`}
        </CodeBlock>
      </Section>

      <Section title="Best Practices">
        <div className="space-y-3">
          <div>
            <strong>1. Don't Overuse Patterns</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Gunakan patterns hanya saat benar-benar diperlukan. Simple solution lebih baik.
            </p>
          </div>

          <div>
            <strong>2. Understand the Problem First</strong>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Jangan force fit pattern. Pahami problem dulu, baru pilih pattern yang sesuai.
            </p>
          </div>

          <div>
            <strong>3. Keep It Simple</strong>
            <CodeBlock language="javascript">
{`// ❌ Over-engineered
class SingletonFactoryStrategyObserver { }

// ✅ Simple
const config = { apiUrl: '...' };`}
            </CodeBlock>
          </div>

          <div>
            <strong>4. Document Pattern Usage</strong>
            <CodeBlock language="javascript">
{`/**
 * UserFactory - Factory Pattern
 * Creates different types of users based on role
 */
class UserFactory {
  // ...
}`}
            </CodeBlock>
          </div>
        </div>
      </Section>

      <Section title="Rangkuman">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
          <h3 className="font-semibold mb-3">Design Patterns:</h3>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Module:</strong> Encapsulate private data, expose public API</li>
            <li><strong>Singleton:</strong> Single instance of class</li>
            <li><strong>Factory:</strong> Create objects without specifying exact class</li>
            <li><strong>Observer:</strong> Subscription mechanism untuk notify objects</li>
            <li><strong>Strategy:</strong> Interchangeable algorithms</li>
            <li><strong>Decorator:</strong> Add behavior dynamically</li>
            <li><strong>Proxy:</strong> Control access to object</li>
            <li><strong>Command:</strong> Encapsulate requests, support undo/redo</li>
          </ul>
          
          <h3 className="font-semibold mt-4 mb-3">When to Use:</h3>
          <ul className="space-y-1 list-disc list-inside">
            <li>Module: Hide implementation details</li>
            <li>Singleton: Share global state (config, cache)</li>
            <li>Factory: Complex object creation</li>
            <li>Observer: Event systems, state management</li>
            <li>Strategy: Vary algorithms at runtime</li>
            <li>Decorator: Add features without modifying code</li>
          </ul>
        </div>
      </Section>
    </MateriLayout>
  );
}
