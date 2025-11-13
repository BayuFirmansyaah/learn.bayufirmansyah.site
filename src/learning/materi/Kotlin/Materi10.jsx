import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi10() {
  return (
    <MateriLayout
      title="Null Safety"
      intro="Null safety adalah salah satu fitur paling powerful di Kotlin yang menghilangkan billion-dollar mistake: NullPointerException. Kotlin's type system membedakan nullable dan non-nullable references."
    >
      {/* Nullable Types */}
      <Section id="nullable-types" heading="Nullable Types">
        <Subsection id="nullable-basics" heading="Nullable Type Basics">
          <CodeBlock language="kotlin">
{`// Non-nullable type (default)
var name: String = "John"
// name = null  // ❌ Compile error

// Nullable type (dengan ?)
var nickname: String? = "Johnny"
nickname = null  // ✅ OK

// Function dengan nullable parameters & return
fun greet(name: String?): String? {
    return if (name != null) "Hello, $name" else null
}

println(greet("Alice"))  // "Hello, Alice"
println(greet(null))     // null`}
          </CodeBlock>
        </Subsection>

        <Subsection id="safe-calls" heading="Safe Call Operator (?.)">
          <CodeBlock language="kotlin">
{`// Safe call - only execute if not null
val name: String? = "John"
println(name?.length)  // 4

val nullName: String? = null
println(nullName?.length)  // null (tidak throw exception)

// Chaining safe calls
data class Person(val name: String, val address: Address?)
data class Address(val city: String?, val zipCode: String?)

val person: Person? = Person("John", Address("Jakarta", null))

// Safe call chain
val zipCode = person?.address?.zipCode  // null
val city = person?.address?.city  // "Jakarta"

// Safe call dengan let
person?.address?.city?.let {
    println("City: $it")
}

// Safe call dengan assignment
data class User(var email: String?)
val user: User? = User("john@mail.com")
user?.email = "newemail@mail.com"  // Only if user not null`}
          </CodeBlock>
        </Subsection>

        <Subsection id="elvis-operator" heading="Elvis Operator (?:)">
          <CodeBlock language="kotlin">
{`// Elvis operator - provide default value
val name: String? = null
val displayName = name ?: "Guest"  // "Guest"

val name2: String? = "John"
val displayName2 = name2 ?: "Guest"  // "John"

// Elvis dengan safe call
fun getLength(text: String?): Int {
    return text?.length ?: 0
}

// Elvis dengan early return
fun processUser(user: User?) {
    val validUser = user ?: return
    // Continue with validUser (non-nullable)
    println(validUser.name)
}

// Elvis dengan throw
fun requireUser(user: User?): User {
    return user ?: throw IllegalArgumentException("User required")
}

// Chaining elvis
val firstName: String? = null
val lastName: String? = null
val defaultName = "Anonymous"

val name = firstName ?: lastName ?: defaultName  // "Anonymous"`}
          </CodeBlock>
        </Subsection>

        <Subsection id="not-null-assertion" heading="Not-Null Assertion (!!)">
          <CodeBlock language="kotlin">
{`// !! operator - assert value is not null (throw NPE if null)
val name: String? = "John"
val length = name!!.length  // ✅ OK - name is not null

val nullName: String? = null
// val length2 = nullName!!.length  // ❌ NullPointerException

// Use !! only when you're absolutely sure value is not null
fun processData(data: String?) {
    // Bad practice - avoid !!
    println(data!!.length)
    
    // Better - use safe call or let
    println(data?.length)
    data?.let { println(it.length) }
}

// Double bang (!!) should be rare
// Prefer: safe call (?.), elvis (?:), or let`}
          </CodeBlock>

          <Note type="warning">
            Avoid using <code>!!</code> operator kecuali absolutely necessary. 
            Gunakan safe calls atau null checks instead untuk safer code.
          </Note>
        </Subsection>
      </Section>

      {/* Null Checks */}
      <Section id="null-checks" heading="Null Checks & Smart Casts">
        <CodeBlock language="kotlin">
{`// Null check dengan if
fun getLength(text: String?): Int {
    if (text != null) {
        // text is smart-casted to String (non-nullable)
        return text.length
    }
    return 0
}

// Null check dengan return
fun printLength(text: String?) {
    if (text == null) return
    // text is non-nullable here
    println(text.length)
}

// Null check dengan when
fun describe(value: Any?): String = when (value) {
    null -> "null value"
    is String -> "string with length \${value.length}"
    is Int -> "integer: $value"
    else -> "unknown type"
}

// Null check dengan require/check
fun processUser(user: User?) {
    require(user != null) { "User cannot be null" }
    // user is non-nullable here
    println(user.name)
}

// Multiple null checks
fun process(a: String?, b: String?) {
    if (a != null && b != null) {
        // Both a and b are non-nullable here
        println(a.length + b.length)
    }
}`}
        </CodeBlock>
      </Section>

      {/* Safe Casts */}
      <Section id="safe-casts" heading="Safe Casts">
        <CodeBlock language="kotlin">
{`// as? - safe cast operator (returns null if cast fails)
val obj: Any = "Hello"

val str: String? = obj as? String  // ✅ "Hello"
val num: Int? = obj as? Int        // ✅ null (no exception)

// Using safe cast dengan elvis
fun getStringLength(obj: Any): Int {
    return (obj as? String)?.length ?: 0
}

// Safe cast dengan when
fun process(obj: Any) {
    when (val str = obj as? String) {
        null -> println("Not a string")
        else -> println("String: $str, length: \${str.length}")
    }
}

// Compare dengan unsafe cast
// val str2 = obj as Int  // ❌ ClassCastException if obj is not Int`}
        </CodeBlock>
      </Section>

      {/* Collections of Nullable */}
      <Section id="nullable-collections" heading="Nullable Collections">
        <CodeBlock language="kotlin">
{`// Different nullable scenarios

// 1. Non-nullable list of non-nullable elements
val list1: List<String> = listOf("a", "b", "c")

// 2. Non-nullable list of nullable elements
val list2: List<String?> = listOf("a", null, "c")

// 3. Nullable list of non-nullable elements
val list3: List<String>? = null

// 4. Nullable list of nullable elements
val list4: List<String?>? = null

// Filtering nulls
val withNulls = listOf("a", null, "b", null, "c")
val nonNulls = withNulls.filterNotNull()  // ["a", "b", "c"]

// Map with nullable keys/values
val map1: Map<String, Int?> = mapOf("a" to 1, "b" to null)
val map2: Map<String?, Int> = mapOf("a" to 1, null to 2)

// Safe access to nullable collection
fun getFirst(list: List<String>?): String? {
    return list?.firstOrNull()
}`}
        </CodeBlock>
      </Section>

      {/* Let, Run, Also, Apply dengan Nullability */}
      <Section id="scope-functions-null" heading="Scope Functions dengan Null Safety">
        <CodeBlock language="kotlin">
{`// let - execute only if not null
val name: String? = "John"
name?.let {
    println("Name is $it")
    println("Length: \${it.length}")
}

// Multiple null checks dengan let
fun processUser(user: User?) {
    user?.address?.city?.let { city ->
        println("User lives in $city")
    }
}

// also - for side effects
val result = database.findUser(id)?.also {
    println("User found: \${it.name}")
    logAccess(it)
}

// run - with nullable receiver
val config: Config? = loadConfig()
val port = config?.run {
    println("Loading config...")
    port
} ?: 8080  // Default port if config is null

// Chaining với null safety
data class Company(val name: String, val ceo: Person?)
data class Person(val name: String, val age: Int?)

val company: Company? = getCompany()
val ceoAge = company?.ceo?.age?.let { "CEO age: $it" } ?: "Unknown"`}
        </CodeBlock>
      </Section>

      {/* Platform Types */}
      <Section id="platform-types" heading="Platform Types (Java Interop)">
        <CodeBlock language="kotlin">
{`// Platform types - types dari Java code (nullability unknown)
// Notation: String! (may or may not be null)

// Java method: public String getName() { ... }
// Kotlin sees: getName(): String!

// Option 1: Treat as nullable
val name: String? = javaObject.getName()
println(name?.length)

// Option 2: Treat as non-nullable (at your own risk)
val name2: String = javaObject.getName()
println(name2.length)  // May throw NPE if actually null

// Best practice: Add nullability annotations in Java
// @Nullable String getName()  -> String? in Kotlin
// @NotNull String getName()   -> String in Kotlin

// Working dengan Java collections
// List<String> from Java = List<String!>! in Kotlin
val javaList: List<String?>? = getJavaList()`}
        </CodeBlock>

        <Note type="tip">
          Ketika working dengan Java code, treat values as nullable by default untuk safety, 
          kecuali documentation atau annotations menjamin non-null.
        </Note>
      </Section>

      {/* Best Practices */}
      <Section id="best-practices" heading="Null Safety Best Practices">
        <CodeBlock language="kotlin">
{`// ✅ GOOD: Use val dengan non-nullable types
val name: String = "John"

// ✅ GOOD: Use safe call
val length = name?.length

// ✅ GOOD: Use elvis operator untuk default
val displayName = nickname ?: "Guest"

// ✅ GOOD: Use let untuk null-safe operations
user?.let { println(it.name) }

// ✅ GOOD: Early return untuk null checks
fun process(data: String?) {
    if (data == null) return
    // data is non-nullable here
    println(data.length)
}

// ❌ AVOID: !! operator
// val length = name!!.length

// ❌ AVOID: Multiple consecutive !!
// val value = obj!!.property!!.field!!.method()

// ❌ AVOID: Unnecessary nullable types
// var count: Int? = 0  // Should be: var count: Int = 0

// ✅ GOOD: Use require/check untuk validation
fun setAge(age: Int?) {
    requireNotNull(age) { "Age cannot be null" }
    require(age >= 0) { "Age must be positive" }
    this.age = age
}

// ✅ GOOD: Use nullable returns untuk "not found" cases
fun findUser(id: String): User? {
    return database.query(id)  // null if not found
}

// ✅ GOOD: Use Result type untuk operations that can fail
fun loadData(): Result<Data> {
    return try {
        Result.success(database.load())
    } catch (e: Exception) {
        Result.failure(e)
    }
}`}
        </CodeBlock>
      </Section>

      {/* Kesimpulan */}
      <Section id="conclusion" heading="Kesimpulan">
        <p>
          Dalam materi ini, kita telah mempelajari null safety di Kotlin:
        </p>

        <ul>
          <li>✅ Nullable types dengan <code>?</code> operator</li>
          <li>✅ Safe call <code>?.</code> dan Elvis <code>?:</code> operators</li>
          <li>✅ Not-null assertion <code>!!</code> (use sparingly)</li>
          <li>✅ Smart casts setelah null checks</li>
          <li>✅ Scope functions dengan null safety</li>
          <li>✅ Best practices untuk null-safe code</li>
        </ul>

        <Note type="success">
          <strong>Key Takeaway:</strong> Kotlin's null safety mengeliminasi NullPointerException 
          di compile time, bukan runtime. Embrace nullable types dan safe calls untuk robust code.
          <br/><br/>
          Di materi selanjutnya: <strong>Extension Functions</strong> - menambah functionality 
          ke existing classes tanpa inheritance.
        </Note>
      </Section>
    </MateriLayout>
  );
}
