/**
 * NEW STRUCTURED FORMAT FOR LEARNING MATERIALS
 * Bootstrap-style documentation with clear separation of concerns
 */

export const materiExample = {
  id: 1,
  title: "Laravel Routing & URL Management",
  
  // Brief introduction shown at the top
  intro: "Routes are the entry point to your application, connecting URLs to your application logic. Laravel provides an expressive and powerful routing system.",
  
  // Main content divided into clear sections
  sections: [
    {
      id: "basic-routing",
      heading: "Basic Routing",
      level: 2, // h2 for main sections
      content: [
        "Laravel routes are defined in the `routes/` directory. The most basic routes accept a URI and a closure, providing a simple way to define routes and behavior.",
        "All Laravel routes are defined in your route files, which are automatically loaded by your application's service provider."
      ],
      code: {
        language: "php",
        example: `Route::get('/', function () {
    return view('welcome');
});

Route::post('/users', function () {
    return 'Create new user';
});`,
        caption: "Basic GET and POST routes"
      },
      note: {
        type: "info", // info, warning, tip, danger
        content: "Routes are registered in order they are defined. Make sure specific routes are defined before generic ones."
      }
    },
    
    {
      id: "route-parameters",
      heading: "Route Parameters",
      level: 2,
      content: [
        "Sometimes you need to capture segments of the URI within your route. For example, you may need to capture a user's ID from the URL.",
        "Route parameters are always encased within `{}` braces and should consist of alphabetic characters."
      ],
      subsections: [
        {
          id: "required-parameters",
          heading: "Required Parameters",
          level: 3, // h3 for subsections
          content: [
            "Required parameters are segments that must be present in the URL for the route to match."
          ],
          code: {
            language: "php",
            example: `Route::get('/user/{id}', function ($id) {
    return 'User ' . $id;
});

Route::get('/posts/{post}/comments/{comment}', function ($postId, $commentId) {
    return "Post $postId, Comment $commentId";
});`
          }
        },
        
        {
          id: "optional-parameters",
          heading: "Optional Parameters",
          level: 3,
          content: [
            "Occasionally you may need to specify a route parameter that may not always be present. Place a `?` mark after the parameter name and provide a default value."
          ],
          code: {
            language: "php",
            example: `Route::get('/user/{name?}', function ($name = null) {
    return $name ?? 'Guest';
});

Route::get('/user/{name?}', function ($name = 'John') {
    return $name;
});`
          },
          note: {
            type: "tip",
            content: "Always provide a default value when using optional parameters to avoid errors."
          }
        }
      ]
    },
    
    {
      id: "named-routes",
      heading: "Named Routes",
      level: 2,
      content: [
        "Named routes allow you to conveniently generate URLs or redirects for specific routes. You can specify a name for a route by chaining the `name` method.",
        "Route names should always be unique across your entire application."
      ],
      code: {
        language: "php",
        example: `Route::get('/user/profile', function () {
    // Profile logic
})->name('profile');

// Generating URLs
$url = route('profile');

// Generating Redirects
return redirect()->route('profile');

// With parameters
Route::get('/user/{id}/profile', function ($id) {
    //
})->name('profile');

$url = route('profile', ['id' => 1]);`
      },
      note: {
        type: "tip",
        content: "Use named routes instead of hardcoding URLs. This makes your code more maintainable when routes change."
      }
    },
    
    {
      id: "route-groups",
      heading: "Route Groups",
      level: 2,
      content: [
        "Route groups allow you to share route attributes, such as middleware or namespaces, across a large number of routes without needing to define those attributes on each individual route."
      ],
      subsections: [
        {
          id: "middleware-groups",
          heading: "Middleware",
          level: 3,
          content: [
            "To assign middleware to all routes within a group, use the `middleware` method before defining the group."
          ],
          code: {
            language: "php",
            example: `Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        // Uses auth middleware
    });
    
    Route::get('/account', function () {
        // Uses auth middleware
    });
});`
          }
        },
        
        {
          id: "prefix-groups",
          heading: "Route Prefixes",
          level: 3,
          content: [
            "The `prefix` method may be used to prefix each route in the group with a given URI."
          ],
          code: {
            language: "php",
            example: `Route::prefix('admin')->group(function () {
    Route::get('/users', function () {
        // Matches /admin/users
    });
    
    Route::get('/posts', function () {
        // Matches /admin/posts
    });
});`
          }
        }
      ]
    },
    
    {
      id: "route-model-binding",
      heading: "Route Model Binding",
      level: 2,
      content: [
        "Laravel route model binding provides a convenient way to automatically inject model instances directly into your routes.",
        "When injecting a model ID to a route or controller action, you will often query the database to retrieve the model. Laravel route model binding does this automatically."
      ],
      code: {
        language: "php",
        example: `use App\\Models\\User;

// Implicit Binding
Route::get('/users/{user}', function (User $user) {
    return $user->email;
});

// Explicit Binding
Route::get('/users/{user}', function (User $user) {
    return $user;
})->where('user', '[0-9]+');

// Custom Key
Route::get('/posts/{post:slug}', function (Post $post) {
    return $post;
});`
      },
      note: {
        type: "info",
        content: "By default, Laravel uses the `id` column to retrieve models. You can customize this by specifying a different column like `{user:uuid}`."
      }
    }
  ],
  
  // Related topics for cross-referencing
  related: [
    { id: 5, title: "Controllers" },
    { id: 14, title: "Middleware" },
    { id: 7, title: "Eloquent ORM" }
  ],
  
  // Key takeaways (optional, for sidebar or summary)
  keypoints: [
    {
      type: "concept",
      icon: "🎯",
      text: "Routes connect URLs to application logic",
      color: "blue"
    },
    {
      type: "feature",
      icon: "⚡",
      text: "Support parameters (required & optional)",
      color: "purple"
    },
    {
      type: "best-practice",
      icon: "✨",
      text: "Use named routes for maintainability",
      color: "green"
    },
    {
      type: "feature",
      icon: "🔗",
      text: "Route model binding auto-injects models",
      color: "purple"
    }
  ]
};

/**
 * FORMAT SPECIFICATION
 * 
 * Material Object:
 * - id: number
 * - title: string (main title, rendered as h1)
 * - intro: string (brief introduction paragraph)
 * - sections: Section[] (main content)
 * - related: RelatedTopic[] (optional)
 * - keypoints: Keypoint[] (optional)
 * 
 * Section Object:
 * - id: string (for anchor links)
 * - heading: string (section title)
 * - level: 2 | 3 (heading level: h2 for main, h3 for sub)
 * - content: string[] (array of paragraphs)
 * - code?: CodeBlock (optional code example)
 * - note?: Note (optional info/warning/tip)
 * - subsections?: Section[] (nested sections)
 * 
 * CodeBlock Object:
 * - language: string (php, javascript, bash, etc)
 * - example: string (the actual code)
 * - caption?: string (optional description)
 * 
 * Note Object:
 * - type: 'info' | 'warning' | 'tip' | 'danger'
 * - content: string
 * 
 * Benefits of This Format:
 * ✅ No parsing needed - structure maps directly to UI
 * ✅ Clear separation: headings, text, code, notes
 * ✅ Easy to add features (tables, images, videos)
 * ✅ Maintainable and scalable
 * ✅ Type-safe with TypeScript
 * ✅ Bootstrap-style documentation structure
 */
