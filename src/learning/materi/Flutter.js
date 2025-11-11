// Materi Flutter - 17 Materi Lengkap Best Practice

export const materiList = [
  {
    title: "Pengenalan Flutter",
    content: `Flutter adalah UI toolkit dari Google untuk membangun aplikasi natively compiled untuk mobile, web, dan desktop dari single codebase. Diluncurkan tahun 2017 dan terus berkembang pesat.

Flutter menggunakan Dart sebagai bahasa pemrograman. Dart adalah bahasa modern, type-safe, dan mudah dipelajari terutama bagi yang sudah familiar dengan Java atau JavaScript.

Keunggulan Flutter: Hot Reload untuk development cepat, performa native karena compile ke ARM/x86 code, UI yang beautiful dan customizable, serta widget-based architecture yang flexible.

Flutter widgets adalah building blocks UI. Everything is a widget: text, button, layout, bahkan app itself adalah widget. Composition over inheritance membuat UI easy to build dan maintain.

Cross-platform: write once, run anywhere. iOS, Android, Web, Windows, macOS, Linux semua dari satu codebase. Reduce development time significantly.`,
    keypoints: [
      "UI toolkit dari Google untuk cross-platform",
      "Menggunakan bahasa Dart",
      "Hot Reload untuk development cepat",
      "Performa native, compile ke machine code",
      "Everything is a widget",
      "Single codebase untuk multiple platforms"
    ]
  },
  {
    title: "Instalasi Flutter & Setup Device",
    content: `Instalasi Flutter dimulai dengan download Flutter SDK dari flutter.dev. Extract ke directory pilihan, tambahkan flutter/bin ke PATH environment variable.

Untuk Windows: Download ZIP, extract, add to PATH. macOS/Linux: gunakan terminal untuk download dan setup PATH di .bashrc atau .zshrc.

Flutter membutuhkan tools tambahan: Android Studio untuk Android development (Android SDK, emulator), Xcode untuk iOS (macOS only), VS Code atau Android Studio sebagai IDE.

Install Flutter dan Dart plugin di IDE pilihan. VS Code lebih lightweight, Android Studio lebih feature-rich. Keduanya excellent untuk Flutter development.

Verifikasi instalasi: flutter doctor. Command ini check semua dependencies dan memberikan instruksi untuk fix issues. Pastikan semua checks green.

Setup device: Android emulator via AVD Manager, iOS simulator via Xcode, atau physical device dengan USB debugging enabled. flutter devices untuk list available devices.`,
    keypoints: [
      "Download Flutter SDK dari flutter.dev",
      "Add flutter/bin ke PATH",
      "Install: Android Studio, Xcode (macOS), IDE",
      "Plugin: Flutter dan Dart di VS Code/Android Studio",
      "Verifikasi: flutter doctor",
      "Setup device: emulator, simulator, atau physical"
    ]
  },
  {
    title: "Struktur Project Flutter",
    content: `Project Flutter memiliki struktur yang organized. Root directory berisi file konfigurasi dan folders untuk different platforms.

Folder lib/ adalah main source code folder. lib/main.dart adalah entry point aplikasi. void main() => runApp(MyApp()) menjalankan aplikasi.

Folder android/ berisi Android-specific code. ios/ untuk iOS. web/ untuk web. windows/, macos/, linux/ untuk desktop. Modify platform-specific settings di sini.

pubspec.yaml adalah file konfigurasi utama. Define dependencies, assets, app metadata di sini. Similar dengan package.json di Node.js atau composer.json di PHP.

Folder test/ untuk unit tests dan widget tests. Integration tests di integration_test/. Testing adalah important part of Flutter development.

Folder build/ berisi compiled files, di-generate otomatis. Folder .dart_tool/ untuk Dart tools. Keduanya ada di .gitignore, jangan commit.`,
    keypoints: [
      "lib/ - main source code folder",
      "lib/main.dart - entry point aplikasi",
      "android/, ios/, web/ - platform-specific code",
      "pubspec.yaml - dependencies dan configuration",
      "test/ - unit dan widget tests",
      "build/ - compiled files (auto-generated)"
    ]
  },
  {
    title: "Widget Dasar",
    content: `Widget adalah building blocks Flutter UI. Ada dua jenis: Stateless Widget dan Stateful Widget. Understanding widgets adalah fundamental Flutter development.

StatelessWidget untuk widget yang tidak berubah: class MyWidget extends StatelessWidget { @override Widget build(BuildContext context) { return Text('Hello'); } }. Immutable.

StatefulWidget untuk widget dengan state: class MyWidget extends StatefulWidget { @override _MyWidgetState createState() => _MyWidgetState(); }. State class: class _MyWidgetState extends State<MyWidget> { }.

Basic widgets: Text untuk text, Container untuk box model (padding, margin, color), Row dan Column untuk layout, Image untuk images, Icon untuk icons.

Material widgets: MaterialApp (root app), Scaffold (basic page structure), AppBar (top bar), FloatingActionButton (FAB), BottomNavigationBar, Drawer (side menu).

Cupertino widgets untuk iOS-style: CupertinoApp, CupertinoNavigationBar, CupertinoButton. Adaptive design dengan Platform.isIOS check.`,
    keypoints: [
      "StatelessWidget: immutable, tidak berubah",
      "StatefulWidget: memiliki state yang berubah",
      "Basic: Text, Container, Row, Column, Image",
      "Material: Scaffold, AppBar, FloatingActionButton",
      "Cupertino: iOS-style widgets",
      "Everything is a widget, composable"
    ]
  },
  {
    title: "Layouting (Row, Column, Stack, Flex)",
    content: `Layout widgets mengatur posisi dan size child widgets. Flutter layout system powerful dan flexible dengan berbagai layout widgets.

Row untuk horizontal layout: Row(children: [Text('A'), Text('B')]). MainAxisAlignment untuk horizontal alignment: start, center, end, spaceBetween, spaceAround.

Column untuk vertical layout: Column(children: [Text('A'), Text('B')]). CrossAxisAlignment untuk perpendicular alignment.

Stack untuk overlay widgets: Stack(children: [Container(), Positioned(top: 10, left: 10, child: Text('Overlay'))]). Layer widgets on top of each other.

Expanded dan Flexible untuk responsive sizing: Row(children: [Expanded(child: Container()), Container(width: 100)]). Expanded take available space.

Container untuk single child dengan styling: padding, margin, decoration, width, height, alignment. Swiss army knife widget.

ListView untuk scrollable list: ListView.builder(itemCount: items.length, itemBuilder: (context, index) => ListTile()). Efficient untuk large lists.`,
    keypoints: [
      "Row: horizontal layout, Column: vertical",
      "Stack: overlay widgets dengan Positioned",
      "Expanded/Flexible: responsive sizing",
      "Container: single child dengan styling",
      "ListView: scrollable list, efficient",
      "MainAxisAlignment, CrossAxisAlignment"
    ]
  },
  {
    title: "Navigasi (Navigator 1.0 / 2.0)",
    content: `Navigasi adalah moving between screens. Flutter menyediakan Navigator untuk imperative navigation dan Router untuk declarative (Navigator 2.0).

Navigator 1.0 (basic): Navigator.push(context, MaterialPageRoute(builder: (context) => SecondPage())). Push new page onto stack.

Navigator.pop(context) untuk kembali. Navigator.pushReplacement untuk replace current page. Navigator.pushAndRemoveUntil untuk clear stack.

Named routes di MaterialApp: routes: {'/second': (context) => SecondPage()}. Navigate: Navigator.pushNamed(context, '/second').

Passing data: Navigator.push(context, MaterialPageRoute(builder: (context) => DetailPage(item: item))). Terima di constructor DetailPage.

Return data dari page: Navigator.pop(context, result). Await result: final result = await Navigator.push(...).

Navigator 2.0 (declarative) lebih complex tapi powerful untuk deep linking, web URL, complex navigation flows. Use packages seperti go_router untuk simplify.`,
    keypoints: [
      "Navigator.push untuk navigate forward",
      "Navigator.pop untuk navigate back",
      "Named routes dengan routes map",
      "Passing data via constructor atau arguments",
      "Return data dengan Navigator.pop(context, result)",
      "Navigator 2.0 untuk complex navigation"
    ]
  },
  {
    title: "State Management Dasar (setState)",
    content: `State management adalah cara manage dan update UI based on data changes. setState adalah built-in state management paling basic.

StatefulWidget memiliki State object. State berisi mutable data: int counter = 0. Update state dengan setState(): setState(() { counter++; }).

setState() notify framework bahwa state changed, trigger rebuild. Only call setState dengan data yang affect UI. Don't call di build method.

Lifting state up: jika multiple widgets perlu same state, lift state ke common parent. Pass state down via constructor, callbacks up via functions.

setState limitations: susah manage complex state, banyak rebuilds, state coupling dengan UI. Good untuk simple local state.

Best practice: setState untuk simple local state (toggle, counter, form). Untuk complex state, gunakan state management solutions lain.`,
    keypoints: [
      "setState untuk update state di StatefulWidget",
      "setState() trigger rebuild",
      "Lift state up ke common parent",
      "Pass data down, callbacks up",
      "Limitations: complex state, many rebuilds",
      "Good untuk simple local state only"
    ]
  },
  {
    title: "State Management Lanjutan (Provider / Riverpod)",
    content: `Untuk aplikasi complex, butuh state management solution yang lebih powerful. Provider dan Riverpod adalah pilihan populer.

Provider adalah state management recommended oleh Flutter team. Add dependency: provider. Wrap app dengan ChangeNotifierProvider.

ChangeNotifier class untuk state: class Counter extends ChangeNotifier { int value = 0; void increment() { value++; notifyListeners(); } }.

Consume state: Consumer<Counter>(builder: (context, counter, child) => Text('\${counter.value}')). Atau Provider.of<Counter>(context).

Riverpod adalah evolution of Provider, lebih type-safe dan testable. No BuildContext needed. Provider defined outside widget tree.

Riverpod providers: final counterProvider = StateProvider((ref) => 0). Consume: final counter = ref.watch(counterProvider).

Best practice: choose based on complexity. setState untuk local, Provider/Riverpod untuk app-wide, BLoC untuk very complex. Don't over-engineer.`,
    keypoints: [
      "Provider: recommended oleh Flutter team",
      "ChangeNotifier untuk state dengan notifyListeners",
      "Consumer atau Provider.of untuk consume",
      "Riverpod: more type-safe, no BuildContext",
      "Choose based on complexity",
      "Don't over-engineer state management"
    ]
  },
  {
    title: "Form & Validation",
    content: `Forms adalah common feature aplikasi. Flutter menyediakan Form widget dan TextFormField untuk handle input dan validation.

Form widget: Form(key: _formKey, child: Column(children: [TextFormField()])). GlobalKey<FormState> untuk control form.

TextFormField untuk input dengan validation: TextFormField(validator: (value) { if (value == null || value.isEmpty) return 'Please enter text'; return null; }).

Validation trigger: _formKey.currentState!.validate(). Return true jika valid. autovalidateMode untuk validate on change.

TextEditingController untuk access dan control text: final controller = TextEditingController(). Get text: controller.text. Set: controller.text = 'value'.

Input types dengan keyboardType: TextInputType.number, email, phone, datetime. inputFormatters untuk format input.

Save form: _formKey.currentState!.save(). onSaved callback di TextFormField untuk capture value. Organize form data.`,
    keypoints: [
      "Form widget dengan GlobalKey<FormState>",
      "TextFormField untuk input dengan validation",
      "validator function return error message atau null",
      "TextEditingController untuk access/control text",
      "keyboardType untuk input types",
      "validate(), save() untuk process form"
    ]
  },
  {
    title: "HTTP Request (Dio / http)",
    content: `HTTP requests untuk communicate dengan backend API. Flutter menyediakan http package, Dio untuk features lebih advanced.

Http package: add dependency http. Import: import 'package:http/http.dart' as http. Simple dan lightweight.

GET request: final response = await http.get(Uri.parse('https://api.example.com/users')). Response body: response.body.

POST request: await http.post(Uri.parse(url), headers: {'Content-Type': 'application/json'}, body: jsonEncode({'name': 'John'})).

Dio adalah alternative powerful: add dependency dio. Features: interceptors, global config, download progress, form data, cancellation.

Dio usage: final dio = Dio(). GET: final response = await dio.get(url). POST: await dio.post(url, data: {'name': 'John'}).

Best practice: create API service class, handle errors dengan try-catch, show loading indicator, use FutureBuilder untuk integrate dengan UI.`,
    keypoints: [
      "http package: simple dan lightweight",
      "GET: http.get(Uri.parse(url))",
      "POST: http.post dengan headers dan body",
      "Dio: advanced features (interceptors, progress)",
      "Create API service class",
      "Handle errors, show loading, use FutureBuilder"
    ]
  },
  {
    title: "Model & Parsing JSON",
    content: `JSON adalah format data standard untuk API communication. Flutter perlu parse JSON string ke Dart objects dan sebaliknya.

Manual parsing: final json = jsonDecode(response.body). Access: json['name'], json['age']. Tedious dan error-prone untuk complex JSON.

Model classes untuk type-safe: class User { final String name; final int age; User({required this.name, required this.age}); }.

fromJson factory: factory User.fromJson(Map<String, dynamic> json) { return User(name: json['name'], age: json['age']); }.

toJson method: Map<String, dynamic> toJson() { return {'name': name, 'age': age}; }. Serialize object ke JSON.

Json serialization packages: json_serializable untuk generate fromJson/toJson otomatis. Add build_runner dependency. Run: flutter pub run build_runner build.

Annotation: @JsonSerializable() class User { }. Part directive: part 'user.g.dart'. Generated code handle serialization.`,
    keypoints: [
      "jsonDecode untuk parse JSON string",
      "Model classes untuk type-safe objects",
      "fromJson factory untuk deserialize",
      "toJson method untuk serialize",
      "json_serializable untuk auto-generate code",
      "Use models untuk clean dan maintainable code"
    ]
  },
  {
    title: "ListView, GridView, FutureBuilder",
    content: `Displaying lists dan grids adalah common UI pattern. Flutter menyediakan ListView, GridView, dan FutureBuilder untuk efficient rendering.

ListView.builder untuk large lists: ListView.builder(itemCount: items.length, itemBuilder: (context, index) => ListTile(title: Text(items[index]))). Lazy loading.

ListView.separated untuk dividers: ListView.separated(itemCount: items.length, itemBuilder: (context, index) => ListTile(), separatorBuilder: (context, index) => Divider()).

GridView untuk grid layout: GridView.builder(gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 2), itemBuilder: (context, index) => Card()).

FutureBuilder untuk async data: FutureBuilder<List<User>>(future: fetchUsers(), builder: (context, snapshot) { if (snapshot.hasData) return ListView(); return CircularProgressIndicator(); }).

StreamBuilder untuk real-time updates: StreamBuilder<List<User>>(stream: userStream, builder: (context, snapshot) { }). Automatically rebuild on new data.

RefreshIndicator untuk pull-to-refresh: RefreshIndicator(onRefresh: _refresh, child: ListView()). Return Future from onRefresh.`,
    keypoints: [
      "ListView.builder untuk large lists, lazy loading",
      "GridView untuk grid layout",
      "FutureBuilder untuk async data loading",
      "StreamBuilder untuk real-time updates",
      "RefreshIndicator untuk pull-to-refresh",
      "Efficient rendering dengan builder pattern"
    ]
  },
  {
    title: "Local Storage (SharedPreferences / Hive)",
    content: `Local storage untuk persist data offline. Flutter menyediakan beberapa options: SharedPreferences untuk simple key-value, Hive/sqflite untuk database.

SharedPreferences untuk simple data: add dependency shared_preferences. Store primitives: strings, ints, bools, lists.

Usage: final prefs = await SharedPreferences.getInstance(). Save: await prefs.setString('key', 'value'). Get: prefs.getString('key').

Hive adalah lightweight NoSQL database: add dependency hive dan hive_flutter. Fast, type-safe, no native dependencies.

Hive setup: await Hive.initFlutter(). Open box: final box = await Hive.openBox('myBox'). Put: box.put('key', 'value'). Get: box.get('key').

Hive TypeAdapter untuk custom objects: @HiveType(typeId: 0) class User { @HiveField(0) String name; }. Register: Hive.registerAdapter(UserAdapter()).

Best practice: SharedPreferences untuk settings/preferences. Hive untuk structured data. sqflite untuk relational data dengan SQL.`,
    keypoints: [
      "SharedPreferences: simple key-value storage",
      "Store: setString, setInt, setBool",
      "Hive: lightweight NoSQL database",
      "Hive: fast, type-safe, no native dependencies",
      "TypeAdapter untuk custom objects",
      "Choose based on data complexity"
    ]
  },
  {
    title: "Authentication UI + Logic",
    content: `Authentication adalah secure user access. Implement login, register, logout dengan backend API dan local storage untuk token.

UI: LoginPage dengan TextFormField untuk email/password. Validation untuk ensure input valid. Login button trigger authentication logic.

Authentication service: class AuthService { Future<bool> login(String email, String password) async { final response = await dio.post('/login', data: {...}); if (response.statusCode == 200) { await saveToken(response.data['token']); return true; } return false; } }.

Save token dengan SharedPreferences: await prefs.setString('auth_token', token). Check logged in: prefs.getString('auth_token') != null.

Logout: clear token dengan prefs.remove('auth_token'). Navigate ke login page.

Protected routes: check token before navigate. If no token, redirect to login. Middleware pattern.

Best practice: secure token storage (flutter_secure_storage untuk encryption), refresh tokens untuk long-term sessions, handle token expiry, biometric authentication untuk UX.`,
    keypoints: [
      "Login/Register UI dengan Form validation",
      "AuthService class untuk authentication logic",
      "Save token dengan SharedPreferences",
      "Check logged in status before protected routes",
      "Logout clear token dan redirect",
      "Best practice: secure storage, refresh tokens"
    ]
  },
  {
    title: "Handling Error & Loading State",
    content: `Error handling dan loading states essential untuk good UX. User harus tau when app loading dan what went wrong if error.

Loading state dengan bool: bool isLoading = false. Before API call: setState(() { isLoading = true; }). After: setState(() { isLoading = false; }).

Show loading: if (isLoading) return CircularProgressIndicator(). Else show content. Center loading indicator for better UX.

Error handling dengan try-catch: try { await fetchData(); } catch (e) { setState(() { error = e.toString(); }); showSnackBar(error); }.

Error state: String? error. Display: if (error != null) Text(error, style: TextStyle(color: Colors.red)).

FutureBuilder handle loading/error automatically: FutureBuilder(future: future, builder: (context, snapshot) { if (snapshot.connectionState == ConnectionState.waiting) return Loading(); if (snapshot.hasError) return Error(snapshot.error); return Data(snapshot.data); }).

Best practice: user-friendly error messages, retry mechanism, offline mode indication, timeout handling, log errors untuk debugging.`,
    keypoints: [
      "Loading state dengan bool flag",
      "Show CircularProgressIndicator saat loading",
      "Error handling dengan try-catch",
      "Display user-friendly error messages",
      "FutureBuilder handle loading/error automatically",
      "Best practice: retry, offline mode, timeout"
    ]
  },
  {
    title: "Responsive UI",
    content: `Responsive UI adapt to different screen sizes dan orientations. Flutter provides tools untuk build responsive layouts.

MediaQuery untuk screen info: final size = MediaQuery.of(context).size. Width: size.width, height: size.height. Orientation: MediaQuery.of(context).orientation.

LayoutBuilder untuk constraints: LayoutBuilder(builder: (context, constraints) { if (constraints.maxWidth > 600) return TabletLayout(); return MobileLayout(); }).

Breakpoints: define constants untuk tablet (600), desktop (1200). Conditional rendering based on screen width.

AspectRatio untuk maintain ratio: AspectRatio(aspectRatio: 16/9, child: Container()). Useful untuk images, videos.

FittedBox untuk scale child: FittedBox(fit: BoxFit.contain, child: Text('Long text')). Prevent overflow.

Flexible layouts dengan Expanded, Flexible: Row(children: [Expanded(flex: 2, child: A()), Expanded(flex: 1, child: B())]). Proportional sizing.`,
    keypoints: [
      "MediaQuery untuk screen size dan orientation",
      "LayoutBuilder untuk constraint-based layout",
      "Breakpoints untuk different devices",
      "AspectRatio untuk maintain ratio",
      "FittedBox untuk scale child",
      "Flexible layouts dengan Expanded/Flexible"
    ]
  },
  {
    title: "Clean Architecture Flutter (Best Practice)",
    content: `Clean Architecture adalah architectural pattern untuk organize code yang scalable, testable, dan maintainable. Separasi concerns dengan layers.

Layers: Presentation (UI), Domain (business logic), Data (data sources). Each layer has specific responsibility dan dependency direction: Presentation -> Domain <- Data.

Presentation layer: widgets, pages, state management. Domain layer: entities, use cases, repository interfaces. Data layer: repository implementations, data sources (API, database).

Use Cases contain business logic: class GetUsers { final UserRepository repository; Future<List<User>> call() => repository.getUsers(); }. Single responsibility.

Repository pattern: abstract class UserRepository { Future<List<User>> getUsers(); }. Implementation di Data layer: class UserRepositoryImpl implements UserRepository { }.

Dependency Injection: use get_it package untuk service locator. Register dependencies: getIt.registerSingleton<UserRepository>(UserRepositoryImpl()). Resolve: getIt<UserRepository>().

Best practice: follow SOLID principles, write unit tests untuk each layer, keep business logic di domain layer, UI tidak depend on implementations.`,
    keypoints: [
      "3 Layers: Presentation, Domain, Data",
      "Separation of concerns, dependency direction",
      "Use Cases untuk business logic",
      "Repository pattern untuk data abstraction",
      "Dependency Injection dengan get_it",
      "Best practice: SOLID, unit tests, clean separation"
    ]
  }
];
