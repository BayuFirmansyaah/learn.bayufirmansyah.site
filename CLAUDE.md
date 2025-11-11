# CLAUDE.md

## Rencana Pengerjaan Web Pembelajaran `ubay.tech` Menggunakan React + Svelte

Dokumen ini menjelaskan **rencana kerja** (plan) yang harus dilakukan oleh AI Claude 4.5 untuk membangun web pembelajaran dengan layout: *sidebar kiri → konten tengah → sidebar kanan*. Semua konten dibuat statis di dalam kode, berbasis React dan Svelte, dengan landing page yang menggunakan **Font Awesome**.

---

## 1. Tujuan Utama
- Membangun platform pembelajaran dengan nama **ubay.tech**.
- Landing page modern dengan warna putih dan biru `#4361ee`, memanfaatkan ikon dari **Font Awesome**.
- Setelah memilih materi (Laravel, Kotlin, Flutter, JavaScript, dll), user diarahkan ke halaman pembelajaran dengan struktur:
  - **Sidebar kiri** → list urutan materi sesuai kategori.
  - **Konten tengah** → isi materi.
  - **Sidebar kanan** → key point / ringkasan materi.
- Konten pembelajaran statis dalam kode.
- Bahasa pengantar: **Bahasa Indonesia**.

---

## 2. Teknologi yang Digunakan
- **React** → untuk halaman materi inti.
- **Svelte** → untuk bagian tertentu yang membutuhkan interaktivitas ringan dan performa cepat.
- **Font Awesome** → ikon pada landing page.
- CSS / Tailwind minimal untuk styling.
- Tidak membutuhkan backend.

---

## 3. Struktur Proyek
```
project-root/
│
├── src/
│   ├── landing/ (Svelte landing page)
│   │   ├── App.svelte
│   │   └── components/
│   │       └── FeatureCard.svelte
│   │
│   ├── learning/ (React side)
│   │   ├── App.jsx
│   │   ├── Layout.jsx
│   │   ├── SidebarLeft.jsx
│   │   ├── SidebarRight.jsx
│   │   ├── Content.jsx
│   │   └── materi/
│   │       ├── Laravel.js
│   │       ├── Kotlin.js
│   │       ├── Flutter.js
│   │       └── JavaScript.js
│
└── package.json
```

---

## 4. Landing Page (`Svelte`)
Claude harus membuat landing page yang berisi:
- Judul besar **ubay.tech**.
- Deskripsi singkat tentang platform.
- Daftar kategori pembelajaran lengkap dengan ikon **Font Awesome**.
- Warna dominan putih + biru `#4361ee`.
- Gaya clean, tidak mencerminkan desain AI.

Contoh ikon:
- Laravel → `<i class="fa-brands fa-laravel"></i>`
- Kotlin → `<i class="fa-solid fa-code"></i>`
- Flutter → `<i class="fa-brands fa-android"></i>`
- JavaScript → `<i class="fa-brands fa-square-js"></i>`

---

## 5. Halaman Pembelajaran (React)
Claude harus membangun layout 3 kolom:

### `Layout.jsx`
Grid 3 kolom.

### `SidebarLeft.jsx`
List materi (static array per kategori).

### `Content.jsx`
Konten statis dari file materi.

### `SidebarRight.jsx`
Key point dari materi.

---

## 6. Format Materi Pembelajaran (React Component)
Setiap materi ditulis dalam komponen React:
```
export default {
  title: "Pengenalan Laravel",
  content: `Laravel adalah framework PHP modern...`,
  keypoints: [
    "Laravel menggunakan arsitektur MVC",
    "Menawarkan Eloquent ORM",
    "Routing yang sederhana",
  ]
}
```

---

## 7. Kategori Materi Statis dan Urutan Materi Lengkap (Best Practice)
Claude harus membuat **materi lengkap, berurutan, dan mengikuti best practice** untuk setiap kategori berikut.

### 📘 Laravel — Urutan Materi Lengkap
1. **Pengenalan Laravel**
2. **Instalasi & Persiapan Lingkungan**
3. **Struktur Folder Laravel**
4. **Routing Dasar**
5. **Controller**
6. **View & Blade Template**
7. **Model & Eloquent ORM**
8. **Migration & Schema Database**
9. **Seeder & Factory**
10. **Relasi Database (One to One, One to Many, Many to Many)**
11. **Request & Validation**
12. **CRUD Lengkap (Best Practice)**
13. **Middleware**
14. **Authentication Dasar**
15. **Authorization (Gate & Policy)**
16. **File Upload**
17. **API (Resource Controller + Sanctum)**
18. **API Pagination & Filtering**
19. **Eloquent Query Best Practice**
20. **Deployment ke Hosting / VPS**

---

### 📗 Kotlin — Urutan Materi Lengkap
1. **Pengenalan Kotlin**
2. **Instalasi & Setup Environment**
3. **Dasar Pemrograman Kotlin** (Variable, Tipe Data)
4. **Operator & Ekspresi**
5. **Control Flow (if, when, loop)**
6. **Fungsi**
7. **OOP Dasar (Class, Object)**
8. **Constructor, Inheritance**
9. **Interface & Abstract Class**
10. **Collection & Functional Programming**
11. **Null Safety (Best Practice Kotlin)**
12. **Extension Function**
13. **Data Class**
14. **Generics**
15. **Coroutine (Async Programming)**
16. **Membuat Aplikasi Konsol Kotlin**
17. **Best Practice Kotlin Style Guide**

---

### 📘 Flutter — Urutan Materi Lengkap
1. **Pengenalan Flutter**
2. **Instalasi Flutter & Setup Device**
3. **Struktur Project Flutter**
4. **Widget Dasar**
5. **Layouting (Row, Column, Stack, Flex)**
6. **Navigasi (Navigator 1.0 / 2.0)**
7. **State Management Dasar** (setState)
8. **State Management Lanjutan** (Provider / Riverpod)
9. **Form & Validation**
10. **HTTP Request (Dio / http)**
11. **Model & Parsing JSON**
12. **ListView, GridView, FutureBuilder**
13. **Local Storage (SharedPreferences / Hive)**
14. **Authentication UI + Logic**
15. **Handling Error & Loading State**
16. **Responsive UI**
17. **Clean Architecture Flutter (Best Practice)**

---

### 📙 JavaScript — Urutan Materi Lengkap
1. **Pengenalan JavaScript**
2. **Variabel, Tipe Data, Operator**
3. **Function & Scope**
4. **Array & Object**
5. **Loop & Conditional**
6. **ES6 Modern JavaScript** (let, const, arrow func, destructuring)
7. **DOM Manipulation**
8. **Event Listener**
9. **Async JS (Callback, Promise, Async-Await)**
10. **Fetch API**
11. **Modul JS**
12. **Bundler (Vite / Webpack)**
13. **Best Practice JavaScript Clean Code**

---

## 8. Task yang Harus Dikerjakan AI Claude 4.5 Task yang Harus Dikerjakan AI Claude 4.5
Claude harus:
1. Membuat struktur proyek React + Svelte lengkap.
2. Membuat landing page di Svelte dengan Font Awesome.
3. Membuat komponen layout React.
4. Membuat sidebar kiri berisi daftar materi.
5. Membuat sidebar kanan berisi key point.
6. Menulis konten materi statis dalam Bahasa Indonesia.
7. Mengatur routing sederhana antara landing page → halaman pembelajaran.
8. Menyesuaikan tema warna (#4361ee + putih).

---

## 9. Output Akhir
- Proyek React + Svelte lengkap dan siap dijalankan.
- Landing page ubay.tech yang clean dan modern.
- Struktur materi React statis.
- Layout pembelajaran dengan 3 kolom.

---

## 10. Cara Menjalankan
Claude harus menyertakan instruksi:
```
npm install
npm run dev
```
