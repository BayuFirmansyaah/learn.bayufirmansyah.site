import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi15() {
  return (
    <MateriLayout
      title="Testing"
      intro="Testing adalah bagian essential dari software development. Pelajari cara write unit tests dengan JUnit 5, assertions, mocking dengan MockK, dan testing best practices di Kotlin."
    >
      <Section id="junit" heading="JUnit 5 Basics">
        <CodeBlock language="kotlin">
{`// Add dependencies:
// testImplementation("org.jetbrains.kotlin:kotlin-test")
// testImplementation("org.junit.jupiter:junit-jupiter:5.9.0")

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.*

class CalculatorTest {
    @Test
    fun \`addition should work correctly\`() {
        val calculator = Calculator()
        val result = calculator.add(2, 3)
        assertEquals(5, result)
    }
    
    @Test
    fun \`division by zero should throw exception\`() {
        val calculator = Calculator()
        assertThrows<ArithmeticException> {
            calculator.divide(10, 0)
        }
    }
    
    @Test
    fun \`null values should be handled\`() {
        val value: String? = null
        assertNull(value)
        
        val nonNull = "test"
        assertNotNull(nonNull)
    }
}`}
        </CodeBlock>
      </Section>

      <Section id="assertions" heading="Assertions">
        <CodeBlock language="kotlin">
{`import kotlin.test.*

@Test
fun testAssertions() {
    // Boolean assertions
    assertTrue(5 > 3)
    assertFalse(5 < 3)
    
    // Equality
    assertEquals(5, 2 + 3)
    assertNotEquals(5, 2 + 2)
    
    // Null checks
    assertNull(null)
    assertNotNull("value")
    
    // Collections
    val list = listOf(1, 2, 3)
    assertEquals(3, list.size)
    assertTrue(2 in list)
    assertContains(list, 2)
    
    // Exceptions
    assertFailsWith<IllegalArgumentException> {
        require(false) { "Error" }
    }
}`}
        </CodeBlock>
      </Section>

      <Section id="mockk" heading="Mocking dengan MockK">
        <CodeBlock language="kotlin">
{`// Add dependency: testImplementation("io.mockk:mockk:1.13.8")

import io.mockk.*

interface UserRepository {
    fun findById(id: String): User?
    fun save(user: User)
}

@Test
fun \`test with mock\`() {
    // Create mock
    val repository = mockk<UserRepository>()
    
    // Define behavior
    every { repository.findById("123") } returns User("123", "John")
    every { repository.save(any()) } just Runs
    
    // Use mock
    val user = repository.findById("123")
    assertEquals("John", user?.name)
    
    repository.save(User("456", "Alice"))
    
    // Verify calls
    verify { repository.findById("123") }
    verify { repository.save(any()) }
}

@Test
fun \`test with spy\`() {
    val calculator = Calculator()
    val spy = spyk(calculator)
    
    // Spy uses real implementation but can be verified
    val result = spy.add(2, 3)
    assertEquals(5, result)
    
    verify { spy.add(2, 3) }
}`}
        </CodeBlock>
      </Section>

      <Section id="lifecycle" heading="Test Lifecycle">
        <CodeBlock language="kotlin">
{`import org.junit.jupiter.api.*

class LifecycleTest {
    @BeforeEach
    fun setUp() {
        println("Before each test")
    }
    
    @AfterEach
    fun tearDown() {
        println("After each test")
    }
    
    @BeforeAll
    fun setUpAll() {
        println("Before all tests")
    }
    
    @AfterAll
    fun tearDownAll() {
        println("After all tests")
    }
    
    @Test
    fun test1() {
        println("Test 1")
    }
    
    @Test
    fun test2() {
        println("Test 2")
    }
}`}
        </CodeBlock>
      </Section>

      <Section id="parameterized" heading="Parameterized Tests">
        <CodeBlock language="kotlin">
{`import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.*

class ParameterizedTests {
    @ParameterizedTest
    @ValueSource(ints = [1, 2, 3, 4, 5])
    fun \`test with multiple values\`(number: Int) {
        assertTrue(number > 0)
    }
    
    @ParameterizedTest
    @CsvSource(
        "1, 1, 2",
        "2, 3, 5",
        "5, 5, 10"
    )
    fun \`test addition\`(a: Int, b: Int, expected: Int) {
        assertEquals(expected, a + b)
    }
    
    @ParameterizedTest
    @MethodSource("provideStrings")
    fun \`test with method source\`(input: String) {
        assertNotNull(input)
    }
    
    companion object {
        @JvmStatic
        fun provideStrings() = listOf("hello", "world", "kotlin")
    }
}`}
        </CodeBlock>
      </Section>

      <Section id="coroutines" heading="Testing Coroutines">
        <CodeBlock language="kotlin">
{`// Add: testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-test")

import kotlinx.coroutines.test.*
import kotlinx.coroutines.*

@Test
fun \`test suspend function\`() = runTest {
    val result = async {
        delay(1000)
        "Result"
    }
    assertEquals("Result", result.await())
}

@Test
fun \`test with virtual time\`() = runTest {
    var value = 0
    launch {
        delay(1000)
        value = 1
    }
    advanceTimeBy(1000)  // Fast-forward time
    assertEquals(1, value)
}`}
        </CodeBlock>
      </Section>

      <Section id="conclusion" heading="Kesimpulan">
        <ul>
          <li>✅ JUnit 5 untuk unit testing</li>
          <li>✅ MockK untuk mocking dan verification</li>
          <li>✅ Parameterized tests untuk multiple test cases</li>
          <li>✅ Coroutine testing dengan runTest</li>
        </ul>

        <Note type="success">
          Next: <strong>Kotlin untuk Android</strong> - Menggunakan Kotlin di Android development.
        </Note>
      </Section>
    </MateriLayout>
  );
}
