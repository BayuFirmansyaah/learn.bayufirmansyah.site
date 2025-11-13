import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi12() {
  return (
    <MateriLayout
      title="Generics"
      intro="Generics memungkinkan kita menulis type-safe code yang bekerja dengan berbagai types. Pelajari generic classes, functions, variance, dan type projections di Kotlin."
    >
      <Section id="basics" heading="Generic Basics">
        <CodeBlock language="kotlin">
{`// Generic class
class Box<T>(var value: T)

val intBox = Box(10)
val stringBox = Box("Hello")

println(intBox.value)     // 10
println(stringBox.value)  // "Hello"

// Generic function
fun <T> singletonList(item: T): List<T> {
    return listOf(item)
}

val list1 = singletonList(1)       // List<Int>
val list2 = singletonList("text")  // List<String>

// Multiple type parameters
class Pair<A, B>(val first: A, val second: B)

val pair = Pair(1, "one")
println("\${pair.first}: \${pair.second}")`}
        </CodeBlock>
      </Section>

      <Section id="constraints" heading="Generic Constraints">
        <CodeBlock language="kotlin">
{`// Upper bound constraint
fun <T : Comparable<T>> sort(list: List<T>): List<T> {
    return list.sorted()
}

// Multiple constraints
fun <T> process(value: T) where T : CharSequence, T : Comparable<T> {
    println(value.length)
    println(value > "a")
}`}
        </CodeBlock>
      </Section>

      <Section id="variance" heading="Variance">
        <CodeBlock language="kotlin">
{`// Covariance (out)
interface Producer<out T> {
    fun produce(): T
}

// Contravariance (in)
interface Consumer<in T> {
    fun consume(item: T)
}

// Invariance (no modifier)
class Box<T>(var value: T)

// Usage
val stringProducer: Producer<String> = object : Producer<String> {
    override fun produce() = "Hello"
}

val anyProducer: Producer<Any> = stringProducer  //  OK (covariant)`}
        </CodeBlock>

        <Note type="tip">
          <strong>Variance rules:</strong><br/>
          - <code>out T</code>: Can only produce T (covariant)<br/>
          - <code>in T</code>: Can only consume T (contravariant)<br/>
          - No modifier: Can both produce and consume (invariant)
        </Note>
      </Section>

      <Section id="reified" heading="Reified Type Parameters">
        <CodeBlock language="kotlin">
{`// reified untuk access type information at runtime
inline fun <reified T> isInstanceOf(value: Any): Boolean {
    return value is T
}

println(isInstanceOf<String>("hello"))  // true
println(isInstanceOf<Int>("hello"))     // false

// Practical example
inline fun <reified T> List<*>.filterIsInstance(): List<T> {
    return this.filterIsInstance<T>()
}

val mixed = listOf(1, "two", 3, "four", 5)
val strings = mixed.filterIsInstance<String>()  // ["two", "four"]`}
        </CodeBlock>
      </Section>

      <Section id="conclusion" heading="Kesimpulan">
        <p>Generics di Kotlin menyediakan:</p>
        <ul>
          <li> Type-safe generic programming</li>
          <li> Variance annotations (in/out)</li>
          <li> Reified type parameters untuk runtime type information</li>
        </ul>

        <Note type="success">
          Next: <strong>Coroutines</strong> - Asynchronous programming yang powerful.
        </Note>
      </Section>
    </MateriLayout>
  );
}
