import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi08() {
  return (
    <MateriLayout
      title="Data Classes & Sealed Classes"
      intro="Data classes dan sealed classes adalah special types di Kotlin yang menyederhanakan data handling dan state management. Pelajari cara menggunakan features powerful ini untuk clean code."
    >
      {/* Data Classes */}
      <Section id="data-classes" heading="Data Classes">
        <Subsection id="data-class-basics" heading="Data Class Basics">
          <CodeBlock language="kotlin">
{`// Data class - automatically generates: equals(), hashCode(), toString(), copy(), componentN()
data class User(
    val name: String,
    val age: Int,
    val email: String
)

val user1 = User("John", 25, "john@mail.com")
val user2 = User("John", 25, "john@mail.com")

// toString() - auto-generated
println(user1)  // User(name=John, age=25, email=john@mail.com)

// equals() - structural equality
println(user1 == user2)  // true (same content)
println(user1 === user2)  // false (different objects)

// hashCode() - consistent dengan equals()
println(user1.hashCode() == user2.hashCode())  // true`}
          </CodeBlock>
        </Subsection>

        <Subsection id="copy-method" heading="copy() Method">
          <CodeBlock language="kotlin">
{`// copy() - create modified copy
val user = User("Alice", 25, "alice@mail.com")

// Copy dengan perubahan
val olderUser = user.copy(age = 26)
// User(name=Alice, age=26, email=alice@mail.com)

val newEmail = user.copy(email = "alice.new@mail.com")
// User(name=Alice, age=25, email=alice.new@mail.com)

// Immutability pattern
data class Account(val balance: Double) {
    fun deposit(amount: Double) = copy(balance = balance + amount)
    fun withdraw(amount: Double) = copy(balance = balance - amount)
}

var account = Account(100.0)
account = account.deposit(50.0)   // 150.0
account = account.withdraw(30.0)  // 120.0`}
          </CodeBlock>
        </Subsection>

        <Subsection id="destructuring" heading="Destructuring Declarations">
          <CodeBlock language="kotlin">
{`// componentN() functions enable destructuring
data class Person(val name: String, val age: Int, val city: String)

val person = Person("Bob", 30, "Jakarta")

// Destructuring
val (name, age, city) = person
println("$name is $age years old, lives in $city")

// Partial destructuring (skip values dengan _)
val (name2, _, city2) = person
println("$name2 lives in $city2")

// In loops
val people = listOf(
    Person("Alice", 25, "Jakarta"),
    Person("Bob", 30, "Bandung"),
    Person("Charlie", 35, "Surabaya")
)

for ((name, age, city) in people) {
    println("$name ($age) - $city")
}

// In lambda parameters
people.forEach { (name, age, _) ->
    println("$name is $age years old")
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="data-class-requirements" heading="Data Class Requirements">
          <CodeBlock language="kotlin">
{`// Data class requirements:
// 1. Primary constructor harus punya minimal 1 parameter
// 2. Semua primary constructor parameters harus val atau var
// 3. Cannot be abstract, open, sealed, atau inner
// 4. Can implement interfaces dan inherit from classes (non-open)

// ❌ Invalid
// data class Empty()  // No parameters

//  Valid
data class Single(val value: String)

// Data class dengan secondary constructor
data class Product(val name: String, val price: Double) {
    constructor(name: String) : this(name, 0.0)
}

// Data class implementing interface
interface Identifiable {
    val id: String
}

data class User(
    override val id: String,
    val name: String
) : Identifiable

// Data class dengan additional properties (not in primary constructor)
data class Employee(val name: String, val salary: Double) {
    var bonus: Double = 0.0  // Not included in equals/hashCode/toString
    
    fun getTotalCompensation() = salary + bonus
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Sealed Classes */}
      <Section id="sealed-classes" heading="Sealed Classes">
        <Subsection id="sealed-basics" heading="Sealed Class Basics">
          <CodeBlock language="kotlin">
{`// Sealed class - restricted class hierarchy
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String, val code: Int = 0) : Result<Nothing>()
    object Loading : Result<Nothing>()
    object Empty : Result<Nothing>()
}

// All subclasses must be in same file (or same package in Kotlin 1.5+)

// Exhaustive when expression (no 'else' needed)
fun <T> handleResult(result: Result<T>) {
    when (result) {
        is Result.Success -> println("Data: \${result.data}")
        is Result.Error -> println("Error: \${result.message} (code: \${result.code})")
        Result.Loading -> println("Loading...")
        Result.Empty -> println("No data")
        // Compiler ensures all cases handled
    }
}

// Usage
val successResult = Result.Success("Hello World")
val errorResult = Result.Error("Not found", 404)
val loadingResult = Result.Loading

handleResult(successResult)  // Data: Hello World
handleResult(errorResult)    // Error: Not found (code: 404)
handleResult(loadingResult)  // Loading...`}
          </CodeBlock>

          <Note type="info">
            Sealed classes memberikan compile-time safety dengan exhaustive when expressions. 
            Compiler memastikan semua possible cases di-handle.
          </Note>
        </Subsection>

        <Subsection id="sealed-use-cases" heading="Common Use Cases">
          <CodeBlock language="kotlin">
{`// 1. Network response states
sealed class NetworkResult<out T> {
    data class Success<T>(val data: T) : NetworkResult<T>()
    data class Error(val exception: Exception) : NetworkResult<Nothing>()
    object Loading : NetworkResult<Nothing>()
}

// 2. UI states
sealed class UiState {
    object Loading : UiState()
    data class Content(val items: List<String>) : UiState()
    data class Error(val message: String) : UiState()
    object Empty : UiState()
}

// 3. Navigation events
sealed class NavigationEvent {
    object Back : NavigationEvent()
    data class ToDetail(val id: String) : NavigationEvent()
    data class ToExternal(val url: String) : NavigationEvent()
}

// 4. Form validation
sealed class ValidationResult {
    object Valid : ValidationResult()
    data class Invalid(val errors: List<String>) : ValidationResult()
}

// 5. Payment methods
sealed class PaymentMethod {
    data class CreditCard(val number: String, val cvv: String) : PaymentMethod()
    data class BankTransfer(val accountNumber: String) : PaymentMethod()
    data class EWallet(val phone: String, val provider: String) : PaymentMethod()
    object Cash : PaymentMethod()
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="sealed-interface" heading="Sealed Interfaces">
          <CodeBlock language="kotlin">
{`// Sealed interface (Kotlin 1.5+) - more flexible than sealed class
sealed interface Action {
    data class Navigate(val route: String) : Action
    data class ShowToast(val message: String) : Action
    object Finish : Action
}

// Can implement multiple sealed interfaces
sealed interface Input
sealed interface Output

data class TextInput(val text: String) : Input
data class NumberInput(val number: Int) : Input
data class TextOutput(val text: String) : Output

// Combined
data class Transformation(val input: String, val output: String) : Input, Output`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Enum vs Sealed */}
      <Section id="enum-vs-sealed" heading="Enum vs Sealed Classes">
        <CodeBlock language="kotlin">
{`// Enum - fixed set of values (constants)
enum class Color {
    RED, GREEN, BLUE
}

// All instances known at compile time
val allColors = Color.values()

// Sealed class - restricted hierarchy dengan different types
sealed class Animal {
    data class Dog(val name: String, val breed: String) : Animal()
    data class Cat(val name: String, val indoor: Boolean) : Animal()
    data class Bird(val species: String) : Animal()
}

// Each subclass can have different properties

// When to use what:
// Enum: Fixed set of constants dengan same properties
// Sealed: Restricted hierarchy dengan different types/properties

// Example: HTTP Methods
enum class HttpMethod {
    GET, POST, PUT, DELETE, PATCH
}

// Example: API Response (different data for each type)
sealed class ApiResponse {
    data class Success(val data: String, val timestamp: Long) : ApiResponse()
    data class Error(val code: Int, val message: String, val details: Map<String, Any>) : ApiResponse()
    object Unauthorized : ApiResponse()
}`}
        </CodeBlock>

        <Note type="tip">
          <strong>Rule of thumb:</strong><br/>
          - Use <code>enum</code> untuk fixed set of constants<br/>
          - Use <code>sealed class</code> untuk type hierarchies dengan different shapes
        </Note>
      </Section>

      {/* Value Classes */}
      <Section id="value-classes" heading="Value Classes (Inline Classes)">
        <CodeBlock language="kotlin">
{`// Value class - wrapper dengan no runtime overhead
@JvmInline
value class UserId(val value: String)

@JvmInline
value class Email(val value: String)

// Type safety tanpa performance cost
fun createUser(id: UserId, email: Email) {
    println("Creating user: $id, $email")
}

// ❌ Compile error - type mismatch
// createUser("user123", "email@example.com")

//  Correct usage
createUser(UserId("user123"), Email("email@example.com"))

// Value classes dapat punya functions
@JvmInline
value class Password(private val value: String) {
    fun validate(): Boolean {
        return value.length >= 8 && value.any { it.isDigit() }
    }
    
    fun obfuscate(): String {
        return "*".repeat(value.length)
    }
}

val password = Password("secret123")
println(password.validate())  // true
println(password.obfuscate())  // *********`}
        </CodeBlock>
      </Section>

      {/* Kesimpulan */}
      <Section id="conclusion" heading="Kesimpulan">
        <p>
          Dalam materi ini, kita telah mempelajari special class types di Kotlin:
        </p>

        <ul>
          <li> <strong>Data Classes:</strong> Auto-generated equals, hashCode, toString, copy</li>
          <li> <strong>Sealed Classes:</strong> Restricted hierarchies dengan exhaustive when</li>
          <li> <strong>Enum vs Sealed:</strong> Kapan menggunakan masing-masing</li>
          <li> <strong>Value Classes:</strong> Type-safe wrappers tanpa runtime overhead</li>
        </ul>

        <Note type="success">
          Di materi selanjutnya, kita akan explore <strong>Collections</strong>: 
          List, Set, Map, dan collection operations yang powerful di Kotlin.
        </Note>
      </Section>
    </MateriLayout>
  );
}
