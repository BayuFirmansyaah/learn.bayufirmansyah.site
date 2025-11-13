import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi03() {
  return (
    <MateriLayout
      title="Dasar Pemrograman Kotlin"
      intro="Mari kita pelajari fundamental Kotlin: variables, data types, operators, dan type system. Memahami dasar-dasar ini dengan solid adalah foundation untuk menjadi Kotlin developer yang handal."
    >
      {/* Variables */}
      <Section id="variables" heading="Variables - val vs var">
        <p>
          Di Kotlin, ada dua cara mendeklarasikan variable: <code>val</code> (immutable/read-only) 
          dan <code>var</code> (mutable). Best practice adalah menggunakan <code>val</code> sebanyak mungkin 
          untuk immutability dan thread safety.
        </p>

        <Subsection id="val-keyword" heading="val - Immutable Variable">
          <CodeBlock language="kotlin">
{`// val = value (immutable, read-only, cannot be reassigned)
val name: String = "John Doe"
val age: Int = 25
val salary: Double = 75000.50

// Compile error jika mencoba reassign
name = "Jane Doe"  // ❌ Error: Val cannot be reassigned

// val dengan type inference (Kotlin detect type otomatis)
val city = "Jakarta"        // Type: String
val population = 10_000_000 // Type: Int (underscore untuk readability)
val pi = 3.14159           // Type: Double`}
          </CodeBlock>

          <Note type="info">
            <code>val</code> mirip dengan <code>final</code> di Java atau <code>const</code> di JavaScript. 
            Once assigned, value tidak bisa diubah.
          </Note>
        </Subsection>

        <Subsection id="var-keyword" heading="var - Mutable Variable">
          <CodeBlock language="kotlin">
{`// var = variable (mutable, can be reassigned)
var counter: Int = 0
counter = 1        // ✅ OK
counter = 2        // ✅ OK
counter++          // ✅ OK, now counter = 3

var message = "Hello"
message = "Hi"     // ✅ OK
message = "Hey"    // ✅ OK

// Tipe data tetap harus sama
var number = 10    // Type: Int
number = 20        // ✅ OK
number = "twenty"  // ❌ Error: Type mismatch`}
          </CodeBlock>
        </Subsection>

        <Subsection id="val-vs-var-best-practice" heading="val vs var: Best Practices">
          <CodeBlock language="kotlin">
{`// ✅ GOOD: Prefer val (immutable)
val firstName = "John"
val lastName = "Doe"
val fullName = "$firstName $lastName"

// ❌ AVOID: var tanpa alasan
var userName = "john_doe"  // Jika tidak perlu diubah, gunakan val

// ✅ GOOD: var when necessary
var score = 0
for (i in 1..10) {
    score += i  // score berubah setiap iterasi
}

// ✅ GOOD: val dengan mutable collection
val numbers = mutableListOf(1, 2, 3)
numbers.add(4)  // ✅ OK - collection content berubah, tapi reference tidak
numbers = mutableListOf(5, 6)  // ❌ Error - cannot reassign val`}
          </CodeBlock>

          <Note type="tip">
            <strong>Rule of thumb:</strong> Start dengan <code>val</code>. Hanya gunakan <code>var</code> 
            jika compiler complain atau jika value memang perlu diubah.
          </Note>
        </Subsection>

        <Subsection id="late-init" heading="lateinit - Late Initialization">
          <CodeBlock language="kotlin">
{`// lateinit untuk defer initialization (hanya untuk var)
class UserRepository {
    // Tidak bisa langsung initialize, akan di-set kemudian
    lateinit var database: Database
    
    fun init(db: Database) {
        database = db  // Initialize di sini
    }
    
    fun getUser(): User {
        // Bisa check apakah sudah initialized
        if (::database.isInitialized) {
            return database.query()
        } else {
            throw IllegalStateException("Database not initialized")
        }
    }
}`}
          </CodeBlock>

          <Note type="warning">
            <code>lateinit</code> hanya bisa digunakan untuk <code>var</code> dan non-nullable types. 
            Accessing sebelum initialization akan throw <code>UninitializedPropertyAccessException</code>.
          </Note>
        </Subsection>

        <Subsection id="lazy-initialization" heading="lazy - Lazy Initialization">
          <CodeBlock language="kotlin">
{`// lazy untuk val - initialize hanya saat pertama kali diakses
val expensiveResource: String by lazy {
    println("Computing expensive resource...")
    performExpensiveComputation()  // Hanya dipanggil sekali
}

// Example dengan database connection
val database: Database by lazy {
    println("Initializing database connection...")
    Database.connect("jdbc:mysql://localhost/mydb")
}

fun main() {
    println("Program started")
    // Database belum terkoneksi di sini
    
    println("Accessing database first time")
    val result = database.query()  // Koneksi terjadi di sini
    
    println("Accessing database second time")
    val result2 = database.query()  // Tidak ada "Initializing..." lagi
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Data Types */}
      <Section id="data-types" heading="Data Types">
        <p>
          Kotlin adalah statically typed language - setiap variable memiliki type yang ditentukan 
          saat compile time. Kotlin menyediakan type inference yang powerful, sehingga kita tidak 
          selalu perlu explicitly declare type.
        </p>

        <Subsection id="numeric-types" heading="Numeric Types">
          <CodeBlock language="kotlin">
{`// Integer types
val byteValue: Byte = 127              // 8 bit: -128 to 127
val shortValue: Short = 32767          // 16 bit: -32,768 to 32,767
val intValue: Int = 2_147_483_647      // 32 bit: -2^31 to 2^31-1
val longValue: Long = 9_223_372_036_854_775_807L  // 64 bit

// Default untuk integer literal adalah Int
val defaultInt = 100        // Type: Int
val explicitLong = 100L     // Type: Long (suffix L)

// Floating-point types
val floatValue: Float = 3.14f          // 32 bit (suffix f atau F)
val doubleValue: Double = 3.14159265   // 64 bit

// Default untuk decimal literal adalah Double
val defaultDouble = 3.14    // Type: Double
val explicitFloat = 3.14f   // Type: Float

// Underscore untuk readability
val million = 1_000_000
val creditCard = 1234_5678_9012_3456L
val bytes = 0xFF_EC_DE_5E

// Binary, Hexadecimal, Octal
val binary = 0b1010        // Binary: 10
val hex = 0xFF             // Hexadecimal: 255
// Octal tidak didukung di Kotlin`}
          </CodeBlock>

          <Note type="info">
            Kotlin tidak support automatic widening conversions. Anda harus explicitly convert 
            dengan method seperti <code>.toInt()</code>, <code>.toLong()</code>, dll.
          </Note>
        </Subsection>

        <Subsection id="type-conversion" heading="Type Conversion">
          <CodeBlock language="kotlin">
{`// Explicit conversion methods
val intNumber: Int = 100
val longNumber: Long = intNumber.toLong()
val doubleNumber: Double = intNumber.toDouble()
val stringNumber: String = intNumber.toString()

// All numeric types have conversion methods
val byte: Byte = 10
val toByte = byte.toByte()
val toShort = byte.toShort()
val toInt = byte.toInt()
val toLong = byte.toLong()
val toFloat = byte.toFloat()
val toDouble = byte.toDouble()
val toChar = byte.toChar()

// String to Number conversion
val str = "123"
val number = str.toInt()           // 123
val double = str.toDouble()        // 123.0
val long = str.toLong()            // 123L

// Safe conversion dengan toIntOrNull()
val invalid = "abc"
val safeNumber = invalid.toIntOrNull()  // null (tidak throw exception)

// With default value
val result = invalid.toIntOrNull() ?: 0  // 0 jika conversion gagal`}
          </CodeBlock>
        </Subsection>

        <Subsection id="boolean-type" heading="Boolean Type">
          <CodeBlock language="kotlin">
{`// Boolean: true atau false
val isValid: Boolean = true
val isComplete = false

// Boolean operations
val and = true && false    // false (logical AND)
val or = true || false     // true (logical OR)
val not = !true            // false (logical NOT)

// Comparison menghasilkan Boolean
val isGreater = 10 > 5         // true
val isEqual = "hello" == "hi"  // false
val notEqual = 10 != 20        // true

// Lazy evaluation dengan && dan ||
fun expensiveCheck(): Boolean {
    println("Expensive check executed")
    return true
}

val result = false && expensiveCheck()  // expensiveCheck() TIDAK dipanggil
val result2 = true || expensiveCheck()  // expensiveCheck() TIDAK dipanggil`}
          </CodeBlock>
        </Subsection>

        <Subsection id="char-type" heading="Character Type">
          <CodeBlock language="kotlin">
{`// Char: single character dengan single quotes
val letter: Char = 'A'
val digit: Char = '5'
val symbol: Char = '$'

// Unicode characters
val unicode: Char = '\\u0041'  // 'A'
val emoji: Char = '\\u263A'    // ☺

// Special characters dengan escape sequences
val newline = '\\n'
val tab = '\\t'
val backslash = '\\\\'
val singleQuote = '\\''

// Char operations
val isDigit = letter.isDigit()           // false
val isLetter = letter.isLetter()         // true
val isUpperCase = letter.isUpperCase()   // true
val toLowerCase = letter.toLowerCase()   // 'a'
val toInt = digit.digitToInt()           // 5

// Char arithmetic
val nextChar = 'A' + 1   // 'B'
val prevChar = 'Z' - 1   // 'Y'`}
          </CodeBlock>
        </Subsection>

        <Subsection id="string-type" heading="String Type">
          <CodeBlock language="kotlin">
{`// String: sequence of characters dengan double quotes
val greeting: String = "Hello, World!"
val empty = ""
val multiline = """
    This is a
    multiline string
    preserving formatting
""".trimIndent()

            // String templates (interpolation)
val name = "John"
val age = 25
val message = "My name is $name and I'm $age years old"
val calculation = "Next year: ${'${age + 1}'}"  // ${"{}"} untuk expressions// String properties
val length = greeting.length              // 13
val firstChar = greeting[0]               // 'H'
val lastChar = greeting[greeting.length - 1]  // '!'

// String methods
val upperCase = greeting.uppercase()      // "HELLO, WORLD!"
val lowerCase = greeting.lowercase()      // "hello, world!"
val replaced = greeting.replace("World", "Kotlin")
val substring = greeting.substring(0, 5)  // "Hello"
val contains = greeting.contains("World") // true
val startsWith = greeting.startsWith("Hello")  // true
val endsWith = greeting.endsWith("!")     // true
val trimmed = "  space  ".trim()         // "space"

// String splitting
val csv = "apple,banana,orange"
val fruits = csv.split(",")  // List: ["apple", "banana", "orange"]

// String joining
val joined = listOf("a", "b", "c").joinToString("-")  // "a-b-c"`}
          </CodeBlock>

          <Note type="tip">
            Raw strings dengan triple quotes (<code>"""..."""</code>) sangat berguna untuk 
            multiline text, regex patterns, atau JSON templates tanpa perlu escape characters.
          </Note>
        </Subsection>

        <Subsection id="string-raw" heading="Raw Strings & Multiline">
          <CodeBlock language="kotlin">
{`// Raw strings tidak perlu escape sequences
val filePath = """C:\\Users\\John\\Documents\\file.txt"""
// Sama dengan: "C:\\\\Users\\\\John\\\\Documents\\\\file.txt"

// Multiline dengan preserved formatting
val json = """
    {
        "name": "John",
        "age": 25,
        "skills": ["Kotlin", "Java", "Android"]
    }
"""

// trimIndent() untuk remove leading whitespace
val code = """
    fun greet(name: String) {
        println("Hello, $name!")
    }
""".trimIndent()

// trimMargin() dengan custom margin prefix
val quote = """
    |Tell me and I forget.
    |Teach me and I remember.
    |Involve me and I learn.
    |    - Benjamin Franklin
""".trimMargin()

// String dengan expression di dalam
val x = 10
val y = 20
val result = """
    x = $x
    y = $y
    sum = \${x + y}
    product = \${x * y}
""".trimIndent()`}
          </CodeBlock>
        </Subsection>

        <Subsection id="array-type" heading="Arrays">
          <CodeBlock language="kotlin">
{`// Array dengan arrayOf()
val numbers = arrayOf(1, 2, 3, 4, 5)
val strings = arrayOf("apple", "banana", "orange")
val mixed = arrayOf(1, "two", 3.0, true)  // Array<Any>

// Typed arrays dengan primitive types (better performance)
val intArray = intArrayOf(1, 2, 3, 4, 5)
val doubleArray = doubleArrayOf(1.1, 2.2, 3.3)
val boolArray = booleanArrayOf(true, false, true)

// Array dengan size dan initializer
val zeros = IntArray(5)              // [0, 0, 0, 0, 0]
val squares = IntArray(5) { it * it }  // [0, 1, 4, 9, 16]

// Array access
val first = numbers[0]               // 1
val last = numbers[numbers.size - 1] // 5
numbers[0] = 10                      // Modify element

// Array operations
val size = numbers.size
val contains = 3 in numbers          // true
val indexOf = numbers.indexOf(3)     // 2
val sum = numbers.sum()              // 15
val average = numbers.average()      // 3.0

// Array iteration
for (num in numbers) {
    println(num)
}

numbers.forEach { println(it) }
numbers.forEachIndexed { index, value ->
    println("$index: $value")
}`}
          </CodeBlock>

          <Note type="info">
            Arrays di Kotlin bersifat mutable (elements dapat diubah), tetapi size fixed. 
            Untuk dynamic size, gunakan <code>List</code> atau <code>MutableList</code>.
          </Note>
        </Subsection>
      </Section>

      {/* Operators */}
      <Section id="operators" heading="Operators">
        <Subsection id="arithmetic-operators" heading="Arithmetic Operators">
          <CodeBlock language="kotlin">
{`// Basic arithmetic
val sum = 10 + 5        // 15
val diff = 10 - 5       // 5
val product = 10 * 5    // 50
val quotient = 10 / 5   // 2
val remainder = 10 % 3  // 1 (modulo)

// Unary operators
val positive = +10      // 10
val negative = -10      // -10
var counter = 0
counter++               // Post-increment: 0, then 1
++counter               // Pre-increment: 2
counter--               // Post-decrement: 2, then 1
--counter               // Pre-decrement: 0

// Compound assignment
var x = 10
x += 5   // x = x + 5  (15)
x -= 3   // x = x - 3  (12)
x *= 2   // x = x * 2  (24)
x /= 4   // x = x / 4  (6)
x %= 4   // x = x % 4  (2)

// Division behavior
val intDiv = 10 / 3     // 3 (integer division)
val doubleDiv = 10.0 / 3  // 3.333... (floating-point division)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="comparison-operators" heading="Comparison Operators">
          <CodeBlock language="kotlin">
{`// Comparison operators menghasilkan Boolean
val isEqual = 10 == 10          // true (equals)
val notEqual = 10 != 5          // true (not equals)
val greater = 10 > 5            // true
val less = 10 < 5               // false
val greaterOrEqual = 10 >= 10   // true
val lessOrEqual = 10 <= 5       // false

// String comparison
val str1 = "Hello"
val str2 = "Hello"
val str3 = "World"

val areEqual = str1 == str2     // true (structural equality)
val identical = str1 === str2   // true (referential equality)
val notSame = str1 == str3      // false

// Compare with compareTo()
val compare = str1.compareTo(str3)  // Negative (Hello < World)

// Range check dengan in
val age = 25
val isAdult = age in 18..65     // true
val notChild = age !in 0..17    // true`}
          </CodeBlock>

          <Note type="info">
            <strong>== vs ===:</strong><br/>
            <code>==</code> checks structural equality (content)<br/>
            <code>===</code> checks referential equality (same object reference)
          </Note>
        </Subsection>

        <Subsection id="logical-operators" heading="Logical Operators">
          <CodeBlock language="kotlin">
{`// Logical operators
val and = true && false    // false (logical AND)
val or = true || false     // true (logical OR)
val not = !true            // false (logical NOT)

// Complex conditions
val age = 25
val hasLicense = true
val canDrive = age >= 17 && hasLicense  // true

// Short-circuit evaluation
fun expensiveCheck(): Boolean {
    println("Expensive check called")
    return true
}

// AND: jika left false, right tidak dievaluasi
val result1 = false && expensiveCheck()  // "Expensive check" TIDAK terprint

// OR: jika left true, right tidak dievaluasi
val result2 = true || expensiveCheck()   // "Expensive check" TIDAK terprint

// Combining conditions
val score = 85
val isPassing = score >= 60 && score <= 100
val isExcellent = score >= 90 || (score >= 80 && score < 90)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="bitwise-operators" heading="Bitwise Operations">
          <CodeBlock language="kotlin">
{`// Bitwise operations (menggunakan named functions, bukan operators)
val x = 0b1010  // 10 in binary
val y = 0b1100  // 12 in binary

val and = x and y      // 0b1000 = 8
val or = x or y        // 0b1110 = 14
val xor = x xor y      // 0b0110 = 6
val inv = x.inv()      // Bitwise NOT

// Shift operations
val leftShift = x shl 1   // 0b10100 = 20 (multiply by 2)
val rightShift = x shr 1  // 0b0101 = 5 (divide by 2)
val unsignedRight = x ushr 1  // Unsigned right shift

// Practical example: Flags
const val FLAG_A = 1 shl 0  // 0b0001 = 1
const val FLAG_B = 1 shl 1  // 0b0010 = 2
const val FLAG_C = 1 shl 2  // 0b0100 = 4

var flags = 0
flags = flags or FLAG_A or FLAG_C  // Set FLAG_A and FLAG_C
val hasA = (flags and FLAG_A) != 0  // Check if FLAG_A is set
flags = flags and FLAG_B.inv()     // Clear FLAG_B`}
          </CodeBlock>
        </Subsection>

        <Subsection id="range-operator" heading="Range Operator">
          <CodeBlock language="kotlin">
{`// Range dengan .. (inclusive)
val range1 = 1..10           // 1 to 10 (including 10)
val range2 = 'a'..'z'        // 'a' to 'z'

// until (exclusive end)
val range3 = 1 until 10      // 1 to 9 (excluding 10)

// downTo (descending)
val range4 = 10 downTo 1     // 10 to 1

// step (custom increment)
val range5 = 1..10 step 2    // 1, 3, 5, 7, 9
val range6 = 10 downTo 1 step 3  // 10, 7, 4, 1

// Check membership dengan in
val isInRange = 5 in 1..10   // true
val notInRange = 15 !in 1..10  // true

// Iterate over range
for (i in 1..5) {
    println(i)  // 1, 2, 3, 4, 5
}

for (i in 10 downTo 1 step 2) {
    println(i)  // 10, 8, 6, 4, 2
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="elvis-operator" heading="Elvis Operator (?:)">
          <CodeBlock language="kotlin">
{`// Elvis operator untuk default value jika null
val nullableValue: String? = null
val result = nullableValue ?: "Default Value"  // "Default Value"

val nonNull: String? = "Hello"
val result2 = nonNull ?: "Default"  // "Hello"

// Real-world example
fun getUserName(user: User?): String {
    return user?.name ?: "Guest"
}

// Chaining elvis operators
val firstName: String? = null
val lastName: String? = null
val displayName = firstName ?: lastName ?: "Anonymous"

// With early return
fun processUser(user: User?) {
    val validUser = user ?: run {
        println("Invalid user")
        return
    }
    // Process validUser here
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Type System */}
      <Section id="type-system" heading="Type System">
        <Subsection id="type-inference" heading="Type Inference">
          <CodeBlock language="kotlin">
{`// Kotlin bisa infer type otomatis
val integer = 42              // Type: Int
val floating = 3.14           // Type: Double
val text = "Hello"            // Type: String
val flag = true               // Type: Boolean
val list = listOf(1, 2, 3)    // Type: List<Int>

// Explicit type annotation (optional tapi kadang lebih clear)
val explicitInt: Int = 42
val explicitString: String = "Hello"

// Type inference dengan function return type
fun getNumber() = 42          // Return type: Int (inferred)
fun getString(): String = "Hello"  // Explicit return type

// Type inference limitations
val ambiguous = null          // ❌ Error: cannot infer type
val explicit: String? = null  // ✅ OK dengan explicit type`}
          </CodeBlock>
        </Subsection>

        <Subsection id="smart-cast" heading="Smart Casts">
          <CodeBlock language="kotlin">
{`// Smart cast setelah type check
fun printLength(obj: Any) {
    if (obj is String) {
        // obj otomatis di-cast ke String di sini
        println(obj.length)  // No explicit cast needed!
    }
}

// Smart cast dengan when
fun describe(obj: Any): String = when (obj) {
    is Int -> "Integer: $obj"
    is String -> "String with length \${obj.length}"
    is Array<*> -> "Array with size \${obj.size}"
    else -> "Unknown type"
}

// Smart cast setelah null check
fun getLength(str: String?): Int {
    if (str != null) {
        // str otomatis di-cast ke String (non-nullable)
        return str.length
    }
    return 0
}

// Smart cast tidak work jika var bisa berubah
var mutableString: String? = "Hello"
if (mutableString != null) {
    // ❌ Smart cast tidak work karena mutableString bisa diubah
    // println(mutableString.length)  // Error
}

// Solution: use local val
val localString = mutableString
if (localString != null) {
    println(localString.length)  // ✅ OK
}`}
          </CodeBlock>

          <Note type="tip">
            Smart casts adalah salah satu fitur paling powerful di Kotlin. Compiler automatically 
            cast type setelah type check, mengurangi boilerplate explicit casting.
          </Note>
        </Subsection>

        <Subsection id="explicit-cast" heading="Explicit Type Casting">
          <CodeBlock language="kotlin">
{`// Unsafe cast dengan as (throw exception jika gagal)
val obj: Any = "Hello"
val str: String = obj as String  // ✅ OK
val num: Int = obj as Int        // ❌ ClassCastException

// Safe cast dengan as? (return null jika gagal)
val safeStr: String? = obj as? String  // ✅ "Hello"
val safeNum: Int? = obj as? Int        // ✅ null (no exception)

// Real-world example
fun processData(data: Any) {
    val stringData = data as? String
    if (stringData != null) {
        println("Processing string: $stringData")
    }
    
    val intData = data as? Int
    if (intData != null) {
        println("Processing int: $intData")
    }
}

// With elvis operator
fun getUserName(obj: Any): String {
    return (obj as? User)?.name ?: "Unknown"
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="any-nothing-unit" heading="Any, Nothing, dan Unit">
          <CodeBlock language="kotlin">
{`// Any - supertype dari semua non-nullable types
val anyValue: Any = "String"
val anyNumber: Any = 123
val anyBoolean: Any = true

fun acceptAnything(value: Any) {
    println("Value: $value")
}

// Any? - supertype dari semua types (including null)
val nullable: Any? = null

// Unit - equivalent dengan void di Java
fun printMessage(): Unit {
    println("Message")
    // Implicit return Unit
}

fun printHello() {  // : Unit dapat dihilangkan
    println("Hello")
}

// Nothing - type yang tidak punya value (never returns normally)
fun fail(message: String): Nothing {
    throw IllegalStateException(message)
}

fun infiniteLoop(): Nothing {
    while (true) {
        // Never returns
    }
}

// Nothing berguna untuk type inference
val result = nullValue ?: fail("Value cannot be null")
// Compiler tahu result pasti non-null karena fail() never returns`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Constants */}
      <Section id="constants" heading="Constants">
        <Subsection id="compile-time-constants" heading="Compile-Time Constants (const)">
          <CodeBlock language="kotlin">
{`// const val untuk compile-time constants (top-level atau object)
const val MAX_USERS = 100
const val API_URL = "https://api.example.com"
const val VERSION = "1.0.0"

// const hanya bisa untuk primitive types dan String
const val PI = 3.14159
const val DEBUG = true

// ❌ const tidak bisa untuk types lainnya
// const val list = listOf(1, 2, 3)  // Error

// const di dalam object atau companion object
object Config {
    const val DATABASE_NAME = "myapp.db"
    const val TIMEOUT_MS = 5000
}

class AppConstants {
    companion object {
        const val APP_NAME = "MyApp"
        const val MAX_RETRIES = 3
    }
}

// Usage
fun connectDatabase() {
    val dbName = Config.DATABASE_NAME
    println("Connecting to $dbName")
}`}
          </CodeBlock>

          <Note type="info">
            <code>const val</code> values di-inline oleh compiler saat compile time, 
            menghasilkan performa yang lebih baik. Gunakan untuk values yang truly constant.
          </Note>
        </Subsection>

        <Subsection id="runtime-constants" heading="Runtime Constants (val)">
          <CodeBlock language="kotlin">
{`// val untuk runtime constants
val currentTime = System.currentTimeMillis()  // Evaluated at runtime
val userName = getUserFromDatabase()          // Evaluated at runtime

// val di class properties
class User(val id: Int, val name: String) {
    val createdAt = System.currentTimeMillis()  // Set saat object dibuat
}

// val dengan backing field
class Counter {
    var value = 0
        private set  // Setter private, getter public
    
    fun increment() {
        value++
    }
}

// Lazy val (evaluated on first access)
val expensiveValue by lazy {
    println("Computing expensive value...")
    performExpensiveComputation()
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Kesimpulan */}
      <Section id="conclusion" heading="Kesimpulan">
        <p>
          Dalam materi ini, kita telah mempelajari fundamental Kotlin programming:
        </p>

        <ul>
          <li>✅ <strong>Variables:</strong> <code>val</code> (immutable) vs <code>var</code> (mutable)</li>
          <li>✅ <strong>Data Types:</strong> Numeric types, Boolean, Char, String, Arrays</li>
          <li>✅ <strong>Operators:</strong> Arithmetic, comparison, logical, bitwise, ranges</li>
          <li>✅ <strong>Type System:</strong> Type inference, smart casts, explicit casting</li>
          <li>✅ <strong>Constants:</strong> <code>const val</code> vs <code>val</code></li>
        </ul>

        <Note type="success">
          <strong>Key Takeaways:</strong>
          <ul>
            <li>Prefer <code>val</code> over <code>var</code> untuk immutability</li>
            <li>Leverage type inference untuk cleaner code</li>
            <li>Use smart casts untuk type-safe operations</li>
            <li>String templates membuat string manipulation lebih readable</li>
          </ul>
        </Note>

        <p>
          Di materi selanjutnya, kita akan belajar tentang <strong>Control Flow</strong>: 
          if expressions, when expressions, loops, dan exception handling.
        </p>
      </Section>
    </MateriLayout>
  );
}
