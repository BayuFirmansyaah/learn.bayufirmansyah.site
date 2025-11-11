# ubay.tech - Platform Pembelajaran Pemrograman Modern

Platform pembelajaran interaktif untuk belajar teknologi modern dengan materi lengkap, terstruktur, dan mudah dipahami. Semua materi disusun mengikuti best practice industry.

## 🚀 Teknologi

- **React** - Untuk halaman pembelajaran inti
- **Svelte** - Untuk landing page yang lightweight dan cepat
- **Vite** - Build tool modern dan super cepat
- **Font Awesome** - Icons untuk UI yang menarik

## 📚 Kategori Pembelajaran

### 1. Laravel (20 Materi)
Framework PHP paling populer untuk pengembangan web modern
- Pengenalan hingga Deployment
- MVC, Eloquent ORM, Authentication
- API Development, Best Practices

### 2. Kotlin (17 Materi)
Bahasa modern untuk Android dan multiplatform development
- Dasar hingga Advanced
- OOP, Coroutines, Null Safety
- Clean Code Best Practices

### 3. Flutter (17 Materi)
Framework UI untuk aplikasi cross-platform
- Widget, Layout, Navigation
- State Management, API Integration
- Clean Architecture

### 4. JavaScript (13 Materi)
Bahasa essential untuk web development
- ES6+ Modern Features
- Async Programming, DOM Manipulation
- Clean Code Principles

## 🎯 Fitur

- ✅ **67 Materi Pembelajaran** lengkap dalam Bahasa Indonesia
- ✅ **Layout 3 Kolom**: Sidebar kiri (daftar materi), Konten tengah, Sidebar kanan (key points)
- ✅ **Navigasi Mudah**: Klik kategori → langsung belajar
- ✅ **UI Modern**: Warna biru #4361ee yang clean dan professional
- ✅ **Responsive**: Optimal di desktop, tablet, dan mobile
- ✅ **Hot Reload**: Perubahan code langsung terlihat

## 📦 Instalasi

### Prerequisites
- Node.js (versi 16 atau lebih tinggi)
- npm atau yarn

### Langkah Instalasi

1. **Clone atau download project**
   ```bash
   cd learning.bayufirmansyah.site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Jalankan development server**
   ```bash
   npm run dev
   ```

4. **Buka browser**
   ```
   http://localhost:5173
   ```

## 🛠️ Commands

```bash
# Development server dengan hot reload
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview
```

## 📁 Struktur Project

```
learning.bayufirmansyah.site/
├── src/
│   ├── App.svelte                 # Root component
│   ├── main.js                    # Entry point
│   ├── landing/                   # Landing page (Svelte)
│   │   ├── App.svelte
│   │   └── components/
│   │       └── FeatureCard.svelte
│   └── learning/                  # Halaman pembelajaran (React)
│       ├── App.jsx
│       ├── Layout.jsx
│       ├── SidebarLeft.jsx        # Daftar materi
│       ├── Content.jsx            # Konten materi
│       ├── SidebarRight.jsx       # Key points
│       ├── styles.css
│       └── materi/                # Konten statis
│           ├── Laravel.js         # 20 materi
│           ├── Kotlin.js          # 17 materi
│           ├── Flutter.js         # 17 materi
│           └── JavaScript.js      # 13 materi
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🎨 Design System

### Warna Utama
- Primary Blue: `#4361ee`
- Background: `#f7fafc`
- Text: `#2d3748`
- Border: `#e2e8f0`

### Typography
- Font Family: System fonts (San Francisco, Segoe UI, Roboto)
- Heading: 600-700 weight
- Body: 400 weight

## 🌟 Cara Menggunakan

1. **Landing Page**: Pilih kategori pembelajaran (Laravel, Kotlin, Flutter, atau JavaScript)
2. **Sidebar Kiri**: Klik materi yang ingin dipelajari
3. **Konten Tengah**: Baca materi dengan penjelasan lengkap
4. **Sidebar Kanan**: Lihat key points untuk review cepat
5. **Tombol Kembali**: Kembali ke landing page untuk pilih kategori lain

## 📝 Menambah Konten Materi

Untuk menambah materi baru, edit file di `src/learning/materi/`:

```javascript
// Format materi
{
  title: "Judul Materi",
  content: `Konten materi dalam bahasa Indonesia.
  
  Bisa multiline dan mengandung penjelasan lengkap.`,
  keypoints: [
    "Poin penting pertama",
    "Poin penting kedua",
    "Dan seterusnya..."
  ]
}
```

## 🚀 Deployment

### Build Production

```bash
npm run build
```

File hasil build ada di folder `dist/`. Upload ke hosting pilihan:

- **Vercel**: `vercel --prod`
- **Netlify**: Drag & drop folder `dist` ke Netlify
- **GitHub Pages**: Push folder `dist` ke branch `gh-pages`
- **Hosting biasa**: Upload folder `dist` via FTP

### Environment Variables

Tidak ada environment variables yang diperlukan. Semua konten sudah statis.

## 🤝 Kontribusi

Project ini dibuat untuk pembelajaran. Silakan fork dan customize sesuai kebutuhan.

## 📄 License

Open source untuk keperluan pembelajaran.

## 👨‍💻 Dibuat Oleh

**ubay.tech** - Platform Pembelajaran Pemrograman Modern

---

**Happy Learning! 🎓**
