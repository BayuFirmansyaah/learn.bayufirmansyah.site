import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi11() {
  return (
    <MateriLayout
      title="Networking & API"
      intro="Learn HTTP requests, REST API integration, JSON parsing, Future, async/await, error handling, dan best practices untuk networking di Flutter."
    >
      <Section id="http-package" heading="HTTP Package Setup">
        <CodeBlock language="bash">
{`# Install http package
flutter pub add http`}
        </CodeBlock>

        <CodeBlock language="yaml">
{`dependencies:
  flutter:
    sdk: flutter
  http: ^1.1.0`}
        </CodeBlock>

        <Note type="info">
          Package <code>http</code> adalah official Dart package untuk HTTP requests. Simple dan powerful!
        </Note>
      </Section>

      <Section id="get-request" heading="GET Request">
        <Subsection id="basic-get" heading="Basic GET Request">
          <CodeBlock language="dart">
{`import 'package:http/http.dart' as http;
import 'dart:convert';

Future<void> fetchData() async {
  final url = Uri.parse('https://jsonplaceholder.typicode.com/posts/1');
  
  try {
    final response = await http.get(url);
    
    if (response.statusCode == 200) {
      // Success
      final data = json.decode(response.body);
      print('Title: \${data['title']}');
    } else {
      // Error
      print('Error: \${response.statusCode}');
    }
  } catch (e) {
    print('Exception: \$e');
  }
}`}
          </CodeBlock>
        </Subsection>

        <Subsection id="get-with-model" heading="GET with Model Class">
          <CodeBlock language="dart">
{`// Model class
class Post {
  final int id;
  final String title;
  final String body;
  
  Post({
    required this.id,
    required this.title,
    required this.body,
  });
  
  // Factory constructor dari JSON
  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      id: json['id'],
      title: json['title'],
      body: json['body'],
    );
  }
  
  // Convert to JSON
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'body': body,
    };
  }
}

// Fetch single post
Future<Post> fetchPost(int id) async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/posts/\$id'),
  );
  
  if (response.statusCode == 200) {
    return Post.fromJson(json.decode(response.body));
  } else {
    throw Exception('Failed to load post');
  }
}

// Fetch list of posts
Future<List<Post>> fetchPosts() async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/posts'),
  );
  
  if (response.statusCode == 200) {
    final List<dynamic> jsonList = json.decode(response.body);
    return jsonList.map((json) => Post.fromJson(json)).toList();
  } else {
    throw Exception('Failed to load posts');
  }
}`}
          </CodeBlock>
        </Subsection>
      </Section>

      <Section id="post-request" heading="POST Request">
        <CodeBlock language="dart">
{`// Create new post
Future<Post> createPost(String title, String body) async {
  final response = await http.post(
    Uri.parse('https://jsonplaceholder.typicode.com/posts'),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: json.encode({
      'title': title,
      'body': body,
      'userId': 1,
    }),
  );
  
  if (response.statusCode == 201) {
    return Post.fromJson(json.decode(response.body));
  } else {
    throw Exception('Failed to create post');
  }
}

// Usage
final newPost = await createPost('My Title', 'My Content');
print('Created post ID: \${newPost.id}');`}
        </CodeBlock>
      </Section>

      <Section id="put-delete" heading="PUT & DELETE Requests">
        <CodeBlock language="dart">
{`// Update post (PUT)
Future<Post> updatePost(int id, String title, String body) async {
  final response = await http.put(
    Uri.parse('https://jsonplaceholder.typicode.com/posts/\$id'),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: json.encode({
      'title': title,
      'body': body,
    }),
  );
  
  if (response.statusCode == 200) {
    return Post.fromJson(json.decode(response.body));
  } else {
    throw Exception('Failed to update post');
  }
}

// Delete post
Future<void> deletePost(int id) async {
  final response = await http.delete(
    Uri.parse('https://jsonplaceholder.typicode.com/posts/\$id'),
  );
  
  if (response.statusCode == 200) {
    print('Post deleted successfully');
  } else {
    throw Exception('Failed to delete post');
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="futurebuilder" heading="FutureBuilder Widget">
        <p>
          <code>FutureBuilder</code> automatically rebuilds UI based on Future state (loading, success, error).
        </p>

        <CodeBlock language="dart">
{`class PostListScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Posts')),
      body: FutureBuilder<List<Post>>(
        future: fetchPosts(),  // Async function
        builder: (context, snapshot) {
          // Loading state
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          }
          
          // Error state
          if (snapshot.hasError) {
            return Center(
              child: Text('Error: \${snapshot.error}'),
            );
          }
          
          // Success state
          if (snapshot.hasData) {
            final posts = snapshot.data!;
            return ListView.builder(
              itemCount: posts.length,
              itemBuilder: (context, index) {
                final post = posts[index];
                return ListTile(
                  title: Text(post.title),
                  subtitle: Text(post.body, maxLines: 2),
                );
              },
            );
          }
          
          // No data
          return Center(child: Text('No data'));
        },
      ),
    );
  }
}`}
        </CodeBlock>

        <Note type="tip">
          <strong>FutureBuilder best for:</strong> One-time data fetching (like initial load). Untuk real-time updates, use StreamBuilder.
        </Note>
      </Section>

      <Section id="error-handling" heading="Error Handling">
        <CodeBlock language="dart">
{`// Custom exception
class ApiException implements Exception {
  final String message;
  final int? statusCode;
  
  ApiException(this.message, [this.statusCode]);
  
  @override
  String toString() => 'ApiException: \$message (Status: \$statusCode)';
}

// API service dengan error handling
class ApiService {
  static const String baseUrl = 'https://api.example.com'\;
  
  Future<List<Post>> getPosts() async {
    try {
      final response = await http.get(
        Uri.parse('\$baseUrl/posts'),
        headers: {'Accept': 'application/json'},
      ).timeout(Duration(seconds: 10));  // Timeout after 10s
      
      if (response.statusCode == 200) {
        final List<dynamic> jsonList = json.decode(response.body);
        return jsonList.map((json) => Post.fromJson(json)).toList();
      } else if (response.statusCode == 404) {
        throw ApiException('Posts not found', 404);
      } else if (response.statusCode == 500) {
        throw ApiException('Server error', 500);
      } else {
        throw ApiException(
          'Failed to load posts',
          response.statusCode,
        );
      }
    } on TimeoutException {
      throw ApiException('Request timeout');
    } on SocketException {
      throw ApiException('No internet connection');
    } catch (e) {
      throw ApiException('Unexpected error: \$e');
    }
  }
}

// Usage with error handling
class PostsScreen extends StatefulWidget {
  @override
  State<PostsScreen> createState() => _PostsScreenState();
}

class _PostsScreenState extends State<PostsScreen> {
  final ApiService _apiService = ApiService();
  late Future<List<Post>> _postsFuture;
  
  @override
  void initState() {
    super.initState();
    _postsFuture = _apiService.getPosts();
  }
  
  void _retry() {
    setState(() {
      _postsFuture = _apiService.getPosts();
    });
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Posts')),
      body: FutureBuilder<List<Post>>(
        future: _postsFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          }
          
          if (snapshot.hasError) {
            final error = snapshot.error;
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(Icons.error_outline, size: 64, color: Colors.red),
                  SizedBox(height: 16),
                  Text(
                    error.toString(),
                    textAlign: TextAlign.center,
                  ),
                  SizedBox(height: 16),
                  ElevatedButton(
                    onPressed: _retry,
                    child: Text('Retry'),
                  ),
                ],
              ),
            );
          }
          
          if (snapshot.hasData) {
            final posts = snapshot.data!;
            if (posts.isEmpty) {
              return Center(child: Text('No posts found'));
            }
            return ListView.builder(
              itemCount: posts.length,
              itemBuilder: (context, index) {
                final post = posts[index];
                return ListTile(
                  title: Text(post.title),
                  subtitle: Text(post.body),
                );
              },
            );
          }
          
          return Center(child: Text('No data'));
        },
      ),
    );
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="authentication" heading="Authentication & Headers">
        <CodeBlock language="dart">
{`class AuthService {
  static const String baseUrl = 'https://api.example.com'\;
  String? _token;
  
  // Login
  Future<void> login(String email, String password) async {
    final response = await http.post(
      Uri.parse('\$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'email': email,
        'password': password,
      }),
    );
    
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      _token = data['token'];
    } else {
      throw Exception('Login failed');
    }
  }
  
  // Authenticated GET request
  Future<Map<String, dynamic>> getProfile() async {
    if (_token == null) throw Exception('Not authenticated');
    
    final response = await http.get(
      Uri.parse('\$baseUrl/user/profile'),
      headers: {
        'Authorization': 'Bearer \$_token',
        'Accept': 'application/json',
      },
    );
    
    if (response.statusCode == 200) {
      return json.decode(response.body);
    } else if (response.statusCode == 401) {
      throw Exception('Unauthorized - token expired');
    } else {
      throw Exception('Failed to load profile');
    }
  }
  
  // Authenticated POST request
  Future<void> updateProfile(Map<String, dynamic> data) async {
    if (_token == null) throw Exception('Not authenticated');
    
    final response = await http.put(
      Uri.parse('\$baseUrl/user/profile'),
      headers: {
        'Authorization': 'Bearer \$_token',
        'Content-Type': 'application/json',
      },
      body: json.encode(data),
    );
    
    if (response.statusCode != 200) {
      throw Exception('Failed to update profile');
    }
  }
}`}
        </CodeBlock>
      </Section>

      <Section id="practical-example" heading="Practical Example: Weather App">
        <CodeBlock language="dart">
{`// Weather model
class Weather {
  final String city;
  final double temperature;
  final String description;
  final String icon;
  
  Weather({
    required this.city,
    required this.temperature,
    required this.description,
    required this.icon,
  });
  
  factory Weather.fromJson(Map<String, dynamic> json) {
    return Weather(
      city: json['name'],
      temperature: json['main']['temp'].toDouble(),
      description: json['weather'][0]['description'],
      icon: json['weather'][0]['icon'],
    );
  }
}

// Weather service
class WeatherService {
  static const String apiKey = 'YOUR_API_KEY';
  static const String baseUrl = 'https://api.openweathermap.org/data/2.5'\;
  
  Future<Weather> getWeather(String city) async {
    final response = await http.get(
      Uri.parse('\$baseUrl/weather?q=\$city&appid=\$apiKey&units=metric'),
    );
    
    if (response.statusCode == 200) {
      return Weather.fromJson(json.decode(response.body));
    } else {
      throw Exception('Failed to load weather');
    }
  }
}

// Weather screen
class WeatherScreen extends StatefulWidget {
  @override
  State<WeatherScreen> createState() => _WeatherScreenState();
}

class _WeatherScreenState extends State<WeatherScreen> {
  final WeatherService _weatherService = WeatherService();
  final TextEditingController _controller = TextEditingController();
  Future<Weather>? _weatherFuture;
  
  void _searchWeather() {
    if (_controller.text.isNotEmpty) {
      setState(() {
        _weatherFuture = _weatherService.getWeather(_controller.text);
      });
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Weather App')),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(
                      labelText: 'City name',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ),
                SizedBox(width: 8),
                ElevatedButton(
                  onPressed: _searchWeather,
                  child: Text('Search'),
                ),
              ],
            ),
            SizedBox(height: 24),
            if (_weatherFuture != null)
              Expanded(
                child: FutureBuilder<Weather>(
                  future: _weatherFuture,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.waiting) {
                      return Center(child: CircularProgressIndicator());
                    }
                    
                    if (snapshot.hasError) {
                      return Center(
                        child: Text('Error: \${snapshot.error}'),
                      );
                    }
                    
                    if (snapshot.hasData) {
                      final weather = snapshot.data!;
                      return Card(
                        child: Padding(
                          padding: EdgeInsets.all(24),
                          child: Column(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text(
                                weather.city,
                                style: TextStyle(
                                  fontSize: 32,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(height: 16),
                              Text(
                                '\${weather.temperature}°C',
                                style: TextStyle(fontSize: 48),
                              ),
                              SizedBox(height: 8),
                              Text(
                                weather.description,
                                style: TextStyle(fontSize: 20),
                              ),
                            ],
                          ),
                        ),
                      );
                    }
                    
                    return Container();
                  },
                ),
              ),
          ],
        ),
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
      </Section>

      <Section id="best-practices" heading="Best Practices">
        <ul>
          <li> Always handle errors dengan try-catch</li>
          <li> Set timeout untuk prevent hanging requests</li>
          <li> Use model classes untuk type safety</li>
          <li> Implement retry mechanism untuk failed requests</li>
          <li> Show loading indicators during requests</li>
          <li> Cache data when appropriate</li>
          <li> Use environment variables untuk API keys</li>
          <li> Validate response status codes</li>
        </ul>
      </Section>

      <Section id="summary" heading="Rangkuman">
        <ul>
          <li> http package untuk HTTP requests</li>
          <li> GET, POST, PUT, DELETE methods</li>
          <li> json.decode() untuk parse JSON</li>
          <li> Model classes dengan fromJson() factory</li>
          <li> FutureBuilder untuk async UI updates</li>
          <li> Error handling dengan try-catch</li>
          <li> Headers untuk authentication</li>
          <li> Timeout untuk prevent hanging</li>
        </ul>
      </Section>
    </MateriLayout>
  );
}
