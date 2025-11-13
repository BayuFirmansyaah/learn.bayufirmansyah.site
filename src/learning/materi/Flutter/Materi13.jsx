import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi13() {
  return (
    <MateriLayout
      title="State Management Advanced"
      intro="Deep dive into advanced state management - Provider patterns, Riverpod introduction, BLoC overview, dan when to use each solution."
    >
      <Section id="provider-advanced" heading="Provider Advanced Patterns">
        <Subsection id="multiprovider-pattern" heading="MultiProvider Best Practices">
          <CodeBlock language="dart">
{`// Organize providers by feature
void main() {
  runApp(
    MultiProvider(
      providers: [
        // Auth providers
        ChangeNotifierProvider(create: (_) => AuthService()),
        
        // Data providers (depend on auth)
        ChangeNotifierProxyProvider<AuthService, UserService>(
          create: (_) => UserService(null),
          update: (_, auth, previous) => 
            UserService(auth.isAuthenticated ? auth.token : null),
        ),
        
        // UI state providers
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => CartProvider()),
      ],
      child: MyApp(),
    ),
  );
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="provider-proxy" heading="ProxyProvider for Dependencies">
          <CodeBlock language="dart">
{`// Service that depends on another service
class ProductService with ChangeNotifier {
  final String? authToken;
  List<Product> _products = [];
  
  ProductService(this.authToken) {
    if (authToken != null) {
      _loadProducts();
    }
  }
  
  List<Product> get products => _products;
  
  Future<void> _loadProducts() async {
    // Use authToken to fetch products
  }
}

// Setup with ProxyProvider
ChangeNotifierProxyProvider<AuthService, ProductService>(
  create: (context) => ProductService(null),
  update: (context, auth, previous) {
    return ProductService(auth.token);
  },
)`}
          </CodeBlock>
        </Subsection>

        <Subsection id="selector-optimization" heading="Selector for Performance">
          <CodeBlock language="dart">
{`// BAD: Rebuilds entire widget when ANY cart property changes
class CartSummary extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final cart = context.watch<CartProvider>();
    return Text('Items: \${cart.itemCount}');  // Rebuilds even if only price changes
  }
}

// GOOD: Only rebuilds when itemCount changes
class CartSummary extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final itemCount = context.select<CartProvider, int>((cart) => cart.itemCount);
    return Text('Items: \$itemCount');  // Only rebuilds when itemCount changes
  }
}

// ALTERNATIVE: Use Selector widget
class CartSummary extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Selector<CartProvider, int>(
      selector: (context, cart) => cart.itemCount,
      builder: (context, itemCount, child) {
        return Text('Items: \$itemCount');
      },
    );
  }
}`}
          </CodeBlock>

          <Note type="success">
            <code>Selector</code> prevents unnecessary rebuilds, improving performance significantly!
          </Note>
        </Subsection>
      </Section>

      <Section id="riverpod" heading="Riverpod - Next Generation Provider">
        <p>
          <strong>Riverpod</strong> adalah evolution of Provider dengan compile-time safety, better testing, dan no BuildContext needed.
        </p>

        <Subsection id="riverpod-install" heading="Setup Riverpod">
          <CodeBlock language="bash">
{`flutter pub add flutter_riverpod`}
          </CodeBlock>

          <CodeBlock language="yaml">
{`dependencies:
  flutter_riverpod: ^2.4.0`}
          </CodeBlock>
        </Subsection>

        <Subsection id="riverpod-basics" heading="Riverpod Basics">
          <CodeBlock language="dart">
{`import 'package:flutter_riverpod/flutter_riverpod.dart';

// 1. Define provider (outside widget)
final counterProvider = StateProvider<int>((ref) => 0);

// 2. Wrap app with ProviderScope
void main() {
  runApp(
    ProviderScope(
      child: MyApp(),
    ),
  );
}

// 3. Use ConsumerWidget to read provider
class CounterScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Watch provider (rebuilds on change)
    final count = ref.watch(counterProvider);
    
    return Scaffold(
      appBar: AppBar(title: Text('Counter')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('\$count', style: TextStyle(fontSize: 48)),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                ElevatedButton(
                  onPressed: () {
                    // Read provider (no rebuild)
                    ref.read(counterProvider.notifier).state--;
                  },
                  child: Text('-'),
                ),
                SizedBox(width: 16),
                ElevatedButton(
                  onPressed: () {
                    ref.read(counterProvider.notifier).state++;
                  },
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

          <Note type="info">
            <strong>Key differences from Provider:</strong><br/>
            • No BuildContext needed<br/>
            • Compile-time safety<br/>
            • Easier testing<br/>
            • Better error messages
          </Note>
        </Subsection>

        <Subsection id="riverpod-types" heading="Provider Types">
          <CodeBlock language="dart">
{`// 1. Provider - Immutable value
final greetingProvider = Provider<String>((ref) => 'Hello World');

// 2. StateProvider - Simple mutable state
final counterProvider = StateProvider<int>((ref) => 0);

// 3. StateNotifierProvider - Complex state with logic
class TodosNotifier extends StateNotifier<List<Todo>> {
  TodosNotifier() : super([]);
  
  void addTodo(Todo todo) {
    state = [...state, todo];
  }
  
  void removeTodo(String id) {
    state = state.where((todo) => todo.id != id).toList();
  }
  
  void toggleTodo(String id) {
    state = [
      for (final todo in state)
        if (todo.id == id)
          Todo(id: todo.id, title: todo.title, isCompleted: !todo.isCompleted)
        else
          todo,
    ];
  }
}

final todosProvider = StateNotifierProvider<TodosNotifier, List<Todo>>(
  (ref) => TodosNotifier(),
);

// 4. FutureProvider - Async data
final userProvider = FutureProvider<User>((ref) async {
  final response = await http.get(Uri.parse('https://api.example.com/user'));
  return User.fromJson(json.decode(response.body));
});

// 5. StreamProvider - Real-time data
final messagesProvider = StreamProvider<List<Message>>((ref) {
  return FirebaseFirestore.instance
      .collection('messages')
      .snapshots()
      .map((snapshot) => snapshot.docs.map((doc) => Message.fromDoc(doc)).toList());
});`}
          </CodeBlock>
        </Subsection>

        <Subsection id="riverpod-example" heading="Riverpod Todo Example">
          <CodeBlock language="dart">
{`// Model
class Todo {
  final String id;
  final String title;
  final bool isCompleted;
  
  Todo({required this.id, required this.title, this.isCompleted = false});
}

// State notifier
class TodosNotifier extends StateNotifier<List<Todo>> {
  TodosNotifier() : super([]);
  
  void addTodo(String title) {
    final todo = Todo(
      id: DateTime.now().toString(),
      title: title,
    );
    state = [...state, todo];
  }
  
  void toggleTodo(String id) {
    state = [
      for (final todo in state)
        if (todo.id == id)
          Todo(id: todo.id, title: todo.title, isCompleted: !todo.isCompleted)
        else
          todo,
    ];
  }
  
  void removeTodo(String id) {
    state = state.where((todo) => todo.id != id).toList();
  }
}

// Provider
final todosProvider = StateNotifierProvider<TodosNotifier, List<Todo>>(
  (ref) => TodosNotifier(),
);

// Filtered todos
final completedTodosProvider = Provider<List<Todo>>((ref) {
  final todos = ref.watch(todosProvider);
  return todos.where((todo) => todo.isCompleted).toList();
});

final activeTodosProvider = Provider<List<Todo>>((ref) {
  final todos = ref.watch(todosProvider);
  return todos.where((todo) => !todo.isCompleted).toList();
});

// UI
class TodoScreen extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final todos = ref.watch(todosProvider);
    
    return Scaffold(
      appBar: AppBar(
        title: Text('Todos (\${todos.length})'),
      ),
      body: ListView.builder(
        itemCount: todos.length,
        itemBuilder: (context, index) {
          final todo = todos[index];
          return ListTile(
            leading: Checkbox(
              value: todo.isCompleted,
              onChanged: (_) {
                ref.read(todosProvider.notifier).toggleTodo(todo.id);
              },
            ),
            title: Text(
              todo.title,
              style: TextStyle(
                decoration: todo.isCompleted ? TextDecoration.lineThrough : null,
              ),
            ),
            trailing: IconButton(
              icon: Icon(Icons.delete, color: Colors.red),
              onPressed: () {
                ref.read(todosProvider.notifier).removeTodo(todo.id);
              },
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          // Show dialog to add todo
        },
        child: Icon(Icons.add),
      ),
    );
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="bloc" heading="BLoC Pattern Overview">
        <p>
          <strong>BLoC (Business Logic Component)</strong> menggunakan Streams untuk separate business logic from UI. Popular untuk large apps.
        </p>

        <Subsection id="bloc-install" heading="Setup BLoC">
          <CodeBlock language="bash">
{`flutter pub add flutter_bloc`}
          </CodeBlock>

          <CodeBlock language="yaml">
{`dependencies:
  flutter_bloc: ^8.1.3`}
          </CodeBlock>
        </Subsection>

        <Subsection id="bloc-basics" heading="BLoC Basics">
          <CodeBlock language="dart">
{`import 'package:flutter_bloc/flutter_bloc.dart';

// Events
abstract class CounterEvent {}

class IncrementEvent extends CounterEvent {}
class DecrementEvent extends CounterEvent {}

// BLoC
class CounterBloc extends Bloc<CounterEvent, int> {
  CounterBloc() : super(0) {
    on<IncrementEvent>((event, emit) {
      emit(state + 1);
    });
    
    on<DecrementEvent>((event, emit) {
      emit(state - 1);
    });
  }
}

// UI
class CounterScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => CounterBloc(),
      child: CounterView(),
    );
  }
}

class CounterView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Counter')),
      body: Center(
        child: BlocBuilder<CounterBloc, int>(
          builder: (context, count) {
            return Text('\$count', style: TextStyle(fontSize: 48));
          },
        ),
      ),
      floatingActionButton: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            onPressed: () {
              context.read<CounterBloc>().add(IncrementEvent());
            },
            child: Icon(Icons.add),
          ),
          SizedBox(height: 8),
          FloatingActionButton(
            onPressed: () {
              context.read<CounterBloc>().add(DecrementEvent());
            },
            child: Icon(Icons.remove),
          ),
        ],
      ),
    );
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="comparison" heading="State Management Comparison">
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Solution</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Learning Curve</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Boilerplate</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>setState</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Easy</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Minimal</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Local state</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Provider</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Easy</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Low</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Small-Medium apps</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Riverpod</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Medium</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Low</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Any size app</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>BLoC</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Hard</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>High</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Large enterprise apps</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>GetX</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Easy</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Minimal</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Fast development</td>
            </tr>
          </tbody>
        </table>

        <Note type="tip">
          <strong>Recommendations:</strong><br/>
          • <strong>Beginners:</strong> Start with Provider<br/>
          • <strong>Growing apps:</strong> Use Riverpod for better scalability<br/>
          • <strong>Enterprise:</strong> Consider BLoC for strict architecture<br/>
          • <strong>Fast prototyping:</strong> GetX works but less maintainable
        </Note>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li>✅ Use setState() untuk simple local state</li>
          <li>✅ Provider/Riverpod untuk app-wide state</li>
          <li>✅ Separate business logic from UI</li>
          <li>✅ Use Selector untuk performance optimization</li>
          <li>✅ Keep state classes focused (single responsibility)</li>
          <li>✅ Test state logic independently</li>
          <li>✅ Don't mix multiple state management solutions</li>
          <li>✅ Document your state management architecture</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li>✅ Provider: Easy, recommended by Flutter team</li>
          <li>✅ Riverpod: Better Provider with compile-time safety</li>
          <li>✅ BLoC: Stream-based, good for large apps</li>
          <li>✅ Use Selector untuk avoid unnecessary rebuilds</li>
          <li>✅ Choose based on app size & team experience</li>
          <li>✅ Consistency is key - stick with one solution</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
