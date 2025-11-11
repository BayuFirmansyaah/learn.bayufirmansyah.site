// Materi Kotlin - 17 Materi Lengkap Best Practice

export const materiList = [
  {
    title: "Pengenalan Kotlin",
    content: `Kotlin adalah bahasa pemrograman modern yang dikembangkan oleh JetBrains. Pertama kali dirilis pada tahun 2011 dan menjadi bahasa official untuk Android development sejak Google I/O 2017.

Kotlin berjalan di atas JVM (Java Virtual Machine) dan 100% interoperable dengan Java. Artinya, kode Kotlin dapat memanggil kode Java dan sebaliknya. Ini memudahkan migration dari Java ke Kotlin secara bertahap.

Kotlin menawarkan syntax yang lebih concise dan expressive dibanding Java. Fitur-fitur modern seperti null safety, data classes, extension functions, dan coroutines membuat development lebih produktif dan safe.

Kotlin tidak hanya untuk Android. Kotlin/JVM untuk backend development, Kotlin/JS untuk web development, Kotlin/Native untuk iOS dan native applications. Kotlin Multiplatform memungkinkan code sharing antar platform.

Kotlin mendukung programming paradigm Object-Oriented dan Functional. Mix kedua paradigm ini membuat kode lebih flexible dan maintainable.`,
    keypoints: [
      "Bahasa modern dari JetBrains, official untuk Android",
      "Berjalan di JVM, 100% interoperable dengan Java",
      "Syntax lebih concise dan expressive",
      "Null safety mencegah NullPointerException",
      "Multiplatform: JVM, JS, Native, Android",
      "Mendukung OOP dan Functional Programming"
    ]
  },
  {
    title: "Instalasi & Setup Environment",
    content: `Untuk mulai dengan Kotlin, kita membutuhkan JDK (Java Development Kit) minimal versi 8. Download dan install JDK dari Oracle atau OpenJDK.

Install Kotlin compiler standalone dengan SDKMAN (Linux/Mac): sdk install kotlin. Atau download dari kotlinlang.org. Untuk Windows, gunakan Chocolatey: choco install kotlin.

IDE yang direkomendasikan adalah IntelliJ IDEA dari JetBrains. IntelliJ IDEA Community Edition gratis dan sudah include Kotlin support. Android Studio juga built-in Kotlin support.

Untuk membuat project Kotlin, gunakan IntelliJ IDEA: File > New > Project > Kotlin. Pilih target platform (JVM, JS, Native) dan build system (Gradle atau Maven).

Command line compilation: kotlinc hello.kt -include-runtime -d hello.jar untuk compile ke JAR. Run dengan: java -jar hello.jar. Atau compile dan run: kotlinc -script hello.kts.

Gradle adalah build tool yang paling umum untuk Kotlin. File build.gradle.kts menggunakan Kotlin DSL yang type-safe dan lebih readable.`,
    keypoints: [
      "Requirement: JDK 8 atau lebih tinggi",
      "Install: SDKMAN, Chocolatey, atau download manual",
      "IDE: IntelliJ IDEA atau Android Studio",
      "Compile: kotlinc file.kt -include-runtime -d output.jar",
      "Run: java -jar output.jar",
      "Build tool: Gradle dengan Kotlin DSL"
    ]
  },
  {
    title: "Dasar Pemrograman Kotlin (Variable, Tipe Data)",
    content: `Variable di Kotlin dideklarasikan dengan keyword val (immutable/read-only) atau var (mutable). Best practice: gunakan val sebisa mungkin untuk immutability.

Contoh: val name: String = "John" atau var age: Int = 25. Type inference memungkinkan Kotlin mendeteksi tipe otomatis: val name = "John" sudah cukup.

Tipe data basic: Int, Long, Short, Byte untuk integer. Float, Double untuk floating point. Boolean untuk true/false. Char untuk single character. String untuk text.

Kotlin tidak memiliki primitive types seperti Java. Semua adalah objects, tapi compiler mengoptimasi ke primitives di bytecode untuk performa.

String templates memudahkan interpolasi: val message = "Hello, $name". Untuk expressions: "Your age is \${age + 1}". Multiline strings menggunakan triple quotes: val text = """Line 1 Line 2""".

Nullable types dengan tanda tanya: var name: String? = null. Ini adalah null safety feature yang mencegah NullPointerException. Non-nullable types tidak bisa di-assign null.`,
    keypoints: [
      "val untuk immutable, var untuk mutable",
      "Type inference otomatis detect tipe",
      "Basic types: Int, Long, Double, Boolean, String",
      "Semua types adalah objects (no primitives)",
      "String templates: $name, \${expression}",
      "Nullable types: String?, null safety built-in"
    ]
  },
  {
    title: "Operator & Ekspresi",
    content: `Kotlin mendukung berbagai operator untuk operasi arithmetic, comparison, logical, dan assignment. Operator-operator ini similar dengan bahasa pemrograman lain.

Arithmetic operators: + (plus), - (minus), * (multiply), / (divide), % (modulus). Contoh: val result = 10 + 5, val remainder = 10 % 3.

Comparison operators: == (equal), != (not equal), > (greater), < (less), >= (greater or equal), <= (less or equal). Return Boolean: true atau false.

Logical operators: && (AND), || (OR), ! (NOT). Untuk combine boolean expressions: if (age > 18 && hasLicense) { }. Short-circuit evaluation.

Assignment operators: = (assign), += (plus assign), -= (minus assign), *= (multiply assign), /= (divide assign), %= (modulus assign).

Range operator: .. untuk membuat range. Contoh: 1..10 adalah range dari 1 sampai 10. Check dengan in: if (age in 18..65) { }. Descending: 10 downTo 1.

Elvis operator: ?: untuk default value jika null. val length = name?.length ?: 0. Safe call: ?. return null jika object null. val upper = name?.uppercase().`,
    keypoints: [
      "Arithmetic: +, -, *, /, %",
      "Comparison: ==, !=, >, <, >=, <=",
      "Logical: && (AND), || (OR), ! (NOT)",
      "Range: 1..10, in, downTo",
      "Elvis operator: ?: untuk default value",
      "Safe call: ?. untuk null safety"
    ]
  },
  {
    title: "Control Flow (if, when, loop)",
    content: `Control flow mengatur alur eksekusi program. Kotlin menyediakan if, when, for, while untuk control flow dengan syntax yang lebih expressive dari Java.

If expression return value: val max = if (a > b) a else b. Tidak perlu ternary operator karena if adalah expression. Multi-line if dengan curly braces.

When expression menggantikan switch-case: when(x) { 1 -> print("one") 2, 3 -> print("two or three") in 4..10 -> print("in range") else -> print("other") }. When lebih powerful dan type-safe.

For loop untuk iterate collections: for (item in collection) { }. For dengan range: for (i in 1..5) { }. With indices: for ((index, value) in array.withIndex()) { }.

While loop: while (condition) { }. Do-while: do { } while (condition). Break dan continue untuk control loop flow.

Repeat function untuk simple loop: repeat(5) { println("Hello") }. More idiomatic untuk repetition tanpa index.`,
    keypoints: [
      "If sebagai expression: val max = if (a > b) a else b",
      "When menggantikan switch-case, lebih powerful",
      "For loop: for (item in collection)",
      "Range: for (i in 1..5), with indices",
      "While, do-while, break, continue",
      "Repeat function untuk simple repetition"
    ]
  },
  {
    title: "Fungsi",
    content: `Function adalah building block of Kotlin programs. Dideklarasikan dengan keyword fun. Kotlin functions lebih flexible dan expressive dibanding Java methods.

Basic function: fun greet(name: String): String { return "Hello, $name" }. Return type setelah colon. Single expression function: fun greet(name: String) = "Hello, $name".

Default parameters: fun greet(name: String = "Guest") { }. Call tanpa argument: greet(). Named arguments: greet(name = "John"). Kombinasi keduanya sangat powerful.

Varargs untuk variable number of arguments: fun sum(vararg numbers: Int): Int { }. Call: sum(1, 2, 3, 4). Spread operator: val arr = intArrayOf(1, 2, 3); sum(*arr).

Extension functions menambahkan function ke existing class tanpa inherit: fun String.lastChar(): Char = this[this.length - 1]. Call: "Hello".lastChar().

Higher-order functions menerima function sebagai parameter: fun calculate(x: Int, y: Int, operation: (Int, Int) -> Int): Int = operation(x, y). Lambda: calculate(5, 3) { a, b -> a + b }.

Inline functions dengan keyword inline untuk performa. Local functions untuk encapsulation. Kotlin encourage functional programming style.`,
    keypoints: [
      "Declare dengan fun, single expression: fun name() = expr",
      "Default parameters dan named arguments",
      "Varargs: vararg, spread operator: *array",
      "Extension functions tanpa inheritance",
      "Higher-order functions dengan lambda",
      "Inline functions untuk performa"
    ]
  },
  {
    title: "OOP Dasar (Class, Object)",
    content: `Object-Oriented Programming di Kotlin lebih concise dan powerful dibanding Java. Class adalah blueprint untuk create objects.

Declare class: class Person { }. Class dengan primary constructor: class Person(val name: String, var age: Int) { }. Properties langsung di constructor.

Create instance: val person = Person("John", 25). Tidak perlu keyword new. Access properties: person.name, person.age = 26.

Init block untuk initialization logic: class Person(val name: String) { init { println("Person created") } }. Multiple init blocks executed in order.

Properties dengan getter/setter custom: var name: String = "" get() = field.uppercase() set(value) { field = value.trim() }. Backing field dengan keyword field.

Visibility modifiers: public (default), private, protected, internal. Class, properties, functions can have visibility modifiers.

Object declaration untuk singleton: object DatabaseManager { fun connect() { } }. Access: DatabaseManager.connect(). Companion object untuk static members.`,
    keypoints: [
      "Class declaration: class Name { }",
      "Primary constructor: class Person(val name: String)",
      "No keyword new untuk create instance",
      "Init block untuk initialization logic",
      "Custom getter/setter dengan backing field",
      "Visibility: public, private, protected, internal",
      "Object declaration untuk singleton"
    ]
  },
  {
    title: "Constructor, Inheritance",
    content: `Kotlin mendukung primary constructor (di class header) dan secondary constructors (di class body). Primary constructor lebih common dan concise.

Primary constructor: class Person(val name: String, var age: Int) { }. Val/var membuat properties otomatis. Tanpa val/var hanya parameters.

Secondary constructor dengan keyword constructor: class Person { constructor(name: String) { } }. Call primary constructor dengan this(): constructor(name: String) : this(name, 0) { }.

Inheritance dengan colon: class Student : Person() { }. Open keyword required untuk inheritance: open class Person { }. Kotlin classes final by default.

Override methods: open class Person { open fun greet() { } }. class Student : Person() { override fun greet() { super.greet() } }. Override keyword required.

Constructor inheritance: class Student(name: String, val studentId: String) : Person(name) { }. Call parent constructor.

Abstract classes: abstract class Shape { abstract fun area(): Double }. Cannot instantiate directly. Implement abstract members in subclass.`,
    keypoints: [
      "Primary constructor di class header",
      "Secondary constructor dengan this()",
      "Inheritance: class Child : Parent()",
      "Open keyword untuk allow inheritance",
      "Override methods dengan override keyword",
      "Abstract classes dengan abstract keyword"
    ]
  },
  {
    title: "Interface & Abstract Class",
    content: `Interface mendefinisikan contract yang harus diimplementasikan oleh classes. Kotlin interfaces dapat memiliki default implementations.

Declare interface: interface Clickable { fun click() fun showOff() = println("Clickable") }. Methods bisa abstract atau dengan default implementation.

Implement interface: class Button : Clickable { override fun click() { println("Clicked") } }. Tidak perlu override showOff() karena sudah ada default.

Multiple interfaces: class Button : Clickable, Focusable { }. Kotlin supports multiple interface implementation. Resolve conflicts dengan super<Interface>.

Abstract class vs Interface: Abstract class bisa memiliki state (properties dengan backing fields). Interface tidak bisa. Abstract class hanya single inheritance, interface multiple.

Interface properties: interface User { val name: String }. Implementation harus provide value. Bisa via constructor, custom getter, atau initialize in class.

When to use: Interface untuk capability/behavior. Abstract class untuk shared state dan behavior. Prefer interface untuk flexibility.`,
    keypoints: [
      "Interface define contract, bisa punya default implementation",
      "Implement dengan override keyword",
      "Multiple interfaces supported",
      "Abstract class bisa punya state, interface tidak",
      "Interface properties must be overridden",
      "Prefer interface untuk flexibility"
    ]
  },
  {
    title: "Collection & Functional Programming",
    content: `Kotlin collections sangat powerful dengan rich API untuk functional programming. Collections dibagi dua: read-only dan mutable.

Read-only: listOf(), setOf(), mapOf(). Contoh: val list = listOf(1, 2, 3). Tidak bisa di-modify. Mutable: mutableListOf(), mutableSetOf(), mutableMapOf().

List operations: filter { it > 2 }, map { it * 2 }, find { it > 5 }, any { it > 10 }, all { it > 0 }, reduce { acc, n -> acc + n }.

Transform collections: list.map { it * 2 } return list baru. flatMap untuk flatten nested collections. associate untuk create maps.

Grouping dan partitioning: list.groupBy { it % 2 }, list.partition { it > 5 } return Pair of lists.

Sequences untuk lazy evaluation: list.asSequence().filter { }.map { }.toList(). Performa lebih baik untuk large collections dengan multiple operations.

Extension functions pada collections membuat code sangat readable dan expressive. Kotlin encourage declarative programming style.`,
    keypoints: [
      "Read-only: listOf, setOf, mapOf",
      "Mutable: mutableListOf, mutableSetOf, mutableMapOf",
      "Operations: filter, map, find, any, all, reduce",
      "Transform: map, flatMap, associate",
      "Grouping: groupBy, partition",
      "Sequences untuk lazy evaluation"
    ]
  },
  {
    title: "Null Safety (Best Practice Kotlin)",
    content: `Null safety adalah killer feature Kotlin yang mencegah NullPointerException. Type system membedakan nullable dan non-nullable references.

Non-nullable type tidak bisa hold null: var name: String = "John". name = null akan compile error. Nullable type dengan tanda tanya: var name: String? = null.

Safe call operator ?. return null jika object null: val length = name?.length. Chain multiple: name?.trim()?.uppercase(). Avoid nested null checks.

Elvis operator ?: untuk default value: val length = name?.length ?: 0. Jika name null, return 0. Combine dengan safe call.

Not-null assertion !! convert nullable to non-nullable: val length = name!!.length. Throw NPE jika null. Avoid !! sebisa mungkin, gunakan safe call.

Let function untuk execute code jika not null: name?.let { println("Name is $it") }. Scope function let sangat useful dengan nullable.

Platform types dari Java code: String! means nullable unknown. Best practice: wrap Java calls dengan null checks atau use safe calls.`,
    keypoints: [
      "Type system: nullable (String?) vs non-nullable (String)",
      "Safe call ?. return null jika object null",
      "Elvis operator ?: untuk default value",
      "Avoid !! assertion, gunakan safe call",
      "Let function untuk execute jika not null",
      "Handle platform types dari Java carefully"
    ]
  },
  {
    title: "Extension Function",
    content: `Extension functions memungkinkan menambahkan function ke existing class tanpa modify source code atau inherit. Ini membuat API lebih readable.

Syntax: fun ReceiverType.functionName() { }. Contoh: fun String.lastChar(): Char = this.get(this.length - 1). Call: "Hello".lastChar().

Extension functions resolved statically based on declared type, bukan runtime type. Tidak bisa override extension functions.

Extension properties: val String.lastChar: Char get() = this[length - 1]. Harus dengan custom getter karena tidak ada backing field.

Extension functions dapat access public members of receiver type. Tidak bisa access private members. Untuk access, harus jadi member function.

Kotlin standard library banyak menggunakan extensions: listOf(), mapOf(), apply, let, run, with, also adalah extension functions.

Best practice: gunakan extensions untuk utility functions. Keep extensions focused dan cohesive. Organize extensions in separate files by receiver type.`,
    keypoints: [
      "Menambahkan function tanpa modify class",
      "Syntax: fun Type.functionName()",
      "Resolved statically, tidak bisa override",
      "Extension properties dengan custom getter",
      "Hanya access public members",
      "Standard library banyak gunakan extensions"
    ]
  },
  {
    title: "Data Class",
    content: `Data classes di Kotlin adalah classes yang primarily hold data. Compiler automatically generate useful methods: equals(), hashCode(), toString(), copy(), componentN().

Declare dengan keyword data: data class User(val name: String, val age: Int). Primary constructor harus punya minimal satu parameter.

toString() generate human-readable string: User(name=John, age=25). equals() compare by value, bukan reference. hashCode() consistent dengan equals.

copy() function untuk create modified copy: val user2 = user1.copy(age = 26). Immutability pattern. Change specific properties.

Destructuring declarations: val (name, age) = user. Component functions: componentN(). val name = user.component1(), val age = user.component2().

Data classes tidak bisa: be abstract, open, sealed, atau inner. Harus final. Inheritance from data class discouraged.

Best practice: gunakan val untuk properties agar immutable. Data classes ideal untuk DTOs, domain models, value objects. Keep them simple dan focused.`,
    keypoints: [
      "Data class untuk classes yang hold data",
      "Auto-generate: equals, hashCode, toString, copy",
      "copy() untuk modified copy, immutability",
      "Destructuring: val (name, age) = user",
      "Harus final, tidak bisa abstract/open",
      "Best practice: gunakan val, keep simple"
    ]
  },
  {
    title: "Generics",
    content: `Generics memungkinkan type-safe code yang dapat bekerja dengan berbagai types. Generics di Kotlin lebih powerful dibanding Java dengan declaration-site variance.

Generic class: class Box<T>(val value: T) { }. Usage: val box = Box<Int>(42), val stringBox = Box("Hello"). Type inference: Box(42).

Generic functions: fun <T> singletonList(item: T): List<T> = listOf(item). Call: val list = singletonList(1), singletonList("Hello").

Type constraints: fun <T : Comparable<T>> max(a: T, b: T): T = if (a > b) a else b. T harus implement Comparable.

Variance annotations: out untuk covariance (producer), in untuk contravariance (consumer). interface Source<out T> { fun get(): T }. Producer: out, Consumer: in.

Star projection: List<*> equivalent List<out Any?>. Useful ketika type argument tidak diketahui atau tidak penting.

Reified type parameters dengan inline functions: inline fun <reified T> isInstance(value: Any) = value is T. Access type information at runtime.`,
    keypoints: [
      "Generic class: class Box<T>",
      "Generic functions: fun <T>",
      "Type constraints: <T : Type>",
      "Variance: out (producer), in (consumer)",
      "Star projection: List<*>",
      "Reified types dengan inline functions"
    ]
  },
  {
    title: "Coroutine (Async Programming)",
    content: `Coroutines adalah Kotlin's solution untuk asynchronous programming. Lebih lightweight dibanding threads, tidak blocking, dan easy to use.

Add dependency: implementation 'org.jetbrains.kotlinx:kotlinx-coroutines-core'. Import: import kotlinx.coroutines.*.

Launch coroutine: runBlocking { launch { delay(1000); println("World") }; println("Hello") }. runBlocking blocks current thread. launch starts new coroutine.

Suspend functions dengan keyword suspend: suspend fun loadData(): Data { }. Hanya bisa dipanggil dari coroutine atau suspend function lain.

Async dan await untuk parallel execution: val deferred = async { loadData() }. val result = deferred.await(). Async return Deferred, await untuk get result.

Coroutine context dan dispatchers: Dispatchers.Main (UI thread), Dispatchers.IO (IO operations), Dispatchers.Default (CPU intensive). withContext untuk switch context.

Structured concurrency dengan coroutineScope: coroutineScope { launch { } launch { } }. Parent wait for all children. Exception in child cancel parent.`,
    keypoints: [
      "Lightweight threads untuk async programming",
      "Launch coroutine: launch { }, runBlocking { }",
      "Suspend functions dengan suspend keyword",
      "Async/await untuk parallel execution",
      "Dispatchers: Main, IO, Default",
      "Structured concurrency dengan coroutineScope"
    ]
  },
  {
    title: "Membuat Aplikasi Konsol Kotlin",
    content: `Aplikasi konsol adalah cara mudah untuk belajar Kotlin dan membuat CLI tools. Kotlin sangat cocok untuk scripting dan command-line applications.

Main function: fun main(args: Array<String>) { println("Hello, World!") }. Atau simplified: fun main() { }. Entry point aplikasi.

Read input: val input = readLine(). Return String? karena bisa null. Parse: val number = input?.toIntOrNull().

Struktur project: src/main/kotlin untuk source code. build.gradle.kts untuk dependencies dan build configuration.

Build executable JAR: gradle jar atau gradle shadowJar untuk fat JAR with dependencies. Run: java -jar app.jar.

Libraries untuk CLI: Clikt untuk command-line interfaces dengan type-safe arguments. Kotlinx-cli untuk parsing command-line arguments.

Best practice: validate input, handle errors gracefully, provide clear error messages, support --help flag, follow CLI conventions.`,
    keypoints: [
      "Main function: fun main() atau fun main(args: Array<String>)",
      "Read input: readLine(), return String?",
      "Build: gradle jar, shadowJar untuk fat JAR",
      "Run: java -jar app.jar",
      "Libraries: Clikt, kotlinx-cli",
      "Best practice: validate input, handle errors"
    ]
  },
  {
    title: "Best Practice Kotlin Style Guide",
    content: `Kotlin style guide memastikan code consistency dan readability. Follow official Kotlin coding conventions untuk professional code.

Naming: camelCase untuk functions dan properties. PascalCase untuk classes. UPPER_SNAKE_CASE untuk constants. Package names lowercase.

Indentation: 4 spaces, tidak tabs. Continuation indent 8 spaces. Maximum line length 120 characters.

Property declaration: val di atas var. Group related properties. Initialize properties at declaration jika possible.

Function organization: public functions dulu, kemudian private. Related functions grouped together. Extension functions di separate file.

Prefer expressions over statements: val max = if (a > b) a else b, bukan if dengan assignment. Use when instead of if-else chains.

Null safety: prefer safe calls ?. over !! assertions. Use let, apply, run untuk handle nullable elegantly. Avoid nested if-not-null checks.

Functional programming: prefer immutable collections (listOf) over mutable (mutableListOf). Use functional operations (map, filter) over loops when appropriate.`,
    keypoints: [
      "Naming: camelCase, PascalCase, UPPER_SNAKE_CASE",
      "Indentation: 4 spaces, max line 120",
      "val di atas var, prefer immutability",
      "Prefer expressions over statements",
      "Null safety: safe calls, avoid !!",
      "Use functional operations appropriately"
    ]
  }
];
