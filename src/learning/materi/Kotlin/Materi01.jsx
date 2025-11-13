import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi01() {
  return (
    <MateriLayout
      title="Pengenalan Kotlin"
      intro="Kotlin adalah bahasa pemrograman modern yang dikembangkan oleh JetBrains. Pertama kali dirilis pada tahun 2011 dan menjadi bahasa resmi untuk Android development sejak Google I/O 2017. Kotlin menggabungkan yang terbaik dari paradigma Object-Oriented dan Functional Programming."
    >
      {/* Apa itu Kotlin? */}
      <Section id="what-is-kotlin" heading="Apa itu Kotlin?">
        <p>
          Kotlin adalah bahasa pemrograman statically typed yang berjalan di atas JVM (Java Virtual Machine). 
          Dikembangkan oleh JetBrains, perusahaan yang juga menciptakan IntelliJ IDEA, Kotlin dirancang untuk 
          mengatasi berbagai keterbatasan Java sambil tetap mempertahankan 100% interoperability dengan Java.
        </p>
        <p>
          Pada tahun 2017, Google mengumumkan Kotlin sebagai bahasa official untuk Android development. 
          Sejak saat itu, Kotlin berkembang pesat dan kini menjadi pilihan utama developer Android di seluruh dunia.
        </p>
        <p>
          Kotlin tidak hanya untuk Android. Dengan Kotlin Multiplatform, Anda dapat menggunakan Kotlin untuk:
        </p>
        <ul>
          <li><strong>Backend Development</strong> - Kotlin/JVM untuk server-side applications</li>
          <li><strong>Android Development</strong> - Native Android apps dengan performa optimal</li>
          <li><strong>Web Development</strong> - Kotlin/JS untuk frontend applications</li>
          <li><strong>iOS Development</strong> - Kotlin/Native untuk iOS apps</li>
          <li><strong>Desktop Apps</strong> - Cross-platform desktop applications</li>
        </ul>
      </Section>

      {/* Mengapa Memilih Kotlin? */}
      <Section id="why-kotlin" heading="Mengapa Memilih Kotlin?">
        <p>
          Kotlin menawarkan berbagai keunggulan yang membuat development lebih produktif, aman, dan menyenangkan:
        </p>

        <Subsection id="concise-syntax" heading="Syntax yang Concise & Expressive">
          <p>
            Kotlin mengurangi boilerplate code secara signifikan. Kode yang di Java membutuhkan puluhan baris, 
            di Kotlin bisa ditulis hanya dalam beberapa baris tanpa mengurangi readability.
          </p>
          
          <p className="code-caption">Perbandingan Java vs Kotlin - Data Class</p>
          <CodeBlock language="java">
{`// Java - Membutuhkan banyak boilerplate
public class User {
    private String name;
    private int age;
    
    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    
    @Override
    public boolean equals(Object o) {
        // ... 10+ baris kode equals
    }
    
    @Override
    public int hashCode() {
        // ... 5+ baris kode hashCode
    }
    
    @Override
    public String toString() {
        return "User{name='" + name + "', age=" + age + "}";
    }
}`}
          </CodeBlock>

          <p className="code-caption">Kotlin - Hanya 1 baris!</p>
          <CodeBlock language="kotlin">
{`// Kotlin - Data class otomatis generate semua method
data class User(val name: String, val age: Int)

// Otomatis mendapat: equals(), hashCode(), toString(), copy()`}
          </CodeBlock>
        </Subsection>

        <Subsection id="null-safety" heading="Null Safety - Goodbye NullPointerException">
          <p>
            Salah satu fitur paling powerful dari Kotlin adalah null safety built-in ke dalam type system. 
            Ini mengurangi NullPointerException, yang merupakan bug paling umum di Java.
          </p>

          <CodeBlock language="kotlin">
{`// Di Kotlin, variable by default tidak bisa null
var name: String = "John"
name = null  // ❌ Compile error!

// Harus explicitly declare nullable type dengan "?"
var nickname: String? = "Johnny"
nickname = null  //  OK

// Safe call operator - hanya execute jika tidak null
val length = nickname?.length  // Result: Int? (nullable Int)

// Elvis operator - default value jika null
val displayName = nickname ?: "Unknown"  // "Unknown" jika null

// Safe cast - return null jika cast gagal
val number: Int? = someValue as? Int`}
          </CodeBlock>

          <Note type="info">
            Null safety di Kotlin mencegah crash di runtime dengan mendeteksi potential null errors di compile time.
          </Note>
        </Subsection>

        <Subsection id="interoperability" heading="100% Interoperable dengan Java">
          <p>
            Kotlin dapat memanggil kode Java dan sebaliknya dengan seamless. Ini memungkinkan migration bertahap 
            dari Java ke Kotlin tanpa harus rewrite seluruh codebase.
          </p>

          <CodeBlock language="kotlin">
{`// Memanggil Java class dari Kotlin
val list = ArrayList<String>()  // Java ArrayList
list.add("Hello")

// Menggunakan Java library
val date = java.util.Date()
val calendar = java.util.Calendar.getInstance()

// Kotlin class dapat dipanggil dari Java juga
// @JvmStatic, @JvmField annotation untuk Java compatibility`}
          </CodeBlock>
        </Subsection>

        <Subsection id="modern-features" heading="Modern Language Features">
          <p>
            Kotlin menyediakan fitur-fitur modern yang tidak ada di Java (atau baru ada di versi terbaru):
          </p>

          <ul>
            <li><strong>Extension Functions</strong> - Menambah fungsi ke existing class tanpa inheritance</li>
            <li><strong>Smart Casts</strong> - Automatic type casting setelah type checking</li>
            <li><strong>String Templates</strong> - Embedded expressions dalam string</li>
            <li><strong>Coroutines</strong> - Asynchronous programming yang simple dan powerful</li>
            <li><strong>Higher-Order Functions</strong> - Function sebagai first-class citizen</li>
            <li><strong>Operator Overloading</strong> - Custom behavior untuk operators</li>
            <li><strong>Sealed Classes</strong> - Restricted class hierarchies untuk type safety</li>
          </ul>

          <CodeBlock language="kotlin">
{`// Extension function
fun String.isPalindrome(): Boolean {
    return this == this.reversed()
}
println("radar".isPalindrome())  // true

// Smart cast
fun printLength(obj: Any) {
    if (obj is String) {
        // obj otomatis di-cast ke String
        println(obj.length)  // No explicit cast needed!
    }
}

// String templates
val name = "John"
val age = 25
println("$name is $age years old")  // "John is 25 years old"
println("Next year: \${age + 1}")    // "Next year: 26"`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Kotlin Ecosystem */}
      <Section id="ecosystem" heading="Kotlin Ecosystem">
        <p>
          Kotlin memiliki ecosystem yang kuat dan terus berkembang dengan berbagai tools, frameworks, dan libraries:
        </p>

        <Subsection id="kotlin-multiplatform" heading="Kotlin Multiplatform">
          <p>
            Kotlin Multiplatform (KMP) memungkinkan code sharing antar platform. Write once, run anywhere dengan 
            performa native di setiap platform.
          </p>

          <CodeBlock language="kotlin">
{`// Common code - dapat dijalankan di semua platform
expect fun platformName(): String

// Android implementation
actual fun platformName(): String = "Android"

// iOS implementation
actual fun platformName(): String = "iOS"

// Shared business logic
class UserRepository {
    fun getUser(): User {
        println("Running on: \${platformName()}")
        // Shared logic here
    }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="kotlin-frameworks" heading="Popular Frameworks & Libraries">
          <ul>
            <li>
              <strong>Ktor</strong> - Asynchronous web framework untuk backend development
            </li>
            <li>
              <strong>Spring Boot</strong> - Full support untuk Kotlin dengan DSL yang elegant
            </li>
            <li>
              <strong>Exposed</strong> - SQL framework untuk Kotlin dengan type-safe DSL
            </li>
            <li>
              <strong>Jetpack Compose</strong> - Modern UI toolkit untuk Android dengan Kotlin
            </li>
            <li>
              <strong>KotlinX Serialization</strong> - Multi-format serialization library
            </li>
            <li>
              <strong>Arrow</strong> - Functional programming library
            </li>
            <li>
              <strong>Kotest</strong> - Flexible testing framework untuk Kotlin
            </li>
            <li>
              <strong>MockK</strong> - Mocking library designed untuk Kotlin
            </li>
          </ul>
        </Subsection>
      </Section>

      {/* Kotlin vs Java */}
      <Section id="kotlin-vs-java" heading="Kotlin vs Java">
        <p>
          Kotlin dirancang untuk mengatasi pain points dari Java sambil tetap kompatibel. 
          Berikut perbandingan fitur-fitur utama:
        </p>

        <p className="code-caption">Perbandingan fitur Kotlin dan Java</p>
        <CodeBlock language="text">
{`╔═══════════════════════════╦══════════════╦══════════════╗
║ Feature                   ║ Kotlin       ║ Java         ║
╠═══════════════════════════╬══════════════╬══════════════╣
║ Null Safety               ║ Built-in     ║ No           ║
║ Extension Functions       ║ Yes          ║ No           ║
║ Data Classes              ║ Yes          ║ Records(16+) ║
║ Coroutines                ║ Built-in     ║ Complex      ║
║ Smart Casts               ║ Yes          ║ No           ║
║ Operator Overloading      ║ Yes          ║ No           ║
║ Default Parameters        ║ Yes          ║ No           ║
║ String Templates          ║ Yes          ║ No           ║
║ Sealed Classes            ║ Yes          ║ Limited      ║
║ Type Inference            ║ Strong       ║ Limited      ║
║ Functional Programming    ║ First-class  ║ Limited      ║
║ Boilerplate Code          ║ Minimal      ║ Verbose      ║
╚═══════════════════════════╩══════════════╩══════════════╝`}
        </CodeBlock>

        <Note type="tip">
          Kotlin tidak menggantikan Java, tetapi menjadi evolusi natural dengan features yang lebih modern 
          sambil tetap memanfaatkan existing Java ecosystem.
        </Note>
      </Section>

      {/* Kotlin Philosophy */}
      <Section id="philosophy" heading="Kotlin Philosophy & Design Principles">
        <p>
          Kotlin dirancang dengan filosofi yang jelas untuk membuat programming lebih enjoyable dan productive:
        </p>

        <Subsection id="pragmatic" heading="Pragmatic, not Dogmatic">
          <p>
            Kotlin tidak memaksakan paradigm tertentu. Anda bebas menggunakan OOP, Functional Programming, 
            atau kombinasi keduanya sesuai kebutuhan.
          </p>
        </Subsection>

        <Subsection id="concise" heading="Concise, but Readable">
          <p>
            Kotlin mengurangi boilerplate code, tetapi tidak dengan mengorbankan readability. 
            Kode Kotlin tetap jelas dan mudah dipahami.
          </p>
        </Subsection>

        <Subsection id="safe" heading="Safe by Default">
          <p>
            Features seperti null safety, immutability defaults, dan strong type system membuat kode 
            lebih aman dan mencegah common bugs.
          </p>
        </Subsection>

        <Subsection id="interoperable" heading="Interoperable with Java">
          <p>
            Kotlin dirancang untuk bekerja seamlessly dengan Java, memungkinkan adoption bertahap 
            dan penggunaan existing Java libraries.
          </p>
        </Subsection>
      </Section>

      {/* Hello World */}
      <Section id="hello-world" heading="Hello World di Kotlin">
        <p>
          Mari kita mulai dengan program "Hello World" yang paling sederhana di Kotlin:
        </p>

        <CodeBlock language="kotlin">
{`// Program paling sederhana di Kotlin
fun main() {
    println("Hello, World!")
}

// Dengan parameter args (optional)
fun main(args: Array<String>) {
    println("Hello, World!")
    if (args.isNotEmpty()) {
        println("Arguments: \${args.joinToString()}")
    }
}

// Multiple statements
fun main() {
    val name = "Kotlin"
    val version = "1.9"
    println("Welcome to $name $version!")
}`}
        </CodeBlock>

        <Note type="info">
          <p><strong>Penjelasan:</strong></p>
          <ul>
            <li><code>fun</code> keyword untuk mendefinisikan function</li>
            <li><code>main()</code> adalah entry point program</li>
            <li><code>println()</code> untuk print dengan newline</li>
            <li>String templates menggunakan <code>$</code> atau <code>${"${}  "}</code></li>
          </ul>
        </Note>
      </Section>

      {/* Community & Resources */}
      <Section id="community" heading="Community & Learning Resources">
        <p>
          Kotlin memiliki komunitas yang aktif dan resources yang lengkap untuk learning:
        </p>

        <Subsection id="official-resources" heading="Official Resources">
          <ul>
            <li>
              <strong>kotlinlang.org</strong> - Official website dengan dokumentasi lengkap
            </li>
            <li>
              <strong>Kotlin Playground</strong> - Online editor untuk try Kotlin di browser
            </li>
            <li>
              <strong>Kotlin Koans</strong> - Interactive exercises untuk belajar Kotlin
            </li>
            <li>
              <strong>Kotlin Blog</strong> - Updates dan artikel dari Kotlin team
            </li>
          </ul>
        </Subsection>

        <Subsection id="community-resources" heading="Community Resources">
          <ul>
            <li>
              <strong>Kotlin Slack</strong> - Active community dengan 40,000+ members
            </li>
            <li>
              <strong>Reddit r/Kotlin</strong> - Discussion dan sharing resources
            </li>
            <li>
              <strong>Stack Overflow</strong> - Tag "kotlin" dengan ribuan Q&A
            </li>
            <li>
              <strong>GitHub</strong> - Thousands of open-source Kotlin projects
            </li>
          </ul>
        </Subsection>

        <Note type="tip">
          Mulai dengan Kotlin Koans untuk hands-on learning experience. 
          Exercises ini dirancang untuk mengajarkan Kotlin syntax dan features secara interaktif.
        </Note>
      </Section>

      {/* Industry Adoption */}
      <Section id="industry-adoption" heading="Industry Adoption">
        <p>
          Kotlin telah diadopsi oleh banyak perusahaan besar di seluruh dunia:
        </p>

        <ul>
          <li><strong>Google</strong> - Menggunakan Kotlin untuk internal tools dan Android apps</li>
          <li><strong>Netflix</strong> - Backend services dan Android app</li>
          <li><strong>Uber</strong> - Internal development tools</li>
          <li><strong>Pinterest</strong> - Android app dengan 150+ million users</li>
          <li><strong>Trello</strong> - Complete rewrite dari Java ke Kotlin</li>
          <li><strong>Coursera</strong> - Android app dan backend services</li>
          <li><strong>Evernote</strong> - Android app modernization dengan Kotlin</li>
          <li><strong>Square</strong> - Multiple products menggunakan Kotlin</li>
        </ul>

        <Note type="info">
          Lebih dari 60% professional Android developers menggunakan Kotlin, dan adoption rate 
          terus meningkat di backend development.
        </Note>
      </Section>

      {/* Future of Kotlin */}
      <Section id="future" heading="Future of Kotlin">
        <p>
          Kotlin terus berkembang dengan roadmap yang jelas dan ambitious:
        </p>

        <ul>
          <li>
            <strong>K2 Compiler</strong> - New compiler architecture dengan compile time lebih cepat dan 
            better IDE performance
          </li>
          <li>
            <strong>Kotlin Multiplatform</strong> - Semakin mature dengan better tooling dan wider platform support
          </li>
          <li>
            <strong>Compose Multiplatform</strong> - UI framework untuk Android, iOS, Desktop, dan Web
          </li>
          <li>
            <strong>WASM Support</strong> - Kotlin dapat compile ke WebAssembly untuk better web performance
          </li>
          <li>
            <strong>Context Receivers</strong> - New feature untuk more flexible context-dependent code
          </li>
        </ul>

        <Note type="tip">
          Kotlin dirilis dengan versioning yang predictable (major releases setiap 6 bulan) dan 
          maintains backward compatibility, membuat upgrade process smooth.
        </Note>
      </Section>

      {/* Kesimpulan */}
      <Section id="conclusion" heading="Kesimpulan">
        <p>
          Kotlin adalah bahasa pemrograman modern yang menggabungkan yang terbaik dari berbagai paradigm. 
          Dengan syntax yang concise, null safety built-in, dan features modern seperti coroutines, 
          Kotlin membuat development lebih produktif dan enjoyable.
        </p>
        <p>
          100% interoperability dengan Java memungkinkan adopsi bertahap dan pemanfaatan existing ecosystem. 
          Kotlin Multiplatform membuka peluang untuk code sharing antar platform dengan performa native.
        </p>
        <p>
          Baik untuk Android development, backend services, atau multiplatform projects, Kotlin adalah 
          pilihan yang excellent dengan future yang bright dan community yang supportive.
        </p>

        <Note type="success">
          <strong>Ready to start?</strong> Di materi selanjutnya, kita akan setup environment dan menulis 
          program Kotlin pertama kita!
        </Note>
      </Section>
    </MateriLayout>
  );
}
