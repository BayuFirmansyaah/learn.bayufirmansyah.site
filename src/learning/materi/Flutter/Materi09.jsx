import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi09() {
  return (
    <MateriLayout
      title="State Management Dasar"
      intro="Memahami state management fundamentals - setState(), lifting state up, dan introduction ke Provider untuk manage app state effectively."
    >
      <Section id="intro" heading="What is State?">
        <p>
          <strong>State</strong> adalah data yang berubah selama aplikasi berjalan. Setiap kali state berubah, UI perlu rebuild untuk reflect perubahan tersebut.
        </p>

        <p>
          <strong>Types of state:</strong>
        </p>
        <ul>
          <li><strong>Local State:</strong> State yang hanya dibutuhkan satu widget (contoh: counter, form input)</li>
          <li><strong>App State:</strong> State yang dibutuhkan banyak widgets (contoh: user login, theme, shopping cart)</li>
        </ul>
      </Section>

      <Section id="setstate" heading="setState() - Local State">
        <p>
          <code>setState()</code> adalah method paling basic untuk update state di StatefulWidget.
        </p>

        <CodeBlock language="dart">
{`class Counter extends StatefulWidget {
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _count = 0;  // Local state
  
  void _increment() {
    setState(() {
      // Update state inside setState
      _count++;
    });
    // UI will rebuild automatically
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text('Count: \$_count', style: TextStyle(fontSize: 32)),
        ElevatedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
      ],
    );
  }
}`}
        </CodeBlock>

        <Note type="warning">
          <strong>PENTING:</strong> Semua state changes HARUS inside <code>setState()</code>! Jika mutate state tanpa setState(), UI tidak akan update.
        </Note>

        <Subsection id="setstate-rules" heading="setState() Rules">
          <ul>
            <li>✅ Always call setState() untuk update UI</li>
            <li>✅ Keep setState() calls fast - no async operations inside</li>
            <li>✅ Only change state yang benar-benar butuh update UI</li>
            <li>❌ Jangan call setState() di initState() atau dispose()</li>
            <li>❌ Jangan call setState() setelah widget disposed</li>
          </ul>

          <CodeBlock language="dart">
{`// ❌ BAD: Mutate without setState
void _badIncrement() {
  _count++;  // UI won't update!
}

// ✅ GOOD: Use setState
void _goodIncrement() {
  setState(() {
    _count++;  // UI will rebuild
  });
}

// ❌ BAD: Async inside setState
void _badAsync() {
  setState(() async {  // Don't do this!
    await Future.delayed(Duration(seconds: 1));
    _count++;
  });
}

// ✅ GOOD: Async outside, setState after
void _goodAsync() async {
  await Future.delayed(Duration(seconds: 1));
  setState(() {
    _count++;  // Only update state here
  });
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="lifting-state" heading="Lifting State Up">
        <p>
          Ketika multiple widgets perlu access same state, "lift state up" ke common parent widget.
        </p>

        <CodeBlock language="dart">
{`// Parent widget holds state
class ParentWidget extends StatefulWidget {
  @override
  State<ParentWidget> createState() => _ParentWidgetState();
}

class _ParentWidgetState extends State<ParentWidget> {
  int _counter = 0;  // Shared state
  
  void _increment() {
    setState(() {
      _counter++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Pass state & callback to children
        DisplayWidget(count: _counter),
        ButtonWidget(onPressed: _increment),
      ],
    );
  }
}

// Child 1: Display (StatelessWidget)
class DisplayWidget extends StatelessWidget {
  final int count;
  
  const DisplayWidget({required this.count});
  
  @override
  Widget build(BuildContext context) {
    return Text('Count: \$count', style: TextStyle(fontSize: 32));
  }
}

// Child 2: Button (StatelessWidget)
class ButtonWidget extends StatelessWidget {
  final VoidCallback onPressed;
  
  const ButtonWidget({required this.onPressed});
  
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      child: Text('Increment'),
    );
  }
}`}
        </CodeBlock>

        <Note type="success">
          <strong>Benefits of lifting state up:</strong><br/>
          • Single source of truth<br/>
          • Easy to synchronize state across widgets<br/>
          • Children can be StatelessWidgets (better performance)
        </Note>
      </Section>

      <Section id="provider-intro" heading="Introduction to Provider">
        <p>
          <strong>Provider</strong> adalah state management solution yang recommended by Flutter team. Makes it easy to share state across widget tree tanpa lifting state manually.
        </p>

        <Subsection id="provider-install" heading="Install Provider">
          <CodeBlock language="bash">
{`# Add to pubspec.yaml
flutter pub add provider`}
          </CodeBlock>

          <CodeBlock language="yaml">
{`dependencies:
  flutter:
    sdk: flutter
  provider: ^6.1.0`}
          </CodeBlock>
        </Subsection>

        <Subsection id="provider-basic" heading="Basic Provider Usage">
          <CodeBlock language="dart">
{`import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

// 1. Create Model (holds state)
class Counter with ChangeNotifier {
  int _count = 0;
  
  int get count => _count;
  
  void increment() {
    _count++;
    notifyListeners();  // Notify widgets to rebuild
  }
  
  void decrement() {
    _count--;
    notifyListeners();
  }
}

// 2. Provide at top level
void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => Counter(),
      child: MyApp(),
    ),
  );
}

// 3. Consume in widgets
class CounterScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Watch for changes
    final counter = context.watch<Counter>();
    
    return Scaffold(
      appBar: AppBar(title: Text('Counter')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Count: \${counter.count}',
              style: TextStyle(fontSize: 48),
            ),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: counter.decrement,
                  child: Text('-'),
                ),
                SizedBox(width: 16),
                ElevatedButton(
                  onPressed: counter.increment,
                  child: Text('+'),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="provider-methods" heading="Provider Access Methods">
          <CodeBlock language="dart">
{`// 1. context.watch<T>() - Rebuilds when state changes
Widget build(BuildContext context) {
  final counter = context.watch<Counter>();
  return Text('\${counter.count}');  // Rebuilds on change
}

// 2. context.read<T>() - One-time read, no rebuild
Widget build(BuildContext context) {
  return ElevatedButton(
    onPressed: () {
      context.read<Counter>().increment();  // Call method only
    },
    child: Text('Increment'),
  );
}

// 3. context.select<T, R>() - Watch specific property
Widget build(BuildContext context) {
  final count = context.select<Counter, int>((c) => c.count);
  return Text('\$count');  // Only rebuilds when count changes
}

// 4. Consumer<T> - Alternative to watch
Widget build(BuildContext context) {
  return Consumer<Counter>(
    builder: (context, counter, child) {
      return Text('\${counter.count}');
    },
  );
}`}
          </CodeBlock>

          <Note type="tip">
            <strong>When to use each:</strong><br/>
            • <code>watch</code>: When you need to rebuild on state change<br/>
            • <code>read</code>: When you only need to call methods (e.g., in callbacks)<br/>
            • <code>select</code>: When you want to rebuild only when specific property changes<br/>
            • <code>Consumer</code>: When you want to control rebuild scope
          </Note>
        </Subsection>
      </Section>

      <Section id="multi-provider" heading="Multiple Providers">
        <CodeBlock language="dart">
{`// Multiple models
class UserModel with ChangeNotifier {
  String _name = 'Guest';
  String get name => _name;
  
  void login(String name) {
    _name = name;
    notifyListeners();
  }
}

class CartModel with ChangeNotifier {
  List<String> _items = [];
  List<String> get items => _items;
  
  void addItem(String item) {
    _items.add(item);
    notifyListeners();
  }
}

// Provide multiple
void main() {
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => Counter()),
        ChangeNotifierProvider(create: (_) => UserModel()),
        ChangeNotifierProvider(create: (_) => CartModel()),
      ],
      child: MyApp(),
    ),
  );
}

// Use in widget
class Dashboard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final user = context.watch<UserModel>();
    final cart = context.watch<CartModel>();
    
    return Column(
      children: [
        Text('Welcome, \${user.name}'),
        Text('Cart items: \${cart.items.length}'),
      ],
    );
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="practical" heading="Practical Example: Shopping Cart">
        <CodeBlock language="dart">
{`// Model
class Cart with ChangeNotifier {
  final List<Product> _items = [];
  
  List<Product> get items => _items;
  
  int get itemCount => _items.length;
  
  double get totalPrice {
    return _items.fold(0, (sum, item) => sum + item.price);
  }
  
  void addItem(Product product) {
    _items.add(product);
    notifyListeners();
  }
  
  void removeItem(Product product) {
    _items.remove(product);
    notifyListeners();
  }
  
  void clear() {
    _items.clear();
    notifyListeners();
  }
}

class Product {
  final String name;
  final double price;
  
  Product({required this.name, required this.price});
}

// UI
class CartScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final cart = context.watch<Cart>();
    
    return Scaffold(
      appBar: AppBar(
        title: Text('Cart (\${cart.itemCount})'),
        actions: [
          IconButton(
            icon: Icon(Icons.delete),
            onPressed: cart.itemCount > 0 
              ? () => cart.clear() 
              : null,
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              itemCount: cart.items.length,
              itemBuilder: (context, index) {
                final item = cart.items[index];
                return ListTile(
                  title: Text(item.name),
                  subtitle: Text('\Rp{item.price}'),
                  trailing: IconButton(
                    icon: Icon(Icons.remove_circle),
                    onPressed: () => cart.removeItem(item),
                  ),
                );
              },
            ),
          ),
          Container(
            padding: EdgeInsets.all(16),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Total: \Rp{cart.totalPrice}',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
                ElevatedButton(
                  onPressed: cart.itemCount > 0 
                    ? () {
                        // Checkout logic
                      } 
                    : null,
                  child: Text('Checkout'),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li>✅ Use setState() untuk simple local state</li>
          <li>✅ Lift state up ke common parent when shared</li>
          <li>✅ Use Provider untuk app-wide state</li>
          <li>✅ Keep models focused (single responsibility)</li>
          <li>✅ Call notifyListeners() after state changes</li>
          <li>✅ Use context.read() untuk one-time operations</li>
          <li>✅ Use context.watch() atau Consumer untuk rebuilds</li>
          <li>✅ Don't watch more than you need</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>✅ State adalah data yang berubah during app lifecycle</li>
          <li>✅ setState() untuk local state management</li>
          <li>✅ Lift state up untuk share between siblings</li>
          <li>✅ Provider for app-wide state management</li>
          <li>✅ ChangeNotifier + notifyListeners() pattern</li>
          <li>✅ context.watch() rebuilds, context.read() doesn't</li>
          <li>✅ MultiProvider untuk multiple state objects</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
