import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi02() {
  return (
    <MateriLayout
      title="Instalasi & Setup Environment"
      intro="Panduan lengkap instalasi Flutter SDK, setup development environment, dan membuat project Flutter pertama Anda. Ikuti step-by-step untuk memastikan semua tools ter-install dengan benar."
    >
      {/* Download Flutter SDK */}
      <Section id="download-flutter" heading="Download Flutter SDK">
        <p>
          Flutter SDK adalah toolkit lengkap yang berisi framework, tools, dan libraries untuk 
          develop aplikasi Flutter. Mari kita download dan install!
        </p>

        <Subsection id="download-windows" heading="Windows">
          <p>
            <strong>Step 1:</strong> Download Flutter SDK dari official website
          </p>
          <ul>
            <li>Buka <a href="https://docs.flutter.dev/get-started/install/windows" target="_blank" rel="noopener">https://docs.flutter.dev/get-started/install/windows</a></li>
            <li>Download file ZIP (sekitar 1.5 GB): <code>flutter_windows_xxx-stable.zip</code></li>
            <li>Extract ke folder tanpa spasi, misalnya: <code>C:\src\flutter</code></li>
          </ul>

          <Note type="warning">
            <strong>Jangan extract ke folder yang butuh elevated privileges seperti:</strong><br/>
            ❌ <code>C:\Program Files\</code><br/>
            ✅ <code>C:\src\flutter</code> atau <code>C:\Users\YourName\flutter</code>
          </Note>

          <p>
            <strong>Step 2:</strong> Setup Environment Variables
          </p>
          <ol>
            <li>Search "Environment Variables" di Windows Start Menu</li>
            <li>Klik "Edit the system environment variables"</li>
            <li>Klik "Environment Variables" button</li>
            <li>Di "User variables", cari variable <code>Path</code></li>
            <li>Klik "Edit" → "New"</li>
            <li>Tambahkan path: <code>C:\src\flutter\bin</code></li>
            <li>Klik OK untuk save</li>
          </ol>

          <p>
            <strong>Step 3:</strong> Verify Installation
          </p>
          <p>
            Buka Command Prompt atau PowerShell baru (penting: buka yang baru!) dan jalankan:
          </p>

          <CodeBlock language="bash">
{`# Check Flutter version
flutter --version

# Output expected:
# Flutter 3.x.x • channel stable
# Framework • revision xxxx
# Engine • revision xxxx
# Tools • Dart 3.x.x • DevTools 2.x.x`}
          </CodeBlock>

          <Note type="tip">
            Jika command <code>flutter</code> tidak ditemukan, restart terminal atau bahkan restart 
            komputer agar environment variables ter-load.
          </Note>
        </Subsection>

        <Subsection id="download-macos" heading="macOS">
          <p>
            <strong>Step 1:</strong> Download Flutter SDK
          </p>
          <ul>
            <li>Buka <a href="https://docs.flutter.dev/get-started/install/macos" target="_blank" rel="noopener">https://docs.flutter.dev/get-started/install/macos</a></li>
            <li>Download untuk architecture Anda:
              <ul>
                <li><strong>Apple Silicon (M1/M2/M3):</strong> <code>flutter_macos_arm64_xxx-stable.zip</code></li>
                <li><strong>Intel:</strong> <code>flutter_macos_xxx-stable.zip</code></li>
              </ul>
            </li>
            <li>Extract ke folder, misalnya: <code>~/development/flutter</code></li>
          </ul>

          <CodeBlock language="bash">
{`# Extract menggunakan terminal
cd ~/development
unzip ~/Downloads/flutter_macos_*-stable.zip`}
          </CodeBlock>

          <p>
            <strong>Step 2:</strong> Setup PATH
          </p>
          <p>
            Edit file config shell Anda (<code>~/.zshrc</code> untuk zsh atau <code>~/.bash_profile</code> untuk bash):
          </p>

          <CodeBlock language="bash">
{`# Buka editor
nano ~/.zshrc

# Tambahkan line ini di akhir file:
export PATH="$PATH:$HOME/development/flutter/bin"

# Save (Ctrl+O, Enter, Ctrl+X)
# Reload config
source ~/.zshrc`}
          </CodeBlock>

          <p>
            <strong>Step 3:</strong> Verify Installation
          </p>

          <CodeBlock language="bash">
{`# Check Flutter version
flutter --version

# Check PATH sudah benar
which flutter
# Output: /Users/yourname/development/flutter/bin/flutter`}
          </CodeBlock>
        </Subsection>

        <Subsection id="download-linux" heading="Linux (Ubuntu/Debian)">
          <p>
            <strong>Step 1:</strong> Install Dependencies
          </p>

          <CodeBlock language="bash">
{`# Update package list
sudo apt-get update

# Install required tools
sudo apt-get install -y \\
  curl \\
  git \\
  unzip \\
  xz-utils \\
  zip \\
  libglu1-mesa`}
          </CodeBlock>

          <p>
            <strong>Step 2:</strong> Download & Extract Flutter
          </p>

          <CodeBlock language="bash">
{`# Download Flutter
cd ~
wget https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_xxx-stable.tar.xz

# Extract
tar xf flutter_linux_*-stable.tar.xz

# Move to desired location
sudo mv flutter /opt/`}
          </CodeBlock>

          <p>
            <strong>Step 3:</strong> Setup PATH
          </p>

          <CodeBlock language="bash">
{`# Edit bashrc atau zshrc
nano ~/.bashrc

# Add to end of file:
export PATH="$PATH:/opt/flutter/bin"

# Reload
source ~/.bashrc

# Verify
flutter --version`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Flutter Doctor */}
      <Section id="flutter-doctor" heading="Flutter Doctor - System Check">
        <p>
          <code>flutter doctor</code> adalah command yang sangat penting! Ia akan check seluruh 
          environment Anda dan memberitahu apa yang perlu di-install atau di-fix.
        </p>

        <CodeBlock language="bash">
{`# Run flutter doctor
flutter doctor

# Output example:
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 3.x.x, on macOS 14.0)
[!] Android toolchain - develop for Android devices
    ✗ Android SDK not found
[!] Xcode - develop for iOS and macOS
    ✗ Xcode not installed
[✓] Chrome - develop for the web
[!] Android Studio (not installed)
[✓] VS Code (version 1.80)
[!] Connected device
    ! No devices available`}
        </CodeBlock>

        <p>
          <strong>Penjelasan Symbol:</strong>
        </p>
        <ul>
          <li><strong>[✓]</strong> - Sudah ter-install dengan benar</li>
          <li><strong>[!]</strong> - Ada issue yang perlu diperbaiki</li>
          <li><strong>[✗]</strong> - Belum ter-install</li>
        </ul>

        <Note type="info">
          Tidak semua item harus [✓]. Misalnya, jika Anda hanya develop untuk Android, 
          Xcode tidak perlu di-install. Yang penting ada minimal 1 platform target!
        </Note>

        <p>
          <strong>Run dengan verbose untuk detail:</strong>
        </p>

        <CodeBlock language="bash">
{`# Detailed output
flutter doctor -v

# Check specific issue
flutter doctor --android-licenses  # Accept Android licenses`}
        </CodeBlock>
      </Section>

      {/* Instalasi IDE */}
      <Section id="install-ide" heading="Instalasi IDE & Editor">
        <p>
          Anda bisa menggunakan Android Studio atau VS Code. Keduanya excellent untuk Flutter development!
        </p>

        <Subsection id="android-studio" heading="Android Studio (Recommended untuk Pemula)">
          <p>
            Android Studio adalah IDE official dari Google dengan Flutter support lengkap.
          </p>

          <p>
            <strong>Step 1:</strong> Download Android Studio
          </p>
          <ul>
            <li>Download dari <a href="https://developer.android.com/studio" target="_blank" rel="noopener">https://developer.android.com/studio</a></li>
            <li>Install seperti aplikasi biasa</li>
            <li>Buka Android Studio pertama kali (tunggu setup wizard selesai)</li>
          </ul>

          <p>
            <strong>Step 2:</strong> Install Flutter Plugin
          </p>
          <ol>
            <li>Buka Android Studio</li>
            <li>Klik <strong>Plugins</strong> (di Welcome screen atau <code>File → Settings → Plugins</code>)</li>
            <li>Search "<strong>Flutter</strong>"</li>
            <li>Klik <strong>Install</strong> (akan otomatis install Dart plugin juga)</li>
            <li>Restart Android Studio</li>
          </ol>

          <p>
            <strong>Step 3:</strong> Setup Android SDK
          </p>
          <p>
            Android Studio sudah include Android SDK. Verify dengan:
          </p>

          <CodeBlock language="bash">
{`# Check Android SDK location
flutter doctor -v

# Output will show:
# Android SDK at: /Users/yourname/Library/Android/sdk`}
          </CodeBlock>

          <p>
            <strong>Step 4:</strong> Accept Android Licenses
          </p>

          <CodeBlock language="bash">
{`# Accept all Android licenses
flutter doctor --android-licenses

# Ketik 'y' untuk accept semua
# (tekan 'y' + Enter berulang kali sampai selesai)`}
          </CodeBlock>

          <Note type="success">
            Setelah ini, <code>flutter doctor</code> akan show [✓] untuk Android toolchain!
          </Note>
        </Subsection>

        <Subsection id="vscode" heading="VS Code (Lightweight & Fast)">
          <p>
            VS Code adalah editor lightweight yang sangat populer untuk Flutter development.
          </p>

          <p>
            <strong>Step 1:</strong> Download VS Code
          </p>
          <ul>
            <li>Download dari <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">https://code.visualstudio.com/</a></li>
            <li>Install dan buka VS Code</li>
          </ul>

          <p>
            <strong>Step 2:</strong> Install Extensions
          </p>
          <ol>
            <li>Buka VS Code</li>
            <li>Klik icon Extensions (Ctrl+Shift+X)</li>
            <li>Install extensions berikut:
              <ul>
                <li><strong>Flutter</strong> (by Dart Code) - Core Flutter support</li>
                <li><strong>Dart</strong> (by Dart Code) - Dart language support</li>
              </ul>
            </li>
          </ol>

          <p>
            <strong>Recommended Extensions (Optional):</strong>
          </p>
          <ul>
            <li><strong>Awesome Flutter Snippets</strong> - Code snippets</li>
            <li><strong>Bracket Pair Colorizer</strong> - Colored brackets</li>
            <li><strong>Error Lens</strong> - Inline error messages</li>
            <li><strong>Flutter Widget Snippets</strong> - Widget shortcuts</li>
            <li><strong>Pubspec Assist</strong> - Manage dependencies</li>
          </ul>

          <Note type="tip">
            VS Code lebih ringan dan cepat, cocok jika laptop Anda memiliki RAM terbatas. 
            Android Studio lebih feature-rich dengan visual layout editor.
          </Note>
        </Subsection>
      </Section>

      {/* Setup Emulator/Simulator */}
      <Section id="setup-emulator" heading="Setup Emulator/Simulator">
        <p>
          Untuk testing aplikasi, Anda butuh device (physical atau emulator/simulator).
        </p>

        <Subsection id="android-emulator" heading="Android Emulator">
          <p>
            <strong>Via Android Studio:</strong>
          </p>
          <ol>
            <li>Buka Android Studio</li>
            <li>Klik <strong>Device Manager</strong> (icon device di toolbar)</li>
            <li>Klik <strong>Create Device</strong></li>
            <li>Pilih device (recommended: <strong>Pixel 6</strong> atau <strong>Pixel 7</strong>)</li>
            <li>Pilih system image (download jika belum ada):
              <ul>
                <li>Recommended: <strong>API 33 (Android 13.0)</strong> atau lebih baru</li>
                <li>Pilih <strong>x86_64</strong> untuk Intel, <strong>arm64-v8a</strong> untuk Apple Silicon</li>
              </ul>
            </li>
            <li>Klik <strong>Next</strong> → <strong>Finish</strong></li>
          </ol>

          <p>
            <strong>Start Emulator:</strong>
          </p>

          <CodeBlock language="bash">
{`# List available emulators
flutter emulators

# Launch emulator
flutter emulators --launch <emulator_id>

# Or dari Android Studio: klik Play button di Device Manager`}
          </CodeBlock>

          <Note type="warning">
            <strong>Emulator butuh virtualization enabled!</strong><br/>
            • Intel: Enable VT-x di BIOS<br/>
            • AMD: Enable SVM Mode di BIOS<br/>
            • Windows: Enable Hyper-V atau HAXM
          </Note>
        </Subsection>

        <Subsection id="ios-simulator" heading="iOS Simulator (macOS Only)">
          <p>
            <strong>Step 1:</strong> Install Xcode
          </p>
          <ul>
            <li>Download Xcode dari Mac App Store (gratis, ~12GB)</li>
            <li>Install dan buka Xcode first time (agreement, install additional components)</li>
          </ul>

          <CodeBlock language="bash">
{`# Setup Xcode command-line tools
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch

# Install CocoaPods (dependency manager for iOS)
sudo gem install cocoapods

# Verify
pod --version`}
          </CodeBlock>

          <p>
            <strong>Step 2:</strong> Open Simulator
          </p>

          <CodeBlock language="bash">
{`# Open default iOS Simulator
open -a Simulator

# Or via Xcode: Xcode → Open Developer Tool → Simulator

# List available simulators
xcrun simctl list devices

# Run app on simulator
flutter run`}
          </CodeBlock>

          <Note type="info">
            Simulator akan otomatis launch device terbaru (iPhone 15 Pro, dll). 
            Anda bisa switch device dari Simulator menu: File → Open Simulator → iOS 17.x → ...
          </Note>
        </Subsection>

        <Subsection id="physical-device" heading="Physical Device">
          <p>
            <strong>Android Physical Device:</strong>
          </p>
          <ol>
            <li>Enable <strong>Developer Options</strong>:
              <ul>
                <li>Settings → About Phone</li>
                <li>Tap <strong>Build Number</strong> 7 kali</li>
              </ul>
            </li>
            <li>Enable <strong>USB Debugging</strong>:
              <ul>
                <li>Settings → Developer Options</li>
                <li>Enable "USB Debugging"</li>
              </ul>
            </li>
            <li>Connect device via USB cable</li>
            <li>Allow debugging pada popup di device</li>
          </ol>

          <CodeBlock language="bash">
{`# Check connected devices
flutter devices

# Output:
# Found 2 connected devices:
#   sdk gphone64 arm64 (mobile) • emulator-5554 • android-arm64 • Android 13 (API 33)
#   SM G998B (mobile)           • 988B12345      • android-arm64 • Android 14 (API 34)`}
          </CodeBlock>

          <p>
            <strong>iOS Physical Device:</strong>
          </p>
          <ol>
            <li>Connect iPhone/iPad via USB</li>
            <li>Trust komputer pada popup device</li>
            <li>Di Xcode, login dengan Apple ID (Xcode → Preferences → Accounts)</li>
            <li>Set development team di Runner project</li>
          </ol>

          <Note type="warning">
            <strong>iOS butuh Apple Developer Account untuk deploy ke physical device!</strong><br/>
            • Free account: 7 days limit, perlu resign tiap minggu<br/>
            • Paid ($99/year): No limits, publish ke App Store
          </Note>
        </Subsection>
      </Section>

      {/* Membuat Project Pertama */}
      <Section id="create-project" heading="Membuat Project Flutter Pertama">
        <p>
          Saatnya membuat project Flutter pertama Anda! Ada beberapa cara untuk create project.
        </p>

        <Subsection id="via-command-line" heading="Via Command Line">
          <CodeBlock language="bash">
{`# Create new Flutter project
flutter create my_first_app

# Options:
# --org: Organization name (com.yourcompany)
# --platforms: Target platforms (android,ios,web)
# --description: Project description

# Example with options:
flutter create \\
  --org com.ubaytech \\
  --platforms android,ios \\
  --description "My awesome Flutter app" \\
  my_first_app

# Navigate to project
cd my_first_app

# Run app
flutter run`}
          </CodeBlock>

          <Note type="tip">
            Gunakan <strong>snake_case</strong> untuk project name (my_first_app, not MyFirstApp). 
            Flutter akan otomatis convert untuk package name.
          </Note>
        </Subsection>

        <Subsection id="via-android-studio" heading="Via Android Studio">
          <ol>
            <li>Buka Android Studio</li>
            <li>Klik <strong>New Flutter Project</strong></li>
            <li>Select <strong>Flutter Application</strong></li>
            <li>Klik <strong>Next</strong></li>
            <li>Isi project details:
              <ul>
                <li><strong>Project name:</strong> my_first_app</li>
                <li><strong>Flutter SDK path:</strong> (auto-detected atau browse)</li>
                <li><strong>Project location:</strong> pilih folder</li>
                <li><strong>Description:</strong> opsional</li>
              </ul>
            </li>
            <li>Klik <strong>Next</strong> → Set package name</li>
            <li>Klik <strong>Finish</strong></li>
          </ol>
        </Subsection>

        <Subsection id="via-vscode" heading="Via VS Code">
          <ol>
            <li>Buka VS Code</li>
            <li>Tekan <strong>Ctrl+Shift+P</strong> (Cmd+Shift+P di Mac)</li>
            <li>Ketik "<strong>Flutter: New Project</strong>"</li>
            <li>Select <strong>Application</strong></li>
            <li>Pilih folder untuk project</li>
            <li>Beri nama project: <code>my_first_app</code></li>
            <li>Wait hingga project generated</li>
          </ol>
        </Subsection>
      </Section>

      {/* Struktur Project Flutter */}
      <Section id="project-structure" heading="Struktur Folder Flutter Project">
        <p>
          Mari kita pahami struktur folder Flutter project yang baru dibuat:
        </p>

        <CodeBlock language="plaintext">
{`my_first_app/
├── android/              # Android-specific code & config
├── ios/                  # iOS-specific code & config
├── lib/                  # 📁 MAIN: Dart code Anda
│   └── main.dart         # Entry point aplikasi
├── linux/                # Linux desktop config
├── macos/                # macOS desktop config
├── test/                 # Unit & widget tests
├── web/                  # Web-specific files
├── windows/              # Windows desktop config
├── .gitignore            # Git ignore rules
├── .metadata             # Flutter metadata
├── analysis_options.yaml # Dart analyzer config
├── pubspec.yaml          # 📦 Dependencies & assets
├── pubspec.lock          # Locked dependency versions
└── README.md             # Project documentation`}
        </CodeBlock>

        <Subsection id="important-files" heading="File & Folder Penting">
          <p>
            <strong>lib/main.dart</strong> - Entry point aplikasi
          </p>
          <p>
            File ini berisi fungsi <code>main()</code> yang dijalankan pertama kali saat app start.
          </p>

          <CodeBlock language="dart">
{`import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());  // Run aplikasi
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      home: MyHomePage(),
    );
  }
}`}
          </CodeBlock>

          <p>
            <strong>pubspec.yaml</strong> - Configuration & Dependencies
          </p>
          <p>
            File paling penting untuk manage dependencies, assets, dan project config!
          </p>

          <CodeBlock language="yaml">
{`name: my_first_app        # Package name
description: A new Flutter project
publish_to: 'none'         # Jangan publish ke pub.dev
version: 1.0.0+1           # Version number

environment:
  sdk: '>=3.0.0 <4.0.0'    # Dart SDK version

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2  # iOS-style icons
  
  # Add packages here:
  # http: ^1.1.0
  # provider: ^6.0.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^2.0.0    # Linting rules

flutter:
  uses-material-design: true
  
  # Assets (images, fonts, etc):
  # assets:
  #   - images/logo.png
  #   - assets/data.json
  
  # fonts:
  #   - family: Roboto
  #     fonts:
  #       - asset: fonts/Roboto-Regular.ttf`}
          </CodeBlock>

          <Note type="info">
            Setiap kali edit <code>pubspec.yaml</code>, jalankan <code>flutter pub get</code> 
            untuk download dependencies!
          </Note>

          <p>
            <strong>android/ & ios/</strong> - Platform-Specific Code
          </p>
          <p>
            Folder ini berisi native code (Kotlin/Swift) dan configuration files. 
            Anda jarang perlu edit file di sini kecuali untuk:
          </p>
          <ul>
            <li>Configure app permissions</li>
            <li>Setup app signing</li>
            <li>Add native plugins</li>
            <li>Customize app icons & splash screen</li>
          </ul>

          <p>
            <strong>test/</strong> - Testing Code
          </p>
          <p>
            Folder untuk unit tests, widget tests, dan integration tests. Best practice: 
            mirror struktur <code>lib/</code> di <code>test/</code>.
          </p>
        </Subsection>
      </Section>

      {/* Run App */}
      <Section id="run-app" heading="Running Your First App">
        <p>
          Mari kita jalankan aplikasi Flutter pertama!
        </p>

        <Subsection id="run-commands" heading="Flutter Run Commands">
          <CodeBlock language="bash">
{`# Run app (auto-detect device)
flutter run

# Run on specific device
flutter run -d <device-id>

# Run with hot reload enabled (default)
flutter run

# Run in release mode (optimized)
flutter run --release

# Run in profile mode (performance profiling)
flutter run --profile

# Run on Chrome (web)
flutter run -d chrome

# Run on all connected devices
flutter run -d all`}
          </CodeBlock>

          <p>
            <strong>Keyboard Shortcuts saat Running:</strong>
          </p>
          <ul>
            <li><strong>r</strong> - Hot reload (reload code, preserve state)</li>
            <li><strong>R</strong> - Hot restart (restart app, clear state)</li>
            <li><strong>q</strong> - Quit (stop app)</li>
            <li><strong>s</strong> - Screenshot</li>
            <li><strong>w</strong> - Dump widget hierarchy</li>
            <li><strong>t</strong> - Dump rendering tree</li>
            <li><strong>p</strong> - Toggle performance overlay</li>
            <li><strong>o</strong> - Toggle platform (Android/iOS styles)</li>
          </ul>
        </Subsection>

        <Subsection id="first-modification" heading="Modifikasi Pertama - Hot Reload Magic!">
          <p>
            Mari kita coba Hot Reload yang luar biasa cepat!
          </p>

          <p>
            <strong>Step 1:</strong> Buka <code>lib/main.dart</code>
          </p>
          <p>
            <strong>Step 2:</strong> Cari line ini (sekitar line 90-95):
          </p>

          <CodeBlock language="dart">
{`Text(
  'You have pushed the button this many times:',
),`}
          </CodeBlock>

          <p>
            <strong>Step 3:</strong> Ubah text-nya:
          </p>

          <CodeBlock language="dart">
{`Text(
  'Halo Flutter! Kamu keren banget! 🚀',
),`}
          </CodeBlock>

          <p>
            <strong>Step 4:</strong> Save file (Ctrl+S atau Cmd+S)
          </p>
          <p>
            ✨ <strong>Boom!</strong> Perubahan langsung terlihat di app dalam hitungan milidetik! 
            Ini adalah Hot Reload magic!
          </p>

          <Note type="success">
            <strong>Congratulations!</strong> 🎉 Anda baru saja merasakan Hot Reload, salah satu fitur 
            paling powerful dari Flutter. Development jadi super cepat!
          </Note>
        </Subsection>

        <Subsection id="troubleshooting" heading="Troubleshooting Common Issues">
          <p>
            <strong>Issue 1: "No devices found"</strong>
          </p>
          <CodeBlock language="bash">
{`# Check connected devices
flutter devices

# If no devices:
# - Start emulator/simulator
# - Enable USB debugging on physical device
# - Check cable connection`}
          </CodeBlock>

          <p>
            <strong>Issue 2: "Waiting for another flutter command to release the startup lock"</strong>
          </p>
          <CodeBlock language="bash">
{`# Kill all Flutter processes
# On macOS/Linux:
killall -9 dart

# On Windows:
taskkill /F /IM dart.exe

# Or delete lock file:
rm path/to/flutter/bin/cache/lockfile`}
          </CodeBlock>

          <p>
            <strong>Issue 3: "Gradle build failed" (Android)</strong>
          </p>
          <CodeBlock language="bash">
{`# Clean and rebuild
flutter clean
flutter pub get
flutter run

# If still fails, check:
# - Java JDK installed? (java --version)
# - Android licenses accepted? (flutter doctor --android-licenses)
# - Internet connection? (Gradle downloads dependencies)`}
          </CodeBlock>

          <p>
            <strong>Issue 4: App crashes on startup (iOS)</strong>
          </p>
          <CodeBlock language="bash">
{`# Clean iOS build
cd ios
pod deintegrate
pod install
cd ..
flutter clean
flutter run

# Check CocoaPods version
pod --version  # Should be >= 1.11.0`}
          </CodeBlock>

          <Note type="tip">
            Jika masih ada masalah, jalankan <code>flutter doctor -v</code> untuk detailed diagnostics, 
            atau search error message di Google/StackOverflow. Community sangat helpful!
          </Note>
        </Subsection>
      </Section>

      {/* Rangkuman */}
      <Section id="summary" heading="Rangkuman">
        <p>
          Selamat! Anda telah berhasil setup Flutter development environment lengkap. Di materi ini kita telah:
        </p>
        <ul>
          <li>✅ Download & install Flutter SDK untuk Windows/macOS/Linux</li>
          <li>✅ Setup environment variables & PATH</li>
          <li>✅ Run <code>flutter doctor</code> untuk check system</li>
          <li>✅ Install IDE (Android Studio / VS Code) dengan Flutter plugins</li>
          <li>✅ Setup Android emulator / iOS simulator</li>
          <li>✅ Accept Android licenses</li>
          <li>✅ Create project Flutter pertama dengan <code>flutter create</code></li>
          <li>✅ Memahami struktur folder Flutter project</li>
          <li>✅ Run aplikasi dengan <code>flutter run</code></li>
          <li>✅ Mencoba Hot Reload yang amazing!</li>
        </ul>

        <Note type="success">
          <strong>Next Steps:</strong> Di materi berikutnya, kita akan belajar Dart fundamentals - 
          bahasa programming yang digunakan Flutter. Dart sangat mudah dipelajari, terutama jika Anda 
          punya pengalaman dengan Java, JavaScript, atau C#. Let's go! 🚀
        </Note>
      </Section>
    </MateriLayout>
  );
}
