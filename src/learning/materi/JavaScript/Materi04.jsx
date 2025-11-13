import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi04() {
  return (
    <MateriLayout
      title="Control Flow"
      intro="Master control flow di JavaScript - if/else, switch, loops (for, while, do-while), break, continue untuk control program execution."
    >
      <Section id="if-else" heading="if/else Statements">
        <Subsection id="if" heading="if Statement">
          <CodeBlock language="javascript">
{`let age = 20;

// Basic if
if (age >= 18) {
  console.log("You are an adult");
}

// if with block
if (age >= 18) {
  console.log("You can vote");
  console.log("You can drive");
}

// Single line (not recommended)
if (age >= 18) console.log("Adult");`}
          </CodeBlock>
        </Subsection>

        <Subsection id="if-else" heading="if...else">
          <CodeBlock language="javascript">
{`let age = 15;

if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}

// Practical example
let temperature = 30;

if (temperature > 30) {
  console.log("It's hot!");
} else {
  console.log("It's nice");
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="else-if" heading="else if">
          <CodeBlock language="javascript">
{`let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else if (score >= 70) {
  console.log("Grade: C");
} else if (score >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}

// Multiple conditions
let age = 25;
let hasLicense = true;

if (age >= 18 && hasLicense) {
  console.log("Can drive");
} else if (age >= 18 && !hasLicense) {
  console.log("Get a license first");
} else {
  console.log("Too young");
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="nested-if" heading="Nested if">
          <CodeBlock language="javascript">
{`let age = 25;
let hasLicense = true;
let hasCar = true;

if (age >= 18) {
  if (hasLicense) {
    if (hasCar) {
      console.log("Can drive your car");
    } else {
      console.log("Can drive, but need to rent");
    }
  } else {
    console.log("Get a license first");
  }
} else {
  console.log("Too young to drive");
}

// Better: flatten with && operators
if (age >= 18 && hasLicense && hasCar) {
  console.log("Can drive your car");
} else if (age >= 18 && hasLicense) {
  console.log("Can drive, but need to rent");
} else if (age >= 18) {
  console.log("Get a license first");
} else {
  console.log("Too young to drive");
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="switch" heading="switch Statement">
        <p>
          Alternative untuk multiple if-else. Better untuk checking single variable terhadap many values.
        </p>

        <CodeBlock language="javascript">
{`let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Start of work week");
    break;
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
    console.log("Midweek");
    break;
  case "Friday":
    console.log("Almost weekend!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("Weekend!");
    break;
  default:
    console.log("Invalid day");
}

// Without break (falls through)
let grade = "B";

switch (grade) {
  case "A":
    console.log("Excellent!");
    // Falls through to next case
  case "B":
    console.log("Good job!");
    // Falls through
  case "C":
    console.log("Passed");
    break;
  case "D":
  case "F":
    console.log("Failed");
    break;
}

// Using expressions in cases
let age = 25;

switch (true) {
  case age < 13:
    console.log("Child");
    break;
  case age < 18:
    console.log("Teen");
    break;
  case age < 65:
    console.log("Adult");
    break;
  default:
    console.log("Senior");
}`}
        </CodeBlock>

        <Note type="warning">
          <strong>Important:</strong> Always add <code>break</code> statement unless you want fall-through behavior.
        </Note>
      </Section>

      <Section id="for-loop" heading="for Loop">
        <p>
          Loop untuk repeat code a specific number of times.
        </p>

        <Subsection id="basic-for" heading="Basic for Loop">
          <CodeBlock language="javascript">
{`// Syntax: for (initialization; condition; increment)
for (let i = 0; i < 5; i++) {
  console.log(i);  // 0, 1, 2, 3, 4
}

// Count backwards
for (let i = 5; i > 0; i--) {
  console.log(i);  // 5, 4, 3, 2, 1
}

// Step by 2
for (let i = 0; i <= 10; i += 2) {
  console.log(i);  // 0, 2, 4, 6, 8, 10
}

// Loop through array
let fruits = ["Apple", "Banana", "Orange"];

for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Nested loops
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(\`i=\${i}, j=\${j}\`);
  }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="for-of" heading="for...of Loop (ES6)">
          <p>
            Loop through iterable objects (arrays, strings, maps, sets).
          </p>

          <CodeBlock language="javascript">
{`// Loop through array
let fruits = ["Apple", "Banana", "Orange"];

for (let fruit of fruits) {
  console.log(fruit);
}

// Loop through string
let name = "Budi";

for (let char of name) {
  console.log(char);  // B, u, d, i
}

// With index using entries()
for (let [index, fruit] of fruits.entries()) {
  console.log(\`\${index}: \${fruit}\`);
}

// Loop through Set
let numbers = new Set([1, 2, 3, 4, 5]);

for (let num of numbers) {
  console.log(num);
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="for-in" heading="for...in Loop">
          <p>
            Loop through object properties (keys).
          </p>

          <CodeBlock language="javascript">
{`let user = {
  name: "Budi",
  age: 25,
  city: "Jakarta"
};

// Loop through object keys
for (let key in user) {
  console.log(key);          // name, age, city
  console.log(user[key]);    // Budi, 25, Jakarta
}

// Loop through array indices (not recommended)
let fruits = ["Apple", "Banana", "Orange"];

for (let index in fruits) {
  console.log(index);        // "0", "1", "2" (strings!)
  console.log(fruits[index]); // Apple, Banana, Orange
}

// Better: use for...of for arrays
for (let fruit of fruits) {
  console.log(fruit);
}`}
          </CodeBlock>

          <Note type="warning">
            For arrays, use <code>for...of</code> instead of <code>for...in</code>. <code>for...in</code> is for objects.
          </Note>
        </Subsection>
      </Section>

      <Section id="while-loop" heading="while Loop">
        <p>
          Loop yang runs selama condition is true.
        </p>

        <CodeBlock language="javascript">
{`// Basic while loop
let count = 0;

while (count < 5) {
  console.log(count);
  count++;
}

// User input example (conceptual)
let password = "";

while (password !== "secret") {
  password = prompt("Enter password:");
}
console.log("Access granted!");

// Infinite loop (be careful!)
// while (true) {
//   console.log("This runs forever!");
// }

// Loop with break
let i = 0;

while (true) {
  console.log(i);
  i++;
  
  if (i >= 5) {
    break;  // Exit loop
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="do-while" heading="do...while Loop">
        <p>
          Like while, but always executes at least once (checks condition after).
        </p>

        <CodeBlock language="javascript">
{`// Runs at least once
let count = 0;

do {
  console.log(count);  // Executes once
  count++;
} while (count < 5);

// Difference from while
let x = 10;

// while - doesn't execute
while (x < 5) {
  console.log("while:", x);  // Not executed
}

// do-while - executes once
do {
  console.log("do-while:", x);  // Executed once!
} while (x < 5);

// Practical use: validation
let input;

do {
  input = prompt("Enter a number between 1-10:");
} while (input < 1 || input > 10);`}
        </CodeBlock>
      </Section>

      <Section id="break-continue" heading="break & continue">
        <Subsection id="break" heading="break Statement">
          <p>
            Exits loop immediately.
          </p>

          <CodeBlock language="javascript">
{`// Exit loop early
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;  // Stop at 5
  }
  console.log(i);  // 0, 1, 2, 3, 4
}

// Find item in array
let numbers = [1, 3, 5, 7, 9, 11];
let target = 7;
let found = false;

for (let num of numbers) {
  if (num === target) {
    found = true;
    break;  // Stop searching
  }
}

console.log(found ? "Found : "Not found");

// Break in nested loop (only breaks inner loop)
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) {
      break;  // Only breaks inner loop
    }
    console.log(\`i=\${i}, j=\${j}\`);
  }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="continue" heading="continue Statement">
          <p>
            Skips current iteration, continues to next iteration.
          </p>

          <CodeBlock language="javascript">
{`// Skip certain values
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue;  // Skip even numbers
  }
  console.log(i);  // 1, 3, 5, 7, 9
}

// Skip invalid items
let numbers = [1, -5, 3, -2, 8, -1, 10];

for (let num of numbers) {
  if (num < 0) {
    continue;  // Skip negative numbers
  }
  console.log(num);  // 1, 3, 8, 10
}

// Process only valid data
let users = [
  { name: "Budi", age: 25 },
  { name: "Ani", age: null },
  { name: "Charlie", age: 30 }
];

for (let user of users) {
  if (!user.age) {
    continue;  // Skip users without age
  }
  console.log(\`\${user.name} is \${user.age} years old\`);
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li> Use <code>for...of</code> untuk arrays (cleaner)</li>
          <li> Use <code>for...in</code> untuk objects</li>
          <li> Traditional <code>for</code> ketika butuh index</li>
          <li> Always add <code>break</code> in switch cases</li>
          <li> Avoid deeply nested loops (bad performance)</li>
          <li> Use <code>break</code> untuk exit early (optimization)</li>
          <li> Use <code>continue</code> untuk skip invalid data</li>
          <li> Be careful dengan infinite loops</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li> if/else untuk conditional execution</li>
          <li> switch untuk multiple conditions on single value</li>
          <li> for loop untuk fixed iterations</li>
          <li> for...of untuk iterate arrays/iterables</li>
          <li> for...in untuk iterate object properties</li>
          <li> while loop untuk condition-based looping</li>
          <li> do...while untuk at-least-once execution</li>
          <li> break untuk exit loop, continue untuk skip iteration</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
