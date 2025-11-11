// Contoh Materi View & Blade Template - Format Baru

export const bladeMateri = {
  id: 11,
  title: "View & Blade Template Engine",
  intro: "View adalah komponen presentasi dalam MVC yang berisi HTML untuk ditampilkan kepada user. Laravel menggunakan Blade sebagai templating engine yang powerful, elegan, dan mudah digunakan untuk membuat tampilan yang dinamis.",
  sections: [
    {
      id: "what-is-view",
      heading: "Apa itu View?",
      level: 2,
      content: [
        "View adalah file yang berisi kode HTML yang akan ditampilkan kepada user. View memisahkan logika presentasi dari logika bisnis, mengikuti prinsip MVC (Model-View-Controller).",
        "File view disimpan di direktori `resources/views/` dengan ekstensi `.blade.php`. Blade adalah templating engine bawaan Laravel yang menyediakan syntax yang clean dan powerful."
      ],
      code: {
        language: "text",
        example: `resources/views/
├── welcome.blade.php          # Homepage view
├── about.blade.php            # About page
├── layouts/
│   └── app.blade.php          # Master layout
├── components/
│   ├── alert.blade.php        # Alert component
│   └── button.blade.php       # Button component
└── users/
    ├── index.blade.php        # List users
    └── show.blade.php         # Show single user`,
        caption: "Struktur direktori views di Laravel"
      }
    },
    {
      id: "returning-views",
      heading: "Menampilkan View dari Controller",
      level: 2,
      content: [
        "Untuk menampilkan view dari Controller, gunakan helper function `view()`. Laravel akan otomatis mencari file di direktori `resources/views/`."
      ],
      subsections: [
        {
          id: "basic-view",
          heading: "Basic View",
          level: 3,
          content: [
            "Cara paling sederhana menampilkan view tanpa data tambahan."
          ],
          code: {
            language: "php",
            example: `<?php

namespace App\\Http\\Controllers;

class HomeController extends Controller
{
    public function index()
    {
        // Menampilkan resources/views/welcome.blade.php
        return view('welcome');
    }
    
    public function about()
    {
        // Menampilkan resources/views/about.blade.php
        return view('about');
    }
    
    public function userProfile()
    {
        // Menampilkan resources/views/users/profile.blade.php
        // Gunakan dot notation untuk nested folders
        return view('users.profile');
    }
}`
          }
        },
        {
          id: "passing-data",
          heading: "Passing Data ke View",
          level: 3,
          content: [
            "Ada beberapa cara untuk mengirim data dari Controller ke View."
          ],
          code: {
            language: "php",
            example: `<?php

public function show($id)
{
    $user = User::findOrFail($id);
    
    // Cara 1: Array sebagai parameter kedua
    return view('users.show', ['user' => $user]);
    
    // Cara 2: Menggunakan with()
    return view('users.show')->with('user', $user);
    
    // Cara 3: Multiple data dengan with()
    return view('users.show')
        ->with('user', $user)
        ->with('posts', $user->posts);
    
    // Cara 4: Compact (variable name as string)
    return view('users.show', compact('user'));
}

public function dashboard()
{
    $stats = [
        'users' => User::count(),
        'posts' => Post::count(),
        'comments' => Comment::count()
    ];
    
    return view('dashboard', compact('stats'));
}`
          }
        }
      ],
      note: {
        type: "tip",
        content: "Gunakan compact() ketika nama variable sama dengan nama yang ingin digunakan di view. Ini membuat kode lebih concise."
      }
    },
    {
      id: "blade-syntax",
      heading: "Blade Template Syntax",
      level: 2,
      content: [
        "Blade menyediakan syntax yang elegan dan aman untuk menampilkan data dan membuat control structures."
      ],
      subsections: [
        {
          id: "displaying-data",
          heading: "Menampilkan Data",
          level: 3,
          content: [
            "Blade menggunakan double curly braces `{{ }}` untuk echo data. Data otomatis di-escape untuk mencegah XSS attacks."
          ],
          code: {
            language: "php",
            example: `{{-- resources/views/users/show.blade.php --}}

<h1>{{ $user->name }}</h1>
<p>Email: {{ $user->email }}</p>

{{-- Otomatis di-escape, aman dari XSS --}}
<p>{{ $userInput }}</p>

{{-- Menampilkan raw HTML (hati-hati!) --}}
<div>{!! $trustedHtml !!}</div>

{{-- Ternary operator --}}
<p>Status: {{ $user->is_active ? 'Active' : 'Inactive' }}</p>

{{-- Null coalescing --}}
<p>Phone: {{ $user->phone ?? 'Not provided' }}</p>

{{-- Default value jika variable tidak ada --}}
<p>City: {{ $city ?? 'Unknown' }}</p>`
          },
          note: {
            type: "warning",
            content: "Gunakan {!! !!} hanya untuk data yang sudah trusted! Double curly braces {{ }} lebih aman karena otomatis escape HTML."
          }
        },
        {
          id: "control-structures",
          heading: "Control Structures",
          level: 3,
          content: [
            "Blade menyediakan directive yang clean untuk conditional statements dan loops."
          ],
          code: {
            language: "php",
            example: `{{-- IF Statements --}}
@if($user->role === 'admin')
    <p>Welcome Admin!</p>
@elseif($user->role === 'moderator')
    <p>Welcome Moderator!</p>
@else
    <p>Welcome User!</p>
@endif

{{-- UNLESS (opposite of if) --}}
@unless($user->is_banned)
    <p>You can post comments</p>
@endunless

{{-- ISSET & EMPTY --}}
@isset($user)
    <p>User exists</p>
@endisset

@empty($posts)
    <p>No posts found</p>
@endempty

{{-- Authentication checks --}}
@auth
    <p>You are logged in</p>
@endauth

@guest
    <p>Please login</p>
@endguest

{{-- FOR LOOP --}}
@for($i = 0; $i < 10; $i++)
    <p>Number: {{ $i }}</p>
@endfor

{{-- FOREACH --}}
@foreach($users as $user)
    <li>{{ $user->name }}</li>
@endforeach

{{-- FOREACH dengan $loop variable --}}
@foreach($posts as $post)
    <div class="{{ $loop->first ? 'first' : '' }}">
        <h3>{{ $post->title }}</h3>
        <p>Index: {{ $loop->index }}</p>
        <p>Iteration: {{ $loop->iteration }}</p>
        @if($loop->last)
            <p>This is the last item</p>
        @endif
    </div>
@endforeach

{{-- FORELSE (foreach with empty check) --}}
@forelse($comments as $comment)
    <p>{{ $comment->body }}</p>
@empty
    <p>No comments yet</p>
@endforelse

{{-- WHILE LOOP --}}
@while($condition)
    <p>Looping...</p>
@endwhile`
          }
        }
      ],
      note: {
        type: "tip",
        content: "Gunakan @forelse untuk menghindari pengecekan empty array secara manual. Lebih clean dibanding @if + @foreach."
      }
    },
    {
      id: "template-inheritance",
      heading: "Template Inheritance",
      level: 2,
      content: [
        "Template inheritance memungkinkan Anda membuat master layout yang bisa digunakan ulang oleh view lain. Ini membuat struktur HTML konsisten di seluruh aplikasi."
      ],
      subsections: [
        {
          id: "master-layout",
          heading: "Membuat Master Layout",
          level: 3,
          content: [
            "Master layout berisi struktur HTML umum seperti header, footer, dan navigation."
          ],
          code: {
            language: "php",
            example: `{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Laravel App')</title>
    
    {{-- CSS --}}
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    
    {{-- Additional styles for specific pages --}}
    @stack('styles')
</head>
<body>
    {{-- Header --}}
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
            @auth
                <a href="/dashboard">Dashboard</a>
            @endauth
        </nav>
    </header>
    
    {{-- Main Content Area --}}
    <main>
        @yield('content')
    </main>
    
    {{-- Footer --}}
    <footer>
        <p>&copy; 2024 Laravel App</p>
    </footer>
    
    {{-- Scripts --}}
    <script src="{{ asset('js/app.js') }}"></script>
    
    {{-- Additional scripts for specific pages --}}
    @stack('scripts')
</body>
</html>`
          }
        },
        {
          id: "child-view",
          heading: "Child View (Extending Layout)",
          level: 3,
          content: [
            "Child view menggunakan directive `@extends` untuk inherit dari master layout."
          ],
          code: {
            language: "php",
            example: `{{-- resources/views/users/index.blade.php --}}

@extends('layouts.app')

@section('title', 'Users List')

@section('content')
    <div class="container">
        <h1>All Users</h1>
        
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                @forelse($users as $user)
                    <tr>
                        <td>{{ $user->name }}</td>
                        <td>{{ $user->email }}</td>
                        <td>
                            <a href="/users/{{ $user->id }}">View</a>
                        </td>
                    </tr>
                @empty
                    <tr>
                        <td colspan="3">No users found</td>
                    </tr>
                @endforelse
            </tbody>
        </table>
        
        {{ $users->links() }}
    </div>
@endsection

@push('scripts')
    <script>
        console.log('Users page loaded');
    </script>
@endpush`
          }
        }
      ],
      note: {
        type: "info",
        content: "@yield digunakan untuk single content section, sedangkan @stack/@push digunakan untuk menambahkan multiple items (seperti scripts atau styles) dari berbagai view."
      }
    },
    {
      id: "blade-components",
      heading: "Blade Components",
      level: 2,
      content: [
        "Blade Components adalah cara modern untuk membuat reusable UI pieces. Components lebih powerful dan flexible dibanding @include."
      ],
      subsections: [
        {
          id: "creating-component",
          heading: "Membuat Component",
          level: 3,
          content: [
            "Gunakan Artisan command untuk generate component class dan view."
          ],
          code: {
            language: "bash",
            example: `# Membuat component Alert
php artisan make:component Alert

# Membuat component dalam subfolder
php artisan make:component Forms/Input

# Membuat anonymous component (tanpa class)
php artisan make:component Alert --view`
          }
        },
        {
          id: "component-class",
          heading: "Component Class & View",
          level: 3,
          content: [
            "Component terdiri dari class (logika) dan view (tampilan)."
          ],
          code: {
            language: "php",
            example: `<?php
// app/View/Components/Alert.php

namespace App\\View\\Components;

use Illuminate\\View\\Component;

class Alert extends Component
{
    public $type;
    public $message;
    
    public function __construct($type = 'info', $message = '')
    {
        $this->type = $type;
        $this->message = $message;
    }
    
    public function render()
    {
        return view('components.alert');
    }
    
    // Computed property
    public function alertClass()
    {
        return match($this->type) {
            'success' => 'bg-green-500',
            'error' => 'bg-red-500',
            'warning' => 'bg-yellow-500',
            default => 'bg-blue-500'
        };
    }
}`
          }
        },
        {
          id: "component-view-file",
          heading: "Component View File",
          level: 3,
          code: {
            language: "php",
            example: `{{-- resources/views/components/alert.blade.php --}}

<div class="alert {{ $alertClass() }}" role="alert">
    @if($message)
        <p>{{ $message }}</p>
    @else
        {{ $slot }}
    @endif
</div>`
          }
        },
        {
          id: "using-component",
          heading: "Menggunakan Component",
          level: 3,
          content: [
            "Component dipanggil dengan syntax `<x-component-name>`. Nama component menggunakan kebab-case."
          ],
          code: {
            language: "php",
            example: `{{-- Menggunakan Alert component --}}

{{-- Cara 1: Dengan attributes --}}
<x-alert type="success" message="User created successfully!" />

{{-- Cara 2: Dengan slot content --}}
<x-alert type="error">
    <strong>Error!</strong> Something went wrong.
</x-alert>

{{-- Component dalam subfolder --}}
<x-forms.input name="email" label="Email Address" />

{{-- Passing variable --}}
<x-alert type="success" :message="$successMessage" />

{{-- Named slots --}}
<x-card>
    <x-slot name="header">
        <h2>Card Title</h2>
    </x-slot>
    
    <p>Card body content here</p>
    
    <x-slot name="footer">
        <button>Save</button>
    </x-slot>
</x-card>`
          }
        }
      ],
      note: {
        type: "tip",
        content: "Gunakan : prefix untuk pass variable ($message) dan tanpa : untuk string literal. Contoh: :message=\"$var\" vs message=\"literal\""
      }
    },
    {
      id: "including-views",
      heading: "Including Sub-Views",
      level: 2,
      content: [
        "Blade menyediakan directive `@include` untuk menyisipkan view lain. Berguna untuk partial views yang reusable."
      ],
      code: {
        language: "php",
        example: `{{-- Include partial view --}}
@include('partials.header')

{{-- Include dengan data --}}
@include('partials.user-card', ['user' => $user])

{{-- Include jika view exists --}}
@includeIf('partials.sidebar')

{{-- Include dengan kondisi --}}
@includeWhen($showHeader, 'partials.header')
@includeUnless($hideFooter, 'partials.footer')

{{-- Include first existing view --}}
@includeFirst(['custom.header', 'partials.header'])

{{-- Loop include --}}
@each('partials.comment', $comments, 'comment')`
      },
      note: {
        type: "info",
        content: "Perbedaan @include vs Component: @include hanya insert view, Component memiliki class dengan logic. Gunakan Component untuk UI yang complex."
      }
    },
    {
      id: "blade-directives",
      heading: "Useful Blade Directives",
      level: 2,
      content: [
        "Laravel menyediakan berbagai directive built-in untuk keperluan umum."
      ],
      code: {
        language: "php",
        example: `{{-- CSRF Token (wajib untuk forms) --}}
<form method="POST">
    @csrf
    ...
</form>

{{-- Method Spoofing (PUT, PATCH, DELETE) --}}
<form method="POST">
    @csrf
    @method('PUT')
    ...
</form>

{{-- Environment checks --}}
@production
    <script src="analytics.js"></script>
@endproduction

@env('local')
    <p>Running in local environment</p>
@endenv

{{-- PHP directive --}}
@php
    $counter = 0;
    $total = count($items);
@endphp

{{-- JSON encode --}}
<script>
    const user = @json($user);
    const config = @json($config, JSON_PRETTY_PRINT);
</script>

{{-- Verbatim (skip Blade processing) --}}
@verbatim
    <div>
        {{ This won't be processed by Blade }}
        Vue.js or Angular code here
    </div>
@endverbatim

{{-- Comments (tidak akan muncul di HTML) --}}
{{-- This is a Blade comment --}}

{{--
    Multi-line
    Blade comment
--}}`
      }
    },
    {
      id: "best-practices",
      heading: "Best Practices",
      level: 2,
      content: [
        "Tips untuk menulis Blade template yang maintainable dan efficient."
      ],
      code: {
        language: "text",
        example: `✅ DO:
• Gunakan {{ }} untuk escape data (mencegah XSS)
• Buat master layout untuk konsistensi struktur
• Gunakan Components untuk reusable UI elements
• Pisahkan logic dari view (pindah ke Controller/Component class)
• Gunakan @forelse untuk handle empty data
• Buat partials untuk UI yang sering dipakai

❌ DON'T:
• Jangan gunakan {!! !!} untuk user input
• Jangan tulis business logic di view
• Jangan hardcode URLs, gunakan route() helper
• Jangan gunakan @php untuk complex logic
• Jangan nested @include terlalu dalam
• Jangan lupa @csrf di forms`
      },
      note: {
        type: "warning",
        content: "Selalu escape user input dengan {{ }}. Gunakan {!! !!} hanya untuk data yang sudah validated dan trusted (misalnya dari admin atau markdown parser)."
      }
    }
  ],
  keypoints: [
    {
      type: "concept",
      icon: "📄",
      text: "View memisahkan presentasi dari logic (MVC pattern)",
      color: "blue"
    },
    {
      type: "feature",
      icon: "⚡",
      text: "Blade: {{ }} auto-escape, @if, @foreach, @extends, @component",
      color: "purple"
    },
    {
      type: "best-practice",
      icon: "✨",
      text: "Gunakan Components untuk reusable UI, bukan @include",
      color: "green"
    },
    {
      type: "security",
      icon: "🔒",
      text: "Selalu escape user input, gunakan @csrf di forms",
      color: "yellow"
    }
  ]
};
