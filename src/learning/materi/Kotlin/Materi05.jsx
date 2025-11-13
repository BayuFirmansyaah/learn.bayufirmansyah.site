import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi05() {
  return (
    <MateriLayout
      title="Functions & Lambda"
      intro="Functions adalah building blocks dari setiap program. Kotlin menjadikan functions sebagai first-class citizens dengan support untuk lambda expressions, higher-order functions, dan functional programming paradigm."
    >
      {/* Function Declaration */}
      <Section id="function-declaration" heading="Function Declaration">
        <Subsection id="basic-function" heading="Basic Functions">
          <CodeBlock language="kotlin">
{`// Function dengan return type
fun greet(name: String): String {
    return "Hello, $name!"
}

// Function tanpa return value (Unit)
fun printMessage(message: String) {
    println(message)
}

// Unit bisa dituliskan explicitly
fun printMessage2(message: String): Unit {
    println(message)
}

// Single-expression function
fun add(a: Int, b: Int): Int = a + b

// Type inference untuk single-expression
fun multiply(a: Int, b: Int) = a * b  // Return type: Int (inferred)

// Multiple parameters
fun calculateArea(width: Double, height: Double): Double {
    return width * height
}

// No parameters
fun getCurrentTime(): Long {
    return System.currentTimeMillis()
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="default-parameters" heading="Default Parameters">
          <CodeBlock language="kotlin">
{`// Default parameter values
fun greet(name: String = "Guest", greeting: String = "Hello") {
    println("$greeting, $name!")
}

greet()                        // "Hello, Guest!"
greet("John")                  // "Hello, John!"
greet("John", "Hi")            // "Hi, John!"

// Named arguments
greet(greeting = "Welcome", name = "Alice")  // "Welcome, Alice!"

// Complex example
fun createUser(
    name: String,
    age: Int = 0,
    email: String = "",
    verified: Boolean = false
): User {
    return User(name, age, email, verified)
}

val user1 = createUser("John")
val user2 = createUser("Alice", age = 25)
val user3 = createUser("Bob", email = "bob@example.com", verified = true)`}
          </CodeBlock>

          <Note type="tip">
            Default parameters mengurangi kebutuhan function overloading seperti di Java.
          </Note>
        </Subsection>

        <Subsection id="vararg" heading="Vararg Parameters">
          <CodeBlock language="kotlin">
{`// vararg untuk variable number of arguments
fun sum(vararg numbers: Int): Int {
    var total = 0
    for (num in numbers) {
        total += num
    }
    return total
}

sum(1, 2, 3)          // 6
sum(1, 2, 3, 4, 5)    // 15
sum()                 // 0

// Spread operator dengan array
val numbers = intArrayOf(1, 2, 3, 4, 5)
val result = sum(*numbers)  // Spread operator *

// vararg dengan named parameters
fun printInfo(title: String, vararg items: String, footer: String = "") {
    println("=== $title ===")
    for (item in items) {
        println("- $item")
    }
    if (footer.isNotEmpty()) {
        println("=== $footer ===")
    }
}

printInfo("Fruits", "Apple", "Banana", "Orange")
printInfo("Colors", "Red", "Green", "Blue", footer = "End of list")`}
          </CodeBlock>
        </Subsection>

        <Subsection id="extension-functions" heading="Extension Functions (Preview)">
          <CodeBlock language="kotlin">
{`// Extension function - menambah function ke existing class
fun String.isPalindrome(): Boolean {
    return this == this.reversed()
}

"radar".isPalindrome()  // true
"hello".isPalindrome()  // false

// Extension function dengan parameter
fun Int.times(action: () -> Unit) {
    repeat(this) { action() }
}

5.times { println("Hello") }  // Print "Hello" 5 kali

// More in Materi 11: Extension Functions`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Lambda Expressions */}
      <Section id="lambda" heading="Lambda Expressions">
        <p>
          Lambda expressions adalah anonymous functions yang bisa dipassing sebagai values. 
          Kotlin memiliki concise syntax untuk lambdas yang membuat functional programming elegant.
        </p>

        <Subsection id="lambda-syntax" heading="Lambda Syntax">
          <CodeBlock language="kotlin">
{`// Basic lambda syntax
val sum = { a: Int, b: Int -> a + b }
println(sum(5, 3))  // 8

// Lambda tanpa parameter
val greet = { println("Hello!") }
greet()  // "Hello!"

// Lambda dengan single parameter (it)
val double = { x: Int -> x * 2 }
val doubleShort = { it: Int -> it * 2 }  // Using 'it'

val numbers = listOf(1, 2, 3, 4, 5)
numbers.forEach { println(it) }  // 'it' adalah implicit parameter

// Lambda dengan multiple statements
val calculate = { a: Int, b: Int ->
    val sum = a + b
    val product = a * b
    println("Sum: $sum, Product: $product")
    sum  // Last expression adalah return value
}

// Type inference
val multiply: (Int, Int) -> Int = { a, b -> a * b }
// Atau
val divide = { a: Int, b: Int -> a / b }`}
          </CodeBlock>
        </Subsection>

        <Subsection id="lambda-collections" heading="Lambda dengan Collections">
          <CodeBlock language="kotlin">
{`val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

// map - transform elements
val doubled = numbers.map { it * 2 }
// [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

// filter - select elements
val evens = numbers.filter { it % 2 == 0 }
// [2, 4, 6, 8, 10]

// forEach - perform action
numbers.forEach { println("Number: $it") }

// any - check if any element matches
val hasNegative = numbers.any { it < 0 }  // false

// all - check if all elements match
val allPositive = numbers.all { it > 0 }  // true

// find - find first matching element
val firstEven = numbers.find { it % 2 == 0 }  // 2

// reduce - accumulate
val sum = numbers.reduce { acc, num -> acc + num }  // 55

// fold - accumulate dengan initial value
val product = numbers.fold(1) { acc, num -> acc * num }

// Chaining operations
val result = numbers
    .filter { it % 2 == 0 }
    .map { it * it }
    .sum()  // 220 (2²+4²+6²+8²+10²)`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Higher-Order Functions */}
      <Section id="higher-order" heading="Higher-Order Functions">
        <p>
          Higher-order functions adalah functions yang menerima functions sebagai parameters 
          atau return functions. Ini adalah core concept dari functional programming.
        </p>

        <Subsection id="function-as-parameter" heading="Function sebagai Parameter">
          <CodeBlock language="kotlin">
{`// Function type sebagai parameter
fun calculate(a: Int, b: Int, operation: (Int, Int) -> Int): Int {
    return operation(a, b)
}

// Usage
val sum = calculate(5, 3) { x, y -> x + y }        // 8
val product = calculate(5, 3) { x, y -> x * y }    // 15
val max = calculate(5, 3) { x, y -> if (x > y) x else y }  // 5

// Real-world example: custom filter
fun filterList(
    list: List<Int>,
    predicate: (Int) -> Boolean
): List<Int> {
    val result = mutableListOf<Int>()
    for (item in list) {
        if (predicate(item)) {
            result.add(item)
        }
    }
    return result
}

val numbers = listOf(1, 2, 3, 4, 5, 6)
val evens = filterList(numbers) { it % 2 == 0 }
val greaterThan3 = filterList(numbers) { it > 3 }`}
          </CodeBlock>
        </Subsection>

        <Subsection id="function-return" heading="Returning Functions">
          <CodeBlock language="kotlin">
{`// Function yang return function
fun createMultiplier(factor: Int): (Int) -> Int {
    return { number -> number * factor }
}

val double = createMultiplier(2)
val triple = createMultiplier(3)

println(double(5))  // 10
println(triple(5))  // 15

// Closure - lambda dapat access variables dari outer scope
fun createCounter(): () -> Int {
    var count = 0
    return { ++count }
}

val counter = createCounter()
println(counter())  // 1
println(counter())  // 2
println(counter())  // 3`}
          </CodeBlock>
        </Subsection>

        <Subsection id="trailing-lambda" heading="Trailing Lambda Syntax">
          <CodeBlock language="kotlin">
{`// Jika lambda adalah last parameter, bisa ditulis di luar ()
numbers.filter { it > 5 }
// Sama dengan:
numbers.filter({ it > 5 })

// Multiple parameters dengan trailing lambda
fun repeatAction(times: Int, action: () -> Unit) {
    repeat(times) { action() }
}

repeatAction(5) {
    println("Hello")
}

// Jika lambda adalah only parameter, () bisa dihilangkan
listOf(1, 2, 3).forEach { println(it) }
// Tidak perlu: listOf(1, 2, 3).forEach({ println(it) })`}
          </CodeBlock>

          <Note type="tip">
            Trailing lambda syntax membuat DSL (Domain Specific Language) creation lebih readable.
          </Note>
        </Subsection>
      </Section>

      {/* Anonymous Functions */}
      <Section id="anonymous-functions" heading="Anonymous Functions">
        <CodeBlock language="kotlin">
{`// Anonymous function - alternative untuk lambda dengan explicit return type
val sum = fun(a: Int, b: Int): Int {
    return a + b
}

// Anonymous function dengan type inference
val multiply = fun(a: Int, b: Int) = a * b

// Useful ketika perlu multiple return points
val validate = fun(input: String): Boolean {
    if (input.isEmpty()) return false
    if (input.length < 3) return false
    return true
}

// Sebagai parameter
numbers.filter(fun(n: Int): Boolean {
    return n % 2 == 0
})`}
        </CodeBlock>
      </Section>

      {/* Inline Functions */}
      <Section id="inline-functions" heading="Inline Functions">
        <CodeBlock language="kotlin">
{`// inline untuk menghindari lambda object creation overhead
inline fun measureTime(block: () -> Unit) {
    val start = System.currentTimeMillis()
    block()
    val end = System.currentTimeMillis()
    println("Time: \${end - start}ms")
}

measureTime {
    // Some expensive operation
    repeat(1000000) { /* work */ }
}

// noinline untuk parameter tertentu
inline fun foo(inlined: () -> Unit, noinline notInlined: () -> Unit) {
    inlined()
    notInlined()
}

// crossinline untuk non-local returns
inline fun runInThread(crossinline block: () -> Unit) {
    Thread {
        block()  // Cannot do non-local return here
    }.start()
}`}
        </CodeBlock>
      </Section>

      {/* Function References */}
      <Section id="function-references" heading="Function References">
        <CodeBlock language="kotlin">
{`// Reference ke function dengan ::
fun isEven(n: Int): Boolean = n % 2 == 0

val numbers = listOf(1, 2, 3, 4, 5, 6)
val evens = numbers.filter(::isEven)  // Reference ke function

// Reference ke member function
class Person(val name: String) {
    fun greet() = "Hello, I'm $name"
}

val people = listOf(Person("Alice"), Person("Bob"))
val greetings = people.map(Person::greet)

// Reference ke constructor
data class User(val name: String, val age: Int)

val names = listOf("Alice", "Bob", "Charlie")
// Cannot directly map to constructor with different arity
// But can use lambda
val users = names.map { User(it, 0) }

// Reference ke extension function
fun String.toUpperCase() = this.uppercase()
val upperCased = names.map(String::toUpperCase)`}
        </CodeBlock>
      </Section>

      {/* Scope Functions */}
      <Section id="scope-functions" heading="Scope Functions">
        <p>
          Kotlin menyediakan scope functions: <code>let</code>, <code>run</code>, <code>with</code>, 
          <code>apply</code>, dan <code>also</code> untuk execute code blocks dalam context of an object.
        </p>

        <Subsection id="let-function" heading="let">
          <CodeBlock language="kotlin">
{`// let - execute lambda dan return result, use 'it' for context
val name: String? = "John"
val length = name?.let {
    println("Name: $it")
    it.length  // Return value
}  // length = 5

// Chaining dengan let
val result = "Hello"
    .let { it.uppercase() }
    .let { "$it World" }
    .let { it.length }  // 11

// let untuk null safety
fun processUser(user: User?) {
    user?.let {
        println("Processing user: \${it.name}")
        saveToDatabase(it)
    }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="run-function" heading="run">
          <CodeBlock language="kotlin">
{`// run - execute lambda dan return result, use 'this' for context
val message = run {
    val firstName = "John"
    val lastName = "Doe"
    "$firstName $lastName"  // Return value
}

// run dengan receiver
val person = Person("Alice").run {
    age = 25
    email = "alice@example.com"
    this  // Return Person object
}

// run untuk initialization
val config = Configuration().run {
    host = "localhost"
    port = 8080
    timeout = 30
    this
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="with-function" heading="with">
          <CodeBlock language="kotlin">
{`// with - execute lambda pada object, return result
val person = Person("Bob", 30)

val description = with(person) {
    """
        Name: $name
        Age: $age
        Birth year: \${2024 - age}
    """.trimIndent()
}

// with untuk multiple operations
with(StringBuilder()) {
    append("Hello")
    append(" ")
    append("World")
    toString()
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="apply-function" heading="apply">
          <CodeBlock language="kotlin">
{`// apply - configure object dan return object itself
val person = Person("Charlie").apply {
    age = 35
    email = "charlie@example.com"
    phone = "123-456"
}

// apply untuk object initialization
val intent = Intent().apply {
    action = Intent.ACTION_VIEW
    data = Uri.parse("https://example.com")
    flags = Intent.FLAG_ACTIVITY_NEW_TASK
}

// apply dengan builder pattern
val user = User.Builder()
    .apply {
        setName("Alice")
        setAge(25)
        setEmail("alice@example.com")
    }
    .build()`}
          </CodeBlock>
        </Subsection>

        <Subsection id="also-function" heading="also">
          <CodeBlock language="kotlin">
{`// also - perform side effects dan return object itself
val numbers = mutableListOf(1, 2, 3)
    .also { println("Initial: $it") }
    .also { it.add(4) }
    .also { println("After add: $it") }

// also untuk logging
fun createUser(name: String): User {
    return User(name).also {
        println("User created: \${it.name}")
        logToAnalytics("user_created", it.id)
    }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="scope-comparison" heading="Scope Functions Comparison">
          <CodeBlock language="kotlin">
{`// Context reference: 'this' vs 'it'
// Return value: context object vs lambda result

// let - it, lambda result
val result = "Hello".let { it.length }  // 5

// run - this, lambda result  
val result2 = "Hello".run { length }  // 5

// with - this, lambda result
val result3 = with("Hello") { length }  // 5

// apply - this, context object
val result4 = "Hello".apply { println(length) }  // "Hello"

// also - it, context object
val result5 = "Hello".also { println(it.length) }  // "Hello"`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Kesimpulan */}
      <Section id="conclusion" heading="Kesimpulan">
        <p>
          Dalam materi ini, kita telah mempelajari functions dan lambda expressions di Kotlin:
        </p>

        <ul>
          <li>✅ Function declarations dengan default parameters dan vararg</li>
          <li>✅ Lambda expressions dengan concise syntax</li>
          <li>✅ Higher-order functions untuk functional programming</li>
          <li>✅ Function references dengan <code>::</code> operator</li>
          <li>✅ Scope functions: let, run, with, apply, also</li>
        </ul>

        <Note type="success">
          <strong>Key Takeaways:</strong>
          <ul>
            <li>Functions adalah first-class citizens di Kotlin</li>
            <li>Lambda expressions membuat functional programming elegant</li>
            <li>Higher-order functions enable powerful abstractions</li>
            <li>Scope functions simplify common patterns</li>
          </ul>
        </Note>

        <p>
          Di materi selanjutnya, kita akan belajar <strong>OOP Basics</strong>: 
          classes, objects, properties, methods, dan constructors di Kotlin.
        </p>
      </Section>
    </MateriLayout>
  );
}
