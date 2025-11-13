import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi07() {
  return (
    <MateriLayout
      title="Objects"
      intro="Master objects di JavaScript - creation, properties, methods, this keyword, destructuring, Object methods, dan JSON."
    >
      <Section id="object-basics" heading="Object Basics">
        <p>
          <strong>Object</strong> adalah collection of key-value pairs. Most important data structure di JavaScript.
        </p>

        <CodeBlock language="javascript">
{`// Object literal
let user = {
  name: "Budi",
  age: 25,
  city: "Jakarta",
  isActive: true
};

// Access properties (dot notation)
console.log(user.name);  // "Budi"
console.log(user.age);   // 25

// Access properties (bracket notation)
console.log(user["name"]);  // "Budi"
console.log(user["age"]);   // 25

// Bracket notation untuk dynamic keys
let key = "city";
console.log(user[key]);  // "Jakarta"

// Modify property
user.age = 26;
console.log(user.age);  // 26

// Add new property
user.email = "budi@mail.com";
console.log(user.email);  // "budi@mail.com"

// Delete property
delete user.city;
console.log(user.city);  // undefined`}
        </CodeBlock>
      </Section>

      <Section id="object-methods" heading="Object Methods">
        <p>
          Objects can contain functions as properties (methods).
        </p>

        <CodeBlock language="javascript">
{`let user = {
  name: "Budi",
  age: 25,
  
  // Method (function as property)
  greet: function() {
    console.log("Hello, my name is " + this.name);
  },
  
  // Shorthand method syntax (ES6)
  sayAge() {
    console.log("I am " + this.age + " years old");
  },
  
  // Arrow function (careful with 'this'!)
  info: () => {
    console.log("Info method");
  }
};

// Call methods
user.greet();    // "Hello, my name is Budi"
user.sayAge();   // "I am 25 years old"
user.info();     // "Info method"

// Add method after creation
user.goodbye = function() {
  console.log("Goodbye!");
};

user.goodbye();  // "Goodbye!"`}
        </CodeBlock>
      </Section>

      <Section id="this-keyword" heading="this Keyword">
        <p>
          <code>this</code> refers to the object that is executing the current function.
        </p>

        <CodeBlock language="javascript">
{`let user = {
  name: "Budi",
  age: 25,
  
  greet() {
    console.log("Hello, " + this.name);  // 'this' refers to user object
  },
  
  getBirthYear() {
    return 2024 - this.age;
  }
};

user.greet();  // "Hello, Budi"
console.log(user.getBirthYear());  // 1999

// 'this' in arrow functions (different behavior!)
let person = {
  name: "Ani",
  
  regularFunc: function() {
    console.log(this.name);  // "Ani" (this = person)
  },
  
  arrowFunc: () => {
    console.log(this.name);  // undefined (this = window/global)
  }
};

person.regularFunc();  // Works
person.arrowFunc();    // Doesn't work as expected

// Context loss
let greet = user.greet;
greet();  // Error or undefined (lost context)

// Solution: bind()
let boundGreet = user.greet.bind(user);
boundGreet();  // "Hello, Budi"`}
        </CodeBlock>

        <Note type="warning">
          Arrow functions don't have their own <code>this</code>. Use regular functions for object methods.
        </Note>
      </Section>

      <Section id="nested-objects" heading="Nested Objects">
        <CodeBlock language="javascript">
{`let user = {
  name: "Budi",
  age: 25,
  address: {
    street: "Jl. Sudirman",
    city: "Jakarta",
    country: "Indonesia",
    zipCode: 12345
  },
  contacts: {
    email: "budi@mail.com",
    phone: "08123456789"
  }
};

// Access nested properties
console.log(user.address.city);          // "Jakarta"
console.log(user.contacts.email);        // "budi@mail.com"

// Bracket notation for nested
console.log(user["address"]["country"]); // "Indonesia"

// Modify nested
user.address.city = "Bandung";
console.log(user.address.city);  // "Bandung"

// Optional chaining (ES2020)
console.log(user.address?.zipCode);      // 12345
console.log(user.social?.twitter);       // undefined (no error!)

// Add nested object
user.social = {
  twitter: "@budi",
  instagram: "@budi_ig"
};`}
        </CodeBlock>
      </Section>

      <Section id="computed-properties" heading="Computed Property Names">
        <CodeBlock language="javascript">
{`// Computed property names (ES6)
let propName = "age";

let user = {
  name: "Budi",
  [propName]: 25,  // age: 25
  ["is" + "Active"]: true  // isActive: true
};

console.log(user.age);       // 25
console.log(user.isActive);  // true

// Dynamic object creation
function createUser(name, value) {
  return {
    [name]: value
  };
}

let user1 = createUser("email", "test@mail.com");
console.log(user1.email);  // "test@mail.com"`}
        </CodeBlock>
      </Section>

      <Section id="object-shorthand" heading="Property Shorthand">
        <CodeBlock language="javascript">
{`let name = "Budi";
let age = 25;

// Old way
let user1 = {
  name: name,
  age: age
};

// Shorthand (ES6)
let user2 = {
  name,  // same as name: name
  age    // same as age: age
};

console.log(user2);  // { name: "Budi", age: 25 }

// Function that returns object
function createUser(name, age, city) {
  return {
    name,
    age,
    city,
    greet() {
      console.log(\`Hello, I'm \${this.name}\`);
    }
  };
}

let user3 = createUser("Charlie", 30, "Surabaya");
user3.greet();  // "Hello, I'm Charlie"`}
        </CodeBlock>
      </Section>

      <Section id="object-destructuring" heading="Object Destructuring">
        <p>
          Extract properties from objects into variables.
        </p>

        <CodeBlock language="javascript">
{`let user = {
  name: "Budi",
  age: 25,
  city: "Jakarta"
};

// Basic destructuring
let { name, age, city } = user;
console.log(name);  // "Budi"
console.log(age);   // 25
console.log(city);  // "Jakarta"

// Rename variables
let { name: userName, age: userAge } = user;
console.log(userName);  // "Budi"
console.log(userAge);   // 25

// Default values
let { name, age, country = "Indonesia" } = user;
console.log(country);  // "Indonesia" (default)

// Nested destructuring
let person = {
  name: "Ani",
  address: {
    city: "Bandung",
    country: "Indonesia"
  }
};

let { name, address: { city, country } } = person;
console.log(city);     // "Bandung"
console.log(country);  // "Indonesia"

// Rest operator
let { name, ...rest } = user;
console.log(name);  // "Budi"
console.log(rest);  // { age: 25, city: "Jakarta" }

// Function parameters
function greet({ name, age }) {
  console.log(\`Hello, \${name}! You are \${age} years old.\`);
}

greet(user);  // "Hello, Budi! You are 25 years old."`}
        </CodeBlock>
      </Section>

      <Section id="object-static-methods" heading="Object Static Methods">
        <Subsection id="object-keys-values" heading="Object.keys(), values(), entries()">
          <CodeBlock language="javascript">
{`let user = {
  name: "Budi",
  age: 25,
  city: "Jakarta"
};

// Get all keys
let keys = Object.keys(user);
console.log(keys);  // ["name", "age", "city"]

// Get all values
let values = Object.values(user);
console.log(values);  // ["Budi", 25, "Jakarta"]

// Get entries (key-value pairs)
let entries = Object.entries(user);
console.log(entries);
// [["name", "Budi"], ["age", 25], ["city", "Jakarta"]]

// Iterate over object
Object.keys(user).forEach(key => {
  console.log(\`\${key}: \${user[key]}\`);
});

// With for...of
for (let [key, value] of Object.entries(user)) {
  console.log(\`\${key}: \${value}\`);
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="object-assign" heading="Object.assign()">
          <CodeBlock language="javascript">
{`// Copy object
let user = { name: "Budi", age: 25 };
let copy = Object.assign({}, user);

copy.age = 30;
console.log(user.age);  // 25 (original unchanged)
console.log(copy.age);  // 30

// Merge objects
let defaults = { theme: "dark", lang: "en" };
let userSettings = { lang: "id", fontSize: 14 };

let settings = Object.assign({}, defaults, userSettings);
console.log(settings);
// { theme: "dark", lang: "id", fontSize: 14 }

// Spread operator (modern way)
let merged = { ...defaults, ...userSettings };
console.log(merged);  // Same result`}
          </CodeBlock>
        </Subsection>

        <Subsection id="object-freeze-seal" heading="Object.freeze() & seal()">
          <CodeBlock language="javascript">
{`// Object.freeze() - Prevent any changes
let user = Object.freeze({
  name: "Budi",
  age: 25
});

user.age = 30;       // ❌ Ignored (strict mode: error)
user.city = "Jakarta";  // ❌ Ignored
delete user.name;    // ❌ Ignored

console.log(user);   // { name: "Budi", age: 25 } (unchanged)

// Object.seal() - Prevent add/delete, but allow modify
let product = Object.seal({
  name: "Laptop",
  price: 1000
});

product.price = 1200;     // OK
product.category = "Tech"; // ❌ Ignored
delete product.name;      // ❌ Ignored

console.log(product);  // { name: "Laptop", price: 1200 }

// Check if frozen/sealed
console.log(Object.isFrozen(user));    // true
console.log(Object.isSealed(product)); // true`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="json" heading="JSON (JavaScript Object Notation)">
        <p>
          JSON adalah format untuk data exchange. Similar to JavaScript objects tapi semua keys harus strings dan double-quoted.
        </p>

        <CodeBlock language="javascript">
{`// JavaScript object
let user = {
  name: "Budi",
  age: 25,
  isActive: true,
  hobbies: ["coding", "gaming"]
};

// Convert object to JSON string
let jsonString = JSON.stringify(user);
console.log(jsonString);
// '{"name":"Budi","age":25,"isActive":true,"hobbies":["coding","gaming"]}'

// Pretty print JSON
let prettyJson = JSON.stringify(user, null, 2);
console.log(prettyJson);
/*
{
  "name": "Budi",
  "age": 25,
  "isActive": true,
  "hobbies": [
    "coding",
    "gaming"
  ]
}
*/

// Parse JSON string back to object
let parsed = JSON.parse(jsonString);
console.log(parsed.name);  // "Budi"
console.log(parsed.age);   // 25

// Handle invalid JSON
try {
  let invalid = JSON.parse("{ invalid json }");
} catch (error) {
  console.log("Invalid JSON:", error.message);
}

// JSON doesn't support functions, undefined, Symbol
let obj = {
  name: "Test",
  func: function() {},  // Will be ignored
  undef: undefined,     // Will be ignored
  date: new Date()      // Converted to string
};

console.log(JSON.stringify(obj));
// '{"name":"Test","date":"2024-01-01T00:00:00.000Z"}'`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li>Use dot notation when possible: <code>user.name</code></li>
          <li>Use bracket notation for dynamic keys: <code>user[key]</code></li>
          <li>Use regular functions untuk object methods (not arrow)</li>
          <li>Use destructuring untuk extract multiple properties</li>
          <li>Use spread operator untuk copy/merge objects</li>
          <li>Use <code>const</code> untuk objects (properties can change)</li>
          <li>Check property existence dengan <code>in</code> atau <code>hasOwnProperty()</code></li>
          <li>Use optional chaining (<code>?.</code>) untuk avoid errors</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>Objects store key-value pairs (properties)</li>
          <li>Access: dot notation (<code>obj.key</code>) or bracket (<code>obj[key]</code>)</li>
          <li>Methods: functions as object properties</li>
          <li><code>this</code> refers to the object (use regular functions)</li>
          <li>Destructuring untuk extract properties</li>
          <li><code>Object.keys/values/entries()</code> untuk iteration</li>
          <li><code>Object.assign()</code> or spread untuk copy/merge</li>
          <li>JSON untuk data serialization/exchange</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
