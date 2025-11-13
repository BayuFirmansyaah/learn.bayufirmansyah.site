// Materi Laravel - 20 Materi Lengkap Best Practice

export const materiList = [
  {
    id: 1,
    title: "Pengenalan Laravel",
    intro: "Laravel adalah framework PHP modern yang paling populer di dunia untuk membangun aplikasi web. Diciptakan oleh Taylor Otwell pada tahun 2011, Laravel terus berkembang dengan elegant syntax dan fitur-fitur powerful yang mempercepat development.",
    sections: [
      {
        id: "what-is-laravel",
        heading: "Apa itu Laravel?",
        level: 2,
        content: [
          "Laravel adalah framework open-source yang menggunakan pola arsitektur MVC (Model-View-Controller). Arsitektur ini memisahkan logika bisnis (Model), presentasi tampilan (View), dan pengatur alur aplikasi (Controller), membuat kode lebih terorganisir dan mudah di-maintain.",
          "Framework ini menyediakan struktur aplikasi yang jelas dan konsisten, memungkinkan developer fokus pada logika bisnis tanpa harus mengkhawatirkan setup dasar."
        ]
      },
      {
        id: "why-laravel",
        heading: "Mengapa Memilih Laravel?",
        level: 2,
        content: [
          "Laravel terkenal dengan \"elegant syntax\" - kode yang mudah dibaca dan ditulis. Framework ini menyediakan berbagai fitur built-in seperti routing, authentication, caching, session management, queue system, dan masih banyak lagi.",
          "Anda tidak perlu \"reinvent the wheel\" untuk fitur-fitur umum. Laravel sudah menyediakan solusi yang tested dan production-ready."
        ],
        note: {
          type: "tip",
          content: "Laravel mengikuti prinsip \"Convention over Configuration\" - menggunakan konvensi penamaan yang konsisten untuk mengurangi konfigurasi manual."
        }
      },
      {
        id: "ecosystem",
        heading: "Ecosystem Laravel",
        level: 2,
        content: [
          "Laravel memiliki ecosystem yang sangat kuat dengan berbagai tools dan services yang memudahkan development dan deployment:"
        ],
        subsections: [
          {
            id: "ecosystem-tools",
            heading: "Official Tools",
            level: 3,
            content: [
              "• Laravel Forge - Platform deployment dan server management otomatis",
              "• Laravel Vapor - Serverless deployment di AWS Lambda dengan auto-scaling",
              "• Laravel Nova - Admin panel yang elegant dan customizable",
              "• Laravel Envoyer - Zero-downtime deployment untuk aplikasi production",
              "• Laravel Horizon - Dashboard untuk monitoring Redis queues",
              "• Laravel Telescope - Debugging assistant dengan beautiful UI"
            ]
          }
        ]
      },
      {
        id: "mvc-architecture",
        heading: "Arsitektur MVC",
        level: 2,
        content: [
          "Laravel menggunakan pola arsitektur MVC yang memisahkan aplikasi menjadi tiga komponen utama:"
        ],
        code: {
          language: "text",
          example: `┌─────────────────────────────────────────────┐
│           Laravel MVC Flow                  │
├─────────────────────────────────────────────┤
│                                             │
│  Request → Router → Controller → Model      │
│                          ↓          ↓       │
│                       View ← ── Database    │
│                          ↓                  │
│                      Response               │
│                                             │
└─────────────────────────────────────────────┘

Components:
├── Model (app/Models/)
│   └── Handles data & business logic
├── View (resources/views/)
│   └── Handles presentation layer (HTML/Blade)
└── Controller (app/Http/Controllers/)
    └── Handles request logic & coordinates Model-View`,
          caption: "Alur kerja arsitektur MVC di Laravel"
        },
        note: {
          type: "info",
          content: "Pemisahan concerns ini membuat aplikasi lebih maintainable, testable, dan scalable. Setiap komponen memiliki tanggung jawab yang jelas."
        }
      },
      {
        id: "documentation",
        heading: "Dokumentasi & Komunitas",
        level: 2,
        content: [
          "Laravel memiliki dokumentasi resmi yang sangat lengkap dan mudah dipahami di laravel.com/docs. Setiap fitur dijelaskan dengan detail dan disertai contoh kode yang praktis.",
          "Komunitas Laravel sangat aktif dengan ribuan packages tersedia di Packagist. Anda bisa menemukan solusi untuk hampir semua kebutuhan - dari payment gateway, image processing, hingga API integrations."
        ]
      },
      {
        id: "performance",
        heading: "Performa & Scalability",
        level: 2,
        content: [
          "Meskipun Laravel menyediakan banyak fitur, performa tetap optimal dengan sistem caching yang baik. Laravel mendukung berbagai cache drivers seperti Redis, Memcached, dan file-based caching.",
          "Aplikasi Laravel dapat di-scale dengan mudah menggunakan load balancers, Redis untuk session storage, dan horizontal scaling. Banyak perusahaan besar menggunakan Laravel untuk handle jutaan requests per hari."
        ],
        note: {
          type: "tip",
          content: "Gunakan Laravel Octane untuk boost performa hingga 4x lipat dengan PHP servers seperti Swoole atau RoadRunner."
        }
      }
    ],
    keypoints: [
      {
        type: "concept",
        icon: "📌",
        text: "MVC Framework - Model (data), View (tampilan), Controller (logika)",
        color: "blue"
      },
      {
        type: "feature",
        icon: "✨",
        text: "Built-in Features: Routing, Auth, Caching, Queue, Email, Storage",
        color: "purple"
      },
      {
        type: "ecosystem",
        icon: "🛠️",
        text: "Ecosystem Kuat: Forge, Vapor, Nova, Horizon, Telescope",
        color: "blue"
      },
      {
        type: "tip",
        icon: "💡",
        text: "Convention over Configuration - Less code, more productivity",
        color: "green"
      }
    ]
  },
  {
    id: 2,
    title: "Instalasi & Persiapan Lingkungan",
    intro: "Sebelum memulai development dengan Laravel, kita perlu menyiapkan lingkungan yang tepat. Tutorial ini akan memandu Anda step-by-step untuk setup Laravel di komputer lokal.",
    sections: [
      {
        id: "system-requirements",
        heading: "System Requirements",
        level: 2,
        content: [
          "Laravel 11 membutuhkan spesifikasi minimum berikut untuk berjalan dengan optimal:"
        ],
        code: {
          language: "text",
          example: `System Requirements Laravel 11:
• PHP 8.2 atau lebih tinggi
• Composer (PHP dependency manager)
• Database: MySQL 5.7+, PostgreSQL 10+, atau SQLite 3.8+
• Node.js & NPM (untuk compile assets frontend)
• Git (untuk version control)`,
          caption: "Minimum requirements untuk Laravel 11"
        },
        note: {
          type: "info",
          content: "Pastikan PHP extensions yang required sudah aktif: OpenSSL, PDO, Mbstring, Tokenizer, XML, Ctype, JSON, BCMath"
        }
      },
      {
        id: "install-composer",
        heading: "Instalasi Composer",
        level: 2,
        content: [
          "Composer adalah dependency manager untuk PHP, seperti NPM untuk Node.js. Composer digunakan untuk mengelola package dan dependencies Laravel."
        ],
        subsections: [
          {
            id: "composer-download",
            heading: "Download & Install",
            level: 3,
            content: [
              "Download Composer dari getcomposer.org sesuai dengan sistem operasi Anda:"
            ],
            code: {
              language: "bash",
              example: `# Windows
# Download installer dari getcomposer.org dan jalankan wizard

# macOS (menggunakan Homebrew)
brew install composer

# Linux
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer

# Verifikasi instalasi
composer --version`
            }
          }
        ]
      },
      {
        id: "create-project",
        heading: "Membuat Project Laravel Baru",
        level: 2,
        content: [
          "Ada dua cara utama untuk membuat project Laravel baru. Keduanya akan menghasilkan struktur project yang sama."
        ],
        subsections: [
          {
            id: "composer-create",
            heading: "Menggunakan Composer (Recommended)",
            level: 3,
            content: [
              "Cara ini lebih reliable dan bisa memilih versi Laravel yang spesifik."
            ],
            code: {
              language: "bash",
              example: `# Buat project baru dengan nama my-app
composer create-project laravel/laravel my-app

# Masuk ke folder project
cd my-app

# Install specific version
composer create-project laravel/laravel my-app "11.*"`
            }
          },
          {
            id: "laravel-installer",
            heading: "Menggunakan Laravel Installer",
            level: 3,
            content: [
              "Laravel Installer adalah tool CLI yang memudahkan pembuatan project baru."
            ],
            code: {
              language: "bash",
              example: `# Install Laravel Installer globally
composer global require laravel/installer

# Buat project baru
laravel new my-app

# Dengan opsi tambahan
laravel new my-app --git --jet`
            }
          }
        ],
        note: {
          type: "tip",
          content: "Gunakan Composer create-project untuk hasil yang lebih konsisten, terutama di CI/CD environment."
        }
      },
      {
        id: "environment-config",
        heading: "Konfigurasi Environment (.env)",
        level: 2,
        content: [
          "File .env berisi konfigurasi environment-specific seperti database credentials, API keys, dan app settings.",
          "File ini tidak boleh di-commit ke Git karena berisi informasi sensitif."
        ],
        code: {
          language: "bash",
          example: `# Copy file .env.example menjadi .env
cp .env.example .env

# Generate application key (wajib!)
php artisan key:generate

# Edit konfigurasi database di file .env
# DB_CONNECTION=mysql
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=my_database
# DB_USERNAME=root
# DB_PASSWORD=your_password`
        },
        note: {
          type: "warning",
          content: "JANGAN PERNAH commit file .env ke Git! File ini sudah ada di .gitignore. Gunakan .env.example sebagai template untuk team member."
        }
      },
      {
        id: "dev-server",
        heading: "Menjalankan Development Server",
        level: 2,
        content: [
          "Laravel menyediakan built-in development server menggunakan PHP's built-in server."
        ],
        code: {
          language: "bash",
          example: `# Jalankan dev server di port default (8000)
php artisan serve

# Output: Laravel development server started: http://127.0.0.1:8000

# Custom port
php artisan serve --port=8080

# Custom host & port
php artisan serve --host=0.0.0.0 --port=9000`
        },
        note: {
          type: "info",
          content: "Untuk production, gunakan web server seperti Nginx atau Apache. PHP's built-in server hanya untuk development."
        }
      },
      {
        id: "laravel-sail",
        heading: "Laravel Sail (Docker Alternative)",
        level: 2,
        content: [
          "Laravel Sail adalah light-weight command-line interface untuk berinteraksi dengan Docker environment Laravel.",
          "Sail menyediakan PHP, MySQL, Redis, Mailhog, dan services lainnya dalam Docker containers."
        ],
        code: {
          language: "bash",
          example: `# Install Laravel dengan Sail
curl -s "https://laravel.build/my-app" | bash

# Masuk ke folder project
cd my-app

# Start all Docker containers
./vendor/bin/sail up

# Start in background mode
./vendor/bin/sail up -d

# Stop containers
./vendor/bin/sail down

# Jalankan Artisan commands via Sail
./vendor/bin/sail artisan migrate

# Akses MySQL CLI
./vendor/bin/sail mysql`
        },
        note: {
          type: "tip",
          content: "Sail perfect untuk team development karena semua developer menggunakan environment yang sama. Buat alias untuk memudahkan: alias sail='./vendor/bin/sail'"
        }
      },
      {
        id: "troubleshooting",
        heading: "Common Issues & Solutions",
        level: 2,
        content: [
          "Berikut adalah masalah umum yang sering terjadi saat instalasi dan solusinya:"
        ],
        code: {
          language: "text",
          example: `❌ Issue: "composer: command not found"
 Solution: Pastikan Composer ada di PATH environment variable
   - Windows: Restart terminal setelah install
   - Linux/Mac: echo 'export PATH="$PATH:$HOME/.composer/vendor/bin"' >> ~/.bashrc

❌ Issue: "php artisan serve" tidak jalan
 Solution: 
   1. Cek PHP installed: php --version
   2. Cek PHP path: which php
   3. Install PHP jika belum: sudo apt install php8.2-cli

❌ Issue: "Database connection error"
 Solution:
   1. Pastikan MySQL running: sudo service mysql status
   2. Test connection: mysql -u root -p
   3. Cek credentials di .env benar
   4. Pastikan database sudah dibuat: CREATE DATABASE my_database;

❌ Issue: "The stream or file could not be opened"
 Solution: Fix permission untuk storage dan cache
   chmod -R 775 storage bootstrap/cache
   chown -R www-data:www-data storage bootstrap/cache

❌ Issue: Port 8000 already in use
 Solution: Gunakan port lain
   php artisan serve --port=8001`
        }
      }
    ],
    keypoints: [
      {
        type: "requirement",
        icon: "📋",
        text: "Requirements: PHP 8.2+, Composer, Database, Node.js, Git",
        color: "blue"
      },
      {
        type: "command",
        icon: "⚡",
        text: "composer create-project laravel/laravel my-app",
        color: "purple"
      },
      {
        type: "config",
        icon: "⚙️",
        text: "Setup .env: database, mail, app key (php artisan key:generate)",
        color: "blue"
      },
      {
        type: "tip",
        icon: "💡",
        text: "Laravel Sail untuk Docker environment yang konsisten",
        color: "green"
      }
    ]
  },
  {
    title: "Struktur Folder Laravel",
    content: `Memahami struktur folder Laravel sangat penting untuk navigasi project yang efisien. Laravel menggunakan struktur yang terorganisir dengan baik, dimana setiap folder memiliki tujuan spesifik.

📂 Struktur Folder Utama

my-laravel-app/
├── app/                    # Core application code
│   ├── Http/
│   │   ├── Controllers/    # Handle HTTP requests
│   │   ├── Middleware/     # Filter HTTP requests
│   │   └── Requests/       # Form validation classes
│   ├── Models/             # Eloquent models
│   ├── Providers/          # Service providers
│   └── Console/            # Artisan commands
├── bootstrap/              # Framework bootstrap
├── config/                 # Configuration files
├── database/
│   ├── migrations/         # Database schema versions
│   ├── seeders/            # Test data generators
│   └── factories/          # Model factories
├── public/                 # Web server document root
│   ├── index.php           # Entry point
│   ├── css/                # Compiled CSS
│   └── js/                 # Compiled JavaScript
├── resources/
│   ├── views/              # Blade templates
│   ├── css/                # Source CSS
│   └── js/                 # Source JavaScript
├── routes/
│   ├── web.php             # Web routes
│   ├── api.php             # API routes
│   └── console.php         # Console commands
├── storage/
│   ├── app/                # Application files
│   ├── framework/          # Framework cache
│   └── logs/               # Application logs
├── tests/                  # Unit & feature tests
├── vendor/                 # Composer dependencies
├── .env                    # Environment configuration
├── artisan                 # Artisan CLI tool
└── composer.json           # PHP dependencies

🎯 Folder-folder Penting yang Sering Digunakan

1. app/Http/Controllers - Tempat logic handle requests
2. app/Models - Class yang represent database tables
3. resources/views - File Blade template untuk UI
4. routes/web.php - Definisi URL untuk web interface
5. routes/api.php - Definisi endpoint untuk REST API
6. database/migrations - Version control untuk database schema
7. public/ - Folder yang accessible dari web browser
8. storage/ - Temporary files, logs, uploaded files
9. config/ - File konfigurasi untuk berbagai services

💡 Best Practices

• Jangan edit file di folder vendor/ - akan ter-overwrite saat composer update
• File .env tidak boleh di-commit ke Git
• Upload file user ke storage/app/public dan buat symlink: php artisan storage:link
• Log files di storage/logs/ perlu di-monitor dan di-rotate
• Public folder adalah satu-satunya yang accessible dari browser

⚙️ Konfigurasi Folder Permissions

Folder storage/ dan bootstrap/cache/ harus writable:

chmod -R 775 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

🔗 Storage Link untuk Public Access

Buat symbolic link dari public/storage ke storage/app/public:

php artisan storage:link

Sekarang file di storage/app/public dapat diakses via URL: http://your-app.com/storage/file.jpg

📁 Custom Folder Structure

Anda bisa menambah folder custom di app/ untuk organize code:

app/
├── Services/           # Business logic services
├── Repositories/       # Data access layer
├── Helpers/            # Helper functions
└── Traits/             # Reusable traits`,
    keypoints: [
      {
        type: "concept",
        icon: "📂",
        text: "app/ - Core code, Models, Controllers, Middleware",
        color: "blue"
      },
      {
        type: "concept",
        icon: "🗂️",
        text: "routes/ - URL definitions (web.php, api.php)",
        color: "blue"
      },
      {
        type: "concept",
        icon: "🎨",
        text: "resources/views/ - Blade templates untuk UI",
        color: "blue"
      },
      {
        type: "concept",
        icon: "🗄️",
        text: "database/ - Migrations, Seeders, Factories",
        color: "blue"
      },
      {
        type: "command",
        icon: "🔗",
        text: "Storage Link: php artisan storage:link untuk public access",
        color: "purple"
      },
      {
        type: "warning",
        icon: "⚠️",
        text: "Jangan edit vendor/ dan pastikan storage/ writable (chmod 775)",
        color: "yellow"
      }
    ]
  },
  {
    title: "Routing & URL Management",
    content: `Routing adalah sistem yang menentukan bagaimana aplikasi Laravel merespons HTTP request ke URL tertentu. Routes menghubungkan URL dengan logic aplikasi, baik itu Closure function atau Controller methods.

📂 Lokasi File Routes

Laravel memiliki beberapa file routes dengan purpose berbeda:

routes/
├── web.php       # Web interface routes (with session, CSRF)
├── api.php       # API routes (stateless, token-based)
├── console.php   # Artisan commands
└── channels.php  # Broadcasting channels

🎯 Basic Routing

Contoh routing sederhana di routes/web.php:

use Illuminate\\Support\\Facades\\Route;

// GET request
Route::get('/', function () {
    return view('welcome');
});

// POST request
Route::post('/submit', function () {
    return 'Data submitted';
});

// Multiple methods
Route::match(['get', 'post'], '/form', function () {
    return 'GET or POST';
});

// All methods
Route::any('/all', function () {
    return 'Any HTTP method';
});

🔗 Route dengan Controller

Hubungkan route ke Controller method:

use App\\Http\\Controllers\\ProductController;

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/products', [ProductController::class, 'store']);
Route::put('/products/{id}', [ProductController::class, 'update']);
Route::delete('/products/{id}', [ProductController::class, 'destroy']);

📦 Resource Routes

Laravel menyediakan shortcut untuk CRUD operations:

Route::resource('products', ProductController::class);

Ini otomatis membuat 7 routes:
• GET /products → index()
• GET /products/create → create()
• POST /products → store()
• GET /products/{id} → show()
• GET /products/{id}/edit → edit()
• PUT/PATCH /products/{id} → update()
• DELETE /products/{id} → destroy()

Lihat semua routes: php artisan route:list

🎨 Route Parameters

Tangkap nilai dari URL:

// Required parameter
Route::get('/user/{id}', function ($id) {
    return "User ID: " . $id;
});

// Optional parameter
Route::get('/post/{id?}', function ($id = null) {
    return $id ? "Post $id" : "All posts";
});

// Regular expression constraint
Route::get('/user/{id}', function ($id) {
    return "User ID: " . $id;
})->where('id', '[0-9]+');

// Multiple constraints
Route::get('/user/{name}/{age}', function ($name, $age) {
    return "$name is $age years old";
})->where(['name' => '[a-zA-Z]+', 'age' => '[0-9]+']);

🏷️ Named Routes

Beri nama routes untuk generate URL mudah:

Route::get('/profile', [ProfileController::class, 'show'])
    ->name('profile.show');

Generate URL from named route:

// Di Blade template
<a href="{{ route('profile.show') }}">Profile</a>

// Di Controller
return redirect()->route('profile.show');

// With parameters
route('product.show', ['id' => 5]) // /product/5

📁 Route Groups

Group routes untuk apply middleware, prefix, atau namespace:

// Prefix group
Route::prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        // URL: /admin/dashboard
    });
    Route::get('/users', function () {
        // URL: /admin/users
    });
});

// Middleware group
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/settings', [SettingsController::class, 'index']);
});

// Combined prefix, middleware, and name
Route::prefix('admin')
    ->middleware('auth')
    ->name('admin.')
    ->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard'])
            ->name('dashboard'); // Route name: admin.dashboard
    });

🔄 Route Model Binding

Otomatis inject model ke route:

// Automatic model binding
Route::get('/product/{product}', function (App\\Models\\Product $product) {
    return $product; // Laravel auto query by ID
});

// Custom key binding
Route::get('/product/{product:slug}', function (App\\Models\\Product $product) {
    return $product; // Query by slug instead of ID
});

⚠️ Common Pitfalls

1. Route order matters - Laravel matches first found route
2. Jangan lupa CSRF token untuk POST/PUT/DELETE di web routes
3. API routes otomatis prefix /api dan stateless
4. Named routes wajib unique di seluruh aplikasi`,
    keypoints: [
      {
        type: "concept",
        icon: "📌",
        text: "Routes menghubungkan URL ke Controller/Closure",
        color: "blue"
      },
      {
        type: "file",
        icon: "📂",
        text: "web.php (session) vs api.php (stateless/token)",
        color: "blue"
      },
      {
        type: "feature",
        icon: "✨",
        text: "Resource Routes: Route::resource() untuk CRUD otomatis",
        color: "purple"
      },
      {
        type: "tip",
        icon: "💡",
        text: "Named Routes: ->name() untuk generate URL mudah",
        color: "green"
      },
      {
        type: "best-practice",
        icon: "",
        text: "Route Groups: prefix, middleware, namespace untuk organize",
        color: "green"
      },
      {
        type: "feature",
        icon: "🔗",
        text: "Model Binding: Auto-inject model dari URL parameter",
        color: "purple"
      },
      {
        type: "command",
        icon: "⚡",
        text: "php artisan route:list - Lihat semua registered routes",
        color: "purple"
      }
    ]
  },
  {
    title: "Controllers",
    content: `Controllers adalah class yang mengorganisir request handling logic ke dalam satu lokasi. Daripada mendefinisikan logic di route files, Controllers membuat code lebih terstruktur dan reusable.

📦 Membuat Controller

Gunakan Artisan command untuk generate Controller:

php artisan make:controller ProductController

File dibuat di app/Http/Controllers/ProductController.php:

<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class ProductController extends Controller
{
    // Controller methods di sini
}

🎯 Basic Controller Methods

Contoh controller dengan beberapa methods:

<?php

namespace App\\Http\\Controllers;

use App\\Models\\Product;
use Illuminate\\Http\\Request;
use Illuminate\\View\\View;
use Illuminate\\Http\\RedirectResponse;

class ProductController extends Controller
{
    /**
     * Display listing of products
     */
    public function index(): View
    {
        $products = Product::latest()->paginate(10);
        
        return view('products.index', [
            'products' => $products
        ]);
    }

    /**
     * Show single product detail
     */
    public function show(string $id): View
    {
        $product = Product::findOrFail($id);
        
        return view('products.show', [
            'product' => $product
        ]);
    }

    /**
     * Store new product
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0'
        ]);

        $product = Product::create($validated);

        return redirect()
            ->route('products.show', $product)
            ->with('success', 'Product created successfully');
    }

    /**
     * Update existing product
     */
    public function update(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0'
        ]);

        $product->update($validated);

        return redirect()
            ->route('products.show', $product)
            ->with('success', 'Product updated successfully');
    }

    /**
     * Delete product
     */
    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()
            ->route('products.index')
            ->with('success', 'Product deleted successfully');
    }
}

Daftarkan di routes/web.php:

use App\\Http\\Controllers\\ProductController;

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
Route::post('/products', [ProductController::class, 'store'])->name('products.store');
Route::put('/products/{product}', [ProductController::class, 'update'])->name('products.update');
Route::delete('/products/{product}', [ProductController::class, 'destroy'])->name('products.destroy');

🚀 Resource Controllers

Resource controller menyediakan methods untuk CRUD operations:

php artisan make:controller ProductController --resource

Ini generate controller dengan 7 methods:
• index() - List all resources
• create() - Show form to create new resource
• store() - Save new resource
• show() - Display single resource
• edit() - Show form to edit resource
• update() - Update resource
• destroy() - Delete resource

Register semua routes sekaligus:

Route::resource('products', ProductController::class);

Cek dengan: php artisan route:list

🎯 API Resource Controllers

Untuk API tanpa create() dan edit() forms:

php artisan make:controller API/ProductController --api

Return JSON responses:

<?php

namespace App\\Http\\Controllers\\API;

use App\\Http\\Controllers\\Controller;
use App\\Models\\Product;
use Illuminate\\Http\\JsonResponse;
use Illuminate\\Http\\Request;

class ProductController extends Controller
{
    public function index(): JsonResponse
    {
        $products = Product::all();
        
        return response()->json([
            'success' => true,
            'data' => $products
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'price' => 'required|numeric'
        ]);

        $product = Product::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Product created',
            'data' => $product
        ], 201);
    }
}

⚡ Single Action Controllers

Controller dengan satu method __invoke():

php artisan make:controller ShowDashboardController --invokable

<?php

namespace App\\Http\\Controllers;

use Illuminate\\View\\View;

class ShowDashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(): View
    {
        $stats = [
            'users' => 1250,
            'products' => 450,
            'orders' => 890
        ];

        return view('dashboard', compact('stats'));
    }
}

Register route:

Route::get('/dashboard', ShowDashboardController::class);

💉 Dependency Injection

Laravel otomatis resolve dependencies di constructor atau methods:

<?php

namespace App\\Http\\Controllers;

use App\\Services\\PaymentService;
use Illuminate\\Http\\Request;

class OrderController extends Controller
{
    // Constructor injection
    public function __construct(
        protected PaymentService $paymentService
    ) {}

    // Method injection
    public function process(Request $request, PaymentService $payment)
    {
        // Laravel auto-resolve both Request and PaymentService
        $result = $this->paymentService->charge(
            $request->input('amount')
        );

        return response()->json($result);
    }
}

⚠️ Best Practices

1. Keep controllers thin - Move complex logic ke Services/Actions
2. Use Form Requests untuk validation yang kompleks
3. Type-hint parameters untuk better IDE support
4. Return consistent response types
5. Gunakan Route Model Binding untuk clean code
6. One controller = One model (generally)`,
    keypoints: [
      {
        type: "concept",
        icon: "📌",
        text: "Controllers mengorganisir request handling logic",
        color: "blue"
      },
      {
        type: "command",
        icon: "⚡",
        text: "php artisan make:controller ProductController [--resource|--api]",
        color: "purple"
      },
      {
        type: "feature",
        icon: "🚀",
        text: "Resource Controllers: 7 CRUD methods (index, create, store, show, edit, update, destroy)",
        color: "purple"
      },
      {
        type: "feature",
        icon: "🎯",
        text: "API Controllers: Resource tanpa create/edit forms",
        color: "purple"
      },
      {
        type: "feature",
        icon: "⚡",
        text: "Single Action: __invoke() untuk single-purpose controller",
        color: "purple"
      },
      {
        type: "tip",
        icon: "💡",
        text: "Dependency Injection: Auto-resolve di constructor/methods",
        color: "green"
      },
      {
        type: "best-practice",
        icon: "",
        text: "Keep Controllers Thin - Logic ke Services, validation ke Form Requests",
        color: "green"
      }
    ]
  },
  {
    title: "View & Blade Template",
    content: `View adalah file yang berisi HTML untuk ditampilkan kepada user. Laravel menggunakan Blade sebagai templating engine yang powerful dan mudah digunakan.

File view disimpan di resources/views/ dengan ekstensi .blade.php. Untuk menampilkan view dari Controller: return view('welcome'). File welcome.blade.php akan di-render.

Blade syntax menggunakan double curly braces untuk echo data: {{ $name }}. Data otomatis di-escape untuk keamanan. Untuk raw HTML: {!! $html !!}.

Control structures di Blade: @if($condition) ... @endif, @foreach($items as $item) ... @endforeach, @while($condition) ... @endwhile. Syntax lebih clean dibanding PHP native.

Template inheritance dengan @extends dan @section: File layout dengan @yield('content'), kemudian child view menggunakan @extends('layouts.app') dan @section('content') ... @endsection.

Blade components memungkinkan reusable UI: php artisan make:component Alert. Gunakan dengan <x-alert type="success" />. Components sangat berguna untuk konsistensi UI.`,
    keypoints: [
      "View disimpan di resources/views/",
      "Blade template engine: .blade.php",
      "Echo data: {{ $name }}, raw: {!! $html !!}",
      "Control structures: @if, @foreach, @while",
      "Template inheritance: @extends, @section, @yield",
      "Blade components untuk reusable UI"
    ]
  },
  {
    title: "Migration & Schema Builder",
    content: `Migration adalah version control untuk database schema. Setiap migration adalah snapshot dari perubahan struktur database yang dapat di-execute atau di-rollback kapan saja. Ini sangat penting untuk kolaborasi team dan deployment.

📦 Membuat Migration

Generate migration file dengan Artisan:

php artisan make:migration create_products_table

File dibuat di database/migrations/ dengan timestamp prefix:

2024_01_20_100000_create_products_table.php

Generate migration untuk table existing:

php artisan make:migration add_category_to_products_table

📝 Struktur Migration File

Migration memiliki dua methods utama:

<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->decimal('price', 10, 2);
            $table->integer('stock')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

🎯 Column Types Lengkap

Laravel menyediakan banyak column types:

Schema::create('users', function (Blueprint $table) {
    // Primary Keys
    $table->id();                              // BIGINT AUTO_INCREMENT
    $table->uuid('id')->primary();             // UUID primary key
    
    // Strings
    $table->string('name', 100);               // VARCHAR(100)
    $table->text('bio');                       // TEXT
    $table->longText('content');               // LONGTEXT
    $table->char('code', 4);                   // CHAR(4)
    
    // Numbers
    $table->integer('views');                  // INT
    $table->bigInteger('user_id');             // BIGINT
    $table->tinyInteger('status');             // TINYINT
    $table->decimal('price', 10, 2);           // DECIMAL(10,2)
    $table->float('rating', 8, 2);             // FLOAT
    $table->double('amount');                  // DOUBLE
    
    // Dates & Times
    $table->date('birth_date');                // DATE
    $table->time('check_in');                  // TIME
    $table->datetime('published_at');          // DATETIME
    $table->timestamp('verified_at')->nullable();  // TIMESTAMP
    $table->timestamps();                      // created_at & updated_at
    $table->softDeletes();                     // deleted_at for soft delete
    
    // Boolean
    $table->boolean('is_admin')->default(false);
    
    // JSON
    $table->json('metadata');                  // JSON column
    
    // Enum
    $table->enum('status', ['pending', 'approved', 'rejected']);
});

🔗 Foreign Keys & Relationships

Definisikan foreign key constraints:

Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    // Sama dengan:
    // $table->unsignedBigInteger('user_id');
    // $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
    
    $table->foreignId('category_id')
        ->nullable()
        ->constrained()
        ->nullOnDelete();  // Set NULL saat parent dihapus
    
    $table->string('title');
    $table->text('body');
    $table->timestamps();
});

⚙️ Modifying Columns

Update existing columns (require doctrine/dbal):

composer require doctrine/dbal

Migration untuk modify column:

Schema::table('products', function (Blueprint $table) {
    // Change column type
    $table->string('name', 200)->change();
    
    // Make nullable
    $table->decimal('price', 10, 2)->nullable()->change();
    
    // Rename column
    $table->renameColumn('old_name', 'new_name');
    
    // Drop column
    $table->dropColumn('description');
    
    // Drop multiple columns
    $table->dropColumn(['col1', 'col2']);
});

🏃 Menjalankan Migration

Execute migrations:

php artisan migrate

Rollback last batch:

php artisan migrate:rollback

Rollback specific steps:

php artisan migrate:rollback --step=2

Reset all migrations:

php artisan migrate:reset

Fresh start (drop all tables + migrate):

php artisan migrate:fresh

Fresh + seed data:

php artisan migrate:fresh --seed

Check migration status:

php artisan migrate:status

🎯 Complete Real-World Example

Migration untuk e-commerce system:

<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->string('slug', 100)->unique();
            $table->text('description')->nullable();
            $table->string('icon', 50)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index('slug');
            $table->index('is_active');
        });

        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->string('sku', 50)->unique();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->decimal('price', 12, 2);
            $table->decimal('discount_price', 12, 2)->nullable();
            $table->integer('stock')->default(0);
            $table->enum('status', ['draft', 'published', 'archived'])->default('draft');
            $table->json('images')->nullable();
            $table->json('specifications')->nullable();
            $table->integer('views')->default(0);
            $table->decimal('rating', 3, 2)->default(0);
            $table->timestamps();
            $table->softDeletes();
            
            $table->index('category_id');
            $table->index('slug');
            $table->index('status');
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
        Schema::dropIfExists('categories');
    }
};

⚠️ Best Practices

1. Always define down() method untuk rollback
2. Use foreignId()->constrained() untuk clean FK syntax
3. Add indexes untuk columns yang sering di-query
4. Use softDeletes() instead of permanent delete
5. Migration names harus descriptive
6. Test migration up/down sebelum commit`,
    keypoints: [
      {
        type: "concept",
        icon: "📌",
        text: "Version Control untuk database schema - Track semua perubahan struktur",
        color: "blue"
      },
      {
        type: "command",
        icon: "⚡",
        text: "php artisan make:migration create_table_name",
        color: "purple"
      },
      {
        type: "feature",
        icon: "🎯",
        text: "Schema Builder: id(), string(), decimal(), timestamps(), foreignId()",
        color: "purple"
      },
      {
        type: "feature",
        icon: "🔗",
        text: "Foreign Keys: ->constrained()->onDelete('cascade')",
        color: "purple"
      },
      {
        type: "command",
        icon: "🚀",
        text: "migrate, rollback, fresh, fresh --seed, status",
        color: "purple"
      },
      {
        type: "tip",
        icon: "💡",
        text: "Add indexes untuk columns yang sering di-query (where, orderBy)",
        color: "green"
      },
      {
        type: "best-practice",
        icon: "",
        text: "Always define down() method, use softDeletes() untuk safe delete",
        color: "green"
      }
    ]
  },
  {
    title: "Model & Eloquent ORM",
    content: `Model adalah class yang merepresentasikan database table. Eloquent adalah Active Record ORM yang membuat database interaction menjadi intuitive dengan object-oriented approach.

📦 Membuat Model

Generate Model dengan Artisan:

php artisan make:model Product

Generate Model + Migration:

php artisan make:model Product -m

Generate Model + Migration + Controller + Factory + Seeder:

php artisan make:model Product -mcfs

📝 Basic Model Structure

Model dibuat di app/Models/Product.php:

<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The table associated with the model.
     * Default: plural lowercase (products)
     */
    protected $table = 'products';

    /**
     * The primary key.
     * Default: id
     */
    protected $primaryKey = 'id';

    /**
     * Indicates if IDs are auto-incrementing.
     */
    public $incrementing = true;

    /**
     * The data type of the primary key.
     */
    protected $keyType = 'int';

    /**
     * Indicates if the model should be timestamped.
     * Default: true (created_at, updated_at)
     */
    public $timestamps = true;

    /**
     * Mass assignable attributes.
     */
    protected $fillable = [
        'name',
        'slug',
        'description',
        'price',
        'discount_price',
        'stock',
        'category_id',
        'status'
    ];

    /**
     * Attributes that should be hidden for arrays/JSON.
     */
    protected $hidden = [
        'deleted_at'
    ];

    /**
     * Attributes that should be cast.
     */
    protected $casts = [
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'stock' => 'integer',
        'is_active' => 'boolean',
        'specifications' => 'array',  // JSON to array
        'images' => 'array',
        'published_at' => 'datetime'
    ];

    /**
     * Default values for attributes.
     */
    protected $attributes = [
        'status' => 'draft',
        'stock' => 0,
        'views' => 0
    ];
}

📊 Querying Data

Eloquent menyediakan query methods yang powerful:

// Get all records
$products = Product::all();

// Get with conditions
$products = Product::where('status', 'published')->get();

// Find by ID
$product = Product::find(1);
$product = Product::findOrFail(1);  // Throw 404 if not found

// First record
$product = Product::first();
$product = Product::where('stock', '>', 0)->first();

// Get or create
$product = Product::firstOrCreate(
    ['sku' => 'PROD-001'],
    ['name' => 'Product Name', 'price' => 100]
);

// Update or create
Product::updateOrCreate(
    ['sku' => 'PROD-001'],
    ['name' => 'Updated Name', 'price' => 150]
);

// Filtering
$products = Product::where('price', '>', 100)
    ->where('stock', '>', 0)
    ->orderBy('created_at', 'desc')
    ->limit(10)
    ->get();

// Or conditions
$products = Product::where('category_id', 1)
    ->orWhere('category_id', 2)
    ->get();

// Where In
$products = Product::whereIn('status', ['published', 'featured'])->get();

// Where Between
$products = Product::whereBetween('price', [100, 500])->get();

// Where Date
$products = Product::whereDate('created_at', '2024-01-20')->get();

// Pagination
$products = Product::paginate(15);
$products = Product::simplePaginate(15);

✏️ Creating Records

Create new records:

// Method 1: Instantiate & save
$product = new Product;
$product->name = 'Laptop Gaming';
$product->slug = 'laptop-gaming';
$product->price = 15000000;
$product->stock = 10;
$product->save();

// Method 2: Mass assignment
$product = Product::create([
    'name' => 'Laptop Gaming',
    'slug' => 'laptop-gaming',
    'price' => 15000000,
    'stock' => 10
]);

// Method 3: firstOrCreate
$product = Product::firstOrCreate(
    ['slug' => 'laptop-gaming'],
    [
        'name' => 'Laptop Gaming',
        'price' => 15000000,
        'stock' => 10
    ]
);

🔄 Updating Records

Update existing records:

// Method 1: Find & update
$product = Product::find(1);
$product->price = 14500000;
$product->stock = 8;
$product->save();

// Method 2: Update query
Product::where('category_id', 1)
    ->update(['status' => 'published']);

// Method 3: updateOrCreate
Product::updateOrCreate(
    ['slug' => 'laptop-gaming'],
    ['price' => 14500000, 'stock' => 8]
);

// Increment/Decrement
$product->increment('views');
$product->increment('views', 5);
$product->decrement('stock');
$product->decrement('stock', 2);

🗑️ Deleting Records

Delete records:

// Method 1: Find & delete
$product = Product::find(1);
$product->delete();

// Method 2: Delete by ID
Product::destroy(1);
Product::destroy([1, 2, 3]);

// Method 3: Query & delete
Product::where('stock', 0)->delete();

// Soft Delete (recoverable)
$product->delete();  // Sets deleted_at timestamp

// Restore soft deleted
$product->restore();

// Force delete (permanent)
$product->forceDelete();

// Query with trashed
Product::withTrashed()->get();
Product::onlyTrashed()->get();

🎯 Complete Real-World Example

<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'category_id', 'sku', 'name', 'slug',  
        'description', 'price', 'discount_price',
        'stock', 'status', 'images', 'specifications'
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount_price' => 'decimal:2',
        'stock' => 'integer',
        'rating' => 'decimal:2',
        'images' => 'array',
        'specifications' => 'array',
        'published_at' => 'datetime'
    ];

    protected $hidden = ['deleted_at'];

    protected $attributes = [
        'status' => 'draft',
        'stock' => 0,
        'views' => 0,
        'rating' => 0
    ];

    // Scopes
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }

    // Accessors
    public function getFormattedPriceAttribute()
    {
        return 'Rp ' . number_format($this->price, 0, ',', '.');
    }

    // Mutators
    public function setNameAttribute($value)
    {
        $this->attributes['name'] = ucwords($value);
    }
}

// Usage:
$products = Product::published()->inStock()->get();
echo $product->formatted_price;  // "Rp 15.000.000"`,
    keypoints: [
      {
        type: "concept",
        icon: "📌",
        text: "Model = Table representation dengan ORM magic",
        color: "blue"
      },
      {
        type: "command",
        icon: "⚡",
        text: "php artisan make:model Product [-m|-mcfs]",
        color: "purple"
      },
      {
        type: "feature",
        icon: "🔒",
        text: "$fillable (mass assign whitelist), $casts (type conversion)",
        color: "purple"
      },
      {
        type: "feature",
        icon: "📊",
        text: "Query: all(), find(), where(), first(), paginate()",
        color: "purple"
      },
      {
        type: "feature",
        icon: "✏️",
        text: "CRUD: create(), save(), update(), delete(), forceDelete()",
        color: "purple"
      },
      {
        type: "tip",
        icon: "💡",
        text: "Scopes, Accessors, Mutators untuk reusable logic",
        color: "green"
      },
      {
        type: "best-practice",
        icon: "",
        text: "Use SoftDeletes untuk safe delete, findOrFail() untuk auto 404",
        color: "green"
      }
    ]
  },
  {
    title: "Eloquent Relationships",
    content: `Eloquent Relationships memungkinkan kita mendefinisikan hubungan antar tables dengan elegant. Relationships didefinisikan sebagai methods di Model class, membuat query relational data menjadi sangat mudah.

🔗 One to One Relationship

Satu record di table A memiliki tepat satu record di table B.

Example: User has one Profile

Database Schema:

users table: id, name, email
profiles table: id, user_id, bio, avatar, phone

Model definition:

<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class User extends Model
{
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }
}

class Profile extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

Usage:

// Get user's profile
$user = User::find(1);
$profile = $user->profile;
echo $profile->bio;

// Get profile's user
$profile = Profile::find(1);
$user = $profile->user;
echo $user->name;

// Create related record
$user->profile()->create([
    'bio' => 'Software Developer',
    'phone' => '08123456789'
]);

📚 One to Many Relationship

Satu record di table A memiliki banyak records di table B.

Example: Post has many Comments

Database Schema:

posts table: id, title, body, user_id
comments table: id, post_id, user_id, body

Model definition:

<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Post extends Model
{
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}

class Comment extends Model
{
    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

Usage:

// Get all comments from post
$post = Post::find(1);
$comments = $post->comments;

foreach ($comments as $comment) {
    echo $comment->body;
}

// Create comment for post
$post->comments()->create([
    'user_id' => auth()->id(),
    'body' => 'Great post!'
]);

// Get post from comment
$comment = Comment::find(1);
$post = $comment->post;
echo $post->title;

// Query relationship
$post->comments()->where('approved', true)->get();
$post->comments()->count();

🔀 Many to Many Relationship

Banyak records di table A berhubungan dengan banyak records di table B.

Example: User belongs to many Roles, Role belongs to many Users

Database Schema:

users table: id, name, email
roles table: id, name, permissions
role_user table (pivot): id, user_id, role_id, assigned_at

Model definition:

<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class User extends Model
{
    public function roles()
    {
        return $this->belongsToMany(Role::class)
            ->withTimestamps()
            ->withPivot('assigned_at');
    }
}

class Role extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class)
            ->withTimestamps()
            ->withPivot('assigned_at');
    }
}

Usage:

// Get user's roles
$user = User::find(1);
$roles = $user->roles;

foreach ($roles as $role) {
    echo $role->name;
    echo $role->pivot->assigned_at;  // Access pivot data
}

// Attach role to user
$user->roles()->attach($roleId);
$user->roles()->attach($roleId, ['assigned_at' => now()]);
$user->roles()->attach([1, 2, 3]);

// Detach role from user
$user->roles()->detach($roleId);
$user->roles()->detach();  // Detach all

// Sync roles (add new, remove old)
$user->roles()->sync([1, 2, 3]);

// Toggle roles
$user->roles()->toggle([1, 2, 3]);

// Check if has role
if ($user->roles()->where('name', 'admin')->exists()) {
    // User is admin
}

🔗 Has One Through

Relasi one-to-one melalui table perantara.

Example: Mechanic has one Car through Owner

mechanics table: id, name
owners table: id, mechanic_id, name
cars table: id, owner_id, model

<?php

class Mechanic extends Model
{
    public function carOwner()
    {
        return $this->hasOne(Owner::class);
    }

    public function car()
    {
        return $this->hasOneThrough(
            Car::class,
            Owner::class,
            'mechanic_id',  // Foreign key on owners table
            'owner_id',     // Foreign key on cars table
            'id',           // Local key on mechanics table
            'id'            // Local key on owners table
        );
    }
}

// Usage:
$mechanic = Mechanic::find(1);
$car = $mechanic->car;

📦 Has Many Through

Relasi one-to-many melalui table perantara.

Example: Country has many Posts through Users

countries table: id, name
users table: id, country_id, name
posts table: id, user_id, title

<?php

class Country extends Model
{
    public function posts()
    {
        return $this->hasManyThrough(
            Post::class,
            User::class,
            'country_id',   // Foreign key on users table
            'user_id',      // Foreign key on posts table
            'id',           // Local key on countries table
            'id'            // Local key on users table
        );
    }
}

// Usage:
$country = Country::find(1);
$posts = $country->posts;

🎭 Polymorphic Relationships

Satu model belongs to banyak tipe models lain menggunakan satu association.

Example: Comment belongs to Post OR Video

posts table: id, title, body
videos table: id, title, url
comments table: id, commentable_id, commentable_type, body

<?php

class Comment extends Model
{
    public function commentable()
    {
        return $this->morphTo();
    }
}

class Post extends Model
{
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}

class Video extends Model
{
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}

Usage:

// Get comments from post
$post = Post::find(1);
$comments = $post->comments;

// Get comments from video
$video = Video::find(1);
$comments = $video->comments;

// Get commentable (Post or Video)
$comment = Comment::find(1);
$commentable = $comment->commentable;

// Create comment
$post->comments()->create(['body' => 'Nice post!']);
$video->comments()->create(['body' => 'Great video!']);

⚡ Eager Loading (N+1 Solution)

Prevent N+1 query problem:

// Bad: N+1 problem (1 query + N queries)
$posts = Post::all();  // 1 query
foreach ($posts as $post) {
    echo $post->author->name;  // N queries
}

// Good: Eager loading (2 queries total)
$posts = Post::with('author')->get();  // 2 queries
foreach ($posts as $post) {
    echo $post->author->name;  // No extra query
}

// Multiple relationships
$posts = Post::with(['author', 'comments', 'category'])->get();

// Nested relationships
$posts = Post::with('comments.user')->get();

// Conditional eager loading
$posts = Post::with(['author', 'comments' => function ($query) {
    $query->where('approved', true)->orderBy('created_at', 'desc');
}])->get();

// Lazy eager loading
$posts = Post::all();
$posts->load('author');

🎯 Complete Real-World Example

<?php

namespace App\\Models;

use Illuminate\\Database\\Eloquent\\Model;

class Order extends Model
{
    // One to many (inverse)
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Many to many
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_items')
            ->withPivot('quantity', 'price', 'subtotal')
            ->withTimestamps();
    }

    // One to one
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    // One to many
    public function statusHistory()
    {
        return $this->hasMany(OrderStatus::class);
    }
}

// Controller usage:
$orders = Order::with(['user', 'products', 'payment'])
    ->where('status', 'completed')
    ->latest()
    ->paginate(20);

foreach ($orders as $order) {
    echo $order->user->name;
    
    foreach ($order->products as $product) {
        echo $product->name;
        echo $product->pivot->quantity;
        echo $product->pivot->price;
    }
    
    echo $order->payment->amount;
}`,
    keypoints: [
      {
        type: "concept",
        icon: "📌",
        text: "Relationships sebagai methods di Model class",
        color: "blue"
      },
      {
        type: "feature",
        icon: "🔗",
        text: "One to One: hasOne(), belongsTo()",
        color: "purple"
      },
      {
        type: "feature",
        icon: "📚",
        text: "One to Many: hasMany(), belongsTo()",
        color: "purple"
      },
      {
        type: "feature",
        icon: "🔀",
        text: "Many to Many: belongsToMany() dengan pivot table",
        color: "purple"
      },
      {
        type: "feature",
        icon: "🎭",
        text: "Polymorphic: morphTo(), morphMany() untuk flexible relations",
        color: "purple"
      },
      {
        type: "best-practice",
        icon: "",
        text: "Eager Loading: with() untuk prevent N+1 query problem",
        color: "green"
      },
      {
        type: "tip",
        icon: "💡",
        text: "attach(), detach(), sync(), toggle() untuk many-to-many",
        color: "green"
      }
    ]
  },
  {
    title: "Seeder & Factory",
    content: `Seeder dan Factory digunakan untuk populate database dengan test data. Seeder untuk define data yang akan di-insert, Factory untuk generate fake data secara programmatic menggunakan Faker library.

🌱 Database Seeders

Seeders berguna untuk initial data atau test data.

Generate Seeder:

php artisan make:seeder CategorySeeder

File dibuat di database/seeders/CategorySeeder.php:

<?php

namespace Database\\Seeders;

use App\\Models\\Category;
use Illuminate\\Database\\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Electronics',
                'slug' => 'electronics',
                'description' => 'Electronic devices and gadgets',
                'icon' => 'laptop',
                'is_active' => true
            ],
            [
                'name' => 'Fashion',
                'slug' => 'fashion',
                'description' => 'Clothing and accessories',
                'icon' => 'shirt',
                'is_active' => true
            ],
            [
                'name' => 'Home & Garden',
                'slug' => 'home-garden',
                'description' => 'Home improvement and garden tools',
                'icon' => 'home',
                'is_active' => true
            ]
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }

        // Or use insert for better performance (no timestamps)
        // Category::insert($categories);
    }
}

Register di DatabaseSeeder.php:

<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            UserSeeder::class,
            ProductSeeder::class,
        ]);
    }
}

Run seeder:

php artisan db:seed

Run specific seeder:

php artisan db:seed --class=CategorySeeder

Fresh migration + seed:

php artisan migrate:fresh --seed

🏭 Model Factories

Factory generate fake data using Faker library.

Generate Factory:

php artisan make:factory ProductFactory --model=Product

File dibuat di database/factories/ProductFactory.php:

<?php

namespace Database\\Factories;

use App\\Models\\Category;
use Illuminate\\Database\\Eloquent\\Factories\\Factory;
use Illuminate\\Support\\Str;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->words(3, true);
        $price = $this->faker->randomFloat(2, 50000, 5000000);

        return [
            'category_id' => Category::inRandomOrder()->first()->id,
            'sku' => 'PROD-' . $this->faker->unique()->numberBetween(1000, 9999),
            'name' => ucwords($name),
            'slug' => Str::slug($name),
            'description' => $this->faker->paragraphs(3, true),
            'price' => $price,
            'discount_price' => $this->faker->boolean(30) ? $price * 0.9 : null,
            'stock' => $this->faker->numberBetween(0, 100),
            'status' => $this->faker->randomElement(['draft', 'published', 'archived']),
            'images' => [
                $this->faker->imageUrl(640, 480, 'products'),
                $this->faker->imageUrl(640, 480, 'products'),
            ],
            'specifications' => [
                'brand' => $this->faker->company,
                'warranty' => $this->faker->randomElement(['1 Year', '2 Years', '3 Years']),
                'weight' => $this->faker->numberBetween(100, 5000) . 'g'
            ],
            'views' => $this->faker->numberBetween(0, 1000),
            'rating' => $this->faker->randomFloat(2, 0, 5),
        ];
    }

    /**
     * Indicate that the product is published.
     */
    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'stock' => $this->faker->numberBetween(10, 100),
        ]);
    }

    /**
     * Indicate that the product is out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock' => 0,
        ]);
    }
}

Usage:

// Create one product
$product = Product::factory()->create();

// Create multiple products
Product::factory()->count(50)->create();

// With custom attributes
Product::factory()->create([
    'name' => 'Custom Product',
    'price' => 100000
]);

// Using states
Product::factory()->published()->count(20)->create();
Product::factory()->outOfStock()->count(5)->create();

// With relationships
User::factory()
    ->has(Post::factory()->count(3))
    ->create();

// Or
Post::factory()
    ->for(User::factory())
    ->create();

🎯 Complete Real-World Example

Seeder dengan Factory untuk e-commerce:

<?php

namespace Database\\Seeders;

use App\\Models\\Category;
use App\\Models\\Product;
use App\\Models\\User;
use App\\Models\\Order;
use Illuminate\\Database\\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create categories
        $categories = [
            'Electronics' => 'electronics',
            'Fashion' => 'fashion',
            'Home & Garden' => 'home-garden',
            'Sports' => 'sports',
            'Books' => 'books'
        ];

        foreach ($categories as $name => $slug) {
            Category::create([
                'name' => $name,
                'slug' => $slug,
                'is_active' => true
            ]);
        }

        // Create admin user
        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'is_admin' => true
        ]);

        // Create 50 regular users
        $users = User::factory()->count(50)->create();

        // Create 200 products distributed across categories
        Category::all()->each(function ($category) {
            Product::factory()
                ->count(40)
                ->published()
                ->create(['category_id' => $category->id]);
        });

        // Create orders with products
        $users->random(30)->each(function ($user) {
            Order::factory()
                ->count(rand(1, 5))
                ->hasAttached(
                    Product::inRandomOrder()->limit(rand(1, 5))->get(),
                    [
                        'quantity' => rand(1, 3),
                        'price' => fn() => Product::inRandomOrder()->first()->price
                    ]
                )
                ->create(['user_id' => $user->id]);
        });

        $this->command->info('Database seeded successfully!');
    }
}

UserFactory.php:

<?php

namespace Database\\Factories;

use Illuminate\\Database\\Eloquent\\Factories\\Factory;
use Illuminate\\Support\\Facades\\Hash;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'is_admin' => false,
            'is_active' => true,
        ];
    }

    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_admin' => true,
        ]);
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

Run everything:

php artisan migrate:fresh --seed

⚠️ Best Practices

1. Use Factory untuk dynamic data, Seeder untuk static data
2. Create faker() methods untuk realistic data
3. Use Factory states untuk variations
4. Truncate tables di seeder untuk idempotency
5. Call seeders in logical order (categories before products)
6. Use factory()->count() untuk batch creation`,
    keypoints: [
      {
        type: "concept",
        icon: "📌",
        text: "Seeder untuk initial/test data, Factory untuk fake data generation",
        color: "blue"
      },
      {
        type: "command",
        icon: "⚡",
        text: "php artisan make:seeder, make:factory --model",
        color: "purple"
      },
      {
        type: "feature",
        icon: "🏭",
        text: "Factory uses Faker library untuk realistic fake data",
        color: "purple"
      },
      {
        type: "feature",
        icon: "🎯",
        text: "Factory States untuk variations (published, active, featured)",
        color: "purple"
      },
      {
        type: "command",
        icon: "🌱",
        text: "db:seed, migrate:fresh --seed untuk populate database",
        color: "purple"
      },
      {
        type: "tip",
        icon: "💡",
        text: "factory()->count(50) untuk batch creation, has() untuk relationships",
        color: "green"
      },
      {
        type: "best-practice",
        icon: "",
        text: "Register seeders di DatabaseSeeder dengan logical order",
        color: "green"
      }
    ]
  },
  {
    title: "Query Builder & Raw SQL",
    content: `Query Builder menyediakan fluent interface untuk membuat dan menjalankan database queries. Lebih flexible dari Eloquent, cocok untuk complex queries dan better performance.

🔨 Basic Query Builder

Query Builder menggunakan DB facade:

use Illuminate\\Support\\Facades\\DB;

// Get all records
$users = DB::table('users')->get();

// Get first record
$user = DB::table('users')->where('email', 'john@example.com')->first();

// Get single value
$email = DB::table('users')->where('id', 1)->value('email');

// Check exists
$exists = DB::table('users')->where('email', 'john@example.com')->exists();

// Count
$count = DB::table('users')->count();
$active = DB::table('users')->where('active', true)->count();

🔍 Where Clauses

Berbagai where conditions:

// Basic where
DB::table('products')
    ->where('price', '>', 1000)
    ->where('stock', '>', 0)
    ->get();

// Or where
DB::table('products')
    ->where('category_id', 1)
    ->orWhere('category_id', 2)
    ->get();

// Where between
DB::table('products')
    ->whereBetween('price', [100, 500])
    ->get();

// Where in
DB::table('products')
    ->whereIn('status', ['published', 'featured'])
    ->get();

// Where null
DB::table('products')
    ->whereNull('deleted_at')
    ->get();

// Where date
DB::table('orders')
    ->whereDate('created_at', '2024-01-20')
    ->get();

// Where month/year
DB::table('orders')
    ->whereMonth('created_at', '01')
    ->whereYear('created_at', '2024')
    ->get();

// Complex where
DB::table('products')
    ->where(function ($query) {
        $query->where('price', '>', 1000)
              ->orWhere('featured', true);
    })
    ->where('stock', '>', 0)
    ->get();

📊 Select Specific Columns

Select columns dan aggregates:

// Select specific columns
DB::table('users')
    ->select('name', 'email')
    ->get();

// With alias
DB::table('users')
    ->select('name', 'email as user_email')
    ->get();

// Add select
$query = DB::table('users')->select('name');
$users = $query->addSelect('email')->get();

// Distinct
DB::table('orders')
    ->select('status')
    ->distinct()
    ->get();

// Aggregates
$max = DB::table('products')->max('price');
$min = DB::table('products')->min('price');
$avg = DB::table('products')->avg('price');
$sum = DB::table('orders')->sum('total');

🔗 Joins

Join multiple tables:

// Inner join
DB::table('orders')
    ->join('users', 'users.id', '=', 'orders.user_id')
    ->select('orders.*', 'users.name')
    ->get();

// Left join
DB::table('products')
    ->leftJoin('categories', 'categories.id', '=', 'products.category_id')
    ->select('products.*', 'categories.name as category_name')
    ->get();

// Multiple joins
DB::table('orders')
    ->join('users', 'users.id', '=', 'orders.user_id')
    ->join('order_items', 'order_items.order_id', '=', 'orders.id')
    ->join('products', 'products.id', '=', 'order_items.product_id')
    ->select('orders.*', 'users.name', 'products.name as product_name')
    ->get();

// Complex join conditions
DB::table('posts')
    ->join('users', function ($join) {
        $join->on('users.id', '=', 'posts.user_id')
             ->where('users.active', '=', true);
    })
    ->get();

📝 Ordering & Grouping

Sort and group results:

// Order by
DB::table('products')
    ->orderBy('price', 'desc')
    ->get();

// Multiple order by
DB::table('products')
    ->orderBy('category_id')
    ->orderBy('price', 'desc')
    ->get();

// Latest/Oldest
DB::table('posts')
    ->latest('published_at')
    ->get();

// Random
DB::table('products')
    ->inRandomOrder()
    ->limit(10)
    ->get();

// Group by
DB::table('orders')
    ->select('user_id', DB::raw('count(*) as total_orders'))
    ->groupBy('user_id')
    ->get();

// Having
DB::table('orders')
    ->select('user_id', DB::raw('count(*) as total_orders'))
    ->groupBy('user_id')
    ->having('total_orders', '>', 5)
    ->get();

✏️ Insert, Update, Delete

Modify data:

// Insert single
DB::table('users')->insert([
    'name' => 'John Doe',
    'email' => 'john@example.com',
    'password' => Hash::make('password')
]);

// Insert multiple
DB::table('users')->insert([
    ['name' => 'John', 'email' => 'john@example.com'],
    ['name' => 'Jane', 'email' => 'jane@example.com']
]);

// Insert and get ID
$id = DB::table('users')->insertGetId([
    'name' => 'John Doe',
    'email' => 'john@example.com'
]);

// Update
DB::table('products')
    ->where('id', 1)
    ->update(['price' => 1500000]);

// Update or insert
DB::table('products')
    ->updateOrInsert(
        ['sku' => 'PROD-001'],
        ['name' => 'Product Name', 'price' => 100000]
    );

// Increment/Decrement
DB::table('products')->increment('views');
DB::table('products')->increment('views', 5);
DB::table('products')->decrement('stock', 2);

// Delete
DB::table('users')->where('active', false)->delete();
DB::table('users')->truncate();  // Delete all

🔄 Transactions

Execute queries in transaction:

use Illuminate\\Support\\Facades\\DB;

DB::transaction(function () {
    DB::table('users')->update(['votes' => 1]);
    DB::table('posts')->delete();
});

// Manual transactions
DB::beginTransaction();

try {
    DB::table('users')->update(['votes' => 1]);
    DB::table('posts')->delete();
    
    DB::commit();
} catch (\\Throwable $e) {
    DB::rollBack();
    throw $e;
}

💉 Raw Expressions

Use raw SQL when needed:

// Raw select
$users = DB::table('orders')
    ->select(DB::raw('count(*) as total, user_id'))
    ->groupBy('user_id')
    ->get();

// Raw where
DB::table('products')
    ->whereRaw('price > ? and stock > ?', [1000, 0])
    ->get();

// Raw order by
DB::table('users')
    ->orderByRaw('updated_at - created_at DESC')
    ->get();

// Complete raw query
$users = DB::select('select * from users where active = ?', [1]);

// Raw insert
DB::insert('insert into users (name, email) values (?, ?)', ['John', 'john@example.com']);

// Raw update
DB::update('update users set votes = 100 where name = ?', ['John']);

// Raw delete
DB::delete('delete from users where inactive = ?', [1]);

🎯 Complete Real-World Example

<?php

namespace App\\Http\\Controllers;

use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Http\\Request;

class ReportController extends Controller
{
    public function salesReport()
    {
        // Complex query dengan joins dan aggregates
        $sales = DB::table('orders')
            ->join('order_items', 'orders.id', '=', 'order_items.order_id')
            ->join('products', 'products.id', '=', 'order_items.product_id')
            ->join('categories', 'categories.id', '=', 'products.category_id')
            ->select(
                'categories.name as category',
                DB::raw('COUNT(DISTINCT orders.id) as total_orders'),
                DB::raw('SUM(order_items.quantity) as total_items'),
                DB::raw('SUM(order_items.subtotal) as total_revenue')
            )
            ->whereBetween('orders.created_at', [now()->subDays(30), now()])
            ->where('orders.status', 'completed')
            ->groupBy('categories.id', 'categories.name')
            ->having('total_revenue', '>', 1000000)
            ->orderBy('total_revenue', 'desc')
            ->get();

        return view('reports.sales', compact('sales'));
    }

    public function topProducts()
    {
        $products = DB::table('products')
            ->leftJoin('order_items', 'products.id', '=', 'order_items.product_id')
            ->select(
                'products.id',
                'products.name',
                'products.price',
                DB::raw('COALESCE(SUM(order_items.quantity), 0) as total_sold'),
                DB::raw('COALESCE(SUM(order_items.subtotal), 0) as revenue')
            )
            ->groupBy('products.id', 'products.name', 'products.price')
            ->orderBy('total_sold', 'desc')
            ->limit(10)
            ->get();

        return view('reports.top-products', compact('products'));
    }
}`,
    keypoints: [
      {
        type: "concept",
        icon: "📌",
        text: "Query Builder: Fluent interface untuk database queries",
        color: "blue"
      },
      {
        type: "feature",
        icon: "🔍",
        text: "Where Clauses: where(), orWhere(), whereIn(), whereBetween()",
        color: "purple"
      },
      {
        type: "feature",
        icon: "🔗",
        text: "Joins: join(), leftJoin(), rightJoin() dengan complex conditions",
        color: "purple"
      },
      {
        type: "feature",
        icon: "📊",
        text: "Aggregates: count(), sum(), avg(), max(), min()",
        color: "purple"
      },
      {
        type: "feature",
        icon: "🔄",
        text: "Transactions: DB::transaction() untuk atomic operations",
        color: "purple"
      },
      {
        type: "tip",
        icon: "💡",
        text: "Raw Expressions: DB::raw() untuk complex SQL calculations",
        color: "green"
      },
      {
        type: "best-practice",
        icon: "",
        text: "Use Query Builder untuk complex reports, Eloquent untuk CRUD",
        color: "green"
      }
    ]
  },
  {
    title: "Request & Validation",
    content: `Request object berisi semua informasi tentang HTTP request. Laravel menyediakan berbagai methods untuk mengakses input data dengan mudah.

Akses input: $request->input('name'), atau $request->name. Untuk semua input: $request->all(). Check ada tidaknya: $request->has('name').

Validation memastikan data yang masuk sesuai rules. Contoh di Controller: $request->validate(['name' => 'required|string|max:255', 'email' => 'required|email|unique:users']).

Validation rules: required, email, unique, min, max, numeric, string, date, confirmed, dan masih banyak lagi. Custom messages dapat didefinisikan.

Form Request untuk validation yang kompleks: php artisan make:request StoreProductRequest. Logic validation di method rules(), authorization di method authorize().

Error messages otomatis tersedia di view dengan $errors variable. @error('name') {{ $message }} @enderror untuk menampilkan error spesifik field.`,
    keypoints: [
      "Request object berisi info HTTP request",
      "Akses input: $request->input(), $request->name",
      "Validation: $request->validate(['rules'])",
      "Banyak validation rules: required, email, unique",
      "Form Request untuk validation kompleks",
      "Error messages di view: $errors, @error"
    ]
  },
  {
    title: "CRUD Lengkap (Best Practice)",
    content: `CRUD (Create, Read, Update, Delete) adalah operasi dasar dalam aplikasi web. Laravel menyediakan cara elegant untuk implement CRUD dengan Resource Controller.

Buat Resource Controller: php artisan make:controller ProductController --resource. Register route: Route::resource('products', ProductController::class).

Index method untuk list semua data: public function index() { $products = Product::paginate(10); return view('products.index', compact('products')); }.

Create method untuk show form: public function create() { return view('products.create'); }. Store method untuk save data dengan validation.

Show method untuk detail: public function show(Product $product) { return view('products.show', compact('product')); }. Route Model Binding otomatis inject model.

Edit method untuk show edit form. Update method untuk update data. Destroy method untuk delete: $product->delete().

Best practice: gunakan Form Request untuk validation, implement authorization dengan Policy, gunakan transactions untuk operasi kompleks, handle exceptions dengan try-catch.`,
    keypoints: [
      "Resource Controller untuk CRUD lengkap",
      "7 methods: index, create, store, show, edit, update, destroy",
      "Route: Route::resource('products', Controller::class)",
      "Pagination dengan paginate()",
      "Route Model Binding untuk inject model",
      "Best practice: Form Request, Policy, Transactions"
    ]
  },
  {
    title: "Middleware",
    content: `Middleware adalah layer yang memfilter HTTP requests sebelum mencapai Controller. Middleware berguna untuk authentication, logging, CORS, dan berbagai pre/post processing.

Laravel built-in middleware: auth (authentication), guest (untuk guest only), throttle (rate limiting), verified (email verification), dan lain-lain.

Buat custom middleware: php artisan make:middleware CheckAge. Edit file di app/Http/Middleware/. Implement logic di method handle().

Register middleware di app/Http/Kernel.php. Global middleware untuk semua routes. Route middleware untuk routes spesifik. Middleware groups untuk kelompokkan middleware.

Apply middleware di routes: Route::get('/dashboard', function () {})->middleware('auth'). Atau di Controller constructor: $this->middleware('auth').

Middleware parameters memungkinkan passing nilai: Route::get('/admin', function () {})->middleware('role:admin'). Parameter diterima di handle() method.`,
    keypoints: [
      "Filter HTTP requests sebelum Controller",
      "Built-in: auth, guest, throttle, verified",
      "Buat custom: php artisan make:middleware",
      "Register di app/Http/Kernel.php",
      "Apply: ->middleware('auth')",
      "Middleware parameters: ->middleware('role:admin')"
    ]
  },
  {
    title: "Authentication Dasar",
    content: `Authentication adalah proses verifikasi identitas user. Laravel menyediakan system authentication yang lengkap dan secure out of the box.

Laravel Breeze adalah starter kit authentication sederhana: composer require laravel/breeze --dev, php artisan breeze:install, npm install && npm run dev.

Breeze menyediakan login, registration, password reset, email verification, dan profile management. Views menggunakan Blade dan Tailwind CSS.

Laravel Fortify untuk backend authentication tanpa UI. Laravel Jetstream untuk authentication dengan fitur lengkap termasuk two-factor, team management, dll.

Authentication scaffolding membuat routes, controllers, dan views. User model harus implement interface Authenticatable.

Guard dan Provider mengatur cara authentication bekerja. Default guard: web (session), api (token). Customizable untuk kebutuhan spesifik.`,
    keypoints: [
      "Laravel Breeze untuk starter kit sederhana",
      "Fitur: login, register, password reset, verification",
      "Fortify untuk backend only, Jetstream untuk full",
      "User model implement Authenticatable",
      "Guards: web (session), api (token)",
      "Customizable untuk kebutuhan spesifik"
    ]
  },
  {
    title: "Authorization (Gate & Policy)",
    content: `Authorization menentukan apa yang boleh dilakukan user yang sudah authenticated. Laravel menyediakan Gates dan Policies untuk manage authorization.

Gates adalah closure-based authorization di AuthServiceProvider: Gate::define('update-post', function (User $user, Post $post) { return $user->id === $post->user_id; }).

Check authorization dengan Gate::allows('update-post', $post) atau Gate::denies(). Di Blade: @can('update-post', $post) ... @endcan.

Policies adalah class-based authorization untuk specific model: php artisan make:policy PostPolicy --model=Post. Methods: view, create, update, delete, etc.

Policy methods menerima User dan Model: public function update(User $user, Post $post) { return $user->id === $post->user_id; }.

Register policy di AuthServiceProvider. Gunakan dengan $this->authorize('update', $post) di Controller. Exception thrown jika unauthorized.`,
    keypoints: [
      "Authorization menentukan apa yang boleh dilakukan user",
      "Gates: closure-based di AuthServiceProvider",
      "Policies: class-based untuk specific model",
      "Buat Policy: php artisan make:policy",
      "Check: Gate::allows(), @can(), $this->authorize()",
      "Auto-register Policy dengan model convention"
    ]
  },
  {
    title: "File Upload",
    content: `File upload adalah fitur common dalam aplikasi web. Laravel menyediakan API yang mudah untuk handle file uploads dengan berbagai storage options.

File upload form harus memiliki enctype="multipart/form-data". Di Blade: <form method="POST" enctype="multipart/form-data"> <input type="file" name="photo"> </form>.

Di Controller, akses uploaded file: $file = $request->file('photo'). Check ada tidaknya: $request->hasFile('photo').

Simpan file: $path = $request->file('photo')->store('photos', 'public'). Parameter pertama adalah directory, kedua adalah disk (public, s3, dll).

Store dengan custom name: $path = $request->file('photo')->storeAs('photos', $filename, 'public'). Generate unique filename untuk avoid conflicts.

Validation file: $request->validate(['photo' => 'required|image|mimes:jpeg,png,jpg|max:2048']). Validasi type, size, dimensions.

Storage facade untuk manipulasi file: Storage::disk('public')->exists($path), Storage::delete($path), Storage::download($path).`,
    keypoints: [
      "Form dengan enctype='multipart/form-data'",
      "Akses file: $request->file('name')",
      "Simpan: store('dir', 'disk')",
      "Custom name: storeAs('dir', 'name', 'disk')",
      "Validation: image, mimes, max, dimensions",
      "Storage facade untuk manipulasi file"
    ]
  },
  {
    title: "API (Resource Controller + Sanctum)",
    content: `REST API memungkinkan aplikasi berkomunikasi dengan format JSON. Laravel menyediakan tools lengkap untuk membangun API yang robust.

API routes didefinisikan di routes/api.php dengan prefix /api otomatis. Gunakan API Resource Controller: php artisan make:controller API/ProductController --api.

API Resource untuk transform model ke JSON: php artisan make:resource ProductResource. Customize output di method toArray().

Return resource dari Controller: return new ProductResource($product) untuk single, ProductResource::collection($products) untuk collection.

Laravel Sanctum untuk API authentication: composer require laravel/sanctum, php artisan vendor:publish --provider="Laravel\\Sanctum\\SanctumServiceProvider".

Generate token: $token = $user->createToken('token-name')->plainTextToken. Client include token di header: Authorization: Bearer {token}.

Protect routes dengan middleware: Route::middleware('auth:sanctum')->group(function() { }). Token dapat di-revoke dengan $user->tokens()->delete().`,
    keypoints: [
      "API routes di routes/api.php, prefix /api",
      "API Resource Controller: --api flag",
      "API Resource untuk transform JSON",
      "Sanctum untuk API authentication",
      "Generate token: createToken()",
      "Protect routes: middleware('auth:sanctum')"
    ]
  },
  {
    title: "API Pagination & Filtering",
    content: `Pagination dan filtering adalah fitur essential untuk API yang handle large datasets. Laravel menyediakan built-in support yang powerful.

Pagination otomatis dengan paginate(): $products = Product::paginate(15). Response JSON include meta data: current_page, last_page, per_page, total, links.

Custom per_page dari query parameter: $perPage = $request->input('per_page', 15); $products = Product::paginate($perPage).

Filtering dengan query parameters: $query = Product::query(). if ($request->has('category')) { $query->where('category', $request->category); }. Chain multiple filters.

Sorting dengan orderBy: $query->orderBy($request->input('sort_by', 'created_at'), $request->input('order', 'desc')).

Search functionality: $query->where('name', 'like', '%'.$request->search.'%'). Gunakan orWhere untuk multiple columns.

Best practice: buat base filter class atau use Laravel Query Builder untuk complex filtering. Rate limiting dengan throttle middleware.`,
    keypoints: [
      "Pagination: paginate(), include meta data",
      "Custom per_page dari query parameter",
      "Filtering: where(), multiple filters chainable",
      "Sorting: orderBy() dari query parameter",
      "Search: where('col', 'like', '%search%')",
      "Best practice: base filter class, rate limiting"
    ]
  },
  {
    title: "Eloquent Query Best Practice",
    content: `Eloquent ORM sangat powerful, tapi perlu digunakan dengan best practice untuk performa optimal. Berikut tips dan trick untuk query yang efisien.

N+1 Problem: Hindari lazy loading di loop. Bad: foreach($posts as $post) { $post->user->name; }. Good: $posts = Post::with('user')->get().

Eager Loading multiple relations: Post::with(['user', 'comments', 'tags'])->get(). Nested: Post::with('comments.user')->get().

Lazy Eager Loading ketika lupa eager load: $posts->load('user'). Load conditional: $posts->loadMissing('user').

Select specific columns untuk reduce memory: Product::select('id', 'name', 'price')->get(). Dengan relations: Product::with('category:id,name')->get().

Chunk untuk process large datasets: Product::chunk(100, function($products) { }). Cursor untuk memory-efficient: Product::cursor()->each(function($product) { }).

Query optimization: gunakan indexes di database, cache query results, avoid SELECT *, gunakan exists() instead of count() untuk checking.`,
    keypoints: [
      "Eager Loading untuk hindari N+1: with()",
      "Multiple relations: with(['rel1', 'rel2'])",
      "Select specific columns untuk performa",
      "Chunk/Cursor untuk large datasets",
      "Gunakan indexes di database",
      "Cache query results, avoid SELECT *"
    ]
  },
  {
    title: "Deployment ke Hosting / VPS",
    content: `Deployment adalah proses mempublish aplikasi Laravel ke production server. Ada beberapa cara deploy Laravel tergantung infrastructure yang digunakan.

Shared Hosting: Upload files via FTP, set document root ke /public. Update .env untuk production (APP_ENV=production, APP_DEBUG=false). Run composer install --optimize-autoloader --no-dev.

VPS (Digital Ocean, Linode, AWS): Install LEMP/LAMP stack. Clone dari Git repository. Setup virtual host, pointing ke /public directory. Configure file permissions untuk storage dan bootstrap/cache.

Laravel Forge: Platform untuk automated deployment. Connect ke server provider (DigitalOcean, AWS, dll). Deploy dengan Git push, automatic deployment, zero-downtime deployment.

Laravel Vapor: Serverless deployment platform untuk AWS Lambda. Auto-scaling, pay per use, no server management. Ideal untuk applications dengan traffic fluctuating.

Best practices: Gunakan environment variables, enable caching (config, routes, views), setup queue workers, implement monitoring dan logging, regular backups, SSL certificate dengan Let's Encrypt.`,
    keypoints: [
      "Shared Hosting: Upload via FTP, public directory",
      "VPS: LEMP/LAMP stack, Git, virtual host",
      "Laravel Forge untuk automated deployment",
      "Laravel Vapor untuk serverless (AWS Lambda)",
      "Production: APP_DEBUG=false, enable caching",
      "Best practice: SSL, monitoring, backups, queue workers"
    ]
  }
];
