import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi17() {
  return (
    <MateriLayout
      title="Build & Deploy APK"
      intro="Panduan lengkap untuk build production-ready APK/AAB, setup app signing, dan deploy aplikasi Flutter ke Google Play Store. From development to production!"
    >
      {/* Build Modes */}
      <Section id="build-modes" heading="Flutter Build Modes">
        <p>
          Flutter memiliki 3 build modes dengan karakteristik berbeda:
        </p>

        <div style={{overflowX: 'auto'}}>
          <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '1rem'}}>
            <thead>
              <tr style={{background: '#f8f9fa'}}>
                <th style={{padding: '12px', border: '1px solid #dee2e6'}}>Mode</th>
                <th style={{padding: '12px', border: '1px solid #dee2e6'}}>Debug</th>
                <th style={{padding: '12px', border: '1px solid #dee2e6'}}>Profile</th>
                <th style={{padding: '12px', border: '1px solid #dee2e6'}}>Release</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Hot Reload</strong></td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>✅ Ya</td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>❌ Tidak</td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>❌ Tidak</td>
              </tr>
              <tr>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Debugging</strong></td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>✅ Full support</td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>⚠️ Limited</td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>❌ Disabled</td>
              </tr>
              <tr>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Performance</strong></td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Slow</td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Fast</td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Fastest</td>
              </tr>
              <tr>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Optimization</strong></td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>None</td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Partial</td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Full</td>
              </tr>
              <tr>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Assertions</strong></td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>✅ Enabled</td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>✅ Enabled</td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>❌ Disabled</td>
              </tr>
              <tr>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}><strong>Use Case</strong></td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Development</td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Performance testing</td>
                <td style={{padding: '12px', border: '1px solid #dee2e6'}}>Production</td>
              </tr>
            </tbody>
          </table>
        </div>

        <CodeBlock language="bash">
{`# Run in different modes
flutter run                    # Debug mode (default)
flutter run --profile         # Profile mode (for performance testing)
flutter run --release         # Release mode (production build)`}
        </CodeBlock>

        <Note type="warning">
          <strong>Jangan deploy APK debug mode ke production!</strong> Debug builds tidak ter-optimize 
          dan berisi debugging information yang membuat app lebih lambat dan besar.
        </Note>
      </Section>

      {/* App Signing */}
      <Section id="app-signing" heading="App Signing & Keystore">
        <p>
          Sebelum build release APK, Anda harus create keystore untuk sign aplikasi. 
          Ini adalah "digital signature" yang membuktikan Anda adalah developer asli.
        </p>

        <Subsection id="create-keystore" heading="1. Create Keystore">
          <p>
            <strong>Generate keystore menggunakan keytool:</strong>
          </p>

          <CodeBlock language="bash">
{`# Navigate ke project root
cd ~/my_flutter_app

# Generate keystore (gunakan informasi Anda sendiri!)
keytool -genkey -v \\
  -keystore ~/upload-keystore.jks \\
  -keyalg RSA \\
  -keysize 2048 \\
  -validity 10000 \\
  -alias upload

# Anda akan ditanya:
# - Password untuk keystore (SIMPAN INI!)
# - Name, Organization, City, dll
# - Password untuk key alias (bisa sama atau beda)`}
          </CodeBlock>

          <Note type="danger">
            <strong>⚠️ SANGAT PENTING:</strong><br/>
            • <strong>Backup keystore file!</strong> Jika hilang, Anda tidak bisa update app di Play Store<br/>
            • <strong>Simpan password dengan aman!</strong> Tulis di password manager<br/>
            • <strong>Jangan commit ke Git!</strong> Add ke .gitignore
          </Note>
        </Subsection>

        <Subsection id="configure-signing" heading="2. Configure Signing in Android">
          <p>
            <strong>Step 1:</strong> Create file <code>android/key.properties</code>
          </p>

          <CodeBlock language="properties">
{`storePassword=your_keystore_password
keyPassword=your_key_password
keyAlias=upload
storeFile=/Users/yourname/upload-keystore.jks

# On Windows: C:\\\\Users\\\\yourname\\\\upload-keystore.jks`}
          </CodeBlock>

          <Note type="warning">
            Add <code>key.properties</code> ke <code>.gitignore</code> agar password tidak ter-commit!
          </Note>

          <p>
            <strong>Step 2:</strong> Edit <code>android/app/build.gradle</code>
          </p>

          <CodeBlock language="gradle">
{`// Add BEFORE android { ... } block
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    // ... existing code ...
    
    // Add signing config
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
            storePassword keystoreProperties['storePassword']
        }
    }
    
    buildTypes {
        release {
            // Use signing config
            signingConfig signingConfigs.release
            
            // Shrink code
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* App Icons & Splash */}
      <Section id="app-icons" heading="App Icons & Splash Screen">
        <Subsection id="app-icon" heading="App Icon">
          <p>
            Gunakan package <code>flutter_launcher_icons</code> untuk generate icons semua size:
          </p>

          <CodeBlock language="bash">
{`# Install package
flutter pub add --dev flutter_launcher_icons

# Or add to pubspec.yaml:
dev_dependencies:
  flutter_launcher_icons: ^0.13.0`}
          </CodeBlock>

          <p>
            <strong>Configure di pubspec.yaml:</strong>
          </p>

          <CodeBlock language="yaml">
{`flutter_icons:
  android: true
  ios: true
  image_path: "assets/icon/app_icon.png"  # 1024x1024 PNG
  
  # Optional: Different icons for Android
  adaptive_icon_background: "#FFFFFF"
  adaptive_icon_foreground: "assets/icon/foreground.png"
  
  # Optional: Remove alpha channel
  remove_alpha_ios: true`}
          </CodeBlock>

          <CodeBlock language="bash">
{`# Generate icons
flutter pub run flutter_launcher_icons

# Output:
# ✓ Android adaptive icon background created
# ✓ Android adaptive icon foreground created  
# ✓ Android default launcher icons created
# ✓ iOS launcher icons created`}
          </CodeBlock>

          <Note type="tip">
            <strong>Icon requirements:</strong><br/>
            • Minimum: 1024x1024 pixels<br/>
            • Format: PNG dengan transparent background<br/>
            • Design: Simple, recognizable, no text
          </Note>
        </Subsection>

        <Subsection id="splash-screen" heading="Splash Screen">
          <p>
            Gunakan <code>flutter_native_splash</code> untuk setup splash screen:
          </p>

          <CodeBlock language="bash">
{`# Install
flutter pub add --dev flutter_native_splash`}
          </CodeBlock>

          <CodeBlock language="yaml">
{`flutter_native_splash:
  color: "#FFFFFF"  # Background color
  image: assets/splash/splash_logo.png  # Logo image
  
  # Optional
  android_12:
    image: assets/splash/splash_logo_android12.png
    color: "#FFFFFF"
  
  # Branding image (bottom of splash)
  branding: assets/splash/branding.png
  
  # For web
  web: false`}
          </CodeBlock>

          <CodeBlock language="bash">
{`# Generate splash screens
flutter pub run flutter_native_splash:create

# Remove splash screens (if needed)
flutter pub run flutter_native_splash:remove`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Build APK */}
      <Section id="build-apk" heading="Building APK">
        <Subsection id="build-apk-command" heading="Build APK Commands">
          <CodeBlock language="bash">
{`# Build APK (single universal APK for all architectures)
flutter build apk

# Output:
# ✓ Built build/app/outputs/flutter-apk/app-release.apk (XX MB)

# Build APK split per ABI (smaller individual files)
flutter build apk --split-per-abi

# Output 3 APKs:
# - app-armeabi-v7a-release.apk   (32-bit ARM - older devices)
# - app-arm64-v8a-release.apk     (64-bit ARM - modern devices)
# - app-x86_64-release.apk        (x86 - emulators)

# Build with specific target
flutter build apk --target lib/main_production.dart

# Build with flavor
flutter build apk --flavor production

# Analyze APK size
flutter build apk --analyze-size`}
          </CodeBlock>

          <Note type="success">
            <strong>Split APKs</strong> menghasilkan file lebih kecil (30-50% smaller) karena hanya 
            include architecture yang dibutuhkan. Play Store akan automatically serve APK yang tepat.
          </Note>
        </Subsection>

        <Subsection id="build-aab" heading="Build AAB (Android App Bundle)">
          <p>
            <strong>AAB adalah format yang direkomendasikan untuk Play Store!</strong> Google akan 
            automatically optimize dan generate APKs untuk different devices.
          </p>

          <CodeBlock language="bash">
{`# Build App Bundle
flutter build appbundle

# Output:
# ✓ Built build/app/outputs/bundle/release/app-release.aab (XX MB)

# With obfuscation (highly recommended!)
flutter build appbundle --obfuscate --split-debug-info=build/app/outputs/symbols

# Result:
# - AAB file for Play Store upload
# - Debug symbols for crash reports (upload to Play Console)`}
          </CodeBlock>

          <p>
            <strong>Benefits of AAB over APK:</strong>
          </p>
          <ul>
            <li>✅ Smaller download sizes (up to 35% smaller)</li>
            <li>✅ Dynamic delivery - user hanya download yang dibutuhkan</li>
            <li>✅ Easy to support multiple architectures</li>
            <li>✅ Required for new apps di Play Store (sejak August 2021)</li>
          </ul>
        </Subsection>

        <Subsection id="obfuscation" heading="Code Obfuscation">
          <p>
            Obfuscation melindungi code Anda dari reverse engineering dengan rename classes, methods, 
            dan variables menjadi meaningless names.
          </p>

          <CodeBlock language="bash">
{`# Build with obfuscation
flutter build apk --obfuscate --split-debug-info=build/app/outputs/symbols
flutter build appbundle --obfuscate --split-debug-info=build/app/outputs/symbols

# This will:
# 1. Rename all symbols (classes, methods, etc)
# 2. Save symbol map to specified directory
# 3. Protect your code from decompilation`}
          </CodeBlock>

          <Note type="info">
            <strong>Debug symbols</strong> digunakan untuk de-obfuscate crash reports. Upload symbols 
            ke Play Console agar stack traces readable!
          </Note>

          <p>
            <strong>Configure ProGuard (optional custom rules):</strong>
          </p>

          <p>
            Create <code>android/app/proguard-rules.pro</code>:
          </p>

          <CodeBlock language="proguard">
{`# Keep specific classes from obfuscation
-keep class com.yourcompany.yourapp.** { *; }

# Keep Gson models
-keep class com.yourcompany.yourapp.models.** { *; }

# Keep Firebase
-keep class com.google.firebase.** { *; }`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Version & Build Number */}
      <Section id="versioning" heading="Versioning">
        <p>
          Update version di <code>pubspec.yaml</code> sebelum build:
        </p>

        <CodeBlock language="yaml">
{`version: 1.2.3+4
#        │ │ │  └─── Build number (integer, always increment)
#        │ │ └────── Patch version (bug fixes)
#        │ └──────── Minor version (new features, backward compatible)
#        └────────── Major version (breaking changes)

# Examples:
# 1.0.0+1  - Initial release
# 1.0.1+2  - Bug fix
# 1.1.0+3  - New feature
# 2.0.0+4  - Major update

# Play Store requirements:
# - Version name (1.2.3) untuk display ke users
# - Version code (+4) harus lebih besar dari previous version`}
        </CodeBlock>

        <Note type="warning">
          <strong>Build number harus selalu increment!</strong> Tidak bisa upload APK dengan build 
          number yang sama atau lebih kecil dari previous version.
        </Note>
      </Section>

      {/* Testing APK */}
      <Section id="testing-apk" heading="Testing APK">
        <Subsection id="install-apk" heading="Install & Test APK">
          <CodeBlock language="bash">
{`# Install APK on connected device
flutter install

# Or manually with adb
adb install build/app/outputs/flutter-apk/app-release.apk

# Install on specific device
adb -s <device-id> install app-release.apk

# List connected devices
adb devices

# Uninstall
adb uninstall com.yourcompany.yourapp`}
          </CodeBlock>
        </Subsection>

        <Subsection id="testing-checklist" heading="Pre-Release Testing Checklist">
          <ul>
            <li>✅ Test di berbagai Android versions (min: API 21/Android 5.0)</li>
            <li>✅ Test di different screen sizes (small, medium, large, tablet)</li>
            <li>✅ Test offline functionality</li>
            <li>✅ Test app lifecycle (minimize, restore, rotation)</li>
            <li>✅ Test permissions (camera, location, storage, etc)</li>
            <li>✅ Test deep links & notifications</li>
            <li>✅ Check app size (Play Store limit: 150MB for APK)</li>
            <li>✅ Run performance profiling</li>
            <li>✅ Check crash reporting integration</li>
            <li>✅ Test payment flows (if applicable)</li>
          </ul>
        </Subsection>
      </Section>

      {/* Publishing */}
      <Section id="publishing" heading="Publishing to Google Play Store">
        <Subsection id="play-console-setup" heading="1. Play Console Setup">
          <ol>
            <li><strong>Create Developer Account</strong>
              <ul>
                <li>Visit <a href="https://play.google.com/console" target="_blank" rel="noopener">play.google.com/console</a></li>
                <li>Pay one-time $25 registration fee</li>
                <li>Complete account details & verification</li>
              </ul>
            </li>
            <li><strong>Create New App</strong>
              <ul>
                <li>Click "Create app"</li>
                <li>Fill app details (name, language, type)</li>
                <li>Declare if it's a game or app</li>
              </ul>
            </li>
            <li><strong>Complete Store Listing</strong>
              <ul>
                <li>App name & short description</li>
                <li>Full description (4000 chars max)</li>
                <li>App icon (512x512 PNG)</li>
                <li>Feature graphic (1024x500)</li>
                <li>Screenshots (min 2, max 8) per device type</li>
                <li>Category & tags</li>
                <li>Contact details & privacy policy URL</li>
              </ul>
            </li>
          </ol>
        </Subsection>

        <Subsection id="upload-app" heading="2. Upload App Bundle">
          <ol>
            <li>Go to <strong>Release → Production</strong></li>
            <li>Click <strong>Create new release</strong></li>
            <li>Upload <code>app-release.aab</code> file</li>
            <li>Upload <strong>debug symbols</strong> (if obfuscated)</li>
            <li>Fill release notes (what's new)</li>
            <li>Review and roll out</li>
          </ol>

          <Note type="info">
            First release butuh review dari Google (1-3 hari). Updates berikutnya biasanya lebih cepat.
          </Note>
        </Subsection>

        <Subsection id="content-rating" heading="3. Content Rating">
          <p>
            Complete content rating questionnaire di Play Console:
          </p>
          <ul>
            <li>Violence, sexuality, language</li>
            <li>Controlled substances</li>
            <li>Interactive elements</li>
            <li>Shares user location</li>
          </ul>
          <p>
            Get ratings from: ESRB, PEGI, USK, ClassInd, IARC
          </p>
        </Subsection>

        <Subsection id="privacy-policy" heading="4. Privacy Policy">
          <p>
            <strong>Required jika app collect user data!</strong>
          </p>
          <ul>
            <li>Create privacy policy document</li>
            <li>Host di website (bisa GitHub Pages)</li>
            <li>Add link di Play Store listing</li>
            <li>Explain: data collected, usage, storage, sharing</li>
          </ul>
        </Subsection>

        <Subsection id="data-safety" heading="5. Data Safety Section">
          <p>
            Declare data collection & security practices:
          </p>
          <ul>
            <li>Data types collected (personal, financial, location, etc)</li>
            <li>Why data is collected</li>
            <li>If data is shared with third parties</li>
            <li>Security practices (encryption, etc)</li>
          </ul>
        </Subsection>
      </Section>

      {/* Release Management */}
      <Section id="release-management" heading="Release Management">
        <Subsection id="release-tracks" heading="Release Tracks">
          <ul>
            <li><strong>Internal Testing</strong> - Up to 100 testers, instant updates</li>
            <li><strong>Closed Testing (Alpha)</strong> - Specific testers, feedback before public</li>
            <li><strong>Open Testing (Beta)</strong> - Anyone can join, real-world testing</li>
            <li><strong>Production</strong> - Public release to all users</li>
          </ul>

          <Note type="tip">
            <strong>Best practice:</strong> Internal → Closed → Open → Production<br/>
            Catch bugs early sebelum reach all users!
          </Note>
        </Subsection>

        <Subsection id="staged-rollout" heading="Staged Rollout">
          <p>
            Release gradually untuk minimize risk:
          </p>
          <ul>
            <li>Start dengan 10% users</li>
            <li>Monitor crash rate & reviews</li>
            <li>Increase to 25% → 50% → 100%</li>
            <li>Halt rollout jika ada critical issues</li>
          </ul>
        </Subsection>

        <Subsection id="app-updates" heading="Updating Your App">
          <CodeBlock language="bash">
{`# 1. Update version di pubspec.yaml
version: 1.1.0+2  # Increment version & build number

# 2. Build new AAB
flutter build appbundle --obfuscate --split-debug-info=build/outputs/symbols

# 3. Upload ke Play Console
# - Create new release
# - Upload AAB
# - Add release notes
# - Roll out

# 4. Users get automatic updates via Play Store`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Best Practices */}
      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li>✅ <strong>Always build AAB</strong> untuk Play Store (bukan APK)</li>
          <li>✅ <strong>Enable obfuscation</strong> untuk production builds</li>
          <li>✅ <strong>Upload debug symbols</strong> untuk readable crash reports</li>
          <li>✅ <strong>Test thoroughly</strong> sebelum production release</li>
          <li>✅ <strong>Use staged rollout</strong> untuk minimize risk</li>
          <li>✅ <strong>Backup keystore</strong> di multiple secure locations</li>
          <li>✅ <strong>Monitor crash reports</strong> di Play Console</li>
          <li>✅ <strong>Respond to reviews</strong> untuk improve rating</li>
          <li>✅ <strong>Keep dependencies updated</strong> untuk security</li>
          <li>✅ <strong>Follow Play Store policies</strong> untuk avoid rejection</li>
        </ul>

        <Note type="success">
          <strong>Pro Tips:</strong><br/>
          • Setup CI/CD (GitHub Actions, Codemagic) untuk automated builds<br/>
          • Integrate Firebase Crashlytics untuk better crash reporting<br/>
          • Use Play Console API untuk automated publishing<br/>
          • Monitor app size - optimize assets & dependencies
        </Note>
      </Section>

      {/* Common Issues */}
      <Section id="troubleshooting" heading="Common Issues & Solutions">
        <Subsection id="keystore-issues" heading="Keystore Issues">
          <p>
            <strong>Problem:</strong> "Keystore was tampered with, or password was incorrect"
          </p>
          <ul>
            <li>Verify password di <code>key.properties</code></li>
            <li>Check keystore path (absolute path recommended)</li>
            <li>Ensure keystore file is not corrupted</li>
          </ul>

          <p>
            <strong>Problem:</strong> Lost keystore file
          </p>
          <ul>
            <li>Check backups immediately!</li>
            <li>If truly lost: Cannot update app, must publish as new app</li>
            <li>Prevention: Backup keystore to multiple secure locations</li>
          </ul>
        </Subsection>

        <Subsection id="build-issues" heading="Build Issues">
          <p>
            <strong>Problem:</strong> "Build failed with Gradle errors"
          </p>
          <CodeBlock language="bash">
{`# Clean and rebuild
flutter clean
flutter pub get
flutter build apk

# Update Gradle wrapper
cd android
./gradlew wrapper --gradle-version=8.0

# Check Java version (need JDK 11 or higher)
java -version`}
          </CodeBlock>

          <p>
            <strong>Problem:</strong> APK size too large
          </p>
          <ul>
            <li>Use <code>--split-per-abi</code> untuk smaller APKs</li>
            <li>Optimize images (compress, use WebP)</li>
            <li>Remove unused resources & dependencies</li>
            <li>Enable ProGuard/R8 shrinking</li>
          </ul>
        </Subsection>
      </Section>

      {/* Rangkuman */}
      <Section id="summary" heading="Rangkuman">
        <p>
          Congratulations! 🎉 Anda telah menyelesaikan semua materi Flutter dari basic sampai production!
        </p>
        <ul>
          <li>✅ Build modes: Debug, Profile, Release</li>
          <li>✅ App signing dengan keystore</li>
          <li>✅ Configure signing di Gradle</li>
          <li>✅ Setup app icons & splash screen</li>
          <li>✅ Build APK & AAB dengan obfuscation</li>
          <li>✅ Versioning & build numbers</li>
          <li>✅ Testing APK pada devices</li>
          <li>✅ Publishing ke Google Play Store</li>
          <li>✅ Release management & staged rollout</li>
          <li>✅ Best practices untuk production apps</li>
        </ul>

        <Note type="success">
          <strong>🚀 You're now ready to build and ship production Flutter apps!</strong><br/>
          <br/>
          Next steps:<br/>
          • Build your own app dari scratch<br/>
          • Publish ke Play Store<br/>
          • Learn advanced topics (CI/CD, testing, performance)<br/>
          • Join Flutter community & contribute!<br/>
          <br/>
          Happy coding! 💙
        </Note>
      </Section>
    </MateriLayout>
  );
}
