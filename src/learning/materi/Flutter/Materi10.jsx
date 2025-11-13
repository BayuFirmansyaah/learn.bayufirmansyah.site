import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi10() {
  return (
    <MateriLayout
      title="Navigation & Routing"
      intro="Master navigation dan routing di Flutter - Navigator.push/pop, named routes, passing data between screens, dan advanced navigation patterns."
    >
      <Section id="basic-navigation" heading="Basic Navigation">
        <p>
          Flutter menggunakan <strong>Navigator</strong> untuk manage screen stack. Push screen baru ke stack, pop untuk kembali.
        </p>

        <Subsection id="navigator-push" heading="Navigator.push()">
          <CodeBlock language="dart">
{`// Screen 1: Home
class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Navigate to detail screen
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => DetailScreen(),
              ),
            );
          },
          child: Text('Go to Detail'),
        ),
      ),
    );
  }
}

// Screen 2: Detail
class DetailScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Detail')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            // Go back
            Navigator.pop(context);
          },
          child: Text('Go Back'),
        ),
      ),
    );
  }
}`}
          </CodeBlock>

          <Note type="info">
            <code>Navigator.push()</code> menambahkan screen ke stack. Back button automatically handled oleh AppBar.
          </Note>
        </Subsection>

        <Subsection id="passing-data" heading="Passing Data to Screen">
          <CodeBlock language="dart">
{`// Detail screen yang terima data
class DetailScreen extends StatelessWidget {
  final String title;
  final int id;
  
  const DetailScreen({
    required this.title,
    required this.id,
  });
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(title)),
      body: Center(
        child: Text('ID: \$id', style: TextStyle(fontSize: 24)),
      ),
    );
  }
}

// Navigate dengan data
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => DetailScreen(
      title: 'Product Detail',
      id: 123,
    ),
  ),
);`}
          </CodeBlock>
        </Subsection>

        <Subsection id="return-data" heading="Returning Data from Screen">
          <CodeBlock language="dart">
{`// Screen yang return data
class SelectionScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Select Item')),
      body: ListView(
        children: [
          ListTile(
            title: Text('Option A'),
            onTap: () {
              Navigator.pop(context, 'A');  // Return value
            },
          ),
          ListTile(
            title: Text('Option B'),
            onTap: () {
              Navigator.pop(context, 'B');
            },
          ),
        ],
      ),
    );
  }
}

// Screen yang receive return value
class HomeScreen extends StatefulWidget {
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String? _selected;
  
  Future<void> _navigateAndGetResult() async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => SelectionScreen()),
    );
    
    if (result != null) {
      setState(() {
        _selected = result;
      });
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Home')),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Selected: \${_selected ?? "None"}'),
            ElevatedButton(
              onPressed: _navigateAndGetResult,
              child: Text('Select Option'),
            ),
          ],
        ),
      ),
    );
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="named-routes" heading="Named Routes">
        <p>
          Named routes membuat navigation lebih clean dan maintainable dengan define routes di satu tempat.
        </p>

        <Subsection id="define-routes" heading="Define Named Routes">
          <CodeBlock language="dart">
{`// main.dart
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'My App',
      initialRoute: '/',  // Starting route
      routes: {
        '/': (context) => HomeScreen(),
        '/detail': (context) => DetailScreen(),
        '/profile': (context) => ProfileScreen(),
        '/settings': (context) => SettingsScreen(),
      },
    );
  }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="navigate-named" heading="Navigate Using Named Routes">
          <CodeBlock language="dart">
{`// Navigate to named route
Navigator.pushNamed(context, '/detail');

// Navigate and remove current screen
Navigator.pushReplacementNamed(context, '/detail');

// Navigate and remove all previous screens
Navigator.pushNamedAndRemoveUntil(
  context,
  '/home',
  (route) => false,  // Remove all routes
);

// Pop until specific route
Navigator.popUntil(context, ModalRoute.withName('/home'));`}
          </CodeBlock>
        </Subsection>

        <Subsection id="pass-arguments" heading="Passing Arguments with Named Routes">
          <CodeBlock language="dart">
{`// Define arguments class
class DetailArguments {
  final String title;
  final int id;
  
  DetailArguments(this.title, this.id);
}

// DetailScreen that receives arguments
class DetailScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final args = ModalRoute.of(context)!.settings.arguments as DetailArguments;
    
    return Scaffold(
      appBar: AppBar(title: Text(args.title)),
      body: Center(
        child: Text('ID: \${args.id}'),
      ),
    );
  }
}

// Navigate with arguments
Navigator.pushNamed(
  context,
  '/detail',
  arguments: DetailArguments('Product Detail', 123),
);`}
          </CodeBlock>
        </Subsection>

        <Subsection id="ongenerate-route" heading="onGenerateRoute - Dynamic Routes">
          <CodeBlock language="dart">
{`class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      onGenerateRoute: (settings) {
        // Handle all routes dynamically
        switch (settings.name) {
          case '/':
            return MaterialPageRoute(builder: (_) => HomeScreen());
            
          case '/detail':
            final args = settings.arguments as DetailArguments?;
            return MaterialPageRoute(
              builder: (_) => DetailScreen(
                title: args?.title ?? 'Detail',
                id: args?.id ?? 0,
              ),
            );
            
          case '/profile':
            return MaterialPageRoute(builder: (_) => ProfileScreen());
            
          default:
            // 404 page
            return MaterialPageRoute(
              builder: (_) => Scaffold(
                body: Center(child: Text('404 - Page not found')),
              ),
            );
        }
      },
    );
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="advanced-navigation" heading="Advanced Navigation Patterns">
        <Subsection id="nested-navigation" heading="Nested Navigation">
          <CodeBlock language="dart">
{`// Bottom navigation with separate navigation stacks
class MainScreen extends StatefulWidget {
  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _currentIndex = 0;
  
  final List<Widget> _screens = [
    HomeNavigator(),
    SearchNavigator(),
    ProfileNavigator(),
  ];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: IndexedStack(
        index: _currentIndex,
        children: _screens,
      ),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) {
          setState(() {
            _currentIndex = index;
          });
        },
        items: [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: 'Home'),
          BottomNavigationBarItem(icon: Icon(Icons.search), label: 'Search'),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: 'Profile'),
        ],
      ),
    );
  }
}

// Separate navigator for Home tab
class HomeNavigator extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Navigator(
      onGenerateRoute: (settings) {
        return MaterialPageRoute(
          builder: (_) => HomeScreen(),
        );
      },
    );
  }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="page-transitions" heading="Custom Page Transitions">
          <CodeBlock language="dart">
{`// Slide transition
Navigator.push(
  context,
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => DetailScreen(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      const begin = Offset(1.0, 0.0);  // Start from right
      const end = Offset.zero;
      const curve = Curves.easeInOut;
      
      var tween = Tween(begin: begin, end: end).chain(
        CurveTween(curve: curve),
      );
      
      return SlideTransition(
        position: animation.drive(tween),
        child: child,
      );
    },
  ),
);

// Fade transition
Navigator.push(
  context,
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => DetailScreen(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return FadeTransition(
        opacity: animation,
        child: child,
      );
    },
  ),
);

// Scale transition
Navigator.push(
  context,
  PageRouteBuilder(
    pageBuilder: (context, animation, secondaryAnimation) => DetailScreen(),
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return ScaleTransition(
        scale: animation,
        child: child,
      );
    },
  ),
);`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="practical-example" heading="Practical Example: E-Commerce Navigation">
        <CodeBlock language="dart">
{`// Product model
class Product {
  final int id;
  final String name;
  final double price;
  
  Product({required this.id, required this.name, required this.price});
}

// Product List Screen
class ProductListScreen extends StatelessWidget {
  final List<Product> products = [
    Product(id: 1, name: 'Laptop', price: 10000000),
    Product(id: 2, name: 'Phone', price: 5000000),
    Product(id: 3, name: 'Tablet', price: 3000000),
  ];
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Products')),
      body: ListView.builder(
        itemCount: products.length,
        itemBuilder: (context, index) {
          final product = products[index];
          return ListTile(
            title: Text(product.name),
            subtitle: Text('Rp \${product.price}'),
            trailing: Icon(Icons.arrow_forward),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (context) => ProductDetailScreen(product: product),
                ),
              );
            },
          );
        },
      ),
    );
  }
}

// Product Detail Screen
class ProductDetailScreen extends StatelessWidget {
  final Product product;
  
  const ProductDetailScreen({required this.product});
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(product.name)),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              product.name,
              style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 16),
            Text(
              'Rp \${product.price}',
              style: TextStyle(fontSize: 24, color: Colors.green),
            ),
            SizedBox(height: 32),
            ElevatedButton(
              onPressed: () async {
                // Navigate to cart and wait for result
                final added = await Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) => CartScreen(),
                  ),
                );
                
                if (added == true) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Added to cart!')),
                  );
                }
              },
              child: Text('Add to Cart'),
            ),
          ],
        ),
      ),
    );
  }
}

// Cart Screen
class CartScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Cart')),
      body: Center(
        child: ElevatedButton(
          onPressed: () {
            Navigator.pop(context, true);  // Return true when added
          },
          child: Text('Confirm Add to Cart'),
        ),
      ),
    );
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li> Use named routes untuk better code organization</li>
          <li> Pass data via constructor untuk type safety</li>
          <li> Use async/await untuk handle return values</li>
          <li> Implement 404 page di onGenerateRoute</li>
          <li> Use pushReplacement untuk login/logout flows</li>
          <li> Keep navigation logic in one place</li>
          <li> Use IndexedStack untuk bottom navigation tabs</li>
          <li> Test deep linking early in development</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li> Navigator.push() untuk navigate forward</li>
          <li> Navigator.pop() untuk go back</li>
          <li> Named routes dengan routes map di MaterialApp</li>
          <li> Pass arguments via constructor atau settings.arguments</li>
          <li> Return data dengan Navigator.pop(context, data)</li>
          <li> onGenerateRoute untuk dynamic routing</li>
          <li> PageRouteBuilder untuk custom transitions</li>
          <li> Nested navigation untuk complex apps</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
