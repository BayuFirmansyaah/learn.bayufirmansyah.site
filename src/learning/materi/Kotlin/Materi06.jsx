import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi06() {
  return (
    <MateriLayout
      title="OOP Basics - Classes & Objects"
      intro="Object-Oriented Programming adalah paradigm fundamental di Kotlin. Pelajari cara membuat classes, objects, properties, methods, dan constructors dengan elegant Kotlin syntax."
    >
      {/* Classes */}
      <Section id="classes" heading="Classes">
        <Subsection id="basic-class" heading="Basic Class">
          <CodeBlock language="kotlin">
{`// Simple class
class Person {
    var name: String = ""
    var age: Int = 0
}

// Creating object (tidak perlu 'new' keyword)
val person = Person()
person.name = "John"
person.age = 25

// Class dengan primary constructor
class User(val name: String, val age: Int)

val user = User("Alice", 30)
println(user.name)  // Alice

// Class dengan default parameters
class Product(
    val name: String,
    val price: Double = 0.0,
    val quantity: Int = 1
)

val product1 = Product("Phone", 599.99, 10)
val product2 = Product("Book", price = 29.99)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="constructors" heading="Constructors">
          <CodeBlock language="kotlin">
{`// Primary constructor
class Person(val name: String, var age: Int) {
    // Init block - executed saat object creation
    init {
        println("Person created: $name, age $age")
        require(age >= 0) { "Age cannot be negative" }
    }
}

// Secondary constructor
class User {
    val name: String
    val email: String
    
    // Primary constructor
    constructor(name: String, email: String) {
        this.name = name
        this.email = email
    }
    
    // Secondary constructor calls primary
    constructor(name: String) : this(name, "$name@example.com")
}

val user1 = User("John", "john@mail.com")
val user2 = User("Alice")  // email akan auto-generated

// Multiple init blocks
class Account(val id: String) {
    init {
        println("First init: $id")
    }
    
    val createdAt = System.currentTimeMillis()
    
    init {
        println("Second init: $createdAt")
    }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Properties */}
      <Section id="properties" heading="Properties">
        <Subsection id="properties-basic" heading="Properties Basics">
          <CodeBlock language="kotlin">
{`// Properties dengan automatic getters/setters
class Rectangle(var width: Double, var height: Double) {
    // Computed property (no backing field)
    val area: Double
        get() = width * height
    
    val perimeter: Double
        get() = 2 * (width + height)
}

val rect = Rectangle(5.0, 3.0)
println(rect.area)       // 15.0
println(rect.perimeter)  // 16.0

// Custom getter/setter
class Person(private var _age: Int) {
    var age: Int
        get() = _age
        set(value) {
            if (value >= 0) {
                _age = value
            }
        }
}

// Backing field dengan 'field' keyword
class Counter {
    var count: Int = 0
        set(value) {
            if (value >= 0) {
                field = value  // 'field' refers to backing field
            }
        }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="visibility" heading="Visibility Modifiers">
          <CodeBlock language="kotlin">
{`// Visibility modifiers
class BankAccount {
    private var balance: Double = 0.0      // Only in this class
    protected var accountNumber: String = ""  // This class and subclasses
    internal var branch: String = ""       // Same module
    public var accountType: String = ""    // Everywhere (default)
    
    fun deposit(amount: Double) {
        balance += amount
    }
    
    fun getBalance(): Double = balance
}

// Top-level visibility
private fun helper() { }      // Only in this file
internal class Config { }     // Same module
public class Utils { }        // Everywhere`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Methods */}
      <Section id="methods" heading="Methods">
        <CodeBlock language="kotlin">
{`class Calculator {
    // Simple method
    fun add(a: Int, b: Int): Int {
        return a + b
    }
    
    // Single-expression method
    fun multiply(a: Int, b: Int) = a * b
    
    // Method dengan default parameters
    fun power(base: Int, exponent: Int = 2): Int {
        return Math.pow(base.toDouble(), exponent.toDouble()).toInt()
    }
    
    // Method overloading
    fun display(value: Int) = println("Int: $value")
    fun display(value: String) = println("String: $value")
    fun display(value: Double) = println("Double: $value")
}

val calc = Calculator()
println(calc.add(5, 3))        // 8
println(calc.power(5))         // 25 (default exponent = 2)
println(calc.power(2, 10))     // 1024`}
        </CodeBlock>
      </Section>

      {/* Data Classes */}
      <Section id="data-classes" heading="Data Classes (Preview)">
        <CodeBlock language="kotlin">
{`// Data class - automatically generates equals, hashCode, toString, copy
data class User(val name: String, val age: Int, val email: String)

val user1 = User("John", 25, "john@mail.com")
val user2 = User("John", 25, "john@mail.com")

println(user1 == user2)  // true (structural equality)
println(user1)  // User(name=John, age=25, email=john@mail.com)

// copy() method untuk create modified copies
val user3 = user1.copy(age = 26)
// user3 = User(name=John, age=26, email=john@mail.com)

// Destructuring
val (name, age, email) = user1
println("Name: $name, Age: $age")

// More details in Materi 08`}
        </CodeBlock>
      </Section>

      {/* Objects */}
      <Section id="objects" heading="Object Declarations">
        <Subsection id="singleton" heading="Singleton dengan object">
          <CodeBlock language="kotlin">
{`// Object declaration - singleton pattern
object DatabaseConfig {
    var host: String = "localhost"
    var port: Int = 5432
    var database: String = "myapp"
    
    fun getConnectionString(): String {
        return "jdbc:postgresql://$host:$port/$database"
    }
}

// Usage - no need to create instance
DatabaseConfig.host = "192.168.1.100"
println(DatabaseConfig.getConnectionString())

// Object expression - anonymous object
val clickListener = object : MouseListener {
    override fun onClick() {
        println("Clicked!")
    }
    
    override fun onDoubleClick() {
        println("Double clicked!")
    }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="companion" heading="Companion Objects">
          <CodeBlock language="kotlin">
{`// Companion object - class-level members (like static in Java)
class User private constructor(val id: String, val name: String) {
    companion object {
        private var nextId = 0
        
        fun create(name: String): User {
            return User("USER_\${nextId++}", name)
        }
        
        const val MAX_NAME_LENGTH = 50
    }
}

val user1 = User.create("Alice")
val user2 = User.create("Bob")
println(User.MAX_NAME_LENGTH)

// Companion object dengan name
class MyClass {
    companion object Factory {
        fun create(): MyClass = MyClass()
    }
}

val obj = MyClass.create()
val obj2 = MyClass.Factory.create()`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Nested & Inner Classes */}
      <Section id="nested-classes" heading="Nested & Inner Classes">
        <CodeBlock language="kotlin">
{`// Nested class - tidak punya reference ke outer class
class Outer {
    private val outerProperty = "Outer"
    
    class Nested {
        fun display() {
            // Cannot access outerProperty
            println("Nested class")
        }
    }
}

val nested = Outer.Nested()

// Inner class - punya reference ke outer class
class Outer2 {
    private val outerProperty = "Outer"
    
    inner class Inner {
        fun display() {
            // Can access outerProperty
            println("Access: $outerProperty")
        }
        
        fun getOuter(): Outer2 = this@Outer2
    }
}

val outer = Outer2()
val inner = outer.Inner()
inner.display()`}
        </CodeBlock>
      </Section>

      {/* Enum Classes */}
      <Section id="enum-classes" heading="Enum Classes">
        <CodeBlock language="kotlin">
{`// Basic enum
enum class Direction {
    NORTH, SOUTH, EAST, WEST
}

val direction = Direction.NORTH

// Enum dengan properties
enum class Color(val rgb: Int) {
    RED(0xFF0000),
    GREEN(0x00FF00),
    BLUE(0x0000FF)
}

println(Color.RED.rgb)  // 16711680

// Enum dengan methods
enum class Day {
    MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY, SUNDAY;
    
    fun isWeekend(): Boolean {
        return this == SATURDAY || this == SUNDAY
    }
}

// Using enum
when (Day.MONDAY) {
    Day.MONDAY -> println("Start of week")
    Day.FRIDAY -> println("Almost weekend")
    Day.SATURDAY, Day.SUNDAY -> println("Weekend!")
    else -> println("Weekday")
}`}
        </CodeBlock>
      </Section>

      {/* Kesimpulan */}
      <Section id="conclusion" heading="Kesimpulan">
        <p>
          Dalam materi ini, kita telah mempelajari OOP basics di Kotlin:
        </p>

        <ul>
          <li> Classes dan constructors (primary & secondary)</li>
          <li> Properties dengan custom getters/setters</li>
          <li> Visibility modifiers (private, protected, internal, public)</li>
          <li> Object declarations dan companion objects</li>
          <li> Nested & inner classes</li>
          <li> Enum classes</li>
        </ul>

        <Note type="success">
          Di materi selanjutnya, kita akan belajar <strong>OOP Advanced</strong>: 
          inheritance, interfaces, abstract classes, dan polymorphism.
        </Note>
      </Section>
    </MateriLayout>
  );
}
