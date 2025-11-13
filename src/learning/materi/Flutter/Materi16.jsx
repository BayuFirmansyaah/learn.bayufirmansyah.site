import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi16() {
  return (
    <MateriLayout
      title="Testing & Debugging"
      intro="Master testing dan debugging di Flutter - unit tests, widget tests, integration tests, Flutter DevTools, debugging techniques, dan best practices."
    >
      <Section id="unit-tests" heading="Unit Tests">
        <p>
          <strong>Unit tests</strong> test individual functions, methods, atau classes. Fastest dan paling simple.
        </p>

        <Subsection id="unit-test-setup" heading="Setup Testing">
          <CodeBlock language="yaml">
{`dev_dependencies:
  flutter_test:
    sdk: flutter
  test: ^1.24.0`}
          </CodeBlock>

          <p>Create test file: <code>test/counter_test.dart</code></p>
        </Subsection>

        <Subsection id="unit-test-example" heading="Basic Unit Test">
          <CodeBlock language="dart">
{`// lib/counter.dart
class Counter {
  int value = 0;
  
  void increment() => value++;
  void decrement() => value--;
  void reset() => value = 0;
}

// test/counter_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:your_app/counter.dart';

void main() {
  group('Counter Tests', () {
    late Counter counter;
    
    setUp(() {
      // Runs before each test
      counter = Counter();
    });
    
    test('initial value should be 0', () {
      expect(counter.value, 0);
    });
    
    test('increment should increase value by 1', () {
      counter.increment();
      expect(counter.value, 1);
    });
    
    test('decrement should decrease value by 1', () {
      counter.decrement();
      expect(counter.value, -1);
    });
    
    test('reset should set value to 0', () {
      counter.increment();
      counter.increment();
      counter.reset();
      expect(counter.value, 0);
    });
  });
  
  group('Edge Cases', () {
    test('multiple increments', () {
      final counter = Counter();
      for (int i = 0; i < 100; i++) {
        counter.increment();
      }
      expect(counter.value, 100);
    });
  });
}

// Run: flutter test test/counter_test.dart`}
          </CodeBlock>
        </Subsection>

        <Subsection id="async-tests" heading="Async Unit Tests">
          <CodeBlock language="dart">
{`// lib/api_service.dart
class ApiService {
  Future<String> fetchData() async {
    await Future.delayed(Duration(seconds: 1));
    return 'Data loaded';
  }
  
  Stream<int> countStream() async* {
    for (int i = 0; i < 5; i++) {
      await Future.delayed(Duration(milliseconds: 100));
      yield i;
    }
  }
}

// test/api_service_test.dart
import 'package:flutter_test/flutter_test.dart';

void main() {
  group('ApiService Tests', () {
    late ApiService apiService;
    
    setUp(() {
      apiService = ApiService();
    });
    
    test('fetchData returns data', () async {
      final result = await apiService.fetchData();
      expect(result, 'Data loaded');
    });
    
    test('countStream emits values 0-4', () async {
      final values = <int>[];
      await for (final value in apiService.countStream()) {
        values.add(value);
      }
      expect(values, [0, 1, 2, 3, 4]);
    });
    
    test('countStream emits correct values using expectLater', () {
      expect(
        apiService.countStream(),
        emitsInOrder([0, 1, 2, 3, 4]),
      );
    });
  });
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="widget-tests" heading="Widget Tests">
        <p>
          <strong>Widget tests</strong> test UI components. Faster than integration tests, more comprehensive than unit tests.
        </p>

        <Subsection id="widget-test-example" heading="Basic Widget Test">
          <CodeBlock language="dart">
{`// lib/counter_widget.dart
class CounterWidget extends StatefulWidget {
  @override
  State<CounterWidget> createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter = 0;
  
  void _increment() {
    setState(() {
      _counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('\$_counter', key: Key('counter_text')),
            ElevatedButton(
              key: Key('increment_button'),
              onPressed: _increment,
              child: Text('Increment'),
            ),
          ],
        ),
      ),
    );
  }
}

// test/widget/counter_widget_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main() {
  testWidgets('Counter starts at 0', (WidgetTester tester) async {
    // Build widget
    await tester.pumpWidget(
      MaterialApp(home: CounterWidget()),
    );
    
    // Find widgets
    expect(find.text('0'), findsOneWidget);
    expect(find.text('1'), findsNothing);
  });
  
  testWidgets('Tapping button increments counter', (WidgetTester tester) async {
    await tester.pumpWidget(
      MaterialApp(home: CounterWidget()),
    );
    
    // Initial state
    expect(find.text('0'), findsOneWidget);
    
    // Tap button
    await tester.tap(find.byKey(Key('increment_button')));
    await tester.pump();  // Rebuild widget
    
    // Verify state changed
    expect(find.text('1'), findsOneWidget);
    expect(find.text('0'), findsNothing);
  });
  
  testWidgets('Multiple taps increment correctly', (WidgetTester tester) async {
    await tester.pumpWidget(
      MaterialApp(home: CounterWidget()),
    );
    
    // Tap 3 times
    await tester.tap(find.byKey(Key('increment_button')));
    await tester.pump();
    
    await tester.tap(find.byKey(Key('increment_button')));
    await tester.pump();
    
    await tester.tap(find.byKey(Key('increment_button')));
    await tester.pump();
    
    expect(find.text('3'), findsOneWidget);
  });
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="widget-finders" heading="Widget Finders">
          <CodeBlock language="dart">
{`// Find by type
find.byType(ElevatedButton)

// Find by text
find.text('Hello')

// Find by key
find.byKey(Key('my_key'))

// Find by icon
find.byIcon(Icons.favorite)

// Find by widget
find.byWidget(myWidget)

// Compound finders
find.descendant(
  of: find.byType(Container),
  matching: find.text('Hello'),
)

find.ancestor(
  of: find.text('Hello'),
  matching: find.byType(Container),
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="widget-interactions" heading="Widget Interactions">
          <CodeBlock language="dart">
{`testWidgets('Test interactions', (WidgetTester tester) async {
  await tester.pumpWidget(MyApp());
  
  // Tap
  await tester.tap(find.byIcon(Icons.add));
  await tester.pump();
  
  // Long press
  await tester.longPress(find.text('Item'));
  await tester.pump();
  
  // Drag
  await tester.drag(find.byType(ListView), Offset(0, -200));
  await tester.pump();
  
  // Enter text
  await tester.enterText(find.byType(TextField), 'Hello World');
  await tester.pump();
  
  // Scroll
  await tester.scrollUntilVisible(
    find.text('Item 50'),
    500.0,
    scrollable: find.byType(ListView),
  );
  
  // Wait for animations
  await tester.pumpAndSettle();  // Wait until all animations complete
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="integration-tests" heading="Integration Tests">
        <p>
          <strong>Integration tests</strong> test complete app flow. Runs on real device/emulator.
        </p>

        <Subsection id="integration-setup" heading="Setup Integration Tests">
          <CodeBlock language="yaml">
{`dev_dependencies:
  integration_test:
    sdk: flutter
  flutter_test:
    sdk: flutter`}
          </CodeBlock>

          <p>Create: <code>integration_test/app_test.dart</code></p>
        </Subsection>

        <Subsection id="integration-example" heading="Integration Test Example">
          <CodeBlock language="dart">
{`// integration_test/app_test.dart
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:your_app/main.dart' as app;

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  
  group('End-to-end test', () {
    testWidgets('Complete user flow', (WidgetTester tester) async {
      // Start app
      app.main();
      await tester.pumpAndSettle();
      
      // Step 1: Navigate to login
      await tester.tap(find.text('Login'));
      await tester.pumpAndSettle();
      
      // Step 2: Enter credentials
      await tester.enterText(find.byKey(Key('email')), 'test@example.com');
      await tester.enterText(find.byKey(Key('password')), 'password123');
      await tester.pumpAndSettle();
      
      // Step 3: Submit login
      await tester.tap(find.text('Submit'));
      await tester.pumpAndSettle(Duration(seconds: 2));
      
      // Step 4: Verify home screen
      expect(find.text('Welcome'), findsOneWidget);
      
      // Step 5: Navigate to profile
      await tester.tap(find.byIcon(Icons.person));
      await tester.pumpAndSettle();
      
      // Step 6: Verify profile loaded
      expect(find.text('Profile'), findsOneWidget);
    });
  });
}

// Run: flutter test integration_test/app_test.dart`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="mocking" heading="Mocking & Test Doubles">
        <p>
          Use <strong>mockito</strong> untuk create mock objects in tests.
        </p>

        <CodeBlock language="bash">
{`flutter pub add --dev mockito build_runner`}
        </CodeBlock>

        <CodeBlock language="dart">
{`// lib/user_repository.dart
abstract class UserRepository {
  Future<User> getUser(String id);
  Future<void> saveUser(User user);
}

// test/user_service_test.dart
import 'package:flutter_test/flutter_test.dart';
import 'package:mockito/annotations.dart';
import 'package:mockito/mockito.dart';

// Generate mocks: flutter pub run build_runner build
@GenerateMocks([UserRepository])
import 'user_service_test.mocks.dart';

class UserService {
  final UserRepository repository;
  
  UserService(this.repository);
  
  Future<String> getUserName(String id) async {
    final user = await repository.getUser(id);
    return user.name;
  }
}

void main() {
  group('UserService Tests', () {
    late MockUserRepository mockRepository;
    late UserService userService;
    
    setUp(() {
      mockRepository = MockUserRepository();
      userService = UserService(mockRepository);
    });
    
    test('getUserName returns correct name', () async {
      // Arrange
      final user = User(id: '1', name: 'John Doe');
      when(mockRepository.getUser('1'))
          .thenAnswer((_) async => user);
      
      // Act
      final name = await userService.getUserName('1');
      
      // Assert
      expect(name, 'John Doe');
      verify(mockRepository.getUser('1')).called(1);
    });
    
    test('getUserName handles error', () async {
      // Arrange
      when(mockRepository.getUser('1'))
          .thenThrow(Exception('User not found'));
      
      // Act & Assert
      expect(
        () => userService.getUserName('1'),
        throwsException,
      );
    });
  });
}`}
        </CodeBlock>
      </Section>

      <Section id="debugging" heading="Debugging Techniques">
        <Subsection id="print-debug" heading="Print Debugging">
          <CodeBlock language="dart">
{`// Simple print
print('Debug: \$value');

// Debug print (not removed in release)
debugPrint('Debug message');

// Print once
debugPrintOnce('This prints only once');

// Conditional debug
if (kDebugMode) {
  print('Debug only');
}

// Pretty print objects
import 'dart:developer' as developer;
developer.log('Message', name: 'MyApp', error: error);`}
          </CodeBlock>
        </Subsection>

        <Subsection id="breakpoints" heading="Breakpoints & Debugger">
          <CodeBlock language="dart">
{`void myFunction() {
  int x = 10;
  
  // Programmatic breakpoint
  debugger();
  
  int y = x * 2;
  print(y);
}

// In VS Code: Click left gutter to add breakpoint
// Press F5 to start debugging
// Use Debug Console to inspect variables`}
          </CodeBlock>
        </Subsection>

        <Subsection id="flutter-inspector" heading="Flutter DevTools">
          <p>
            <strong>Flutter DevTools</strong> adalah powerful debugging tool suite.
          </p>

          <CodeBlock language="bash">
{`# Open DevTools
flutter pub global activate devtools
flutter pub global run devtools

# Or run directly
flutter run
# Then press 'w' in terminal to open DevTools`}
          </CodeBlock>

          <Note type="info">
            <strong>DevTools Features:</strong><br/>
            • <strong>Widget Inspector:</strong> Visual widget tree, properties<br/>
            • <strong>Performance:</strong> Frame rendering, CPU profiling<br/>
            • <strong>Memory:</strong> Heap snapshots, memory leaks<br/>
            • <strong>Network:</strong> HTTP requests monitoring<br/>
            • <strong>Logging:</strong> App logs and errors
          </Note>
        </Subsection>

        <Subsection id="assert" heading="Assertions">
          <CodeBlock language="dart">
{`// Assert in debug mode only
assert(value > 0, 'Value must be positive');

// Custom assertions
void myFunction(int age) {
  assert(() {
    if (age < 0) {
      throw FlutterError('Age cannot be negative: \$age');
    }
    return true;
  }());
}

// Null safety assertions
String? name;
print(name!);  // Throws if null`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="performance" heading="Performance Testing">
        <CodeBlock language="dart">
{`testWidgets('Scroll performance test', (WidgetTester tester) async {
  await tester.pumpWidget(MyApp());
  
  // Record timeline
  final timeline = await tester.binding.traceAction(() async {
    await tester.fling(
      find.byType(ListView),
      Offset(0, -500),
      1000,
    );
    await tester.pumpAndSettle();
  });
  
  // Analyze timeline
  final summary = TimelineSummary.summarize(timeline);
  
  // Check frame rendering
  expect(summary.countFrames(), greaterThan(0));
  
  // Write to file for analysis
  await summary.writeSummaryToFile('scroll_performance', pretty: true);
  await summary.writeTimelineToFile('scroll_timeline', pretty: true);
}`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Testing Best Practices">
        <ul>
          <li>✅ Write tests as you code (TDD approach)</li>
          <li>✅ Test one thing per test</li>
          <li>✅ Use descriptive test names</li>
          <li>✅ Follow AAA pattern: Arrange, Act, Assert</li>
          <li>✅ Mock external dependencies</li>
          <li>✅ Test edge cases and error scenarios</li>
          <li>✅ Keep tests independent (no shared state)</li>
          <li>✅ Aim for 80% code coverage</li>
          <li>✅ Run tests in CI/CD pipeline</li>
          <li>✅ Use DevTools untuk performance profiling</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>✅ Unit tests: Test functions/classes (fastest)</li>
          <li>✅ Widget tests: Test UI components (medium speed)</li>
          <li>✅ Integration tests: Test complete flows (slowest)</li>
          <li>✅ Mockito untuk create test doubles</li>
          <li>✅ Use Flutter DevTools untuk debugging</li>
          <li>✅ Breakpoints & debugger() untuk step-through debugging</li>
          <li>✅ Performance testing dengan TimelineSummary</li>
          <li>✅ Run: <code>flutter test</code> untuk all tests</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
