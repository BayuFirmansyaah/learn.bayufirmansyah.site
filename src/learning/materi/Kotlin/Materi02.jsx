import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi02() {
  return (
    <MateriLayout
      title="Instalasi & Setup Environment"
      intro="Sebelum mulai coding dengan Kotlin, kita perlu setup development environment yang tepat. Materi ini akan memandu Anda step-by-step untuk install semua tools yang dibutuhkan, dari JDK hingga IDE."
    >
      {/* System Requirements */}
      <Section id="requirements" heading="System Requirements">
        <p>
          Sebelum memulai instalasi, pastikan sistem Anda memenuhi requirements berikut:
        </p>

        <ul>
          <li><strong>Operating System:</strong> Windows 10/11, macOS 10.14+, atau Linux (Ubuntu, Fedora, dll)</li>
          <li><strong>RAM:</strong> Minimal 4GB, recommended 8GB atau lebih</li>
          <li><strong>Storage:</strong> Minimal 2.5GB free space untuk IDE dan tools</li>
          <li><strong>Java:</strong> JDK 8 atau lebih tinggi (recommended JDK 11 atau 17 LTS)</li>
        </ul>

        <Note type="info">
          Kotlin berjalan di atas JVM (Java Virtual Machine), sehingga JDK adalah requirement utama 
          untuk menjalankan Kotlin programs.
        </Note>
      </Section>

      {/* Install JDK */}
      <Section id="install-jdk" heading="Install JDK (Java Development Kit)">
        <p>
          JDK adalah fondasi untuk menjalankan Kotlin. Berikut cara install JDK di berbagai OS:
        </p>

        <Subsection id="jdk-windows" heading="Windows">
          <p><strong>Option 1: Download dari Oracle</strong></p>
          <ol>
            <li>Kunjungi <code>oracle.com/java/technologies/downloads/</code></li>
            <li>Download JDK 17 (LTS) untuk Windows</li>
            <li>Run installer dan follow petunjuk instalasi</li>
            <li>Installer akan otomatis set environment variables</li>
          </ol>

          <p><strong>Option 2: Menggunakan Chocolatey (Package Manager)</strong></p>
          <CodeBlock language="powershell">
{`# Install Chocolatey dulu jika belum (run as Administrator)
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

# Install OpenJDK 17
choco install openjdk17

# Verify installation
java -version`}
          </CodeBlock>
        </Subsection>

        <Subsection id="jdk-macos" heading="macOS">
          <p><strong>Menggunakan Homebrew (Recommended)</strong></p>
          <CodeBlock language="bash">
{`# Install Homebrew jika belum ada
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install OpenJDK 17
brew install openjdk@17

# Link untuk system Java wrapper
sudo ln -sfn /usr/local/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk

# Add to PATH (tambahkan ke ~/.zshrc atau ~/.bash_profile)
echo 'export PATH="/usr/local/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc

# Verify installation
java -version`}
          </CodeBlock>

          <Note type="tip">
            Jika menggunakan macOS ARM (M1/M2/M3), Homebrew akan otomatis install ARM-native version 
            yang memiliki performa lebih baik.
          </Note>
        </Subsection>

        <Subsection id="jdk-linux" heading="Linux (Ubuntu/Debian)">
          <CodeBlock language="bash">
{`# Update package list
sudo apt update

# Install OpenJDK 17
sudo apt install openjdk-17-jdk

# Verify installation
java -version
javac -version

# Set JAVA_HOME (tambahkan ke ~/.bashrc)
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc`}
          </CodeBlock>

          <p><strong>Fedora/RHEL/CentOS:</strong></p>
          <CodeBlock language="bash">
{`# Install OpenJDK 17
sudo dnf install java-17-openjdk-devel

# Verify installation
java -version`}
          </CodeBlock>
        </Subsection>

        <Subsection id="verify-jdk" heading="Verify JDK Installation">
          <p>Setelah instalasi, verify bahwa JDK terinstall dengan benar:</p>
          
          <CodeBlock language="bash">
{`# Check Java version
java -version

# Output expected:
# openjdk version "17.0.x" 2023-xx-xx
# OpenJDK Runtime Environment (build 17.0.x+x)
# OpenJDK 64-Bit Server VM (build 17.0.x+x, mixed mode)

# Check Java compiler
javac -version

# Output expected:
# javac 17.0.x

# Check JAVA_HOME (Windows: PowerShell)
echo $env:JAVA_HOME

# Check JAVA_HOME (macOS/Linux)
echo $JAVA_HOME`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Install Kotlin Compiler */}
      <Section id="install-kotlin" heading="Install Kotlin Compiler">
        <p>
          Meskipun IDE modern sudah include Kotlin compiler, install standalone compiler berguna 
          untuk command-line compilation dan scripting.
        </p>

        <Subsection id="kotlin-sdkman" heading="Install via SDKMAN (Linux/macOS - Recommended)">
          <CodeBlock language="bash">
{`# Install SDKMAN
curl -s "https://get.sdkman.io" | bash
source "$HOME/.sdkman/bin/sdkman-init.sh"

# Install Kotlin
sdk install kotlin

# Verify installation
kotlin -version

# Output: Kotlin version 1.9.x-release-xxx (JRE 17.0.x+x)`}
          </CodeBlock>

          <Note type="tip">
            SDKMAN memudahkan management multiple versions dan update Kotlin dengan command: 
            <code>sdk upgrade kotlin</code>
          </Note>
        </Subsection>

        <Subsection id="kotlin-homebrew" heading="Install via Homebrew (macOS)">
          <CodeBlock language="bash">
{`# Install Kotlin
brew install kotlin

# Verify installation
kotlin -version`}
          </CodeBlock>
        </Subsection>

        <Subsection id="kotlin-windows" heading="Install via Chocolatey (Windows)">
          <CodeBlock language="powershell">
{`# Install Kotlin
choco install kotlinc

# Verify installation
kotlin -version`}
          </CodeBlock>
        </Subsection>

        <Subsection id="kotlin-manual" heading="Manual Installation (All OS)">
          <ol>
            <li>Download latest Kotlin compiler dari <code>github.com/JetBrains/kotlin/releases</code></li>
            <li>Extract ZIP file ke directory pilihan (e.g., <code>C:\kotlin</code> atau <code>/usr/local/kotlin</code>)</li>
            <li>Add <code>bin</code> directory ke PATH environment variable</li>
          </ol>

          <CodeBlock language="bash">
{`# Windows: Add ke System Environment Variables
# C:\\kotlin\\bin

# macOS/Linux: Add to ~/.bashrc or ~/.zshrc
export PATH=$PATH:/usr/local/kotlin/bin

# Verify
kotlin -version`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Install IDE */}
      <Section id="install-ide" heading="Install IDE (Integrated Development Environment)">
        <p>
          IDE yang tepat akan significantly meningkatkan produktivitas. Berikut pilihan IDE terbaik untuk Kotlin:
        </p>

        <Subsection id="intellij-idea" heading="IntelliJ IDEA (Highly Recommended)">
          <p>
            IntelliJ IDEA adalah IDE official dari JetBrains (creator Kotlin) dengan best-in-class Kotlin support.
          </p>

          <p><strong>IntelliJ IDEA Community Edition (Free)</strong></p>
          <ul>
            <li>Free dan open-source</li>
            <li>Perfect untuk Kotlin/JVM development</li>
            <li>Built-in Kotlin plugin dengan latest features</li>
            <li>Excellent code completion dan refactoring</li>
          </ul>

          <p><strong>Download & Install:</strong></p>
          <ol>
            <li>Download dari <code>jetbrains.com/idea/download/</code></li>
            <li>Pilih "Community Edition" (gratis) atau "Ultimate" (paid, trial 30 hari)</li>
            <li>Run installer dan follow wizard</li>
            <li>First launch akan prompt untuk install Kotlin plugin (biasanya sudah included)</li>
          </ol>

          <Note type="info">
            <strong>Community vs Ultimate:</strong> Community Edition sudah cukup untuk learning dan 
            most Kotlin projects. Ultimate Edition include additional features untuk web development, 
            database tools, dan framework support (Spring, etc).
          </Note>
        </Subsection>

        <Subsection id="android-studio" heading="Android Studio (Untuk Android Development)">
          <p>
            Jika fokus Anda adalah Android development, Android Studio adalah pilihan terbaik:
          </p>

          <ul>
            <li>Based on IntelliJ IDEA dengan Android-specific tools</li>
            <li>Built-in Kotlin support dan Android emulator</li>
            <li>Layout editor, profiler, dan debugging tools</li>
            <li>Free dan fully featured</li>
          </ul>

          <p><strong>Download:</strong> <code>developer.android.com/studio</code></p>
        </Subsection>

        <Subsection id="vscode" heading="VS Code (Lightweight Alternative)">
          <p>
            Visual Studio Code dengan Kotlin extension adalah alternatif lightweight:
          </p>

          <CodeBlock language="bash">
{`# Install VS Code dari code.visualstudio.com

# Install Kotlin extension dari marketplace:
# 1. Open VS Code
# 2. Go to Extensions (Ctrl+Shift+X)
# 3. Search "Kotlin Language"
# 4. Install "Kotlin" by mathiasfrohlich`}
          </CodeBlock>

          <Note type="warning">
            VS Code memiliki Kotlin support yang basic. Untuk development serius, 
            IntelliJ IDEA atau Android Studio lebih direkomendasikan karena better tooling.
          </Note>
        </Subsection>
      </Section>

      {/* Create First Project */}
      <Section id="first-project" heading="Membuat Project Kotlin Pertama">
        <Subsection id="project-intellij" heading="Dengan IntelliJ IDEA">
          <ol>
            <li>Launch IntelliJ IDEA</li>
            <li>Click "<strong>New Project</strong>"</li>
            <li>Pilih "<strong>Kotlin</strong>" di sidebar kiri</li>
            <li>Pilih project template: "<strong>Console Application</strong>"</li>
            <li>Configure project:
              <ul>
                <li><strong>Name:</strong> HelloKotlin</li>
                <li><strong>Location:</strong> Pilih folder project</li>
                <li><strong>Build system:</strong> Gradle (Kotlin DSL) - Recommended</li>
                <li><strong>JDK:</strong> Pilih JDK 17 yang sudah terinstall</li>
                <li><strong>Add sample code:</strong> Check this option</li>
              </ul>
            </li>
            <li>Click "<strong>Create</strong>"</li>
          </ol>

          <Note type="tip">
            Gradle adalah build automation tool yang most commonly used untuk Kotlin projects. 
            Kotlin DSL membuat build scripts lebih readable dan type-safe.
          </Note>
        </Subsection>

        <Subsection id="project-structure" heading="Struktur Project">
          <p>IntelliJ akan generate project dengan struktur seperti ini:</p>
          
          <CodeBlock language="tree">
{`HelloKotlin/
├── .gradle/              # Gradle cache
├── .idea/                # IntelliJ IDEA settings
├── gradle/               # Gradle wrapper
│   └── wrapper/
├── src/
│   └── main/
│       └── kotlin/
│           └── Main.kt   # Entry point file
├── .gitignore
├── build.gradle.kts      # Build configuration (Kotlin DSL)
├── gradle.properties     # Gradle properties
├── gradlew               # Gradle wrapper (Unix)
├── gradlew.bat           # Gradle wrapper (Windows)
└── settings.gradle.kts   # Project settings`}
          </CodeBlock>
        </Subsection>

        <Subsection id="main-file" heading="Main.kt - Entry Point">
          <p>File <code>src/main/kotlin/Main.kt</code> berisi:</p>
          
          <CodeBlock language="kotlin">
{`fun main() {
    println("Hello World!")
}

// IntelliJ akan show green arrow di gutter untuk run program
// Click arrow atau press Ctrl+Shift+F10 (Windows/Linux) / Ctrl+Shift+R (macOS)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="run-project" heading="Run Project">
          <p>Ada beberapa cara untuk run Kotlin program di IntelliJ:</p>

          <p><strong>Method 1: Gutter Icon</strong></p>
          <ul>
            <li>Click green arrow di sebelah kiri <code>fun main()</code></li>
            <li>Select "Run 'MainKt'"</li>
          </ul>

          <p><strong>Method 2: Keyboard Shortcut</strong></p>
          <ul>
            <li>Windows/Linux: <code>Ctrl+Shift+F10</code></li>
            <li>macOS: <code>Ctrl+Shift+R</code></li>
          </ul>

          <p><strong>Method 3: Run Configuration</strong></p>
          <ul>
            <li>Click dropdown di toolbar (biasanya "Current File")</li>
            <li>Select atau create Run Configuration</li>
            <li>Click green play button</li>
          </ul>

          <Note type="success">
            Output "Hello World!" akan muncul di Run window di bottom panel.
          </Note>
        </Subsection>
      </Section>

      {/* Command Line Development */}
      <Section id="command-line" heading="Command Line Development">
        <p>
          Untuk quick testing atau scripting, Anda bisa compile dan run Kotlin dari command line:
        </p>

        <Subsection id="compile-run" heading="Compile & Run">
          <CodeBlock language="bash">
{`# Create file Hello.kt
echo 'fun main() { println("Hello from CLI!") }' > Hello.kt

# Compile ke JAR
kotlinc Hello.kt -include-runtime -d Hello.jar

# Run JAR
java -jar Hello.jar

# Output: Hello from CLI!`}
          </CodeBlock>

          <p><strong>Penjelasan options:</strong></p>
          <ul>
            <li><code>-include-runtime</code> - Include Kotlin runtime di JAR (membuat file standalone)</li>
            <li><code>-d Hello.jar</code> - Output destination file</li>
          </ul>
        </Subsection>

        <Subsection id="kotlin-script" heading="Kotlin Script (.kts)">
          <p>
            Kotlin scripts tidak perlu compilation, langsung dijalankan seperti Python atau JavaScript:
          </p>

          <CodeBlock language="bash">
{`# Create script file
cat > hello.kts << 'EOF'
println("Hello from Kotlin Script!")

val name = "Kotlin"
val version = "1.9"
println("Learning $name $version")

// Can use full Kotlin features
listOf(1, 2, 3, 4, 5)
    .filter { it % 2 == 0 }
    .forEach { println("Even number: $it") }
EOF

# Run script directly
kotlin hello.kts

# Output:
# Hello from Kotlin Script!
# Learning Kotlin 1.9
# Even number: 2
# Even number: 4`}
          </CodeBlock>

          <Note type="tip">
            Kotlin scripts (.kts) perfect untuk automation tasks, quick prototyping, atau 
            testing small code snippets tanpa perlu setup full project.
          </Note>
        </Subsection>

        <Subsection id="kotlin-repl" heading="Kotlin REPL (Interactive Shell)">
          <p>
            REPL (Read-Eval-Print Loop) untuk interactive Kotlin programming:
          </p>

          <CodeBlock language="bash">
{`# Start REPL
kotlin

# Sekarang Anda di Kotlin REPL prompt:
Welcome to Kotlin version 1.9.0 (JRE 17.0.x+x)
Type :help for help, :quit for quit
>>> 

# Try some code:
>>> val name = "Kotlin"
>>> println("Hello, $name!")
Hello, Kotlin!

>>> fun add(a: Int, b: Int) = a + b
>>> add(5, 3)
8

# List manipulation
>>> listOf(1, 2, 3, 4, 5).filter { it > 2 }
[3, 4, 5]

# Exit REPL
>>> :quit`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Build Tools */}
      <Section id="build-tools" heading="Build Tools - Gradle">
        <p>
          Gradle adalah build automation tool yang paling commonly used untuk Kotlin projects. 
          Gradle mengelola dependencies, compilation, testing, dan packaging.
        </p>

        <Subsection id="gradle-basics" heading="Gradle Basics">
          <p>File <code>build.gradle.kts</code> adalah konfigurasi utama project:</p>

          <CodeBlock language="kotlin">
{`// build.gradle.kts
plugins {
    kotlin("jvm") version "1.9.0"  // Kotlin JVM plugin
    application                     // Application plugin
}

group = "com.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()  // Repository untuk download dependencies
}

dependencies {
    // Kotlin standard library (otomatis included)
    implementation(kotlin("stdlib"))
    
    // Testing framework
    testImplementation(kotlin("test"))
}

application {
    mainClass.set("MainKt")  // Entry point class
}

tasks.test {
    useJUnitPlatform()  // Use JUnit 5
}

kotlin {
    jvmToolchain(17)  // Use JDK 17
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="gradle-commands" heading="Gradle Commands">
          <CodeBlock language="bash">
{`# Build project
./gradlew build

# Run application
./gradlew run

# Clean build
./gradlew clean

# Run tests
./gradlew test

# Create distributable package
./gradlew installDist

# List all tasks
./gradlew tasks

# Build with verbose output
./gradlew build --info`}
          </CodeBlock>

          <Note type="info">
            Gunakan <code>./gradlew</code> (Gradle Wrapper) instead of <code>gradle</code> 
            untuk ensure consistent Gradle version across different environments.
          </Note>
        </Subsection>

        <Subsection id="add-dependencies" heading="Menambahkan Dependencies">
          <p>Tambahkan library external di <code>dependencies</code> block:</p>

          <CodeBlock language="kotlin">
{`dependencies {
    implementation(kotlin("stdlib"))
    
    // JSON parsing
    implementation("com.google.code.gson:gson:2.10.1")
    
    // HTTP client
    implementation("com.squareup.okhttp3:okhttp:4.11.0")
    
    // Coroutines
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3")
    
    // Testing
    testImplementation(kotlin("test"))
    testImplementation("io.mockk:mockk:1.13.8")
}`}
          </CodeBlock>

          <Note type="tip">
            Search dependencies di <code>mvnrepository.com</code> untuk find latest versions 
            dan Gradle/Maven coordinates.
          </Note>
        </Subsection>
      </Section>

      {/* Online Playgrounds */}
      <Section id="online-playground" heading="Online Kotlin Playground">
        <p>
          Tidak ingin install anything? Try Kotlin langsung di browser dengan official Kotlin Playground:
        </p>

        <ul>
          <li>
            <strong>Kotlin Playground</strong> - <code>play.kotlinlang.org</code>
            <ul>
              <li>Write, run, dan share Kotlin code online</li>
              <li>Support different Kotlin targets: JVM, JS, Native</li>
              <li>Built-in examples dan tutorials</li>
              <li>No installation needed</li>
            </ul>
          </li>
          <li>
            <strong>JetBrains Academy</strong> - Interactive learning dengan exercises
          </li>
          <li>
            <strong>Kotlin Koans</strong> - Learn Kotlin through exercises di browser
          </li>
        </ul>

        <Note type="tip">
          Kotlin Playground sangat berguna untuk quick prototyping, testing code snippets, 
          atau berbagi code dengan team members.
        </Note>
      </Section>

      {/* Troubleshooting */}
      <Section id="troubleshooting" heading="Troubleshooting Common Issues">
        <Subsection id="issue-java-home" heading="JAVA_HOME not set">
          <p><strong>Problem:</strong> Error "JAVA_HOME is not set"</p>
          <p><strong>Solution:</strong></p>
          
          <CodeBlock language="bash">
{`# Windows (PowerShell as Administrator)
[System.Environment]::SetEnvironmentVariable("JAVA_HOME", "C:\\Program Files\\Java\\jdk-17", "Machine")

# macOS/Linux (add to ~/.bashrc or ~/.zshrc)
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64  # Linux
export JAVA_HOME=$(/usr/libexec/java_home)  # macOS

# Verify
echo $JAVA_HOME`}
          </CodeBlock>
        </Subsection>

        <Subsection id="issue-kotlin-not-found" heading="kotlinc: command not found">
          <p><strong>Problem:</strong> Kotlin compiler tidak ditemukan</p>
          <p><strong>Solution:</strong> Add Kotlin bin directory ke PATH</p>
          
          <CodeBlock language="bash">
{`# Check current PATH
echo $PATH

# Add Kotlin to PATH (example for manual installation)
# macOS/Linux: Add to ~/.bashrc or ~/.zshrc
export PATH=$PATH:/usr/local/kotlin/bin

# Windows: Add via System Environment Variables
# C:\\kotlin\\bin

# Reload shell configuration
source ~/.bashrc  # or source ~/.zshrc`}
          </CodeBlock>
        </Subsection>

        <Subsection id="issue-gradle" heading="Gradle Build Fails">
          <p><strong>Problem:</strong> Build fails dengan berbagai errors</p>
          <p><strong>Solutions:</strong></p>
          
          <CodeBlock language="bash">
{`# Clean dan rebuild
./gradlew clean build

# Clear Gradle cache
rm -rf ~/.gradle/caches/

# Use Gradle daemon untuk faster builds
./gradlew --daemon build

# Check Gradle version compatibility
./gradlew --version

# Update Gradle wrapper
./gradlew wrapper --gradle-version 8.4`}
          </CodeBlock>
        </Subsection>

        <Subsection id="issue-intellij" heading="IntelliJ: Kotlin Plugin Issues">
          <p><strong>Problem:</strong> Code completion tidak work atau syntax errors</p>
          <p><strong>Solution:</strong></p>
          
          <ul>
            <li>Go to: <code>File → Settings → Plugins</code></li>
            <li>Search "Kotlin" dan pastikan plugin enabled dan up-to-date</li>
            <li>Restart IntelliJ IDEA</li>
            <li>Invalidate caches: <code>File → Invalidate Caches / Restart</code></li>
            <li>Reimport Gradle project: Right-click <code>build.gradle.kts → Reload Gradle Project</code></li>
          </ul>
        </Subsection>
      </Section>

      {/* Kesimpulan */}
      <Section id="conclusion" heading="Kesimpulan">
        <p>
          Sekarang development environment Kotlin Anda sudah ready! Anda telah:
        </p>

        <ul>
          <li>✅ Install JDK sebagai foundation untuk Kotlin</li>
          <li>✅ Install Kotlin compiler untuk command-line development</li>
          <li>✅ Setup IDE (IntelliJ IDEA) dengan Kotlin support</li>
          <li>✅ Create dan run first Kotlin project</li>
          <li>✅ Understand Gradle build system basics</li>
          <li>✅ Know alternative development options (REPL, Playground, Scripts)</li>
        </ul>

        <Note type="success">
          <strong>Ready to code!</strong> Di materi selanjutnya, kita akan deep dive ke Kotlin 
          syntax dan mulai dengan fundamentals: variables, data types, dan operators.
        </Note>
      </Section>
    </MateriLayout>
  );
}
