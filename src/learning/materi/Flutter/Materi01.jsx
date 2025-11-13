import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi01() {
  return (
    <MateriLayout
      title="Pengenalan Flutter"
      intro="Flutter adalah UI framework open-source yang dikembangkan oleh Google untuk membuat aplikasi native yang indah dan performa tinggi untuk mobile, web, dan desktop dari satu codebase. Diluncurkan pada tahun 2017, Flutter kini menjadi pilihan utama developer untuk cross-platform development."
    >
      {/* Apa itu Flutter? */}
      <Section id="what-is-flutter" heading="Apa itu Flutter?">
        <p>
          Flutter adalah UI toolkit yang memungkinkan developer membangun aplikasi dengan pengalaman native 
          untuk berbagai platform dari satu codebase. Dikembangkan oleh Google dan dirilis secara stabil pada 
          Desember 2018, Flutter menggunakan bahasa pemrograman <strong>Dart</strong> dan rendering engine sendiri 
          bernama <strong>Skia</strong>.
        </p>
        <p>
          Berbeda dengan framework cross-platform lainnya yang menggunakan WebView atau bridge ke native components, 
          Flutter me-render UI-nya sendiri menggunakan canvas. Ini memberikan kontrol penuh atas setiap pixel di 
          layar dan menghasilkan performa yang mendekati native apps.
        </p>
        <p>
          Flutter bukan hanya untuk mobile! Dengan satu codebase, Anda dapat deploy aplikasi ke:
        </p>
        <ul>
          <li><strong>Android & iOS</strong> - Mobile apps dengan performa native</li>
          <li><strong>Web</strong> - Progressive Web Apps (PWA) dan responsive websites</li>
          <li><strong>Windows, macOS, Linux</strong> - Desktop applications</li>
          <li><strong>Embedded Devices</strong> - Smart displays, automotive, IoT</li>
        </ul>

        <Note type="info">
          <strong>Fun Fact:</strong> Aplikasi populer seperti Google Ads, Alibaba, BMW, eBay Motors, 
          dan Nubank dibangun menggunakan Flutter!
        </Note>
      </Section>

      {/* Sejarah Flutter */}
      <Section id="flutter-history" heading="Sejarah Flutter">
        <p>
          Flutter pertama kali diperkenalkan pada <strong>Dart Developer Summit 2015</strong> dengan codename 
          "Sky". Timeline perkembangan Flutter:
        </p>
        <ul>
          <li><strong>2015</strong> - Project "Sky" diumumkan di Dart Developer Summit</li>
          <li><strong>2017</strong> - Flutter Alpha dirilis di Google I/O</li>
          <li><strong>2018</strong> - Flutter 1.0 (versi stabil pertama) dirilis di Flutter Live</li>
          <li><strong>2019</strong> - Flutter 1.12 dengan dukungan web dan macOS</li>
          <li><strong>2020</strong> - Flutter 1.20 dengan performance improvements</li>
          <li><strong>2021</strong> - Flutter 2.0 dengan null safety dan desktop stable</li>
          <li><strong>2022</strong> - Flutter 3.0 dengan macOS & Linux production ready</li>
          <li><strong>2023-2024</strong> - Material 3, Impeller engine, WebAssembly support</li>
        </ul>

        <Note type="success">
          Flutter kini menjadi framework mobile terpopuler kedua setelah React Native berdasarkan 
          GitHub stars dan jumlah package di pub.dev!
        </Note>
      </Section>

      {/* Mengapa Memilih Flutter? */}
      <Section id="why-flutter" heading="Mengapa Memilih Flutter?">
        <p>
          Flutter menawarkan berbagai keunggulan yang membuat development lebih cepat, efisien, dan menyenangkan:
        </p>

        <Subsection id="hot-reload" heading="🔥 Hot Reload - Development Super Cepat">
          <p>
            Hot Reload adalah fitur killer Flutter yang memungkinkan Anda melihat perubahan code secara 
            <strong> instant</strong> (dalam hitungan milidetik) tanpa kehilangan state aplikasi. Tidak perlu 
            compile ulang atau restart app!
          </p>
          
          <CodeBlock language="dart">
{`// Ubah warna dari blue ke red
Container(
  color: Colors.blue,  // Ganti ke Colors.red
  child: Text('Hello Flutter'),
)

// Tekan 'r' di terminal atau Cmd+S
// Perubahan langsung terlihat dalam < 1 detik!`}
          </CodeBlock>

          <Note type="tip">
            <strong>Hot Reload vs Hot Restart:</strong><br/>
            • Hot Reload (r) - Update UI tanpa restart, state preserved<br/>
            • Hot Restart (R) - Restart app, state hilang<br/>
            • Full Restart - Rebuild & reinstall app (jarang diperlukan)
          </Note>
        </Subsection>

        <Subsection id="single-codebase" heading="📱 Single Codebase, Multiple Platforms">
          <p>
            Tulis sekali, deploy ke mana-mana! Flutter memungkinkan Anda menggunakan <strong>satu codebase</strong> 
            untuk semua platform dengan minimal (atau tanpa) platform-specific code.
          </p>
          
          <CodeBlock language="dart">
{`// Code yang sama jalan di Android, iOS, Web, Desktop!
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My Universal App',
      home: Scaffold(
        appBar: AppBar(title: Text('Cross Platform')),
        body: Center(
          child: Text('Satu code, semua platform! 🚀'),
        ),
      ),
    );
  }
}`}
          </CodeBlock>

          <p>
            <strong>Efisiensi Development:</strong>
          </p>
          <ul>
            <li>✅ Satu team untuk semua platform (hemat resource)</li>
            <li>✅ Feature parity - semua platform update bersamaan</li>
            <li>✅ Consistent UI/UX di semua platform</li>
            <li>✅ Maintenance lebih mudah - fix bug sekali untuk semua</li>
          </ul>
        </Subsection>

        <Subsection id="native-performance" heading="⚡ Native Performance">
          <p>
            Flutter tidak menggunakan WebView atau JavaScript bridge seperti React Native. Flutter 
            compile code Dart Anda menjadi <strong>native ARM code</strong> yang berjalan langsung di 
            device dengan performa mendekati native apps.
          </p>

          <p>
            <strong>Flutter Rendering Pipeline:</strong>
          </p>
          <ol>
            <li><strong>Dart Code</strong> - Business logic & UI code</li>
            <li><strong>Flutter Framework</strong> - Widget tree & rendering logic</li>
            <li><strong>Engine (C++)</strong> - Skia graphics engine</li>
            <li><strong>Platform</strong> - Native APIs (Android/iOS/etc)</li>
          </ol>

          <Note type="info">
            Flutter mencapai <strong>60fps atau 120fps</strong> secara konsisten. Bahkan game-like 
            animations berjalan smooth berkat rendering engine yang powerful!
          </Note>
        </Subsection>

        <Subsection id="beautiful-ui" heading="🎨 Beautiful UI Out of the Box">
          <p>
            Flutter dilengkapi dengan koleksi widget yang sangat lengkap mengikuti <strong>Material Design</strong> 
            (Google) dan <strong>Cupertino</strong> (iOS). Anda bisa membuat UI yang indah tanpa effort besar.
          </p>

          <CodeBlock language="dart">
{`// Material Design Button
ElevatedButton(
  onPressed: () {},
  child: Text('Material Button'),
)

// iOS Style Button
CupertinoButton(
  onPressed: () {},
  child: Text('iOS Button'),
)

// Custom Styled Button
Container(
  decoration: BoxDecoration(
    gradient: LinearGradient(colors: [Colors.blue, Colors.purple]),
    borderRadius: BorderRadius.circular(30),
    boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 10)],
  ),
  child: ElevatedButton(
    onPressed: () {},
    child: Text('Custom Button'),
  ),
)`}
          </CodeBlock>

          <ul>
            <li>✅ Material 3 Design System (latest)</li>
            <li>✅ iOS Cupertino widgets</li>
            <li>✅ Custom theming & dark mode support</li>
            <li>✅ Responsive & adaptive layouts</li>
            <li>✅ Rich animations & transitions built-in</li>
          </ul>
        </Subsection>

        <Subsection id="strong-community" heading="👥 Strong Community & Ecosystem">
          <p>
            Flutter memiliki komunitas yang sangat aktif dan ecosystem yang terus berkembang:
          </p>
          <ul>
            <li><strong>pub.dev</strong> - 45,000+ packages & plugins</li>
            <li><strong>GitHub</strong> - 160,000+ stars (top 20 repositories)</li>
            <li><strong>Flutter Community</strong> - Slack, Discord, Reddit, StackOverflow</li>
            <li><strong>Official Docs</strong> - Dokumentasi lengkap dengan codelabs</li>
            <li><strong>FlutterDev YouTube</strong> - Widget of the Week, tutorials</li>
          </ul>

          <Note type="success">
            Hampir semua fitur yang Anda butuhkan sudah ada packagenya di pub.dev - dari state 
            management, networking, database, animations, hingga ML & AR!
          </Note>
        </Subsection>
      </Section>

      {/* Flutter Architecture */}
      <Section id="flutter-architecture" heading="Flutter Architecture">
        <p>
          Flutter memiliki arsitektur yang unik dan powerful. Mari kita pahami komponen utamanya:
        </p>

        <Subsection id="widget-tree" heading="Widget Tree">
          <p>
            Di Flutter, <strong>Everything is a Widget!</strong> UI Anda adalah tree dari widgets. 
            Setiap widget adalah immutable object yang mendeskripsikan bagian dari UI.
          </p>

          <CodeBlock language="dart">
{`// Struktur Widget Tree
MaterialApp                    // Root widget
  └── Scaffold                 // Layout structure
      ├── AppBar               // Top bar
      │   └── Text             // Title
      └── Body
          └── Column           // Vertical layout
              ├── Text         // Child 1
              ├── Image        // Child 2
              └── Button       // Child 3`}
          </CodeBlock>

          <p>
            <strong>3 Jenis Widget Tree:</strong>
          </p>
          <ol>
            <li><strong>Widget Tree</strong> - Immutable configuration (yang Anda tulis)</li>
            <li><strong>Element Tree</strong> - Mutable instance, lifecycle management</li>
            <li><strong>RenderObject Tree</strong> - Actual rendering & layout calculations</li>
          </ol>
        </Subsection>

        <Subsection id="rendering-engine" heading="Rendering Engine">
          <p>
            Flutter menggunakan <strong>Skia</strong>, 2D graphics engine yang sama digunakan oleh 
            Chrome dan Android. Flutter 3.0+ juga memperkenalkan <strong>Impeller</strong>, rendering 
            engine baru yang lebih cepat.
          </p>

          <p>
            <strong>Rendering Process:</strong>
          </p>
          <ol>
            <li><strong>Build</strong> - Widget tree dibuat/update</li>
            <li><strong>Layout</strong> - Hitung size & position setiap widget</li>
            <li><strong>Paint</strong> - Gambar widgets ke canvas</li>
            <li><strong>Composite</strong> - Gabungkan layers untuk display</li>
          </ol>

          <Note type="info">
            Flutter dapat render <strong>60fps (16ms per frame)</strong> atau <strong>120fps (8ms per frame)</strong> 
            untuk smooth animations!
          </Note>
        </Subsection>

        <Subsection id="dart-language" heading="Dart Language">
          <p>
            Flutter menggunakan Dart, bahasa modern dari Google dengan fitur-fitur unggulan:
          </p>
          <ul>
            <li><strong>AOT Compilation</strong> - Compile ke native code (cepat!)</li>
            <li><strong>JIT Compilation</strong> - Development mode dengan hot reload</li>
            <li><strong>Null Safety</strong> - Eliminasi null reference errors</li>
            <li><strong>Strong Typing</strong> - Type-safe dengan inference</li>
            <li><strong>Async/Await</strong> - Modern async programming</li>
            <li><strong>Garbage Collection</strong> - Memory management otomatis</li>
          </ul>

          <CodeBlock language="dart">
{`// Dart code example - clean & modern
class User {
  final String name;
  final int age;
  
  User({required this.name, required this.age});
  
  // Null safety - gunakan ? untuk nullable
  String? getNickname() => name.length > 5 ? name.substring(0, 5) : null;
  
  // Async/await
  Future<void> fetchData() async {
    final data = await http.get('api.example.com');
    print('Data loaded: $data');
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Perbandingan dengan Framework Lain */}
      <Section id="comparison" heading="Perbandingan dengan Framework Lain">
        <p>
          Mari kita bandingkan Flutter dengan framework cross-platform populer lainnya:
        </p>

        <Subsection id="vs-react-native" heading="Flutter vs React Native">
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '1rem'}}>
              <thead>
                <tr style={{background: '#f8f9fa'}}>
                  <th style={{padding: '12px', border: '1px solid #dee2e6', textAlign: 'left'}}>Aspek</th>
                  <th style={{padding: '12px', border: '1px solid #dee2e6', textAlign: 'left'}}>Flutter</th>
                  <th style={{padding: '12px', border: '1px solid #dee2e6', textAlign: 'left'}}>React Native</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Language</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Dart</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>JavaScript/TypeScript</td>
                </tr>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Performance</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>⭐⭐⭐⭐⭐ Native code</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>⭐⭐⭐⭐ Bridge ke native</td>
                </tr>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Hot Reload</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>✅ Super fast (ms)</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>✅ Fast Refresh</td>
                </tr>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>UI Components</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Custom rendered widgets</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Native components</td>
                </tr>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Learning Curve</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Medium (learn Dart)</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Easy (jika tau JS/React)</td>
                </tr>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Community</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>⭐⭐⭐⭐ Growing fast</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>⭐⭐⭐⭐⭐ Very large</td>
                </tr>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Platforms</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Mobile, Web, Desktop</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Mobile, Web (limited)</td>
                </tr>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Company</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Google</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Meta (Facebook)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Note type="tip">
            <strong>Pilih Flutter jika:</strong> Anda butuh performa tinggi, consistent UI di semua platform, 
            dan development speed. <br/>
            <strong>Pilih React Native jika:</strong> Team sudah expert di React/JavaScript dan butuh 
            native look & feel.
          </Note>
        </Subsection>

        <Subsection id="vs-native" heading="Flutter vs Native Development">
          <div style={{overflowX: 'auto'}}>
            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '1rem'}}>
              <thead>
                <tr style={{background: '#f8f9fa'}}>
                  <th style={{padding: '12px', border: '1px solid #dee2e6', textAlign: 'left'}}>Aspek</th>
                  <th style={{padding: '12px', border: '1px solid #dee2e6', textAlign: 'left'}}>Flutter</th>
                  <th style={{padding: '12px', border: '1px solid #dee2e6', textAlign: 'left'}}>Native (Kotlin/Swift)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Development Time</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>⭐⭐⭐⭐⭐ 1 codebase</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>⭐⭐⭐ 2 codebases</td>
                </tr>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Performance</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>⭐⭐⭐⭐ Near-native</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>⭐⭐⭐⭐⭐ Best</td>
                </tr>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Team Size</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>1 team</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>2 teams (Android + iOS)</td>
                </tr>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Cost</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>💰 Lower</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>💰💰 Higher</td>
                </tr>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Platform Features</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Via plugins (kadang delay)</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Instant access semua API</td>
                </tr>
                <tr>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>UI Consistency</strong></td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>⭐⭐⭐⭐⭐ Same di semua</td>
                  <td style={{padding: '12px', border: '1px solid #dee2e6'}}>⭐⭐⭐ Berbeda per platform</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Note type="success">
            Flutter cocok untuk 90% use cases. Gunakan native hanya jika butuh: heavy platform-specific 
            features, games dengan grafis kompleks, atau akses low-level APIs yang belum ada pluginnya.
          </Note>
        </Subsection>
      </Section>

      {/* Use Cases & Aplikasi Populer */}
      <Section id="use-cases" heading="Use Cases & Aplikasi Populer">
        <p>
          Flutter digunakan oleh perusahaan besar dan startup untuk berbagai jenis aplikasi:
        </p>

        <Subsection id="production-apps" heading="Aplikasi Populer Built with Flutter">
          <ul>
            <li><strong>Google Ads</strong> - Advertising management platform (150M+ downloads)</li>
            <li><strong>Alibaba</strong> - E-commerce app untuk Xianyu platform</li>
            <li><strong>BMW</strong> - Mobile app untuk connected cars</li>
            <li><strong>eBay Motors</strong> - Vehicle marketplace app</li>
            <li><strong>Nubank</strong> - Banking app (40M+ users di Latin America)</li>
            <li><strong>Reflectly</strong> - AI-powered journal app</li>
            <li><strong>Hamilton Musical</strong> - Official Broadway show app</li>
            <li><strong>Grab</strong> - Super app features (payment, food delivery)</li>
            <li><strong>Tencent</strong> - Various apps dari tech giant China</li>
            <li><strong>Dream11</strong> - Fantasy sports platform (100M+ users)</li>
          </ul>

          <Note type="info">
            Bahkan Google menggunakan Flutter untuk internal apps mereka, termasuk Google Pay, 
            Google Classroom, dan Stadia!
          </Note>
        </Subsection>

        <Subsection id="ideal-for" heading="Flutter Ideal Untuk:">
          <p>
            <strong>✅ Cocok untuk Flutter:</strong>
          </p>
          <ul>
            <li>Startup & MVP - rapid development dengan budget terbatas</li>
            <li>E-commerce & marketplace apps</li>
            <li>Social media & chat applications</li>
            <li>Finance & banking apps (dengan security proper)</li>
            <li>Productivity & utility apps</li>
            <li>Content streaming apps</li>
            <li>Dashboard & analytics apps</li>
            <li>Educational & learning apps</li>
            <li>Health & fitness tracking apps</li>
            <li>Booking & reservation systems</li>
          </ul>

          <p>
            <strong>⚠️ Kurang Cocok untuk Flutter:</strong>
          </p>
          <ul>
            <li>Heavy 3D games (gunakan Unity/Unreal Engine)</li>
            <li>Apps butuh banyak platform-specific APIs baru</li>
            <li>Apps dengan dependency ke native libraries kompleks</li>
            <li>Augmented Reality apps (walaupun ada plugin AR)</li>
          </ul>
        </Subsection>
      </Section>

      {/* Flutter Ecosystem */}
      <Section id="ecosystem" heading="Flutter Ecosystem">
        <p>
          Flutter memiliki ecosystem yang sangat rich dengan tools, packages, dan resources:
        </p>

        <Subsection id="official-packages" heading="Official Flutter Packages">
          <ul>
            <li><strong>flutter/flutter</strong> - Core framework & widgets</li>
            <li><strong>flutter/plugins</strong> - Official plugins (camera, sensors, etc)</li>
            <li><strong>flutter/packages</strong> - Additional packages (animations, etc)</li>
            <li><strong>dart-lang/sdk</strong> - Dart language SDK</li>
          </ul>
        </Subsection>

        <Subsection id="popular-packages" heading="Popular Community Packages">
          <ul>
            <li><strong>provider</strong> - State management solution (official recommended)</li>
            <li><strong>riverpod</strong> - Modern state management</li>
            <li><strong>bloc</strong> - Business Logic Component pattern</li>
            <li><strong>dio</strong> - Powerful HTTP client</li>
            <li><strong>shared_preferences</strong> - Local key-value storage</li>
            <li><strong>sqflite</strong> - SQLite database</li>
            <li><strong>hive</strong> - Fast NoSQL database</li>
            <li><strong>firebase_core</strong> - Firebase integration</li>
            <li><strong>freezed</strong> - Code generation for immutable classes</li>
            <li><strong>go_router</strong> - Declarative routing</li>
          </ul>
        </Subsection>

        <Subsection id="development-tools" heading="Development Tools">
          <ul>
            <li><strong>Flutter DevTools</strong> - Debugging & profiling suite</li>
            <li><strong>Android Studio</strong> - IDE dengan Flutter plugin</li>
            <li><strong>VS Code</strong> - Lightweight editor dengan Flutter extensions</li>
            <li><strong>IntelliJ IDEA</strong> - JetBrains IDE untuk Flutter</li>
            <li><strong>Dart Analyzer</strong> - Static analysis tool</li>
            <li><strong>Flutter Inspector</strong> - Widget tree visualization</li>
          </ul>
        </Subsection>

        <Subsection id="learning-resources" heading="Learning Resources">
          <ul>
            <li><strong>flutter.dev</strong> - Official documentation & tutorials</li>
            <li><strong>pub.dev</strong> - Package repository (45,000+ packages)</li>
            <li><strong>FlutterDev YouTube</strong> - Widget of the Week series</li>
            <li><strong>Codelabs</strong> - Hands-on interactive tutorials</li>
            <li><strong>Flutter Community</strong> - Medium publication dengan artikel berkualitas</li>
            <li><strong>API Docs</strong> - Comprehensive API documentation</li>
          </ul>
        </Subsection>
      </Section>

      {/* Persiapan Belajar */}
      <Section id="preparation" heading="Persiapan Belajar Flutter">
        <p>
          Sebelum memulai journey Flutter Anda, berikut yang perlu disiapkan:
        </p>

        <Subsection id="prerequisites" heading="Prerequisites">
          <p>
            <strong>Pengetahuan Dasar (Nice to Have):</strong>
          </p>
          <ul>
            <li>Basic programming concepts (variables, functions, loops)</li>
            <li>OOP understanding (classes, inheritance, polymorphism)</li>
            <li>Familiar dengan terminal/command line</li>
            <li>Git basics (clone, commit, push)</li>
          </ul>

          <Note type="info">
            <strong>Tidak perlu pengalaman mobile development sebelumnya!</strong> Flutter cocok untuk 
            pemula yang baru belajar membuat aplikasi mobile.
          </Note>
        </Subsection>

        <Subsection id="system-requirements" heading="System Requirements">
          <p>
            <strong>Minimum Specs:</strong>
          </p>
          <ul>
            <li><strong>OS:</strong> Windows 10/11, macOS 10.14+, atau Linux 64-bit</li>
            <li><strong>Disk Space:</strong> 2.8 GB (tidak termasuk IDE/tools)</li>
            <li><strong>RAM:</strong> 8 GB (recommended 16 GB untuk emulator)</li>
            <li><strong>Tools:</strong> Git, Text Editor/IDE</li>
          </ul>

          <p>
            <strong>Untuk Android Development:</strong>
          </p>
          <ul>
            <li>Android Studio (atau Android SDK command-line tools)</li>
            <li>Java JDK 8 atau lebih baru</li>
            <li>Android device atau emulator</li>
          </ul>

          <p>
            <strong>Untuk iOS Development (Mac only):</strong>
          </p>
          <ul>
            <li>Xcode 13.0 atau lebih baru</li>
            <li>CocoaPods</li>
            <li>iOS device atau simulator</li>
          </ul>
        </Subsection>

        <Subsection id="next-steps" heading="Next Steps">
          <p>
            Setelah memahami apa itu Flutter, kita akan mulai dengan:
          </p>
          <ol>
            <li><strong>Materi 02</strong> - Instalasi & Setup Environment lengkap</li>
            <li><strong>Materi 03</strong> - Belajar Dart fundamentals</li>
            <li><strong>Materi 04-17</strong> - Build real Flutter apps dari basic sampai production!</li>
          </ol>

          <Note type="success">
            Selamat! Anda sudah memahami fondasi Flutter. Mari lanjut ke instalasi dan mulai 
            coding! 🚀
          </Note>
        </Subsection>
      </Section>

      {/* Rangkuman */}
      <Section id="summary" heading="Rangkuman">
        <p>
          Di materi ini, kita telah mempelajari:
        </p>
        <ul>
          <li>✅ Flutter adalah UI framework cross-platform dari Google dengan Dart language</li>
          <li>✅ Keunggulan: Hot Reload, Single Codebase, Native Performance, Beautiful UI</li>
          <li>✅ Flutter Architecture: Widget Tree, Rendering Engine (Skia/Impeller), Dart</li>
          <li>✅ Perbandingan dengan React Native dan Native Development</li>
          <li>✅ Use cases: dari startup MVP sampai enterprise apps</li>
          <li>✅ Ecosystem: 45,000+ packages, strong community, rich tooling</li>
          <li>✅ Prerequisites & System Requirements untuk mulai belajar</li>
        </ul>

        <Note type="tip">
          <strong>Pro Tip:</strong> Join Flutter Community (Discord/Slack) untuk bertanya, share progress, 
          dan belajar dari developer lain. Community adalah resource terbaik untuk belajar!
        </Note>
      </Section>
    </MateriLayout>
  );
}
