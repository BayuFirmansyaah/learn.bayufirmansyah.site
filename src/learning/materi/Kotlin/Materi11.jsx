import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi11() {
  return (
    <MateriLayout
      title="Extension Functions"
      intro="Extension functions memungkinkan kita menambah functionality ke existing classes tanpa inheritance atau decorator pattern. Ini adalah salah satu fitur paling elegant di Kotlin."
    >
      <Section id="basics" heading="Extension Function Basics">
        <CodeBlock language="kotlin">
{`// Menambah function ke String class
fun String.isPalindrome(): Boolean {
    return this == this.reversed()
}

// Usage
println("radar".isPalindrome())  // true
println("hello".isPalindrome())  // false

// Extension dengan parameter
fun String.repeat(times: Int): String {
    return this.repeat(times)
}

println("Ha".repeat(3))  // "HaHaHa"

// Extension untuk Int
fun Int.isEven() = this % 2 == 0
fun Int.isOdd() = this % 2 != 0

println(10.isEven())  // true
println(7.isOdd())    // true`}
        </CodeBlock>
      </Section>

      <Section id="properties" heading="Extension Properties">
        <CodeBlock language="kotlin">
{`// Extension property (no backing field)
val String.firstChar: Char
    get() = this[0]

val String.lastChar: Char
    get() = this[this.length - 1]

println("Hello".firstChar)  // 'H'
println("World".lastChar)   // 'd'

// Extension property untuk List
val <T> List<T>.middle: T
    get() = this[this.size / 2]

val numbers = listOf(1, 2, 3, 4, 5)
println(numbers.middle)  // 3`}
        </CodeBlock>
      </Section>

      <Section id="nullable" heading="Extensions pada Nullable Types">
        <CodeBlock language="kotlin">
{`// Extension untuk nullable receiver
fun String?.orEmpty(): String {
    return this ?: ""
}

val nullString: String? = null
println(nullString.orEmpty())  // ""

// Safe extension
fun String?.isNullOrBlankCustom(): Boolean {
    return this == null || this.isBlank()
}`}
        </CodeBlock>
      </Section>

      <Section id="scope" heading="Extension Scope & Resolution">
        <CodeBlock language="kotlin">
{`// Extensions are resolved statically
open class Shape
class Rectangle : Shape()

fun Shape.getName() = "Shape"
fun Rectangle.getName() = "Rectangle"

fun printClassName(s: Shape) {
    println(s.getName())  // Always "Shape" (static dispatch)
}

printClassName(Rectangle())  // "Shape", not "Rectangle"

// Member always wins over extension
class Example {
    fun foo() = "Member"
}

fun Example.foo() = "Extension"
println(Example().foo())  // "Member"`}
        </CodeBlock>

        <Note type="info">
          Extensions tidak actually modify classes. They're static functions 
          yang called dengan dot notation.
        </Note>
      </Section>

      <Section id="companion" heading="Extensions untuk Companion Objects">
        <CodeBlock language="kotlin">
{`class User {
    companion object { }
}

// Extension for companion object
fun User.Companion.create(name: String) = User(name)

val user = User.create("John")`}
        </CodeBlock>
      </Section>

      <Section id="conclusion" heading="Kesimpulan">
        <p>Extension functions powerful untuk:</p>
        <ul>
          <li>✅ Menambah utility functions ke existing classes</li>
          <li>✅ Membuat DSLs yang readable</li>
          <li>✅ Organize code tanpa modifying original classes</li>
        </ul>

        <Note type="success">
          Next: <strong>Generics</strong> - Type-safe generic programming di Kotlin.
        </Note>
      </Section>
    </MateriLayout>
  );
}
