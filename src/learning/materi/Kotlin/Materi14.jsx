import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi14() {
  return (
    <MateriLayout
      title="File I/O"
      intro="Kotlin menyediakan convenient functions untuk file operations. Pelajari cara read, write, dan manipulate files dengan Kotlin standard library."
    >
      <Section id="read" heading="Reading Files">
        <CodeBlock language="kotlin">
{`import java.io.File

// Read entire file as string
val content = File("file.txt").readText()
println(content)

// Read file as lines
val lines = File("file.txt").readLines()
lines.forEach { println(it) }

// Read line by line (memory efficient)
File("large-file.txt").forEachLine { line ->
    println(line)
}

// Read file as bytes
val bytes = File("image.png").readBytes()

// Use buffered reader
File("file.txt").bufferedReader().use { reader ->
    var line = reader.readLine()
    while (line != null) {
        println(line)
        line = reader.readLine()
    }
}`}
        </CodeBlock>
      </Section>

      <Section id="write" heading="Writing Files">
        <CodeBlock language="kotlin">
{`// Write string to file (overwrites)
File("output.txt").writeText("Hello, World!")

// Append to file
File("output.txt").appendText("\\nNew line")

// Write lines
val lines = listOf("Line 1", "Line 2", "Line 3")
File("output.txt").writeText(lines.joinToString("\\n"))

// Write bytes
val bytes = byteArrayOf(0x48, 0x65, 0x6C, 0x6C, 0x6F)  // "Hello"
File("output.bin").writeBytes(bytes)

// Use buffered writer
File("output.txt").bufferedWriter().use { writer ->
    writer.write("First line\\n")
    writer.write("Second line\\n")
}

// PrintWriter voor formatted output
File("output.txt").printWriter().use { writer ->
    writer.println("Hello")
    writer.println("World")
}`}
        </CodeBlock>
      </Section>

      <Section id="operations" heading="File Operations">
        <CodeBlock language="kotlin">
{`val file = File("example.txt")

// Check existence
if (file.exists()) {
    println("File exists")
}

// Create file/directory
file.createNewFile()
File("mydir").mkdir()
File("mydir/subdir").mkdirs()  // Create parent dirs

// Delete
file.delete()
File("mydir").deleteRecursively()  // Delete directory and contents

// Rename/Move
file.renameTo(File("newname.txt"))

// Copy
file.copyTo(File("copy.txt"), overwrite = true)

// File properties
println("Name: \${file.name}")
println("Path: \${file.path}")
println("Absolute path: \${file.absolutePath}")
println("Size: \${file.length()} bytes")
println("Is directory: \${file.isDirectory}")
println("Is file: \${file.isFile}")
println("Can read: \${file.canRead()}")
println("Can write: \${file.canWrite()}")`}
        </CodeBlock>
      </Section>

      <Section id="directory" heading="Directory Operations">
        <CodeBlock language="kotlin">
{`val dir = File("mydir")

// List files
val files = dir.listFiles()
files?.forEach { println(it.name) }

// Walk directory tree
dir.walk().forEach { file ->
    println(file.path)
}

// Walk with filter
dir.walk()
    .filter { it.isFile }
    .filter { it.extension == "txt" }
    .forEach { println(it.name) }

// Find files recursively
val txtFiles = dir.walkTopDown()
    .filter { it.extension == "txt" }
    .toList()`}
        </CodeBlock>
      </Section>

      <Section id="path" heading="Path API (Java NIO)">
        <CodeBlock language="kotlin">
{`import java.nio.file.*

// Modern Path API
val path = Paths.get("file.txt")

// Read/Write
val content = Files.readString(path)
Files.writeString(path, "Content")

// Copy/Move
Files.copy(path, Paths.get("copy.txt"))
Files.move(path, Paths.get("moved.txt"))

// Attributes
val attrs = Files.readAttributes(path, BasicFileAttributes::class.java)
println("Created: \${attrs.creationTime()}")
println("Modified: \${attrs.lastModifiedTime()}")
println("Size: \${attrs.size()}")`}
        </CodeBlock>
      </Section>

      <Section id="conclusion" heading="Kesimpulan">
        <ul>
          <li>✅ Kotlin provides convenient extension functions untuk file I/O</li>
          <li>✅ <code>use</code> function untuk automatic resource management</li>
          <li>✅ Walk API untuk directory traversal</li>
        </ul>

        <Note type="success">
          Next: <strong>Testing</strong> - Unit testing dengan JUnit dan MockK.
        </Note>
      </Section>
    </MateriLayout>
  );
}
