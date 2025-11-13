import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi07() {
  return (
    <MateriLayout
      title="OOP Advanced"
      intro="Pelajari konsep OOP advanced di Kotlin: inheritance, interfaces, abstract classes, polymorphism, dan delegation pattern untuk membuat kode yang flexible dan maintainable."
    >
      {/* Inheritance */}
      <Section id="inheritance" heading="Inheritance">
        <Subsection id="open-classes" heading="Open Classes & Methods">
          <CodeBlock language="kotlin">
{`// Di Kotlin, classes default adalah final (cannot be inherited)
// Gunakan 'open' keyword untuk allow inheritance
open class Animal(val name: String) {
    open fun makeSound() {
        println("$name makes a sound")
    }
    
    fun eat() {  // final by default
        println("$name is eating")
    }
}

// Inherit dengan : (colon)
class Dog(name: String) : Animal(name) {
    // Override method
    override fun makeSound() {
        println("$name barks: Woof!")
    }
}

class Cat(name: String) : Animal(name) {
    override fun makeSound() {
        println("$name meows: Meow!")
    }
}

val dog = Dog("Buddy")
val cat = Cat("Whiskers")
dog.makeSound()  // Buddy barks: Woof!
cat.makeSound()  // Whiskers meows: Meow!`}
          </CodeBlock>

          <Note type="info">
            Classes dan methods di Kotlin default final untuk safety. Gunakan <code>open</code> 
            keyword explicit untuk allow inheritance/override.
          </Note>
        </Subsection>

        <Subsection id="inheritance-constructor" heading="Constructor Inheritance">
          <CodeBlock language="kotlin">
{`// Subclass calling superclass constructor
open class Person(val name: String, val age: Int)

class Student(
    name: String,
    age: Int,
    val studentId: String
) : Person(name, age) {
    init {
        println("Student created: $name, ID: $studentId")
    }
}

// Secondary constructor calling super
open class Vehicle(val brand: String) {
    constructor(brand: String, model: String) : this(brand) {
        println("Vehicle: $brand $model")
    }
}

class Car : Vehicle {
    constructor(brand: String) : super(brand)
    constructor(brand: String, model: String) : super(brand, model)
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="override-properties" heading="Overriding Properties">
          <CodeBlock language="kotlin">
{`open class Shape {
    open val area: Double = 0.0
    open val perimeter: Double = 0.0
}

class Circle(val radius: Double) : Shape() {
    override val area: Double
        get() = Math.PI * radius * radius
    
    override val perimeter: Double
        get() = 2 * Math.PI * radius
}

class Rectangle(val width: Double, val height: Double) : Shape() {
    override val area: Double = width * height
    override val perimeter: Double = 2 * (width + height)
}

// var can override val (but not vice versa)
open class Base {
    open val property: String = "Base"
}

class Derived : Base() {
    override var property: String = "Derived"  //  OK
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="super-keyword" heading="super Keyword">
          <CodeBlock language="kotlin">
{`open class Parent {
    open fun greet() {
        println("Hello from Parent")
    }
}

class Child : Parent() {
    override fun greet() {
        super.greet()  // Call parent method
        println("Hello from Child")
    }
}

// Multiple inheritance dengan interfaces
interface A {
    fun display() {
        println("Interface A")
    }
}

interface B {
    fun display() {
        println("Interface B")
    }
}

class C : A, B {
    override fun display() {
        super<A>.display()  // Call specific interface method
        super<B>.display()
        println("Class C")
    }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Interfaces */}
      <Section id="interfaces" heading="Interfaces">
        <Subsection id="interface-basics" heading="Interface Basics">
          <CodeBlock language="kotlin">
{`// Interface definition
interface Drawable {
    fun draw()  // Abstract method (no implementation)
    
    fun describe() {  // Default implementation
        println("This is a drawable object")
    }
}

// Implementing interface
class Circle : Drawable {
    override fun draw() {
        println("Drawing a circle")
    }
    // describe() inherited dari interface
}

// Multiple interfaces
interface Clickable {
    fun click()
}

interface Draggable {
    fun drag()
}

class Button : Clickable, Draggable {
    override fun click() {
        println("Button clicked")
    }
    
    override fun drag() {
        println("Button dragged")
    }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="interface-properties" heading="Interface Properties">
          <CodeBlock language="kotlin">
{`interface Named {
    // Abstract property
    val name: String
    
    // Property dengan custom getter
    val displayName: String
        get() = "Display: $name"
}

class User(override val name: String) : Named {
    // displayName inherited automatically
}

val user = User("Alice")
println(user.name)         // Alice
println(user.displayName)  // Display: Alice

// Interface dengan property dan methods
interface Repository<T> {
    val count: Int  // Must be implemented
    
    fun getAll(): List<T>
    fun getById(id: String): T?
    fun save(item: T)
    
    fun printCount() {
        println("Total items: $count")
    }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Abstract Classes */}
      <Section id="abstract-classes" heading="Abstract Classes">
        <CodeBlock language="kotlin">
{`// Abstract class - cannot be instantiated directly
abstract class Vehicle(val brand: String) {
    // Abstract members - must be overridden
    abstract fun start()
    abstract fun stop()
    abstract val maxSpeed: Int
    
    // Concrete members - can be inherited as-is
    fun displayBrand() {
        println("Brand: $brand")
    }
}

class Car(brand: String) : Vehicle(brand) {
    override fun start() {
        println("Car starting...")
    }
    
    override fun stop() {
        println("Car stopping...")
    }
    
    override val maxSpeed: Int = 200
}

// Abstract class vs Interface
abstract class Animal {
    abstract fun makeSound()
    
    // Can have state (properties with backing fields)
    var age: Int = 0
    
    // Can have constructor
    constructor(age: Int) {
        this.age = age
    }
}

interface Flyable {
    fun fly()  // Cannot have state (only abstract properties)
}

// Class can inherit one abstract class + multiple interfaces
class Bird : Animal(0), Flyable {
    override fun makeSound() {
        println("Tweet!")
    }
    
    override fun fly() {
        println("Flying...")
    }
}`}
        </CodeBlock>

        <Note type="tip">
          <strong>Abstract class vs Interface:</strong><br/>
          - Abstract class: Can have state, constructors, single inheritance<br/>
          - Interface: No state, no constructors, multiple implementation
        </Note>
      </Section>

      {/* Polymorphism */}
      <Section id="polymorphism" heading="Polymorphism">
        <CodeBlock language="kotlin">
{`// Polymorphism - object dapat di-treat sebagai parent type
open class Shape {
    open fun calculateArea(): Double = 0.0
}

class Circle(val radius: Double) : Shape() {
    override fun calculateArea() = Math.PI * radius * radius
}

class Rectangle(val width: Double, val height: Double) : Shape() {
    override fun calculateArea() = width * height
}

// List of shapes (polymorphic collection)
val shapes: List<Shape> = listOf(
    Circle(5.0),
    Rectangle(4.0, 6.0),
    Circle(3.0)
)

// Polymorphic behavior
for (shape in shapes) {
    println("Area: \${shape.calculateArea()}")
}

// Function dengan polymorphic parameter
fun displayArea(shape: Shape) {
    println("Area: \${shape.calculateArea()}")
}

displayArea(Circle(5.0))
displayArea(Rectangle(4.0, 6.0))`}
        </CodeBlock>
      </Section>

      {/* Delegation */}
      <Section id="delegation" heading="Delegation Pattern">
        <Subsection id="class-delegation" heading="Class Delegation">
          <CodeBlock language="kotlin">
{`// Interface untuk delegation
interface Printer {
    fun print(message: String)
}

class ConsolePrinter : Printer {
    override fun print(message: String) {
        println("Console: $message")
    }
}

class FilePrinter : Printer {
    override fun print(message: String) {
        println("File: $message")
    }
}

// Class delegation dengan 'by' keyword
class Logger(printer: Printer) : Printer by printer {
    // All Printer methods delegated to printer
    
    // Can add own methods
    fun logWithTimestamp(message: String) {
        val timestamp = System.currentTimeMillis()
        print("[$timestamp] $message")
    }
}

val logger = Logger(ConsolePrinter())
logger.print("Hello")  // Delegated to ConsolePrinter
logger.logWithTimestamp("Important message")`}
          </CodeBlock>
        </Subsection>

        <Subsection id="property-delegation" heading="Property Delegation">
          <CodeBlock language="kotlin">
{`// Delegated properties dengan 'by'
class User {
    // lazy - initialized on first access
    val database by lazy {
        println("Connecting to database...")
        Database.connect()
    }
    
    // observable - notify on change
    var name: String by Delegates.observable("") { prop, old, new ->
        println("\${prop.name}: $old -> $new")
    }
}

// Custom delegation
class Delegate {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
        return "Value of \${property.name}"
    }
    
    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: String) {
        println("Setting \${property.name} = $value")
    }
}

class Example {
    var custom: String by Delegate()
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Sealed Classes Preview */}
      <Section id="sealed-preview" heading="Sealed Classes (Preview)">
        <CodeBlock language="kotlin">
{`// Sealed class - restricted class hierarchy
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Error(val message: String) : Result<Nothing>()
    object Loading : Result<Nothing>()
}

// Exhaustive when expression
fun handleResult(result: Result<String>) = when (result) {
    is Result.Success -> println("Success: \${result.data}")
    is Result.Error -> println("Error: \${result.message}")
    Result.Loading -> println("Loading...")
    // No 'else' needed - compiler knows all cases covered
}

// More details in Materi 08: Data Classes & Sealed Classes`}
        </CodeBlock>
      </Section>

      {/* Kesimpulan */}
      <Section id="conclusion" heading="Kesimpulan">
        <p>
          Dalam materi ini, kita telah mempelajari OOP advanced concepts:
        </p>

        <ul>
          <li> Inheritance dengan open classes & override</li>
          <li> Interfaces dengan default implementations</li>
          <li> Abstract classes untuk shared behavior</li>
          <li> Polymorphism untuk flexible code</li>
          <li> Delegation pattern dengan <code>by</code> keyword</li>
        </ul>

        <Note type="success">
          Di materi selanjutnya, kita akan explore <strong>Data Classes & Sealed Classes</strong> 
          yang membuat data handling dan state management lebih powerful.
        </Note>
      </Section>
    </MateriLayout>
  );
}
