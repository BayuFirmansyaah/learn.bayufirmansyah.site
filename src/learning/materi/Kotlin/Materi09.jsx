import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi09() {
  return (
    <MateriLayout
      title="Collections"
      intro="Collections adalah struktur data fundamental untuk menyimpan dan memanipulasi groups of objects. Kotlin menyediakan rich collection API dengan distinction antara immutable dan mutable collections."
    >
      {/* List */}
      <Section id="list" heading="List">
        <Subsection id="list-basics" heading="List Basics">
          <CodeBlock language="kotlin">
{`// Immutable List (read-only)
val numbers = listOf(1, 2, 3, 4, 5)
val fruits = listOf("apple", "banana", "orange")
val mixed = listOf(1, "two", 3.0, true)  // List<Any>

// Access elements
println(numbers[0])        // 1
println(numbers.first())   // 1
println(numbers.last())    // 5
println(numbers.get(2))    // 3

// List properties
println(numbers.size)      // 5
println(numbers.isEmpty()) // false
println(numbers.indices)   // 0..4

// Mutable List
val mutableNumbers = mutableListOf(1, 2, 3)
mutableNumbers.add(4)              // [1, 2, 3, 4]
mutableNumbers.add(0, 0)           // [0, 1, 2, 3, 4]
mutableNumbers.remove(2)           // [0, 1, 3, 4]
mutableNumbers.removeAt(0)         // [1, 3, 4]
mutableNumbers[0] = 10             // [10, 3, 4]

// ArrayList - specific implementation
val arrayList = ArrayList<String>()
arrayList.add("Hello")
arrayList.add("World")`}
          </CodeBlock>
        </Subsection>

        <Subsection id="list-operations" heading="List Operations">
          <CodeBlock language="kotlin">
{`val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

// Filtering
val evens = numbers.filter { it % 2 == 0 }  // [2, 4, 6, 8, 10]
val odds = numbers.filterNot { it % 2 == 0 }  // [1, 3, 5, 7, 9]

// Mapping
val doubled = numbers.map { it * 2 }  // [2, 4, 6, ..., 20]
val strings = numbers.map { "Number $it" }

// Sorting
val unsorted = listOf(3, 1, 4, 1, 5, 9, 2, 6)
val sorted = unsorted.sorted()           // [1, 1, 2, 3, 4, 5, 6, 9]
val sortedDesc = unsorted.sortedDescending()  // [9, 6, 5, 4, 3, 2, 1, 1]

// Taking & Dropping
val first3 = numbers.take(3)    // [1, 2, 3]
val last3 = numbers.takeLast(3) // [8, 9, 10]
val skip3 = numbers.drop(3)     // [4, 5, ..., 10]

// Slicing
val slice = numbers.slice(2..5)  // [3, 4, 5, 6]

// Distinct
val duplicates = listOf(1, 2, 2, 3, 3, 3, 4)
val unique = duplicates.distinct()  // [1, 2, 3, 4]

// Chunking
val chunks = numbers.chunked(3)  // [[1,2,3], [4,5,6], [7,8,9], [10]]

// Windowed
val windows = numbers.windowed(3)  // [[1,2,3], [2,3,4], ..., [8,9,10]]`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Set */}
      <Section id="set" heading="Set">
        <Subsection id="set-basics" heading="Set Basics">
          <CodeBlock language="kotlin">
{`// Immutable Set (no duplicates, unordered)
val numbers = setOf(1, 2, 3, 4, 5)
val duplicates = setOf(1, 2, 2, 3, 3, 3)  // {1, 2, 3}

// Check membership
println(3 in numbers)  // true
println(10 !in numbers)  // true
println(numbers.contains(5))  // true

// Set operations
val set1 = setOf(1, 2, 3, 4)
val set2 = setOf(3, 4, 5, 6)

val union = set1 union set2  // {1, 2, 3, 4, 5, 6}
val intersect = set1 intersect set2  // {3, 4}
val subtract = set1 subtract set2  // {1, 2}

// Mutable Set
val mutableSet = mutableSetOf(1, 2, 3)
mutableSet.add(4)        // {1, 2, 3, 4}
mutableSet.add(2)        // {1, 2, 3, 4} - no duplicate
mutableSet.remove(1)     // {2, 3, 4}
mutableSet.addAll(listOf(5, 6))  // {2, 3, 4, 5, 6}

// HashSet - specific implementation
val hashSet = HashSet<String>()
hashSet.add("apple")
hashSet.add("banana")`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Map */}
      <Section id="map" heading="Map">
        <Subsection id="map-basics" heading="Map Basics">
          <CodeBlock language="kotlin">
{`// Immutable Map (key-value pairs)
val ages = mapOf(
    "Alice" to 25,
    "Bob" to 30,
    "Charlie" to 35
)

// Access values
println(ages["Alice"])     // 25
println(ages.get("Bob"))   // 30
println(ages["Unknown"])   // null
println(ages.getOrDefault("Unknown", 0))  // 0

// Check keys/values
println("Alice" in ages)              // true
println(ages.containsKey("Alice"))    // true
println(ages.containsValue(30))       // true

// Map properties
println(ages.size)     // 3
println(ages.keys)     // [Alice, Bob, Charlie]
println(ages.values)   // [25, 30, 35]
println(ages.entries)  // [Alice=25, Bob=30, Charlie=35]

// Mutable Map
val mutableAges = mutableMapOf("Alice" to 25)
mutableAges["Bob"] = 30           // Add entry
mutableAges.put("Charlie", 35)    // Add entry
mutableAges["Alice"] = 26         // Update value
mutableAges.remove("Bob")         // Remove entry

// HashMap - specific implementation
val hashMap = HashMap<String, Int>()
hashMap["key"] = 100`}
          </CodeBlock>
        </Subsection>

        <Subsection id="map-operations" heading="Map Operations">
          <CodeBlock language="kotlin">
{`val scores = mapOf(
    "Alice" to 90,
    "Bob" to 85,
    "Charlie" to 95,
    "David" to 80
)

// Filtering
val highScores = scores.filter { (_, score) -> score >= 90 }
// {Alice=90, Charlie=95}

val aNames = scores.filterKeys { it.startsWith("A") }
// {Alice=90}

val passingScores = scores.filterValues { it >= 85 }
// {Alice=90, Bob=85, Charlie=95}

// Mapping
val bonusScores = scores.mapValues { (_, score) -> score + 10 }
// {Alice=100, Bob=95, Charlie=105, David=90}

val upperKeys = scores.mapKeys { (name, _) -> name.uppercase() }
// {ALICE=90, BOB=85, ...}

// Iteration
scores.forEach { (name, score) ->
    println("$name: $score")
}

for ((name, score) in scores) {
    println("$name scored $score")
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Collection Operations */}
      <Section id="collection-operations" heading="Collection Operations">
        <Subsection id="aggregate-operations" heading="Aggregate Operations">
          <CodeBlock language="kotlin">
{`val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

// Count
println(numbers.count())  // 10
println(numbers.count { it % 2 == 0 })  // 5 (count evens)

// Sum, Average, Min, Max
println(numbers.sum())     // 55
println(numbers.average()) // 5.5
println(numbers.min())     // 1 (deprecated, use minOrNull())
println(numbers.max())     // 10 (deprecated, use maxOrNull())
println(numbers.minOrNull())  // 1
println(numbers.maxOrNull())  // 10

// Reduce & Fold
val sum = numbers.reduce { acc, num -> acc + num }  // 55
val product = numbers.fold(1) { acc, num -> acc * num }  // 3628800

// Any, All, None
println(numbers.any { it > 5 })   // true
println(numbers.all { it > 0 })   // true
println(numbers.none { it < 0 })  // true

// Find & First
println(numbers.find { it > 5 })   // 6 (first match)
println(numbers.first { it > 5 })  // 6 (throws if not found)
println(numbers.firstOrNull { it > 100 })  // null`}
          </CodeBlock>
        </Subsection>

        <Subsection id="grouping" heading="Grouping & Partitioning">
          <CodeBlock language="kotlin">
{`val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

// GroupBy
val grouped = numbers.groupBy { it % 3 }
// {1=[1,4,7,10], 2=[2,5,8], 0=[3,6,9]}

val words = listOf("apple", "apricot", "banana", "cherry", "blueberry")
val byFirstLetter = words.groupBy { it.first() }
// {a=[apple, apricot], b=[banana, blueberry], c=[cherry]}

// Partition - split into two groups
val (evens, odds) = numbers.partition { it % 2 == 0 }
// evens = [2,4,6,8,10], odds = [1,3,5,7,9]

// Associate - create map
val numberMap = numbers.associate { it to it * it }
// {1=1, 2=4, 3=9, ..., 10=100}

val wordLengths = words.associateWith { it.length }
// {apple=5, apricot=7, banana=6, ...}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="flattening" heading="Flattening">
          <CodeBlock language="kotlin">
{`// Flatten nested collections
val nested = listOf(
    listOf(1, 2, 3),
    listOf(4, 5, 6),
    listOf(7, 8, 9)
)

val flat = nested.flatten()  // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// FlatMap - map + flatten
val numbers = listOf(1, 2, 3)
val result = numbers.flatMap { listOf(it, it * 10) }
// [1, 10, 2, 20, 3, 30]

val words = listOf("Hello", "World")
val chars = words.flatMap { it.toList() }
// [H, e, l, l, o, W, o, r, l, d]`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Sequences */}
      <Section id="sequences" heading="Sequences">
        <CodeBlock language="kotlin">
{`// Sequences - lazy evaluation untuk performance
val numbers = listOf(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)

// Collection (eager evaluation) - setiap operation create intermediate list
val result1 = numbers
    .filter { it % 2 == 0 }  // Create list [2,4,6,8,10]
    .map { it * it }          // Create list [4,16,36,64,100]
    .take(3)                  // Create list [4,16,36]

// Sequence (lazy evaluation) - no intermediate collections
val result2 = numbers.asSequence()
    .filter { it % 2 == 0 }  // No intermediate list
    .map { it * it }          // No intermediate list
    .take(3)                  // Evaluates only first 3 matching items
    .toList()                 // [4, 16, 36]

// Generate sequence
val naturalNumbers = generateSequence(1) { it + 1 }
val first10 = naturalNumbers.take(10).toList()  // [1, 2, ..., 10]

// Fibonacci sequence
val fibonacci = generateSequence(Pair(0, 1)) { (a, b) -> Pair(b, a + b) }
    .map { it.first }
val first10Fib = fibonacci.take(10).toList()  // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// When to use sequences:
// - Large collections
// - Multiple chained operations
// - Only need partial results (take, find, etc.)`}
        </CodeBlock>

        <Note type="tip">
          Use sequences when working dengan large datasets atau multiple chained operations 
          untuk better performance through lazy evaluation.
        </Note>
      </Section>

      {/* Kesimpulan */}
      <Section id="conclusion" heading="Kesimpulan">
        <p>
          Dalam materi ini, kita telah mempelajari collections di Kotlin:
        </p>

        <ul>
          <li> <strong>List:</strong> Ordered collections dengan index</li>
          <li> <strong>Set:</strong> Unique elements, no duplicates</li>
          <li> <strong>Map:</strong> Key-value pairs</li>
          <li> <strong>Operations:</strong> Filter, map, reduce, group, dan lainnya</li>
          <li> <strong>Sequences:</strong> Lazy evaluation untuk performance</li>
        </ul>

        <Note type="success">
          Di materi selanjutnya, kita akan focus pada <strong>Null Safety</strong>: 
          nullable types, safe calls, dan Elvis operator untuk menghindari NullPointerException.
        </Note>
      </Section>
    </MateriLayout>
  );
}
