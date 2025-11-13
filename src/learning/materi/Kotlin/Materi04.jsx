import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi04() {
  return (
    <MateriLayout
      title="Control Flow"
      intro="Control flow mengatur alur eksekusi program. Di Kotlin, control flow structures seperti if, when, dan loops adalah expressions yang dapat return value, membuat code lebih concise dan expressive."
    >
      {/* If Expression */}
      <Section id="if-expression" heading="If Expression">
        <p>
          Di Kotlin, <code>if</code> adalah expression (return value), bukan hanya statement. 
          Ini membuat code lebih concise dan functional.
        </p>

        <Subsection id="if-basic" heading="Basic If Expression">
          <CodeBlock language="kotlin">
{`// If sebagai statement (Java style)
val age = 18
if (age >= 18) {
    println("Adult")
} else {
    println("Minor")
}

// If sebagai expression (return value)
val status = if (age >= 18) "Adult" else "Minor"
println(status)  // "Adult"

// If expression dengan multiple lines
val message = if (age >= 18) {
    val years = age - 18
    "Adult for $years years"
} else {
    val yearsUntil = 18 - age
    "Will be adult in $yearsUntil years"
}

// Nested if expressions
val score = 85
val grade = if (score >= 90) {
    "A"
} else if (score >= 80) {
    "B"
} else if (score >= 70) {
    "C"
} else if (score >= 60) {
    "D"
} else {
    "F"
}`}
          </CodeBlock>

          <Note type="info">
            Ketika if digunakan sebagai expression, <code>else</code> branch wajib ada. 
            Last expression di setiap branch adalah return value.
          </Note>
        </Subsection>

        <Subsection id="if-one-liner" heading="If One-Liner">
          <CodeBlock language="kotlin">
{`// One-liner if (no curly braces)
val max = if (a > b) a else b
val min = if (a < b) a else b

// Ternary operator equivalent (tidak ada di Kotlin)
// Java: String result = condition ? "yes" : "no";
// Kotlin: val result = if (condition) "yes" else "no"

// Multiple conditions
val canVote = if (age >= 18 && isCitizen) true else false
// Atau lebih simple:
val canVote2 = age >= 18 && isCitizen

// With function calls
val displayName = if (user.nickname != null) user.nickname else user.name
// Atau dengan elvis operator:
val displayName2 = user.nickname ?: user.name`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* When Expression */}
      <Section id="when-expression" heading="When Expression">
        <p>
          <code>when</code> adalah replacement yang powerful untuk switch-case di Java. 
          When expression bisa match multiple conditions, ranges, types, dan arbitrary expressions.
        </p>

        <Subsection id="when-basic" heading="Basic When Expression">
          <CodeBlock language="kotlin">
{`// When dengan discrete values
val day = 3
val dayName = when (day) {
    1 -> "Monday"
    2 -> "Tuesday"
    3 -> "Wednesday"
    4 -> "Thursday"
    5 -> "Friday"
    6 -> "Saturday"
    7 -> "Sunday"
    else -> "Invalid day"
}

// When dengan multiple values
val dayType = when (day) {
    1, 2, 3, 4, 5 -> "Weekday"
    6, 7 -> "Weekend"
    else -> "Invalid"
}

// When sebagai statement (tanpa return value)
when (day) {
    1 -> println("Start of week")
    5 -> println("Almost weekend")
    6, 7 -> println("Weekend!")
    else -> println("Regular day")
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="when-ranges" heading="When dengan Ranges">
          <CodeBlock language="kotlin">
{`// When dengan range check
val age = 25
val ageGroup = when (age) {
    in 0..12 -> "Child"
    in 13..17 -> "Teenager"
    in 18..64 -> "Adult"
    in 65..120 -> "Senior"
    else -> "Invalid age"
}

// When dengan multiple range conditions
val score = 85
val grade = when (score) {
    in 90..100 -> "A"
    in 80..89 -> "B"
    in 70..79 -> "C"
    in 60..69 -> "D"
    else -> "F"
}

// When dengan exclusion (!in)
val temperature = 25
val comfort = when (temperature) {
    in 20..25 -> "Perfect"
    !in 15..30 -> "Too extreme"
    else -> "Acceptable"
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="when-type-check" heading="When dengan Type Checking">
          <CodeBlock language="kotlin">
{`// When dengan is (type checking)
fun describe(obj: Any): String = when (obj) {
    is String -> "String of length \${obj.length}"
    is Int -> "Integer with value $obj"
    is Double -> "Double with value $obj"
    is List<*> -> "List with \${obj.size} elements"
    is Array<*> -> "Array with \${obj.size} elements"
    else -> "Unknown type: \${obj::class.simpleName}"
}

// Smart cast dalam when
fun processData(data: Any) {
    when (data) {
        is String -> {
            // data otomatis di-cast ke String
            println("Uppercase: \${data.uppercase()}")
            println("Length: \${data.length}")
        }
        is Int -> {
            // data otomatis di-cast ke Int
            println("Double: \${data * 2}")
            println("Square: \${data * data}")
        }
        is List<*> -> {
            println("First: \${data.firstOrNull()}")
            println("Last: \${data.lastOrNull()}")
        }
    }
}`}
          </CodeBlock>

          <Note type="tip">
            When dengan type checking mendapat smart cast otomatis, sama seperti if expression.
          </Note>
        </Subsection>

        <Subsection id="when-conditions" heading="When dengan Arbitrary Conditions">
          <CodeBlock language="kotlin">
{`// When tanpa argument (seperti if-else chain)
val x = 10
val y = 20

when {
    x > y -> println("x is greater")
    x < y -> println("y is greater")
    else -> println("x equals y")
}

// Complex conditions
val user = User("John", 25, true)

when {
    user.age < 18 -> println("Minor")
    user.age >= 18 && user.isVerified -> println("Verified adult")
    user.age >= 18 && !user.isVerified -> println("Unverified adult")
    else -> println("Unknown status")
}

// With function calls
val password = "12345"

when {
    password.length < 8 -> println("Too short")
    !password.any { it.isDigit() } -> println("Must contain digit")
    !password.any { it.isUpperCase() } -> println("Must contain uppercase")
    else -> println("Valid password")
}

// Assign result
val validation = when {
    password.length < 8 -> "Too short"
    password.length > 20 -> "Too long"
    !password.any { it.isDigit() } -> "Must contain digit"
    else -> "Valid"
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="when-sealed" heading="When dengan Sealed Classes">
          <CodeBlock language="kotlin">
{`// Sealed class untuk exhaustive when
sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val message: String) : Result()
    object Loading : Result()
}

// When dengan sealed class (no else needed - exhaustive)
fun handleResult(result: Result) = when (result) {
    is Result.Success -> println("Success: \${result.data}")
    is Result.Error -> println("Error: \${result.message}")
    Result.Loading -> println("Loading...")
    // Tidak perlu else - compiler memastikan semua cases covered
}

// Compiler error jika ada case yang missing
fun incomplete(result: Result) = when (result) {
    is Result.Success -> "OK"
    is Result.Error -> "Failed"
    // ❌ Error: 'when' expression must be exhaustive
}`}
          </CodeBlock>

          <Note type="info">
            When dengan sealed classes adalah exhaustive - compiler memastikan semua subclasses 
            di-handle, memberikan compile-time safety.
          </Note>
        </Subsection>
      </Section>

      {/* For Loop */}
      <Section id="for-loop" heading="For Loop">
        <p>
          For loop di Kotlin iterate over anything yang menyediakan iterator - ranges, arrays, 
          collections, atau custom iterables.
        </p>

        <Subsection id="for-range" heading="For Loop dengan Range">
          <CodeBlock language="kotlin">
{`// Basic for loop dengan range
for (i in 1..5) {
    println(i)  // 1, 2, 3, 4, 5
}

// Range dengan step
for (i in 1..10 step 2) {
    println(i)  // 1, 3, 5, 7, 9
}

// Descending range
for (i in 10 downTo 1) {
    println(i)  // 10, 9, 8, ..., 1
}

// Descending dengan step
for (i in 10 downTo 1 step 2) {
    println(i)  // 10, 8, 6, 4, 2
}

// until (exclusive end)
for (i in 1 until 10) {
    println(i)  // 1, 2, 3, ..., 9 (10 tidak included)
}

// Char range
for (c in 'a'..'z') {
    print(c)  // abcdefghijklmnopqrstuvwxyz
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="for-array" heading="For Loop dengan Array">
          <CodeBlock language="kotlin">
{`// Iterate array elements
val numbers = arrayOf(1, 2, 3, 4, 5)
for (num in numbers) {
    println(num)
}

// Iterate dengan index
for (i in numbers.indices) {
    println("numbers[$i] = \${numbers[i]}")
}

// Iterate dengan index dan value (withIndex)
for ((index, value) in numbers.withIndex()) {
    println("Index $index: $value")
}

// Alternative: forEachIndexed
numbers.forEachIndexed { index, value ->
    println("Index $index: $value")
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="for-collection" heading="For Loop dengan Collections">
          <CodeBlock language="kotlin">
{`// Iterate list
val fruits = listOf("apple", "banana", "orange")
for (fruit in fruits) {
    println(fruit)
}

// Iterate dengan index
for (i in fruits.indices) {
    println("\${i + 1}. \${fruits[i]}")
}

// Iterate map entries
val scores = mapOf("Alice" to 90, "Bob" to 85, "Charlie" to 95)
for ((name, score) in scores) {
    println("$name scored $score")
}

// Iterate map keys
for (name in scores.keys) {
    println("Student: $name")
}

// Iterate map values
for (score in scores.values) {
    println("Score: $score")
}

// Nested iteration
val matrix = listOf(
    listOf(1, 2, 3),
    listOf(4, 5, 6),
    listOf(7, 8, 9)
)

for (row in matrix) {
    for (element in row) {
        print("$element ")
    }
    println()
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="for-break-continue" heading="Break & Continue">
          <CodeBlock language="kotlin">
{`// break - exit loop immediately
for (i in 1..10) {
    if (i == 5) break
    println(i)  // 1, 2, 3, 4
}

// continue - skip current iteration
for (i in 1..10) {
    if (i % 2 == 0) continue  // Skip even numbers
    println(i)  // 1, 3, 5, 7, 9
}

// Labeled break (nested loops)
outer@ for (i in 1..3) {
    for (j in 1..3) {
        if (i == 2 && j == 2) break@outer  // Break outer loop
        println("i=$i, j=$j")
    }
}

// Labeled continue
outer@ for (i in 1..3) {
    for (j in 1..3) {
        if (j == 2) continue@outer  // Continue outer loop
        println("i=$i, j=$j")
    }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* While Loop */}
      <Section id="while-loop" heading="While Loop">
        <Subsection id="while-basic" heading="While Loop">
          <CodeBlock language="kotlin">
{`// Basic while loop
var count = 0
while (count < 5) {
    println(count)
    count++
}

// While dengan complex condition
var attempts = 0
var success = false
while (!success && attempts < 3) {
    success = tryConnection()
    attempts++
    if (!success) {
        println("Retrying... (attempt $attempts)")
    }
}

// Infinite loop dengan break
while (true) {
    val input = readLine()
    if (input == "exit") break
    println("You entered: $input")
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="do-while" heading="Do-While Loop">
          <CodeBlock language="kotlin">
{`// Do-while - execute at least once
var number = 0
do {
    println(number)
    number++
} while (number < 5)

// Example: input validation
var password: String
do {
    print("Enter password (min 8 chars): ")
    password = readLine() ?: ""
} while (password.length < 8)

// Do-while dengan break
var count = 0
do {
    println(count)
    count++
    if (count == 3) break
} while (count < 10)  // Loop stops at 3, not 10`}
          </CodeBlock>

          <Note type="info">
            Perbedaan while dan do-while: do-while body akan execute minimal 1x, 
            sedangkan while bisa 0x jika condition awalnya false.
          </Note>
        </Subsection>
      </Section>

      {/* Repeat Function */}
      <Section id="repeat" heading="Repeat Function">
        <CodeBlock language="kotlin">
{`// repeat - execute block n times
repeat(5) {
    println("Hello")
}

// repeat dengan index
repeat(5) { index ->
    println("Iteration $index")  // 0, 1, 2, 3, 4
}

// Real-world example: retry logic
repeat(3) { attempt ->
    try {
        connectToServer()
        return@repeat  // Success, exit repeat
    } catch (e: Exception) {
        if (attempt == 2) {
            println("Failed after 3 attempts")
            throw e
        }
        println("Attempt \${attempt + 1} failed, retrying...")
        Thread.sleep(1000)
    }
}

// Countdown example
repeat(10) {
    val remaining = 10 - it
    println("$remaining...")
    Thread.sleep(1000)
}
println("Launch!")`}
        </CodeBlock>
      </Section>

      {/* Returns & Jumps */}
      <Section id="returns-jumps" heading="Returns & Jumps">
        <Subsection id="return-statement" heading="Return Statement">
          <CodeBlock language="kotlin">
{`// Basic return
fun calculateSum(a: Int, b: Int): Int {
    return a + b
}

// Early return
fun validate(age: Int): Boolean {
    if (age < 0) return false  // Early return
    if (age > 150) return false
    return true
}

// Return dari lambda (explicit label)
fun processNumbers(numbers: List<Int>) {
    numbers.forEach {
        if (it < 0) return@forEach  // Continue to next iteration
        println(it)
    }
}

// Return dari outer function
fun findFirst(numbers: List<Int>): Int? {
    numbers.forEach {
        if (it > 10) return it  // Return dari findFirst function
    }
    return null
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="labels" heading="Labels">
          <CodeBlock language="kotlin">
{`// Custom labels untuk return/break/continue
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach loop@{
        if (it == 3) return@loop  // Continue loop
        println(it)
    }
    println("Done")  // This will execute
}

// Implicit label (sama dengan function name)
fun bar() {
    listOf(1, 2, 3, 4, 5).forEach {
        if (it == 3) return@forEach
        println(it)
    }
}

// Return value dari lambda
val result = run loop@{
    for (i in 1..10) {
        if (i == 5) return@loop i  // Return 5
    }
    -1  // Default return
}

// Nested labels
outer@ for (i in 1..3) {
    inner@ for (j in 1..3) {
        if (i == 2 && j == 2) {
            break@outer  // Break from outer loop
        }
        println("$i, $j")
    }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Exception Handling */}
      <Section id="exception-handling" heading="Exception Handling">
        <Subsection id="try-catch" heading="Try-Catch">
          <CodeBlock language="kotlin">
{`// Basic try-catch
try {
    val result = 10 / 0  // ArithmeticException
    println(result)
} catch (e: ArithmeticException) {
    println("Cannot divide by zero")
}

// Multiple catch blocks
try {
    val number = "abc".toInt()
} catch (e: NumberFormatException) {
    println("Invalid number format")
} catch (e: Exception) {
    println("General error: \${e.message}")
}

// Try-catch dengan finally
var file: File? = null
try {
    file = File("data.txt")
    val content = file.readText()
    println(content)
} catch (e: FileNotFoundException) {
    println("File not found")
} catch (e: IOException) {
    println("IO error: \${e.message}")
} finally {
    file?.close()  // Always executed
    println("Cleanup completed")
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="try-expression" heading="Try sebagai Expression">
          <CodeBlock language="kotlin">
{`// Try-catch as expression (return value)
val number: Int? = try {
    "123".toInt()
} catch (e: NumberFormatException) {
    null  // Return null if parsing fails
}

// With default value
val safeNumber = try {
    userInput.toInt()
} catch (e: NumberFormatException) {
    0  // Default to 0
}

// More complex example
fun parseUserInput(input: String): Result<Int> {
    val value = try {
        input.toInt()
    } catch (e: NumberFormatException) {
        return Result.failure(e)
    }
    
    return if (value > 0) {
        Result.success(value)
    } else {
        Result.failure(IllegalArgumentException("Value must be positive"))
    }
}`}
          </CodeBlock>

          <Note type="tip">
            Try-catch sebagai expression membuat error handling lebih functional dan concise.
          </Note>
        </Subsection>

        <Subsection id="throw-exception" heading="Throwing Exceptions">
          <CodeBlock language="kotlin">
{`// Throw exception
fun divide(a: Int, b: Int): Int {
    if (b == 0) {
        throw IllegalArgumentException("Divisor cannot be zero")
    }
    return a / b
}

// Throw adalah expression (return Nothing)
val result = userInput ?: throw IllegalStateException("Input is null")

// Custom exception
class InvalidAgeException(message: String) : Exception(message)

fun validateAge(age: Int) {
    if (age < 0 || age > 150) {
        throw InvalidAgeException("Age must be between 0 and 150")
    }
}

// Checked exceptions tidak ada di Kotlin
// Semua exceptions adalah unchecked (tidak perlu declare dengan throws)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="preconditions" heading="Precondition Functions">
          <CodeBlock language="kotlin">
{`// require - untuk input validation (throw IllegalArgumentException)
fun setAge(age: Int) {
    require(age >= 0) { "Age cannot be negative" }
    require(age <= 150) { "Age must be realistic" }
    this.age = age
}

// check - untuk state validation (throw IllegalStateException)
fun withdraw(amount: Double) {
    check(isOpen) { "Account is closed" }
    check(balance >= amount) { "Insufficient balance" }
    balance -= amount
}

// requireNotNull - check non-null (throw IllegalArgumentException)
fun processUser(user: User?) {
    val validUser = requireNotNull(user) { "User cannot be null" }
    // validUser is non-nullable here
    println(validUser.name)
}

// checkNotNull - check non-null (throw IllegalStateException)
fun initialize() {
    val config = checkNotNull(loadConfig()) { "Configuration not found" }
    // config is non-nullable here
}

// error - throw IllegalStateException
fun processState(state: State) {
    when (state) {
        State.READY -> println("Ready")
        State.RUNNING -> println("Running")
        else -> error("Invalid state: $state")
    }
}

// TODO - throw NotImplementedError
fun featureNotReady() {
    TODO("This feature is not implemented yet")
}`}
          </CodeBlock>

          <Note type="info">
            Precondition functions menjadikan validations lebih expressive dan self-documenting, 
            dengan clear error messages.
          </Note>
        </Subsection>
      </Section>

      {/* Kesimpulan */}
      <Section id="conclusion" heading="Kesimpulan">
        <p>
          Dalam materi ini, kita telah mempelajari control flow structures di Kotlin:
        </p>

        <ul>
          <li>✅ <strong>If Expression:</strong> Conditional logic yang return value</li>
          <li>✅ <strong>When Expression:</strong> Powerful replacement untuk switch-case</li>
          <li>✅ <strong>For Loop:</strong> Iterate ranges, arrays, dan collections</li>
          <li>✅ <strong>While/Do-While:</strong> Condition-based loops</li>
          <li>✅ <strong>Break/Continue:</strong> Loop control dengan labels</li>
          <li>✅ <strong>Exception Handling:</strong> Try-catch sebagai expression</li>
        </ul>

        <Note type="success">
          <strong>Key Takeaways:</strong>
          <ul>
            <li>If dan when adalah expressions yang return value</li>
            <li>When expression lebih powerful dan flexible dari switch-case</li>
            <li>For loops bekerja dengan anything yang iterable</li>
            <li>Labels memberikan fine-grained control untuk nested structures</li>
            <li>Exception handling bisa digunakan sebagai expression</li>
          </ul>
        </Note>

        <p>
          Di materi selanjutnya, kita akan deep dive ke <strong>Functions & Lambda</strong>: 
          function declarations, parameters, lambda expressions, dan higher-order functions.
        </p>
      </Section>
    </MateriLayout>
  );
}
