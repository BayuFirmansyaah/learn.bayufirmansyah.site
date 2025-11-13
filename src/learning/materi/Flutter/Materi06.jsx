import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi06() {
  return (
    <MateriLayout
      title="Widget Basics"
      intro="Memahami konsep fundamental Widget di Flutter - building blocks untuk semua UI. Pelajari StatelessWidget, StatefulWidget, dan widget tree structure."
    >
      {/* Everything is Widget */}
      <Section id="everything-widget" heading="Everything is a Widget">
        <p>
          Di Flutter, <strong>everything is a widget</strong>. Text, buttons, layout, padding, 
          margin, animations - semua adalah widget. Widget adalah blueprint untuk UI components.
        </p>

        <p>
          <strong>3 core concepts:</strong>
        </p>
        <ul>
          <li><strong>Widget:</strong> Immutable configuration (blueprint)</li>
          <li><strong>Element:</strong> Instantiation of widget in tree (lifecycle manager)</li>
          <li><strong>RenderObject:</strong> Actual rendering & layout computation</li>
        </ul>

        <Note type="info">
          Widgets are immutable - when configuration changes, Flutter rebuilds widget tree. 
          Element & RenderObject reused untuk performance.
        </Note>
      </Section>

      {/* StatelessWidget */}
      <Section id="stateless-widget" heading="StatelessWidget">
        <p>
          <code>StatelessWidget</code> adalah widget yang tidak memiliki internal state. 
          Outputnya hanya depend on constructor parameters.
        </p>

        <CodeBlock language="dart">
{`import 'package:flutter/material.dart';

// Basic StatelessWidget
class Greeting extends StatelessWidget {
  final String name;
  
  // Constructor with required parameter
  const Greeting({
    Key? key,
    required this.name,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Text(
      'Hello, \$name!',
      style: TextStyle(fontSize: 24),
    );
  }
}

// Usage
Greeting(name: 'Ubay')

// Hasil: Text "Hello, Ubay!" dengan font size 24`}
        </CodeBlock>

        <Subsection id="stateless-example" heading="Contoh StatelessWidget Lengkap">
          <CodeBlock language="dart">
{`class UserCard extends StatelessWidget {
  final String name;
  final String email;
  final String avatarUrl;
  
  const UserCard({
    Key? key,
    required this.name,
    required this.email,
    required this.avatarUrl,
  }) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Card(
      margin: EdgeInsets.all(16),
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Row(
          children: [
            // Avatar
            CircleAvatar(
              radius: 30,
              backgroundImage: NetworkImage(avatarUrl),
            ),
            SizedBox(width: 16),
            // Info
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                SizedBox(height: 4),
                Text(
                  email,
                  style: TextStyle(
                    color: Colors.grey,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

// Usage
UserCard(
  name: 'Bayu Firmansyah',
  email: 'ubay@example.com',
  avatarUrl: 'https://...',
)`}
          </CodeBlock>
        </Subsection>

        <Note type="tip">
          <strong>Kapan pakai StatelessWidget?</strong><br/>
          • Display static content<br/>
          • Configuration tidak berubah setelah created<br/>
          • Pure UI components<br/>
          • Performance critical (no state overhead)
        </Note>
      </Section>

      {/* StatefulWidget */}
      <Section id="stateful-widget" heading="StatefulWidget">
        <p>
          <code>StatefulWidget</code> memiliki mutable state yang bisa berubah selama widget lifetime. 
          Terdiri dari 2 classes: Widget class & State class.
        </p>

        <CodeBlock language="dart">
{`class Counter extends StatefulWidget {
  const Counter({Key? key}) : super(key: key);
  
  @override
  State<Counter> createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  // Mutable state
  int _count = 0;
  
  // Method untuk update state
  void _increment() {
    setState(() {
      _count++;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Count: \$_count',
          style: TextStyle(fontSize: 32),
        ),
        SizedBox(height: 20),
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
          <strong>Selalu gunakan setState() untuk update state!</strong> Jika langsung mutate tanpa 
          setState(), UI tidak akan rebuild dan perubahan tidak terlihat.
        </Note>

        <Subsection id="stateful-lifecycle" heading="StatefulWidget Lifecycle">
          <CodeBlock language="dart">
{`class LifecycleDemo extends StatefulWidget {
  @override
  State<LifecycleDemo> createState() => _LifecycleDemoState();
}

class _LifecycleDemoState extends State<LifecycleDemo> {
  @override
  void initState() {
    super.initState();
    // Called once when widget inserted into tree
    // Setup: controllers, subscriptions, fetch data
    print('initState called');
  }
  
  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Called after initState and when dependencies change
    // e.g., InheritedWidget changes
    print('didChangeDependencies called');
  }
  
  @override
  Widget build(BuildContext context) {
    // Called on every rebuild
    print('build called');
    return Container();
  }
  
  @override
  void didUpdateWidget(LifecycleDemo oldWidget) {
    super.didUpdateWidget(oldWidget);
    // Called when parent rebuilds with new configuration
    print('didUpdateWidget called');
  }
  
  @override
  void dispose() {
    // Called when widget removed from tree permanently
    // Cleanup: controllers, subscriptions, listeners
    print('dispose called');
    super.dispose();
  }
}`}
          </CodeBlock>

          <p>
            <strong>Lifecycle order:</strong>
          </p>
          <ol>
            <li><code>createState()</code> - Create State instance</li>
            <li><code>initState()</code> - Initialize state (once)</li>
            <li><code>didChangeDependencies()</code> - Dependencies ready</li>
            <li><code>build()</code> - Build UI (every rebuild)</li>
            <li><code>didUpdateWidget()</code> - Parent updated config</li>
            <li><code>setState()</code> - Trigger rebuild</li>
            <li><code>dispose()</code> - Cleanup before removal</li>
          </ol>
        </Subsection>

        <Subsection id="stateful-example" heading="Contoh Praktis: Todo Item">
          <CodeBlock language="dart">
{`class TodoItem extends StatefulWidget {
  final String title;
  final bool initialComplete;
  
  const TodoItem({
    Key? key,
    required this.title,
    this.initialComplete = false,
  }) : super(key: key);
  
  @override
  State<TodoItem> createState() => _TodoItemState();
}

class _TodoItemState extends State<TodoItem> {
  late bool _isComplete;
  
  @override
  void initState() {
    super.initState();
    _isComplete = widget.initialComplete;
  }
  
  void _toggleComplete() {
    setState(() {
      _isComplete = !_isComplete;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return ListTile(
      leading: Checkbox(
        value: _isComplete,
        onChanged: (value) {
          _toggleComplete();
        },
      ),
      title: Text(
        widget.title,
        style: TextStyle(
          decoration: _isComplete 
            ? TextDecoration.lineThrough 
            : null,
        ),
      ),
    );
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Basic Widgets */}
      <Section id="basic-widgets" heading="Basic Material Widgets">
        <Subsection id="text-widget" heading="Text Widget">
          <CodeBlock language="dart">
{`// Basic text
Text('Hello World')

// Styled text
Text(
  'Styled Text',
  style: TextStyle(
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.blue,
    letterSpacing: 2.0,
    decoration: TextDecoration.underline,
  ),
)

// Rich text with multiple styles
RichText(
  text: TextSpan(
    text: 'Hello ',
    style: TextStyle(color: Colors.black),
    children: [
      TextSpan(
        text: 'World',
        style: TextStyle(
          fontWeight: FontWeight.bold,
          color: Colors.blue,
        ),
      ),
    ],
  ),
)

// Limit lines with ellipsis
Text(
  'Very long text...',
  maxLines: 2,
  overflow: TextOverflow.ellipsis,
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="container-widget" heading="Container Widget">
          <CodeBlock language="dart">
{`// Basic container
Container(
  width: 200,
  height: 100,
  color: Colors.blue,
  child: Text('Hello'),
)

// Container with decoration
Container(
  padding: EdgeInsets.all(16),
  margin: EdgeInsets.symmetric(horizontal: 20),
  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(12),
    boxShadow: [
      BoxShadow(
        color: Colors.black26,
        blurRadius: 10,
        offset: Offset(0, 4),
      ),
    ],
  ),
  child: Text('Card with shadow'),
)

// Gradient container
Container(
  decoration: BoxDecoration(
    gradient: LinearGradient(
      colors: [Colors.purple, Colors.blue],
      begin: Alignment.topLeft,
      end: Alignment.bottomRight,
    ),
  ),
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="button-widgets" heading="Button Widgets">
          <CodeBlock language="dart">
{`// Elevated Button (primary action)
ElevatedButton(
  onPressed: () {
    print('Pressed!');
  },
  child: Text('Submit'),
)

// Outlined Button (secondary action)
OutlinedButton(
  onPressed: () {},
  child: Text('Cancel'),
)

// Text Button (low emphasis)
TextButton(
  onPressed: () {},
  child: Text('Learn More'),
)

// Icon Button
IconButton(
  icon: Icon(Icons.favorite),
  onPressed: () {},
  color: Colors.red,
)

// Custom styled button
ElevatedButton(
  onPressed: () {},
  style: ElevatedButton.styleFrom(
    backgroundColor: Colors.purple,
    foregroundColor: Colors.white,
    padding: EdgeInsets.symmetric(horizontal: 32, vertical: 16),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(30),
    ),
  ),
  child: Text('Custom Button'),
)

// Disabled button
ElevatedButton(
  onPressed: null,  // null = disabled
  child: Text('Disabled'),
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="image-widget" heading="Image Widget">
          <CodeBlock language="dart">
{`// Network image
Image.network(
  'https://example.com/image.jpg',
  width: 200,
  height: 200,
  fit: BoxFit.cover,
  loadingBuilder: (context, child, loadingProgress) {
    if (loadingProgress == null) return child;
    return CircularProgressIndicator();
  },
)

// Asset image
Image.asset(
  'assets/images/logo.png',
  width: 100,
)

// Circular avatar
CircleAvatar(
  radius: 50,
  backgroundImage: NetworkImage('https://...'),
)

// Image with error handling
Image.network(
  'https://...',
  errorBuilder: (context, error, stackTrace) {
    return Icon(Icons.error);
  },
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="icon-widget" heading="Icon Widget">
          <CodeBlock language="dart">
{`// Basic icon
Icon(Icons.home)

// Styled icon
Icon(
  Icons.favorite,
  color: Colors.red,
  size: 48,
)

// Icon with semantic label (accessibility)
Icon(
  Icons.delete,
  semanticLabel: 'Delete item',
)

// Common icons
Icon(Icons.add)
Icon(Icons.settings)
Icon(Icons.person)
Icon(Icons.email)
Icon(Icons.phone)
Icon(Icons.search)
Icon(Icons.notifications)
Icon(Icons.menu)
Icon(Icons.close)
Icon(Icons.arrow_back)
Icon(Icons.check)
Icon(Icons.star)`}
          </CodeBlock>
        </Subsection>
      </Section>

      {/* Widget Tree */}
      <Section id="widget-tree" heading="Widget Tree">
        <p>
          Flutter UI dibangun sebagai tree of widgets. Setiap widget adalah node, dengan children 
          sebagai child nodes.
        </p>

        <CodeBlock language="dart">
{`// Widget tree example
MaterialApp(                    // Root
  home: Scaffold(              // Child of MaterialApp
    appBar: AppBar(            // Child of Scaffold
      title: Text('Title'),    // Child of AppBar
    ),
    body: Column(              // Child of Scaffold
      children: [              // Children of Column
        Text('Hello'),         // Child 1
        ElevatedButton(        // Child 2
          child: Text('Press'),
        ),
      ],
    ),
  ),
)

// Tree structure:
// MaterialApp
//   └─ Scaffold
//       ├─ AppBar
//       │   └─ Text("Title")
//       └─ Column
//           ├─ Text("Hello")
//           └─ ElevatedButton
//               └─ Text("Press")`}
        </CodeBlock>

        <Note type="info">
          Flutter efficiently updates hanya parts of tree yang berubah. Tidak rebuild entire tree 
          setiap kali ada perubahan.
        </Note>
      </Section>

      {/* Best Practices */}
      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li>✅ <strong>Extract widgets</strong> - buat custom widgets daripada nested hell</li>
          <li>✅ <strong>Use const constructors</strong> - optimize rebuild performance</li>
          <li>✅ <strong>StatelessWidget first</strong> - pakai StatefulWidget hanya jika butuh state</li>
          <li>✅ <strong>Meaningful names</strong> - widget names should describe purpose</li>
          <li>✅ <strong>Single responsibility</strong> - satu widget satu purpose</li>
          <li>✅ <strong>Cleanup in dispose()</strong> - prevent memory leaks</li>
        </ul>

        <CodeBlock language="dart">
{`// ❌ Bad: Deeply nested, hard to read
build() {
  return Container(
    child: Column(
      children: [
        Container(
          child: Row(
            children: [
              Container(
                child: Text('Nested hell'),
              ),
            ],
          ),
        ),
      ],
    ),
  );
}

// ✅ Good: Extract to widgets
build() {
  return Container(
    child: Column(
      children: [
        _buildHeader(),
        _buildContent(),
        _buildFooter(),
      ],
    ),
  );
}

Widget _buildHeader() {
  return HeaderWidget();
}

// ✅ Even better: Separate widget classes
class HeaderWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(...);
  }
}`}
        </CodeBlock>
      </Section>

      {/* Practice */}
      <Section id="practice" heading="Latihan">
        <p>
          <strong>Challenge 1: Profile Card</strong>
        </p>
        <p>
          Buat widget <code>ProfileCard</code> yang menampilkan:
        </p>
        <ul>
          <li>Avatar (CircleAvatar)</li>
          <li>Nama (Text bold)</li>
          <li>Bio (Text grey)</li>
          <li>Follow button (ElevatedButton)</li>
        </ul>

        <p>
          <strong>Challenge 2: Counter App</strong>
        </p>
        <p>
          Buat StatefulWidget counter dengan:
        </p>
        <ul>
          <li>Display current count</li>
          <li>Increment button</li>
          <li>Decrement button</li>
          <li>Reset button</li>
        </ul>

        <p>
          <strong>Challenge 3: Toggle Card</strong>
        </p>
        <p>
          Buat card yang bisa di-tap untuk expand/collapse, showing more content.
        </p>
      </Section>

      {/* Rangkuman */}
      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>✅ Everything is a widget - UI components, layout, styling</li>
          <li>✅ StatelessWidget untuk static UI, StatefulWidget untuk mutable state</li>
          <li>✅ Widget lifecycle: initState, build, didUpdateWidget, dispose</li>
          <li>✅ setState() untuk trigger rebuild</li>
          <li>✅ Basic widgets: Text, Container, Button, Image, Icon</li>
          <li>✅ Widget tree structure - parent-child relationships</li>
          <li>✅ Extract complex UI to separate widgets</li>
          <li>✅ Use const constructors untuk performance</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
