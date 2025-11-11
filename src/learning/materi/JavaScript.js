// Materi JavaScript - 13 Materi Lengkap Best Practice

export const materiList = [
  {
    title: "Pengenalan JavaScript",
    content: `JavaScript adalah bahasa pemrograman yang awalnya dibuat untuk membuat website interaktif. Sekarang JavaScript digunakan di mana-mana: frontend, backend (Node.js), mobile (React Native), desktop (Electron).

JavaScript adalah bahasa interpreted, artinya kode dijalankan langsung oleh browser atau runtime environment tanpa compile terlebih dahulu. Dynamically typed, artinya tipe variable ditentukan saat runtime.

JavaScript berjalan di browser dengan JavaScript engine: V8 (Chrome), SpiderMonkey (Firefox), JavaScriptCore (Safari). Node.js menggunakan V8 engine untuk run JavaScript di server.

ECMAScript adalah standard specification untuk JavaScript. ES6 (ES2015) introduce banyak features modern yang membuat JavaScript lebih powerful dan readable.

JavaScript mendukung multiple programming paradigms: imperative, object-oriented, functional. Flexible dan expressive, tapi juga easy to make mistakes tanpa best practices.

Kelebihan: ubiquitous (everywhere), huge ecosystem (npm), active community, constant evolution. Essential skill untuk web development modern.`,
    keypoints: [
      "Bahasa untuk web interactivity, now everywhere",
      "Interpreted, dynamically typed",
      "Runs di browser (V8, SpiderMonkey) dan server (Node.js)",
      "ECMAScript adalah standard, ES6 modern features",
      "Multi-paradigm: imperative, OOP, functional",
      "Huge ecosystem dan active community"
    ]
  },
  {
    title: "Variabel, Tipe Data, Operator",
    content: `Variable di JavaScript declare dengan var, let, atau const. Var adalah old way (function-scoped), let dan const adalah modern (block-scoped).

Let untuk variable yang akan berubah: let age = 25; age = 26. Const untuk constant: const name = "John". Best practice: gunakan const by default, let jika perlu reassign.

Tipe data primitive: Number (1, 3.14), String ("hello"), Boolean (true/false), undefined (tidak ada value), null (intentional empty), Symbol (unique identifier), BigInt (large numbers).

Tipe data reference: Object {name: "John"}, Array [1, 2, 3], Function. Reference types stored by reference, primitives by value.

Type coercion: JavaScript automatic convert types: "5" + 1 = "51" (string), "5" - 1 = 4 (number). Use === (strict equality) untuk avoid coercion issues.

Operators: arithmetic (+, -, *, /, %), comparison (==, ===, !=, !==, >, <), logical (&&, ||, !), assignment (=, +=, -=), ternary (condition ? true : false).`,
    keypoints: [
      "Var (old), let (mutable), const (immutable)",
      "Primitives: Number, String, Boolean, undefined, null",
      "Reference types: Object, Array, Function",
      "Type coercion, gunakan === untuk strict equality",
      "Operators: arithmetic, comparison, logical",
      "Best practice: const by default, let jika perlu"
    ]
  },
  {
    title: "Function & Scope",
    content: `Function adalah reusable code blocks. Declare dengan keyword function atau arrow function syntax (ES6).

Function declaration: function greet(name) { return "Hello, " + name; }. Hoisted, bisa call sebelum declaration.

Function expression: const greet = function(name) { return "Hello, " + name; }. Not hoisted. Arrow function: const greet = (name) => "Hello, " + name. Concise syntax.

Parameters dan arguments: function sum(a, b) { return a + b; }. Default parameters: function greet(name = "Guest") { }. Rest parameters: function sum(...numbers) { }.

Scope: global scope (accessible everywhere), function scope (var), block scope (let/const). Inner functions access outer scope (closure).

Closure adalah function yang remember outer scope. Example: function outer() { let count = 0; return function() { count++; return count; }; }. Powerful untuk encapsulation.

Higher-order functions: functions yang receive atau return functions. Array methods: map, filter, reduce adalah higher-order functions.`,
    keypoints: [
      "Declaration vs expression vs arrow function",
      "Arrow function: concise, lexical this",
      "Default params, rest params (...args)",
      "Scope: global, function, block",
      "Closure: function remember outer scope",
      "Higher-order functions: receive/return functions"
    ]
  },
  {
    title: "Array & Object",
    content: `Array dan Object adalah data structures fundamental di JavaScript. Array untuk ordered collections, Object untuk key-value pairs.

Array: const arr = [1, 2, 3]. Access: arr[0]. Length: arr.length. Array methods: push (add end), pop (remove end), shift (remove start), unshift (add start).

Array iteration: for (let i = 0; i < arr.length; i++). Modern: forEach, map, filter, reduce, find. Map: arr.map(x => x * 2). Filter: arr.filter(x => x > 2).

Object: const person = {name: "John", age: 25}. Access: person.name atau person["name"]. Add property: person.email = "john@example.com".

Object methods: Object.keys(obj) return keys array. Object.values(obj) return values. Object.entries(obj) return [key, value] pairs. Useful untuk iteration.

Destructuring: const {name, age} = person extract properties. Array: const [first, second] = arr. Spread operator: const newArr = [...arr, 4, 5]. Clone dan merge.

Object shorthand: const name = "John"; const person = {name}; equivalent {name: name}. Method shorthand: {greet() {}} equivalent {greet: function() {}}.`,
    keypoints: [
      "Array: ordered collection, methods (push, pop, map, filter)",
      "Object: key-value pairs, dot/bracket notation",
      "Modern iteration: forEach, map, filter, reduce",
      "Object methods: keys, values, entries",
      "Destructuring untuk extract values",
      "Spread operator untuk clone/merge"
    ]
  },
  {
    title: "Loop & Conditional",
    content: `Control flow mengatur alur program. Conditional untuk decisions, loops untuk repetition.

If statement: if (condition) { } else if (condition) { } else { }. Ternary: const result = condition ? valueIfTrue : valueIfFalse. More concise untuk simple conditions.

Switch statement: switch(value) { case 1: break; case 2: break; default: }. Alternative untuk multiple if-else. Don't forget break.

For loop: for (let i = 0; i < 10; i++) { }. Classic loop dengan counter. For...of untuk iterate arrays: for (const item of array) { }.

For...in untuk iterate object keys: for (const key in object) { }. Warning: iterates prototype chain, check hasOwnProperty if needed.

While loop: while (condition) { }. Do-while: do { } while (condition). Difference: do-while execute at least once.

Break untuk exit loop early. Continue untuk skip iteration. Label untuk nested loops: outer: for() { for() { break outer; } }.`,
    keypoints: [
      "If/else, ternary operator untuk conditions",
      "Switch untuk multiple cases",
      "For loop: classic, for...of (arrays), for...in (objects)",
      "While, do-while loops",
      "Break (exit loop), continue (skip iteration)",
      "Best practice: choose appropriate loop type"
    ]
  },
  {
    title: "ES6 Modern JavaScript (let, const, arrow func, destructuring)",
    content: `ES6 (ES2015) introduce features yang membuat JavaScript modern, readable, dan powerful. Essential untuk modern JavaScript development.

Let dan const untuk block-scoped variables. Const untuk immutability (reference, bukan value). Prefer const, use let jika reassign needed.

Arrow functions: const add = (a, b) => a + b. Concise syntax. Implicit return untuk single expression. Lexical this binding: arrow functions tidak bind this sendiri.

Template literals dengan backticks: const message = \`Hello, \${name}\`. String interpolation. Multiline strings tanpa concat. Embedded expressions.

Destructuring untuk extract values: const {name, age} = person. Array: const [first, second] = arr. Default values: const {name = "Guest"} = person.

Spread operator: const newArr = [...arr1, ...arr2] merge arrays. Clone: const copy = [...original]. Rest in destructuring: const {name, ...rest} = person.

Default parameters: function greet(name = "Guest") { }. Clean dan readable dibanding old way dengan || operator.`,
    keypoints: [
      "Let/const untuk block scope, prefer const",
      "Arrow functions: concise, lexical this",
      "Template literals: \`Hello, \${name}\`",
      "Destructuring: extract dari object/array",
      "Spread operator: clone, merge",
      "Default parameters untuk function arguments"
    ]
  },
  {
    title: "DOM Manipulation",
    content: `DOM (Document Object Model) adalah representation HTML document sebagai tree of objects. JavaScript manipulate DOM untuk update UI.

Select elements: document.getElementById("id"), document.querySelector(".class"), document.querySelectorAll("div"). QuerySelector use CSS selectors, more flexible.

Access content: element.textContent (text only), element.innerHTML (HTML content). Set: element.textContent = "New text". Be careful dengan innerHTML (XSS risk).

Modify attributes: element.setAttribute("class", "active"), element.getAttribute("class"). Direct property: element.className, element.id, element.src.

Modify styles: element.style.color = "red", element.style.fontSize = "20px". CSS properties in camelCase. Add class: element.classList.add("active"), remove, toggle.

Create elements: const div = document.createElement("div"). Set content: div.textContent = "Hello". Append: parent.appendChild(div). Modern: parent.append(div).

Remove elements: element.remove(). Modern dan simple. Old way: parent.removeChild(element).`,
    keypoints: [
      "DOM: tree representation of HTML",
      "Select: getElementById, querySelector, querySelectorAll",
      "Content: textContent, innerHTML (careful XSS)",
      "Attributes: setAttribute, getAttribute",
      "Styles: element.style, classList (add/remove/toggle)",
      "Create/append/remove elements"
    ]
  },
  {
    title: "Event Listener",
    content: `Events adalah actions yang terjadi di browser: click, hover, keyboard input, form submit. JavaScript listen dan respond to events.

Add event listener: element.addEventListener("click", function() { }). Event type: click, mouseover, mouseout, keydown, keyup, submit, load, dll.

Event handler function: function handleClick(event) { console.log(event.target); }. Event object berisi info tentang event: target (element), type, timestamp, dll.

Remove event listener: element.removeEventListener("click", handleClick). Harus reference same function, jadi tidak bisa anonymous function.

Event bubbling: events bubble up from target ke parents. Stop bubbling: event.stopPropagation(). Prevent default action: event.preventDefault() (untuk form submit, link click).

Event delegation: attach listener ke parent instead of many children. Check event.target untuk determine which child clicked. Efficient untuk dynamic content.

Common events: click, dblclick, mouseenter, mouseleave, keydown, keypress, keyup, change, input, submit, load, DOMContentLoaded.`,
    keypoints: [
      "Events: actions di browser (click, keydown, submit)",
      "addEventListener untuk listen events",
      "Event object: target, type, preventDefault",
      "Remove listener: removeEventListener",
      "Event bubbling, stopPropagation",
      "Event delegation untuk efficiency"
    ]
  },
  {
    title: "Async JS (Callback, Promise, Async-Await)",
    content: `JavaScript adalah single-threaded tapi dapat handle asynchronous operations. Ini penting untuk operations seperti API calls, file reading, timers.

Callback adalah function passed sebagai argument dan executed later. Example: setTimeout(() => console.log("Done"), 1000). Callback hell: nested callbacks sulit dibaca.

Promise adalah object representing eventual completion or failure of async operation. States: pending, fulfilled, rejected.

Promise usage: fetch(url).then(response => response.json()).then(data => console.log(data)).catch(error => console.error(error)).

Create promise: new Promise((resolve, reject) => { if (success) resolve(value); else reject(error); }). Resolve untuk success, reject untuk error.

Async/await adalah syntactic sugar untuk promises. Make async code look synchronous: async function fetchData() { const response = await fetch(url); const data = await response.json(); return data; }.

Error handling dengan try-catch: try { const data = await fetchData(); } catch (error) { console.error(error); }. Clean dan readable.`,
    keypoints: [
      "Callback: function executed later, callback hell issue",
      "Promise: object untuk async operations",
      "Promise states: pending, fulfilled, rejected",
      "Then/catch untuk handle promise",
      "Async/await: syntactic sugar, look synchronous",
      "Try-catch untuk error handling dalam async/await"
    ]
  },
  {
    title: "Fetch API",
    content: `Fetch API adalah modern way untuk make HTTP requests di JavaScript. Replace XMLHttpRequest, lebih clean dan promise-based.

Basic GET request: fetch(url).then(response => response.json()).then(data => console.log(data)).catch(error => console.error(error)).

Response object methods: response.json() untuk JSON, response.text() untuk text, response.blob() untuk binary data. Check success: response.ok (true untuk status 200-299).

POST request: fetch(url, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({name: "John"})}).then(response => response.json()).

Headers: const headers = new Headers(); headers.append("Authorization", "Bearer token"). Atau object: {headers: {"Authorization": "Bearer token"}}.

Error handling: fetch only rejects pada network errors, tidak HTTP errors. Check response.ok atau response.status untuk handle HTTP errors properly.

Async/await dengan fetch: async function getData() { const response = await fetch(url); if (!response.ok) throw new Error("HTTP error"); const data = await response.json(); return data; }.`,
    keypoints: [
      "Modern API untuk HTTP requests, promise-based",
      "GET: fetch(url).then(res => res.json())",
      "POST: method, headers, body di options object",
      "Response methods: json(), text(), blob()",
      "Check response.ok untuk success",
      "Error handling: network errors only, check response.ok"
    ]
  },
  {
    title: "Modul JS",
    content: `JavaScript modules memungkinkan organize code dalam separate files dan reuse. ES6 modules adalah standard, supported di modern browsers dan Node.js.

Export: export const name = "John". Export function: export function greet() { }. Default export: export default function() { }. One default per file.

Import named exports: import {name, greet} from "./module.js". Import default: import greet from "./module.js". Import all: import * as utils from "./utils.js".

Module scope: variables di module tidak global. Must explicitly export untuk access dari outside. Prevent global namespace pollution.

Dynamic import untuk lazy loading: const module = await import("./module.js"). Return promise. Useful untuk code splitting.

CommonJS modules (Node.js old style): module.exports = {}. Import: const module = require("./module"). Still used banyak packages, tapi ES6 modules preferred.

Browser support: type="module" di script tag: <script type="module" src="app.js"></script>. Enable modules dalam browser.`,
    keypoints: [
      "Modules untuk organize dan reuse code",
      "Export: named (export const) dan default (export default)",
      "Import: named ({name}), default, all (*)",
      "Module scope: prevent global pollution",
      "Dynamic import untuk lazy loading",
      "Browser: type='module' di script tag"
    ]
  },
  {
    title: "Bundler (Vite / Webpack)",
    content: `Bundler adalah tools yang process dan bundle JavaScript modules untuk production. Transform, minify, optimize code untuk better performance.

Vite adalah modern build tool: sangat cepat (native ES modules dalam dev), simple config, built-in features (TypeScript, JSX, CSS preprocessors).

Install Vite: npm create vite@latest. Choose template (vanilla, react, vue, dll). npm install && npm run dev untuk start dev server.

Vite dev server: instant server start, HMR (Hot Module Replacement) sangat cepat. Build: npm run build generate optimized production bundle.

Webpack adalah mature bundler dengan ecosystem besar. More config required tapi sangat customizable. Loaders untuk process different file types, plugins untuk extend functionality.

Webpack basic: webpack.config.js define entry, output, module rules (loaders), plugins. Learning curve steeper tapi powerful untuk complex needs.

Best practice: Vite untuk most projects (fast, simple). Webpack untuk complex customization needs. Both handle bundling, transpiling, code splitting, tree shaking.`,
    keypoints: [
      "Bundler: process modules untuk production",
      "Vite: modern, fast, simple config",
      "Vite: HMR sangat cepat, built-in features",
      "Webpack: mature, customizable, steeper learning curve",
      "Features: bundling, transpiling, code splitting",
      "Best practice: Vite untuk most projects"
    ]
  },
  {
    title: "Best Practice JavaScript Clean Code",
    content: `Clean code adalah code yang readable, maintainable, dan efficient. Follow best practices membuat code professional dan sustainable.

Naming: meaningful names untuk variables dan functions. camelCase untuk variables/functions, PascalCase untuk classes. Avoid single letters kecuali loops.

Functions: keep functions small dan focused (single responsibility). Function name harus describe what it does. Max parameters 2-3, use object untuk more.

DRY (Don't Repeat Yourself): avoid duplication. Extract repeated code into functions. Reusable dan easier to maintain.

Const by default: use const untuk variables yang tidak reassign. Only use let jika value changes. Avoid var completely.

Modern syntax: use ES6+ features (arrow functions, destructuring, template literals, spread operator). More concise dan readable.

Error handling: always handle errors dengan try-catch atau .catch(). Provide meaningful error messages. Don't silently fail.

Comments: code should be self-explanatory. Comments untuk why, bukan what. Update comments ketika code changes. Remove commented-out code.`,
    keypoints: [
      "Meaningful names: camelCase, PascalCase",
      "Small focused functions: single responsibility",
      "DRY: avoid duplication, extract reusable code",
      "Const by default, let jika perlu, no var",
      "Use modern ES6+ syntax",
      "Always handle errors properly",
      "Self-explanatory code, comments untuk 'why'"
    ]
  }
];
