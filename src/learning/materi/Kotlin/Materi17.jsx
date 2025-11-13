import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi17() {
  return (
    <MateriLayout
      title="Best Practices & Idioms"
      intro="Pelajari Kotlin best practices, coding conventions, dan idiomatic patterns untuk menulis clean, maintainable, dan efficient Kotlin code."
    >
      <Section id="naming" heading="Naming Conventions">
        <CodeBlock language="kotlin">
{`// Classes & Objects - PascalCase
class UserRepository
object DatabaseConfig

// Functions & Variables - camelCase
fun calculateTotal()
val userName = "John"

// Constants - UPPER_SNAKE_CASE
const val MAX_USERS = 100
const val API_BASE_URL = "https://api.example.com"

// Package names - lowercase
package com.example.myapp.utils

// File names - match class name or descriptive
// UserRepository.kt
// StringExtensions.kt
// Utils.kt`}
        </CodeBlock>
      </Section>

      <Section id="prefer-val" heading="Prefer val over var">
        <CodeBlock language="kotlin">
{`// ✅ GOOD - immutable by default
val name = "John"
val users = mutableListOf<User>()  // val with mutable collection

// ❌ AVOID - unnecessary mutability
var name = "John"  // Will it change? If not, use val

// ✅ GOOD - var only when necessary
var counter = 0
for (i in 1..10) {
    counter += i
}`}
        </CodeBlock>
      </Section>

      <Section id="null-safety" heading="Embrace Null Safety">
        <CodeBlock language="kotlin">
{`// ✅ GOOD - use safe calls and elvis
val length = name?.length ?: 0
user?.address?.city?.let { println(it) }

// ❌ AVOID - !! operator
val length = name!!.length  // Risky!

// ✅ GOOD - early return for null
fun processUser(user: User?) {
    val validUser = user ?: return
    // Work with validUser (non-nullable)
}

// ✅ GOOD - use requireNotNull/checkNotNull
fun init() {
    val config = requireNotNull(loadConfig()) {
        "Configuration is required"
    }
}`}
        </CodeBlock>
      </Section>

      <Section id="expressions" heading="Use Expression Bodies">
        <CodeBlock language="kotlin">
{`// ✅ GOOD - expression body for simple functions
fun add(a: Int, b: Int) = a + b
fun isEven(n: Int) = n % 2 == 0

// ✅ GOOD - if as expression
val max = if (a > b) a else b

// ✅ GOOD - when as expression
val result = when (status) {
    Status.SUCCESS -> "OK"
    Status.ERROR -> "Failed"
    Status.PENDING -> "Waiting"
}`}
        </CodeBlock>
      </Section>

      <Section id="collections" heading="Use Collection Functions">
        <CodeBlock language="kotlin">
{`val numbers = listOf(1, 2, 3, 4, 5)

// ✅ GOOD - functional style
val evens = numbers.filter { it % 2 == 0 }
val doubled = numbers.map { it * 2 }
val sum = numbers.reduce { acc, n -> acc + n }

// ❌ AVOID - imperative style
val evens = mutableListOf<Int>()
for (n in numbers) {
    if (n % 2 == 0) evens.add(n)
}

// ✅ GOOD - chaining
val result = numbers
    .filter { it > 2 }
    .map { it * 2 }
    .sum()

// ✅ GOOD - use sequences for large collections
largeList.asSequence()
    .filter { it > 0 }
    .map { it * 2 }
    .take(10)
    .toList()`}
        </CodeBlock>
      </Section>

      <Section id="scope-functions" heading="Use Scope Functions Wisely">
        <CodeBlock language="kotlin">
{`// ✅ GOOD - let for null safety
user?.let { u ->
    println("User: \${u.name}")
    save(u)
}

// ✅ GOOD - apply for object configuration
val person = Person().apply {
    name = "John"
    age = 25
    email = "john@mail.com"
}

// ✅ GOOD - also for side effects
val result = calculateValue()
    .also { println("Result: $it") }
    .also { logToAnalytics(it) }

// ✅ GOOD - run for grouping
val result = run {
    val a = fetchA()
    val b = fetchB()
    combine(a, b)
}

// ✅ GOOD - with for multiple calls on object
with(StringBuilder()) {
    append("Hello")
    append(" ")
    append("World")
    toString()
}`}
        </CodeBlock>
      </Section>

      <Section id="extension" heading="Use Extension Functions">
        <CodeBlock language="kotlin">
{`// ✅ GOOD - extend existing classes
fun String.isPalindrome() = this == this.reversed()
fun Int.squared() = this * this

// ✅ GOOD - organize utilities as extensions
fun Context.showToast(message: String) {
    Toast.makeText(this, message, Toast.LENGTH_SHORT).show()
}

// Usage
activity.showToast("Hello!")

// ✅ GOOD - extend nullable types when appropriate
fun String?.orDefault(default: String = "") = this ?: default`}
        </CodeBlock>
      </Section>

      <Section id="data-classes" heading="Use Data Classes">
        <CodeBlock language="kotlin">
{`// ✅ GOOD - data class for data holders
data class User(val id: String, val name: String, val age: Int)

// Auto-generated: equals, hashCode, toString, copy
val user1 = User("1", "John", 25)
val user2 = user1.copy(age = 26)

// ❌ AVOID - regular class for simple data
class User(val id: String, val name: String) {
    // Manual equals, hashCode, toString...
}`}
        </CodeBlock>
      </Section>

      <Section id="sealed" heading="Use Sealed Classes for State">
        <CodeBlock language="kotlin">
{`// ✅ GOOD - sealed class for restricted hierarchies
sealed class UiState {
    object Loading : UiState()
    data class Success(val data: List<Item>) : UiState()
    data class Error(val message: String) : UiState()
}

// Exhaustive when
fun render(state: UiState) = when (state) {
    UiState.Loading -> showLoading()
    is UiState.Success -> showData(state.data)
    is UiState.Error -> showError(state.message)
    // No else needed - compiler ensures all cases
}`}
        </CodeBlock>
      </Section>

      <Section id="coroutines" heading="Use Coroutines for Async">
        <CodeBlock language="kotlin">
{`// ✅ GOOD - structured concurrency
suspend fun loadUserData(userId: String): UserData {
    return coroutineScope {
        val user = async { fetchUser(userId) }
        val posts = async { fetchPosts(userId) }
        UserData(user.await(), posts.await())
    }
}

// ✅ GOOD - use appropriate dispatcher
suspend fun saveToFile(data: String) {
    withContext(Dispatchers.IO) {
        File("data.txt").writeText(data)
    }
}

// ❌ AVOID - GlobalScope (no lifecycle management)
GlobalScope.launch { /* ... */ }

// ✅ GOOD - use viewModelScope, lifecycleScope
class MyViewModel : ViewModel() {
    fun loadData() {
        viewModelScope.launch {
            // Automatic cancellation when ViewModel cleared
        }
    }
}`}
        </CodeBlock>
      </Section>

      <Section id="type-inference" heading="Let Type Inference Work">
        <CodeBlock language="kotlin">
{`// ✅ GOOD - let compiler infer types
val name = "John"  // String inferred
val numbers = listOf(1, 2, 3)  // List<Int> inferred

// ❌ UNNECESSARY - redundant type annotations
val name: String = "John"
val numbers: List<Int> = listOf(1, 2, 3)

// ✅ GOOD - explicit types when it improves clarity
val result: Result<User> = loadUser()  // Makes return type clear`}
        </CodeBlock>
      </Section>

      <Section id="string-templates" heading="Use String Templates">
        <CodeBlock language="kotlin">
{`val name = "John"
val age = 25

// ✅ GOOD - string templates
val message = "Name: $name, Age: $age"
val calculation = "Next year: \${age + 1}"

// ❌ AVOID - string concatenation
val message = "Name: " + name + ", Age: " + age

// ✅ GOOD - raw strings for multiline
val json = """
    {
        "name": "$name",
        "age": $age
    }
""".trimIndent()`}
        </CodeBlock>
      </Section>

      <Section id="destructuring" heading="Use Destructuring">
        <CodeBlock language="kotlin">
{`// ✅ GOOD - destructure data classes
val (name, age) = user
println("$name is $age years old")

// ✅ GOOD - in loops
for ((key, value) in map) {
    println("$key = $value")
}

// ✅ GOOD - in lambdas
people.forEach { (name, age) ->
    println("$name: $age")
}`}
        </CodeBlock>
      </Section>

      <Section id="default-args" heading="Use Default Arguments">
        <CodeBlock language="kotlin">
{`// ✅ GOOD - default arguments over overloading
fun connect(
    host: String = "localhost",
    port: Int = 8080,
    timeout: Int = 30
) {
    // Implementation
}

connect()  // All defaults
connect(port = 9000)  // Override specific parameter

// ❌ AVOID - multiple overloads
fun connect() { connect("localhost", 8080, 30) }
fun connect(host: String) { connect(host, 8080, 30) }
fun connect(host: String, port: Int) { connect(host, port, 30) }`}
        </CodeBlock>
      </Section>

      <Section id="conclusion" heading="Kesimpulan">
        <p><strong>Kotlin Best Practices Summary:</strong></p>
        <ul>
          <li>✅ Prefer <code>val</code> over <code>var</code></li>
          <li>✅ Embrace null safety, avoid <code>!!</code></li>
          <li>✅ Use expression bodies untuk simple functions</li>
          <li>✅ Leverage collection functions</li>
          <li>✅ Use scope functions appropriately</li>
          <li>✅ Prefer data classes untuk data</li>
          <li>✅ Use sealed classes untuk restricted hierarchies</li>
          <li>✅ Use coroutines untuk async operations</li>
          <li>✅ Let type inference work</li>
          <li>✅ Use string templates, destructuring, defaults</li>
        </ul>

        <Note type="success">
          <strong>Congratulations!</strong> 🎉<br/>
          Anda telah menyelesaikan semua 17 materi Kotlin! Dari basics hingga advanced topics, 
          dari OOP hingga coroutines, dari collections hingga testing.
          <br/><br/>
          Keep practicing, build projects, dan continue learning. Happy coding with Kotlin! 🚀
        </Note>
      </Section>
    </MateriLayout>
  );
}
