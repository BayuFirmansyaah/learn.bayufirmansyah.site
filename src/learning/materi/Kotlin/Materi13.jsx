import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi13() {
  return (
    <MateriLayout
      title="Coroutines"
      intro="Coroutines adalah solusi Kotlin untuk asynchronous programming. Lebih lightweight dari threads, easier to write, dan provide powerful abstractions untuk concurrent code."
    >
      <Section id="basics" heading="Coroutine Basics">
        <CodeBlock language="kotlin">
{`// Add dependency: org.jetbrains.kotlinx:kotlinx-coroutines-core

import kotlinx.coroutines.*

// Launch coroutine
fun main() = runBlocking {
    launch {
        delay(1000)  // Non-blocking delay
        println("World!")
    }
    println("Hello,")
    // Output: Hello, World! (after 1 second)
}

// async/await untuk return values
fun main() = runBlocking {
    val deferred = async {
        delay(1000)
        "Result"
    }
    println("Waiting...")
    println(deferred.await())  // Wait untuk result
}`}
        </CodeBlock>
      </Section>

      <Section id="suspend" heading="Suspend Functions">
        <CodeBlock language="kotlin">
{`// suspend function dapat dipanggil dari coroutine atau suspend function lain
suspend fun fetchUser(id: String): User {
    delay(1000)  // Simulate network call
    return User(id, "John Doe")
}

suspend fun fetchPosts(userId: String): List<Post> {
    delay(500)
    return listOf(Post("Post 1"), Post("Post 2"))
}

// Calling suspend functions
fun main() = runBlocking {
    val user = fetchUser("123")
    val posts = fetchPosts(user.id)
    println("User: \${user.name}, Posts: \${posts.size}")
}`}
        </CodeBlock>
      </Section>

      <Section id="builders" heading="Coroutine Builders">
        <CodeBlock language="kotlin">
{`// launch - fire and forget (return Job)
val job = GlobalScope.launch {
    delay(1000)
    println("Task completed")
}
job.join()  // Wait untuk completion

// async - return Deferred<T> (future result)
val deferred = GlobalScope.async {
    delay(1000)
    "Result"
}
val result = deferred.await()

// runBlocking - block current thread
runBlocking {
    delay(1000)
    println("Done")
}

// coroutineScope - create scope untuk child coroutines
suspend fun doWork() = coroutineScope {
    launch { /* task 1 */ }
    launch { /* task 2 */ }
    // Waits for all children to complete
}`}
        </CodeBlock>
      </Section>

      <Section id="context" heading="Coroutine Context & Dispatchers">
        <CodeBlock language="kotlin">
{`// Dispatchers menentukan thread untuk coroutine execution
launch(Dispatchers.Default) {
    // CPU-intensive work
}

launch(Dispatchers.IO) {
    // IO operations (network, file)
}

launch(Dispatchers.Main) {
    // UI updates (Android/JavaFX)
}

// withContext - switch context temporarily
suspend fun loadData() {
    withContext(Dispatchers.IO) {
        // Network call on IO thread
        fetchFromNetwork()
    }
    withContext(Dispatchers.Main) {
        // Update UI on main thread
        updateUI()
    }
}`}
        </CodeBlock>
      </Section>

      <Section id="cancellation" heading="Cancellation & Timeout">
        <CodeBlock language="kotlin">
{`// Cancel coroutine
val job = launch {
    repeat(1000) { i ->
        println("Job: $i")
        delay(500)
    }
}
delay(1300)
job.cancel()  // Cancel job
job.join()    // Wait for cancellation to complete

// Timeout
withTimeout(1300) {
    repeat(1000) { i ->
        println("Job: $i")
        delay(500)
    }
}  // Throws TimeoutCancellationException after 1.3s

// Timeout or null
val result = withTimeoutOrNull(1300) {
    repeat(1000) { i ->
        delay(500)
    }
    "Completed"
}  // null if timeout`}
        </CodeBlock>
      </Section>

      <Section id="flow" heading="Flow - Cold Streams">
        <CodeBlock language="kotlin">
{`import kotlinx.coroutines.flow.*

// Create flow
fun numbers(): Flow<Int> = flow {
    for (i in 1..3) {
        delay(100)
        emit(i)  // Emit value
    }
}

// Collect flow
runBlocking {
    numbers().collect { value ->
        println(value)
    }
}

// Flow operators
numbers()
    .map { it * 2 }
    .filter { it > 2 }
    .collect { println(it) }  // 4, 6`}
        </CodeBlock>
      </Section>

      <Section id="conclusion" heading="Kesimpulan">
        <ul>
          <li>✅ Coroutines lightweight untuk async operations</li>
          <li>✅ Suspend functions untuk sequential async code</li>
          <li>✅ Dispatchers untuk thread management</li>
          <li>✅ Flow untuk reactive streams</li>
        </ul>

        <Note type="success">
          Next: <strong>File I/O</strong> - Reading dan writing files di Kotlin.
        </Note>
      </Section>
    </MateriLayout>
  );
}
