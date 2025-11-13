import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi12() {
  return (
    <MateriLayout
      title="Local Storage"
      intro="Master local data persistence di Flutter - SharedPreferences untuk simple data, SQLite untuk relational data, dan Hive untuk NoSQL database."
    >
      <Section id="sharedpreferences" heading="SharedPreferences">
        <p>
          <strong>SharedPreferences</strong> untuk simple key-value data (settings, user preferences, flags).
        </p>

        <Subsection id="sp-install" heading="Setup SharedPreferences">
          <CodeBlock language="bash">
{`flutter pub add shared_preferences`}
          </CodeBlock>

          <CodeBlock language="yaml">
{`dependencies:
  shared_preferences: ^2.2.0`}
          </CodeBlock>
        </Subsection>

        <Subsection id="sp-usage" heading="Basic Usage">
          <CodeBlock language="dart">
{`import 'package:shared_preferences/shared_preferences.dart';

// Save data
Future<void> saveData() async {
  final prefs = await SharedPreferences.getInstance();
  
  // String
  await prefs.setString('username', 'john_doe');
  
  // Int
  await prefs.setInt('counter', 42);
  
  // Bool
  await prefs.setBool('isDarkMode', true);
  
  // Double
  await prefs.setDouble('rating', 4.5);
  
  // List of strings
  await prefs.setStringList('tags', ['flutter', 'dart', 'mobile']);
}

// Read data
Future<void> readData() async {
  final prefs = await SharedPreferences.getInstance();
  
  final username = prefs.getString('username') ?? 'Guest';
  final counter = prefs.getInt('counter') ?? 0;
  final isDarkMode = prefs.getBool('isDarkMode') ?? false;
  final rating = prefs.getDouble('rating') ?? 0.0;
  final tags = prefs.getStringList('tags') ?? [];
  
  print('Username: \$username');
  print('Counter: \$counter');
  print('Dark Mode: \$isDarkMode');
  print('Rating: \$rating');
  print('Tags: \$tags');
}

// Delete data
Future<void> deleteData() async {
  final prefs = await SharedPreferences.getInstance();
  
  await prefs.remove('username');  // Remove specific key
  // await prefs.clear();  // Remove all data
}

// Check if key exists
Future<bool> hasKey(String key) async {
  final prefs = await SharedPreferences.getInstance();
  return prefs.containsKey(key);
}`}
          </CodeBlock>

          <Note type="warning">
            <strong>Limitations:</strong> SharedPreferences TIDAK untuk data sensitif (passwords, tokens). Use Flutter Secure Storage untuk sensitive data.
          </Note>
        </Subsection>

        <Subsection id="sp-example" heading="Practical Example: Settings">
          <CodeBlock language="dart">
{`class SettingsService {
  static const String _keyTheme = 'theme_mode';
  static const String _keyLanguage = 'language';
  static const String _keyNotifications = 'notifications_enabled';
  
  // Save theme
  Future<void> saveTheme(String theme) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_keyTheme, theme);
  }
  
  // Get theme
  Future<String> getTheme() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_keyTheme) ?? 'light';
  }
  
  // Save language
  Future<void> saveLanguage(String lang) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_keyLanguage, lang);
  }
  
  // Get language
  Future<String> getLanguage() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString(_keyLanguage) ?? 'en';
  }
  
  // Toggle notifications
  Future<void> setNotifications(bool enabled) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(_keyNotifications, enabled);
  }
  
  // Get notifications status
  Future<bool> getNotifications() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getBool(_keyNotifications) ?? true;
  }
}

// Usage in widget
class SettingsScreen extends StatefulWidget {
  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  final SettingsService _settings = SettingsService();
  bool _notificationsEnabled = true;
  String _theme = 'light';
  
  @override
  void initState() {
    super.initState();
    _loadSettings();
  }
  
  Future<void> _loadSettings() async {
    final notifications = await _settings.getNotifications();
    final theme = await _settings.getTheme();
    
    setState(() {
      _notificationsEnabled = notifications;
      _theme = theme;
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Settings')),
      body: ListView(
        children: [
          SwitchListTile(
            title: Text('Notifications'),
            value: _notificationsEnabled,
            onChanged: (value) async {
              await _settings.setNotifications(value);
              setState(() {
                _notificationsEnabled = value;
              });
            },
          ),
          ListTile(
            title: Text('Theme'),
            subtitle: Text(_theme),
            trailing: DropdownButton<String>(
              value: _theme,
              items: ['light', 'dark', 'system']
                  .map((t) => DropdownMenuItem(value: t, child: Text(t)))
                  .toList(),
              onChanged: (value) async {
                if (value != null) {
                  await _settings.saveTheme(value);
                  setState(() {
                    _theme = value;
                  });
                }
              },
            ),
          ),
        ],
      ),
    );
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="sqflite" heading="SQLite with sqflite">
        <p>
          <strong>SQLite</strong> untuk relational database dengan SQL queries. Perfect untuk complex data relationships.
        </p>

        <Subsection id="sqflite-install" heading="Setup sqflite">
          <CodeBlock language="bash">
{`flutter pub add sqflite path`}
          </CodeBlock>

          <CodeBlock language="yaml">
{`dependencies:
  sqflite: ^2.3.0
  path: ^1.8.3`}
          </CodeBlock>
        </Subsection>

        <Subsection id="sqflite-usage" heading="Database Helper">
          <CodeBlock language="dart">
{`import 'package:sqflite/sqflite.dart';
import 'package:path/path.dart';

// Model
class Todo {
  final int? id;
  final String title;
  final bool isCompleted;
  
  Todo({this.id, required this.title, this.isCompleted = false});
  
  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'title': title,
      'isCompleted': isCompleted ? 1 : 0,
    };
  }
  
  factory Todo.fromMap(Map<String, dynamic> map) {
    return Todo(
      id: map['id'],
      title: map['title'],
      isCompleted: map['isCompleted'] == 1,
    );
  }
}

// Database Helper
class DatabaseHelper {
  static final DatabaseHelper _instance = DatabaseHelper._internal();
  static Database? _database;
  
  factory DatabaseHelper() => _instance;
  
  DatabaseHelper._internal();
  
  Future<Database> get database async {
    if (_database != null) return _database!;
    _database = await _initDatabase();
    return _database!;
  }
  
  Future<Database> _initDatabase() async {
    final dbPath = await getDatabasesPath();
    final path = join(dbPath, 'todos.db');
    
    return await openDatabase(
      path,
      version: 1,
      onCreate: (db, version) async {
        await db.execute('''
          CREATE TABLE todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            isCompleted INTEGER NOT NULL DEFAULT 0
          )
        ''');
      },
    );
  }
  
  // Insert
  Future<int> insertTodo(Todo todo) async {
    final db = await database;
    return await db.insert('todos', todo.toMap());
  }
  
  // Get all
  Future<List<Todo>> getTodos() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query('todos');
    return List.generate(maps.length, (i) => Todo.fromMap(maps[i]));
  }
  
  // Update
  Future<int> updateTodo(Todo todo) async {
    final db = await database;
    return await db.update(
      'todos',
      todo.toMap(),
      where: 'id = ?',
      whereArgs: [todo.id],
    );
  }
  
  // Delete
  Future<int> deleteTodo(int id) async {
    final db = await database;
    return await db.delete(
      'todos',
      where: 'id = ?',
      whereArgs: [id],
    );
  }
  
  // Get completed todos
  Future<List<Todo>> getCompletedTodos() async {
    final db = await database;
    final List<Map<String, dynamic>> maps = await db.query(
      'todos',
      where: 'isCompleted = ?',
      whereArgs: [1],
    );
    return List.generate(maps.length, (i) => Todo.fromMap(maps[i]));
  }
  
  // Clear all
  Future<void> clearAllTodos() async {
    final db = await database;
    await db.delete('todos');
  }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="sqflite-example" heading="Todo App Example">
          <CodeBlock language="dart">
{`class TodoScreen extends StatefulWidget {
  @override
  State<TodoScreen> createState() => _TodoScreenState();
}

class _TodoScreenState extends State<TodoScreen> {
  final DatabaseHelper _dbHelper = DatabaseHelper();
  List<Todo> _todos = [];
  final TextEditingController _controller = TextEditingController();
  
  @override
  void initState() {
    super.initState();
    _loadTodos();
  }
  
  Future<void> _loadTodos() async {
    final todos = await _dbHelper.getTodos();
    setState(() {
      _todos = todos;
    });
  }
  
  Future<void> _addTodo() async {
    if (_controller.text.isNotEmpty) {
      await _dbHelper.insertTodo(Todo(title: _controller.text));
      _controller.clear();
      await _loadTodos();
    }
  }
  
  Future<void> _toggleTodo(Todo todo) async {
    final updated = Todo(
      id: todo.id,
      title: todo.title,
      isCompleted: !todo.isCompleted,
    );
    await _dbHelper.updateTodo(updated);
    await _loadTodos();
  }
  
  Future<void> _deleteTodo(int id) async {
    await _dbHelper.deleteTodo(id);
    await _loadTodos();
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Todos (\${_todos.length})'),
        actions: [
          IconButton(
            icon: Icon(Icons.delete_sweep),
            onPressed: () async {
              await _dbHelper.clearAllTodos();
              await _loadTodos();
            },
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(
                      labelText: 'New todo',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                SizedBox(width: 8),
                ElevatedButton(
                  onPressed: _addTodo,
                  child: Text('Add'),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _todos.length,
              itemBuilder: (context, index) {
                final todo = _todos[index];
                return ListTile(
                  leading: Checkbox(
                    value: todo.isCompleted,
                    onChanged: (_) => _toggleTodo(todo),
                  ),
                  title: Text(
                    todo.title,
                    style: TextStyle(
                      decoration: todo.isCompleted
                          ? TextDecoration.lineThrough
                          : null,
                    ),
                  ),
                  trailing: IconButton(
                    icon: Icon(Icons.delete, color: Colors.red),
                    onPressed: () => _deleteTodo(todo.id!),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
  
  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="hive" heading="Hive - NoSQL Database">
        <p>
          <strong>Hive</strong> adalah lightweight NoSQL database, super fast dan easy to use. No SQL queries!
        </p>

        <Subsection id="hive-install" heading="Setup Hive">
          <CodeBlock language="bash">
{`flutter pub add hive hive_flutter
flutter pub add --dev hive_generator build_runner`}
          </CodeBlock>

          <CodeBlock language="yaml">
{`dependencies:
  hive: ^2.2.3
  hive_flutter: ^1.1.0

dev_dependencies:
  hive_generator: ^2.0.0
  build_runner: ^2.4.0`}
          </CodeBlock>
        </Subsection>

        <Subsection id="hive-usage" heading="Basic Hive Usage">
          <CodeBlock language="dart">
{`import 'package:hive_flutter/hive_flutter.dart';

// Initialize Hive
void main() async {
  await Hive.initFlutter();
  await Hive.openBox('settings');
  runApp(MyApp());
}

// Save data
Future<void> saveToHive() async {
  final box = Hive.box('settings');
  
  await box.put('username', 'john_doe');
  await box.put('age', 25);
  await box.put('isDarkMode', true);
  await box.put('tags', ['flutter', 'dart']);
}

// Read data
void readFromHive() {
  final box = Hive.box('settings');
  
  final username = box.get('username', defaultValue: 'Guest');
  final age = box.get('age', defaultValue: 0);
  final isDarkMode = box.get('isDarkMode', defaultValue: false);
  final tags = box.get('tags', defaultValue: []);
  
  print('Username: \$username');
  print('Age: \$age');
}

// Delete data
Future<void> deleteFromHive() async {
  final box = Hive.box('settings');
  
  await box.delete('username');
  // await box.clear();  // Delete all
}

// Close box
Future<void> closeHive() async {
  await Hive.box('settings').close();
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="hive-model" heading="Hive with Type Adapters">
          <CodeBlock language="dart">
{`import 'package:hive/hive.dart';

part 'user.g.dart';  // Generated file

@HiveType(typeId: 0)
class User extends HiveObject {
  @HiveField(0)
  late String name;
  
  @HiveField(1)
  late int age;
  
  @HiveField(2)
  late String email;
  
  User({required this.name, required this.age, required this.email});
}

// Generate adapter: flutter pub run build_runner build

// Initialize
void main() async {
  await Hive.initFlutter();
  Hive.registerAdapter(UserAdapter());  // Register adapter
  await Hive.openBox<User>('users');
  runApp(MyApp());
}

// CRUD operations
class UserService {
  final Box<User> _box = Hive.box<User>('users');
  
  // Create
  Future<void> addUser(User user) async {
    await _box.add(user);
  }
  
  // Read all
  List<User> getAllUsers() {
    return _box.values.toList();
  }
  
  // Read by index
  User? getUserAt(int index) {
    return _box.getAt(index);
  }
  
  // Update
  Future<void> updateUser(int index, User user) async {
    await _box.putAt(index, user);
  }
  
  // Delete
  Future<void> deleteUser(int index) async {
    await _box.deleteAt(index);
  }
  
  // Delete all
  Future<void> clearAll() async {
    await _box.clear();
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="comparison" heading="Storage Comparison">
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f5f5f5' }}>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Feature</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>SharedPreferences</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>SQLite</th>
              <th style={{ border: '1px solid #ddd', padding: '8px' }}>Hive</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Type</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Key-Value</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Relational (SQL)</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>NoSQL</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Performance</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Fast</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Medium</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Very Fast</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Complexity</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Simple</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Complex</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Simple</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Best For</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Settings, flags</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Complex queries</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Objects, lists</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Queries</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Key only</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>SQL queries</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Index-based</td>
            </tr>
            <tr>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}><strong>Size Limit</strong></td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Small data</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Large databases</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>Medium-Large</td>
            </tr>
          </tbody>
        </table>

        <Note type="tip">
          <strong>When to use which:</strong><br/>
          • SharedPreferences: User settings, theme, simple flags<br/>
          • SQLite: Complex relationships, advanced queries, large datasets<br/>
          • Hive: Fast object storage, offline-first apps, simple queries
        </Note>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li> Use SharedPreferences untuk simple settings</li>
          <li> Use SQLite untuk complex relational data</li>
          <li> Use Hive untuk fast object storage</li>
          <li> Never store sensitive data unencrypted</li>
          <li> Initialize storage in main() before runApp()</li>
          <li> Handle database migrations properly</li>
          <li> Close databases when not needed</li>
          <li> Use singleton pattern untuk database helpers</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li> SharedPreferences untuk key-value storage</li>
          <li> SQLite untuk relational database dengan SQL</li>
          <li> Hive untuk NoSQL object storage</li>
          <li> Choose based on data complexity & performance needs</li>
          <li> Initialize before app runs</li>
          <li> Handle errors & migrations</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
