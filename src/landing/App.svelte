<script>
  import { createEventDispatcher } from 'svelte';
  import FeatureCard from './components/FeatureCard.svelte';
  import ChatWidget from './components/ChatWidget.svelte';
  
  const dispatch = createEventDispatcher();
  
  let mobileMenuOpen = false;
  let scrolled = false;
  
  // Handle scroll for navbar background
  function handleScroll() {
    scrolled = window.scrollY > 50;
  }
  
  function toggleMobileMenu() {
    mobileMenuOpen = !mobileMenuOpen;
  }
  
  const categories = [
    {
      name: 'Laravel',
      description: 'Framework PHP modern untuk pengembangan web aplikasi',
      icon: 'fa-brands fa-laravel',
      color: '#FF2D20',
      totalMateri: 20
    },
    {
      name: 'Kotlin',
      description: 'Bahasa pemrograman modern untuk Android dan backend',
      icon: 'fa-brands fa-android',
      color: '#7F52FF',
      totalMateri: 17
    },
    {
      name: 'Flutter',
      description: 'Framework UI untuk membangun aplikasi mobile cross-platform',
      icon: 'fa-brands fa-flutter',
      color: '#02569B',
      totalMateri: 17
    },
    {
      name: 'JavaScript',
      description: 'Bahasa pemrograman untuk web development modern',
      icon: 'fa-brands fa-square-js',
      color: '#F7DF1E',
      totalMateri: 25
    },
    {
      name: 'Python',
      description: 'Bahasa pemrograman serbaguna untuk AI, web, dan data science',
      icon: 'fa-brands fa-python',
      color: '#3776AB',
      totalMateri: 25
    },
    {
      name: 'NodeJS',
      description: 'Runtime JavaScript untuk backend & full-stack development',
      icon: 'fa-brands fa-node-js',
      color: '#339933',
      totalMateri: 25
    },
    {
      name: 'Git',
      description: 'Version control system untuk kolaborasi dan manajemen kode',
      icon: 'fa-brands fa-git-alt',
      color: '#F05032',
      totalMateri: 20
    }
  ];
  
  function selectCategory(category) {
    dispatch('categorySelect', category);
  }
  
  function goToMentor() {
    dispatch('goToMentor');
    mobileMenuOpen = false;
  }
  
  function goToPortfolio() {
    dispatch('goToPortfolio');
    mobileMenuOpen = false;
  }
  
  function goToLearning() {
    dispatch('goToLearning');
    mobileMenuOpen = false;
  }
</script>

<svelte:window on:scroll={handleScroll} />

<div class="landing-container">
  <!-- Mobile Menu Overlay -->
  {#if mobileMenuOpen}
    <div 
      class="mobile-menu-overlay" 
      on:click={toggleMobileMenu}
      on:keydown={(e) => e.key === 'Escape' && toggleMobileMenu()}
      role="button"
      tabindex="-1"
      aria-label="Close menu"
    ></div>
  {/if}

  <!-- Navigation Bar -->
  <nav class="navbar" class:scrolled>
    <div class="navbar-container">
      <div class="navbar-brand">
        <span class="brand-icon">
          <i class="fa-solid fa-code"></i>
        </span>
        <span class="brand-text">ubay.tech</span>
      </div>
      
      <div class="navbar-menu" class:active={mobileMenuOpen}>
        <button class="mobile-menu-close" on:click={toggleMobileMenu} aria-label="Close menu">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <a href="#categories" class="nav-link" on:click={() => mobileMenuOpen = false}>Kursus</a>
        <button class="nav-link" on:click={goToLearning}>Belajar</button>
        <button class="nav-link" on:click={goToMentor}>Mentor</button>
        <button class="nav-link" on:click={goToPortfolio}>Portfolio</button>
        <a href="https://www.tiktok.com/@ubay.tech" target="_blank" rel="noopener noreferrer" class="nav-link-social">
          <i class="fa-brands fa-tiktok"></i>
        </a>
        <a href="#categories" class="nav-btn" on:click={() => mobileMenuOpen = false}>
          Mulai Belajar
        </a>
      </div>
      
      <button class="mobile-menu-toggle" on:click={toggleMobileMenu} aria-label="Toggle menu">
        <span class="hamburger" class:active={mobileMenuOpen}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>
    </div>
  </nav>

  <header class="hero" id="home">
    <div class="hero-background-pattern"></div>
    <div class="hero-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
    
    <div class="hero-container">
      <div class="hero-content">
        <div class="hero-badge">
          <i class="fa-solid fa-star"></i>
          <span>Kursus Programming Surabaya - Software House Profesional</span>
        </div>
        
        <h1 class="hero-title">
          Kursus Programming & <span class="highlight">Jasa Pembuatan Aplikasi</span> di Surabaya
        </h1>
        
        <p class="hero-subtitle">
          <strong>PT Ubay Solusi Teknologi</strong> - Platform pembelajaran programming dengan 149 materi lengkap dan layanan software house profesional. Kursus Laravel, Flutter, Kotlin, JavaScript, Python, NodeJS, Git & GitHub. Jasa pembuatan aplikasi mobile & web di Surabaya.
        </p>
        
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">149</div>
            <div class="stat-label">Materi Pembelajaran</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">7</div>
            <div class="stat-label">Teknologi Modern</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">Bahasa Indonesia</div>
          </div>
        </div>
        
        <div class="hero-cta">
          <a href="#categories" class="btn-primary">
            <span>Mulai Belajar Sekarang</span>
            <i class="fa-solid fa-arrow-right"></i>
          </a>
          <a href="https://www.tiktok.com/@ubay.tech" target="_blank" rel="noopener noreferrer" class="btn-secondary">
            <i class="fa-brands fa-tiktok"></i>
            <span>Ikuti di TikTok</span>
          </a>
        </div>
      </div>
      
      <div class="hero-visual">
        <div class="hero-illustration-wrapper">
          <img src="/assets/images/hero-illustration.svg" alt="Programming Illustration" class="hero-illustration" />
          <div class="floating-element floating-1">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg" alt="Laravel" style="filter: none;" />
          </div>
          <div class="floating-element floating-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg" alt="Kotlin" />
          </div>
          <div class="floating-element floating-3">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg" alt="Flutter" />
          </div>
          <div class="floating-element floating-4">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JavaScript" />
          </div>
          <div class="floating-element floating-5">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" alt="Python" />
          </div>
          <div class="floating-element floating-6">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" alt="Node.js" />
          </div>
          <div class="floating-element floating-7">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" alt="Git" />
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Materi Pembelajaran Section -->
  <section class="categories" id="categories">
    <div class="categories-content">
      <div class="section-header">
        <h2 class="section-title-main">Pilih Teknologi untuk Memulai Pembelajaran</h2>
        <p class="section-description">Jelajahi 149 materi pembelajaran yang disusun secara sistematis dalam bahasa Indonesia dengan standar industri</p>
      </div>
      <div class="category-grid">
        {#each categories as category}
          <FeatureCard 
            {category} 
            on:click={() => selectCategory(category.name)} 
          />
        {/each}
      </div>
    </div>
  </section>

  <!-- Services Section - Jasa Pembuatan Aplikasi -->
  <section class="services-section" id="services">
    <div class="services-content">
      <div class="section-header">
        <h2 class="section-title-main">Jasa Pembuatan Aplikasi Mobile & Web Profesional</h2>
        <p class="section-description">PT Ubay Solusi Teknologi - Software house terpercaya di Surabaya. Kami menyediakan layanan pengembangan aplikasi custom dengan teknologi terkini dan tim developer berpengalaman.</p>
      </div>

      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon-wrapper">
            <div class="service-icon">
              <i class="fa-solid fa-mobile-screen-button"></i>
            </div>
          </div>
          <h3 class="service-title">Aplikasi Mobile</h3>
          <p class="service-description">
            Pembuatan aplikasi Android & iOS native atau cross-platform menggunakan Flutter dan Kotlin. Aplikasi mobile yang responsif, cepat, dan user-friendly.
          </p>
          <ul class="service-features">
            <li><i class="fa-solid fa-check-circle"></i> Android & iOS Development</li>
            <li><i class="fa-solid fa-check-circle"></i> Flutter Cross-Platform</li>
            <li><i class="fa-solid fa-check-circle"></i> UI/UX Design Modern</li>
            <li><i class="fa-solid fa-check-circle"></i> Integration API & Database</li>
          </ul>
        </div>

        <div class="service-card featured">
          <div class="featured-badge">
            <i class="fa-solid fa-star"></i>
            <span>Paling Diminati</span>
          </div>
          <div class="service-icon-wrapper">
            <div class="service-icon">
              <i class="fa-solid fa-laptop-code"></i>
            </div>
          </div>
          <h3 class="service-title">Aplikasi Web</h3>
          <p class="service-description">
            Pembuatan website profesional, web application, dan sistem informasi berbasis web. Menggunakan Laravel, React, dan teknologi web modern lainnya.
          </p>
          <ul class="service-features">
            <li><i class="fa-solid fa-check-circle"></i> Website Company Profile</li>
            <li><i class="fa-solid fa-check-circle"></i> Web Application Custom</li>
            <li><i class="fa-solid fa-check-circle"></i> E-Commerce & Marketplace</li>
            <li><i class="fa-solid fa-check-circle"></i> Sistem Informasi Manajemen</li>
          </ul>
        </div>

        <div class="service-card">
          <div class="service-icon-wrapper">
            <div class="service-icon">
              <i class="fa-solid fa-code"></i>
            </div>
          </div>
          <h3 class="service-title">Software Development</h3>
          <p class="service-description">
            Layanan pengembangan software custom sesuai kebutuhan bisnis. Dari konsultasi, design, development, hingga maintenance dan support.
          </p>
          <ul class="service-features">
            <li><i class="fa-solid fa-check-circle"></i> Custom Software Solutions</li>
            <li><i class="fa-solid fa-check-circle"></i> Backend API Development</li>
            <li><i class="fa-solid fa-check-circle"></i> Database Design & Optimization</li>
            <li><i class="fa-solid fa-check-circle"></i> Maintenance & Support 24/7</li>
          </ul>
        </div>
      </div>

      <div class="services-cta">
        <h3 class="services-cta-title">Butuh Konsultasi untuk Project Anda?</h3>
        <p class="services-cta-description">
          Hubungi kami untuk diskusi kebutuhan aplikasi Anda. Tim kami siap membantu mewujudkan ide bisnis Anda menjadi aplikasi yang powerful dan scalable.
        </p>
        <div class="services-cta-buttons">
          <a href="https://wa.me/6281330972830?text=Halo%20Ubay%20Tech%2C%20saya%20ingin%20konsultasi%20tentang%20pembuatan%20aplikasi" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
            <i class="fa-brands fa-whatsapp"></i>
            <span>Konsultasi via WhatsApp</span>
          </a>
          <a href="https://www.tiktok.com/@ubay.tech" target="_blank" rel="noopener noreferrer" class="btn-tiktok">
            <i class="fa-brands fa-tiktok"></i>
            <span>Lihat Portfolio di TikTok</span>
          </a>
        </div>
      </div>

      <div class="why-choose-us">
        <h3 class="why-title">Mengapa Memilih PT Ubay Solusi Teknologi?</h3>
        <div class="why-grid">
          <div class="why-item">
            <div class="why-icon">
              <i class="fa-solid fa-shield-halved"></i>
            </div>
            <h4>Terpercaya & Profesional</h4>
            <p>Software house resmi dengan legalitas PT dan portfolio project yang solid</p>
          </div>
          <div class="why-item">
            <div class="why-icon">
              <i class="fa-solid fa-rocket"></i>
            </div>
            <h4>Teknologi Modern</h4>
            <p>Menggunakan tech stack terkini untuk performa aplikasi yang optimal</p>
          </div>
          <div class="why-item">
            <div class="why-icon">
              <i class="fa-solid fa-users"></i>
            </div>
            <h4>Tim Berpengalaman</h4>
            <p>Developer senior yang ahli di bidangnya dengan pengalaman industri</p>
          </div>
          <div class="why-item">
            <div class="why-icon">
              <i class="fa-solid fa-headset"></i>
            </div>
            <h4>Support Maksimal</h4>
            <p>Layanan konsultasi, development, hingga maintenance & support berkelanjutan</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section class="about-section" id="about">
    <div class="about-content">
      <div class="section-header">
        <h2 class="section-title-main">Pembelajaran yang Disesuaikan dengan Kebutuhan Anda</h2>
        <p class="section-description">Platform pembelajaran programming yang dirancang untuk mendukung perjalanan belajar Anda di setiap tahapan</p>
      </div>
      
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-visual">
            <img src="/assets/images/learning-student.svg" alt="Pemula" class="benefit-image" />
          </div>
          <div class="benefit-content-wrapper">
            <div class="benefit-icon-badge">
              <i class="fa-solid fa-graduation-cap"></i>
            </div>
            <h3 class="benefit-title">Pemula</h3>
            <p class="benefit-description">
              Materi fundamental yang terstruktur untuk membangun fondasi programming yang kuat
            </p>
            <ul class="benefit-list">
              <li><i class="fa-solid fa-check"></i> Pembelajaran step-by-step</li>
              <li><i class="fa-solid fa-check"></i> Penjelasan konsep dasar yang mendalam</li>
              <li><i class="fa-solid fa-check"></i> Latihan praktis untuk setiap topik</li>
            </ul>
          </div>
        </div>

        <div class="benefit-card">
          <div class="benefit-visual">
            <img src="/assets/images/learning-student.svg" alt="Mahasiswa" class="benefit-image" />
          </div>
          <div class="benefit-content-wrapper">
            <div class="benefit-icon-badge">
              <i class="fa-solid fa-book-open-reader"></i>
            </div>
            <h3 class="benefit-title">Mahasiswa</h3>
            <p class="benefit-description">
              Panduan lengkap untuk menyelesaikan tugas dan project akademis dengan best practice
            </p>
            <ul class="benefit-list">
              <li><i class="fa-solid fa-check"></i> Implementasi konsep kuliah ke kode</li>
              <li><i class="fa-solid fa-check"></i> Troubleshooting error umum</li>
              <li><i class="fa-solid fa-check"></i> Code review dan optimization tips</li>
            </ul>
          </div>
        </div>

        <div class="benefit-card">
          <div class="benefit-visual">
            <img src="/assets/images/professional-coding.svg" alt="Profesional" class="benefit-image" />
          </div>
          <div class="benefit-content-wrapper">
            <div class="benefit-icon-badge">
              <i class="fa-solid fa-laptop-code"></i>
            </div>
            <h3 class="benefit-title">Profesional</h3>
            <p class="benefit-description">
              Solusi development untuk otomasi bisnis dan peningkatan produktivitas kerja
            </p>
            <ul class="benefit-list">
              <li><i class="fa-solid fa-check"></i> Architecture patterns untuk scalability</li>
              <li><i class="fa-solid fa-check"></i> Integration dengan sistem existing</li>
              <li><i class="fa-solid fa-check"></i> Performance optimization techniques</li>
            </ul>
          </div>
        </div>

        <div class="benefit-card">
          <div class="benefit-visual">
            <img src="/assets/images/mentor-discussion.svg" alt="Mentoring" class="benefit-image" />
          </div>
          <div class="benefit-content-wrapper">
            <div class="benefit-icon-badge">
              <i class="fa-solid fa-user-tie"></i>
            </div>
            <h3 class="benefit-title">Mentoring</h3>
            <p class="benefit-description">
              Bimbingan personal dari praktisi berpengalaman untuk project development
            </p>
            <ul class="benefit-list">
              <li><i class="fa-solid fa-check"></i> Code review dan feedback detail</li>
              <li><i class="fa-solid fa-check"></i> Konsultasi arsitektur aplikasi</li>
              <li><i class="fa-solid fa-check"></i> Career guidance dan portfolio building</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Social Proof Section -->
  <section class="social-proof-section" id="testimonials">
    <div class="social-proof-content">
      <div class="section-header">
        <h2 class="section-title-main">Dipercaya oleh Pembelajar di Seluruh Indonesia</h2>
        <p class="section-description">Platform pembelajaran yang telah membantu ratusan siswa mencapai tujuan programming mereka</p>
      </div>

      <div class="proof-stats">
        <div class="proof-stat-item">
          <div class="proof-stat-number">1000+</div>
          <div class="proof-stat-label">Pembelajar Aktif</div>
        </div>
        <div class="proof-stat-item">
          <div class="proof-stat-number">129</div>
          <div class="proof-stat-label">Materi Pembelajaran</div>
        </div>
        <div class="proof-stat-item">
          <div class="proof-stat-number">6</div>
          <div class="proof-stat-label">Teknologi Modern</div>
        </div>
        <div class="proof-stat-item">
          <div class="proof-stat-number">24/7</div>
          <div class="proof-stat-label">Akses Materi</div>
        </div>
      </div>

      <div class="testimonials-grid">
        <div class="testimonial-card">
          <div class="testimonial-rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <p class="testimonial-text">
            "Materi Laravel sangat lengkap dan mudah dipahami. Dari yang tidak tahu sama sekali, sekarang sudah bisa bikin aplikasi web sendiri."
          </p>
          <div class="testimonial-author">
            <img src="/assets/images/avatar-1.svg" alt="Ahmad Rizki" class="author-avatar-img" />
            <div class="author-info">
              <div class="author-name">Ahmad Rizki</div>
              <div class="author-role">Mahasiswa Informatika</div>
            </div>
            <div class="verified-badge">
              <i class="fa-solid fa-circle-check"></i>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <p class="testimonial-text">
            "Tutorial Flutter-nya sangat membantu untuk tugas akhir. Penjelasannya detail dan contoh kodenya bisa langsung dipakai."
          </p>
          <div class="testimonial-author">
            <img src="/assets/images/avatar-2.svg" alt="Siti Nurhaliza" class="author-avatar-img" />
            <div class="author-info">
              <div class="author-name">Siti Nurhaliza</div>
              <div class="author-role">Fresh Graduate</div>
            </div>
            <div class="verified-badge">
              <i class="fa-solid fa-circle-check"></i>
            </div>
          </div>
        </div>

        <div class="testimonial-card">
          <div class="testimonial-rating">
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
            <i class="fa-solid fa-star"></i>
          </div>
          <p class="testimonial-text">
            "Sebagai professional yang ingin upskilling, platform ini sangat membantu. Materi up-to-date dan sesuai kebutuhan industri."
          </p>
          <div class="testimonial-author">
            <img src="/assets/images/avatar-3.svg" alt="Budi Santoso" class="author-avatar-img" />
            <div class="author-info">
              <div class="author-name">Budi Santoso</div>
              <div class="author-role">Backend Developer</div>
            </div>
            <div class="verified-badge">
              <i class="fa-solid fa-circle-check"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section">
    <div class="cta-content">
      <div class="cta-main">
        <h2 class="cta-title">Mulai Perjalanan Programming Anda Hari Ini</h2>
        <p class="cta-description">
          Akses penuh ke 149 materi pembelajaran dalam 7 teknologi modern. Pelajari dari dasar hingga level profesional dengan panduan lengkap dalam bahasa Indonesia.
        </p>
        <div class="cta-benefits">
          <div class="cta-benefit-item">
            <i class="fa-solid fa-check-circle"></i>
            <span>Akses materi selamanya</span>
          </div>
          <div class="cta-benefit-item">
            <i class="fa-solid fa-check-circle"></i>
            <span>Update materi berkala</span>
          </div>
          <div class="cta-benefit-item">
            <i class="fa-solid fa-check-circle"></i>
            <span>Best practice industri</span>
          </div>
        </div>
        <button class="cta-primary-button" on:click={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <span>Jelajahi Materi Pembelajaran</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>

      <div class="cta-social">
        <h3 class="cta-social-title">Ikuti Update & Tips Programming</h3>
        <div class="cta-social-buttons">
          <a href="https://www.tiktok.com/@ubay.tech" target="_blank" rel="noopener noreferrer" class="cta-social-button tiktok">
            <i class="fa-brands fa-tiktok"></i>
            <div class="social-info">
              <span class="social-platform">TikTok</span>
              <span class="social-handle">@ubay.tech</span>
            </div>
          </a>
          <a href="https://superproof.com" target="_blank" rel="noopener noreferrer" class="cta-social-button superproof">
            <i class="fa-solid fa-graduation-cap"></i>
            <div class="social-info">
              <span class="social-platform">Superproof</span>
              <span class="social-handle">Mentoring Personal</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section footer-about">
        <h3 class="footer-brand">ubay.tech</h3>
        <p class="footer-tagline">Platform pembelajaran programming dan software house profesional. Kursus programming Surabaya, jasa pembuatan aplikasi mobile & web. Dibawah naungan <strong>PT Ubay Solusi Teknologi</strong>.</p>
        <div class="footer-location">
          <i class="fa-solid fa-map-marker-alt"></i>
          <span>Surabaya, Jawa Timur, Indonesia</span>
        </div>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-heading">Kursus Programming</h4>
        <ul class="footer-links">
          <li><a href="#categories" on:click|preventDefault={() => selectCategory('Laravel')}>Kursus Laravel</a></li>
          <li><a href="#categories" on:click|preventDefault={() => selectCategory('Flutter')}>Kursus Flutter</a></li>
          <li><a href="#categories" on:click|preventDefault={() => selectCategory('Kotlin')}>Kursus Kotlin</a></li>
          <li><a href="#categories" on:click|preventDefault={() => selectCategory('JavaScript')}>Kursus JavaScript</a></li>
          <li><a href="#categories" on:click|preventDefault={() => selectCategory('Python')}>Kursus Python</a></li>
          <li><a href="#categories" on:click|preventDefault={() => selectCategory('NodeJS')}>Kursus Node.js</a></li>
          <li><a href="#categories" on:click|preventDefault={() => selectCategory('Git')}>Kursus Git & GitHub</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-heading">Layanan</h4>
        <ul class="footer-links">
          <li><a href="#services">Jasa Pembuatan Aplikasi</a></li>
          <li><a href="#services">Aplikasi Mobile Android & iOS</a></li>
          <li><a href="#services">Aplikasi Web & Website</a></li>
          <li><a href="#services">Software Development</a></li>
          <li><a href="#about">Tentang Kami</a></li>
          <li><a href="#testimonials">Testimoni</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-heading">Hubungi Kami</h4>
        <div class="footer-social">
          <a href="https://www.tiktok.com/@ubay.tech" target="_blank" rel="noopener noreferrer" aria-label="TikTok" class="footer-social-link">
            <i class="fa-brands fa-tiktok"></i>
          </a>
          <a href="https://wa.me/6281330972830?text=Halo%20Ubay%20Tech" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" class="footer-social-link">
            <i class="fa-brands fa-whatsapp"></i>
          </a>
          <a href="https://superproof.com" target="_blank" rel="noopener noreferrer" aria-label="Superproof" class="footer-social-link">
            <i class="fa-solid fa-graduation-cap"></i>
          </a>
        </div>
        <div class="footer-contact-info">
          <p class="footer-contact">
            <i class="fa-solid fa-phone"></i>
            <a href="tel:+6281330972830">+62 813-3097-2830</a>
          </p>
          <p class="footer-contact">
            <i class="fa-solid fa-envelope"></i>
            <span>Konsultasi via WhatsApp</span>
          </p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 <strong>PT Ubay Solusi Teknologi</strong> | ubay.tech - Kursus Programming Surabaya & Jasa Pembuatan Aplikasi</p>
      <p class="footer-keywords">Software House Surabaya | Developer Aplikasi Mobile & Web | Belajar Programming Online</p>
    </div>
  </footer>
</div>

<style>
  * {
    scroll-behavior: smooth;
  }

  .landing-container {
    min-height: 100vh;
    background: #F7FAFC;
  }

  /* Navigation Bar */
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: transparent;
    transition: all 0.3s ease;
    padding: 20px 0;
  }

  .navbar.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
  }

  .navbar-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .navbar-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.5rem;
    font-weight: 800;
    color: white;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .navbar.scrolled .navbar-brand {
    color: #2D3748;
  }

  .brand-icon {
    width: 40px;
    height: 40px;
    background: #FFD700;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #2D3748;
    font-size: 1.2rem;
  }

  .brand-text {
    font-weight: 800;
    letter-spacing: -0.5px;
  }

  .navbar-menu {
    display: flex;
    align-items: center;
    gap: 35px;
  }

  .nav-link {
    color: white;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    transition: all 0.3s ease;
    position: relative;
    background: none;
    border: none;
    cursor: pointer;
  }

  .navbar.scrolled .nav-link {
    color: #4A5568;
  }

  .nav-link:hover {
    color: #FFD700;
  }

  .navbar.scrolled .nav-link:hover {
    color: #4361EE;
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: #FFD700;
    transition: width 0.3s ease;
  }

  .navbar.scrolled .nav-link::after {
    background: #4361EE;
  }

  .nav-link:hover::after {
    width: 100%;
  }

  .nav-link-social {
    color: white;
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }

  .navbar.scrolled .nav-link-social {
    color: #4A5568;
  }

  .nav-link-social:hover {
    color: #FFD700;
    transform: scale(1.2);
  }

  .navbar.scrolled .nav-link-social:hover {
    color: #4361EE;
  }

  .nav-btn {
    background: #FFD700;
    color: #2D3748;
    padding: 10px 24px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.95rem;
    transition: all 0.3s ease;
    border: 2px solid #FFD700;
  }

  .nav-btn:hover {
    background: transparent;
    color: #FFD700;
    transform: translateY(-2px);
  }

  .navbar.scrolled .nav-btn {
    background: #4361EE;
    color: white;
    border-color: #4361EE;
  }

  .navbar.scrolled .nav-btn:hover {
    background: transparent;
    color: #4361EE;
  }

  .mobile-menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
  }

  .mobile-menu-close {
    display: none;
  }

  .hamburger {
    width: 28px;
    height: 20px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .hamburger span {
    width: 100%;
    height: 3px;
    background: white;
    border-radius: 2px;
    transition: all 0.3s ease;
  }

  .navbar.scrolled .hamburger span {
    background: #2D3748;
  }

  .hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(6px, 6px);
  }

  .hamburger.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(6px, -6px);
  }

  /* Mobile Menu Overlay */
  .mobile-menu-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 998;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 968px) {
    .navbar-menu {
      position: fixed;
      top: 0;
      right: -100%;
      width: 100%;
      max-width: 320px;
      height: 100vh;
      background: white;
      flex-direction: column;
      align-items: flex-start;
      padding: 80px 30px 30px;
      gap: 25px;
      box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
      transition: right 0.3s ease;
      z-index: 999;
      overflow-y: auto;
    }

    .navbar-menu.active {
      right: 0;
    }

    .mobile-menu-close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #F7FAFC;
      border: none;
      color: #2D3748;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }

    .mobile-menu-close:hover {
      background: #E2E8F0;
      color: #4361EE;
    }

    .nav-link,
    .nav-link-social {
      color: #2D3748;
      font-size: 1.1rem;
    }

    .nav-link:hover {
      color: #4361EE;
    }

    .nav-btn {
      background: #4361EE;
      color: white;
      border-color: #4361EE;
      width: 100%;
      text-align: center;
    }

    .mobile-menu-toggle {
      display: block;
    }
  }

  @media (max-width: 480px) {
    .navbar-menu {
      max-width: 100%;
      width: 100%;
    }
  }

  /* Hero Section - New Design */
  .hero {
    position: relative;
    padding: 140px 20px 80px;
    background: #4361EE;
    color: white;
    overflow: hidden;
    min-height: 650px;
  }

  @media (max-width: 768px) {
    .hero {
      padding: 100px 20px 60px;
      min-height: auto;
    }
  }

  .hero-background-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    background-image: 
      radial-circle(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
    background-size: 600px 600px, 800px 800px;
    z-index: 1;
  }

  .hero-shapes {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    overflow: hidden;
  }

  .shape {
    position: absolute;
    opacity: 0.1;
  }

  .shape-1 {
    width: 200px;
    height: 200px;
    border: 3px solid white;
    border-radius: 50%;
    top: 10%;
    left: 5%;
  }

  .shape-2 {
    width: 150px;
    height: 150px;
    border: 3px solid white;
    top: 60%;
    right: 8%;
    transform: rotate(45deg);
  }

  .shape-3 {
    width: 100px;
    height: 100px;
    border: 3px solid white;
    border-radius: 50%;
    bottom: 15%;
    left: 15%;
  }

  .hero-container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    position: relative;
    z-index: 3;
  }

  .hero-content {
    text-align: left;
    max-width: 100%;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.15);
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 25px;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  @media (max-width: 480px) {
    .hero-badge {
      font-size: 0.75rem;
      padding: 6px 14px;
      gap: 6px;
    }

    .hero-badge span {
      display: inline;
      word-break: break-word;
    }
  }

  .hero-badge i {
    color: #FFD700;
  }

  .hero-title {
    font-size: 3.2rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 25px;
    letter-spacing: -1px;
  }

  .hero-title .highlight {
    color: #FFD700;
    position: relative;
  }

  .hero-subtitle {
    font-size: 1.15rem;
    line-height: 1.7;
    opacity: 0.95;
    margin-bottom: 40px;
    font-weight: 400;
  }

  .hero-stats {
    display: flex;
    gap: 40px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }

  @media (max-width: 640px) {
    .hero-stats {
      gap: 20px;
      margin-bottom: 30px;
    }
  }

  .stat-item {
    text-align: left;
  }

  .stat-number {
    font-size: 2.8rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 8px;
    color: #FFD700;
  }

  .stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
    font-weight: 500;
  }

  .hero-cta {
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
  }

  @media (max-width: 640px) {
    .hero-cta {
      flex-direction: column;
      width: 100%;
    }

    .hero-cta a {
      width: 100%;
      justify-content: center;
    }
  }

  /* Hero Visual */
  .hero-visual {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero-illustration-wrapper {
    position: relative;
    width: 100%;
    max-width: 500px;
  }

  .hero-code-window {
    background: #1e293b;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .code-window-header {
    background: #0f172a;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .code-dots {
    display: flex;
    gap: 8px;
  }

  .code-dots span {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: block;
  }

  .code-dots span:nth-child(1) {
    background: #ef4444;
  }

  .code-dots span:nth-child(2) {
    background: #f59e0b;
  }

  .code-dots span:nth-child(3) {
    background: #10b981;
  }

  .code-content {
    padding: 24px;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    line-height: 1.8;
    color: #94a3b8;
  }

  .code-line {
    margin-bottom: 4px;
  }

  .code-keyword {
    color: #c792ea;
    font-weight: 600;
  }

  .code-function {
    color: #82aaff;
  }

  .code-string {
    color: #c3e88d;
  }

  .floating-element {
    position: absolute;
    width: 60px;
    height: 60px;
    border-radius: 12px;
    background: white;
    padding: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    animation: float 3s ease-in-out infinite;
  }

  .floating-element img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .floating-1 {
    top: 5%;
    left: -10%;
    animation-delay: 0s;
  }

  .floating-2 {
    top: 25%;
    right: -8%;
    animation-delay: 0.5s;
  }

  .floating-3 {
    bottom: 35%;
    left: -8%;
    animation-delay: 1s;
  }

  .floating-4 {
    bottom: 20%;
    right: -5%;
    animation-delay: 1.5s;
  }

  .floating-5 {
    top: 50%;
    right: -12%;
    animation-delay: 2s;
  }

  .floating-6 {
    bottom: 5%;
    left: 5%;
    animation-delay: 2.5s;
  }

  .floating-7 {
    top: 40%;
    right: 8%;
    animation-delay: 3s;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .btn-primary,
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 1.05rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: none;
  }

  .btn-primary {
    background: #FFD700;
    color: #2D3748;
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 215, 0, 0.4);
    background: #FFC700;
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
  }

  /* Responsive Hero */
  @media (max-width: 968px) {
    .hero-container {
      grid-template-columns: 1fr;
      gap: 40px;
      text-align: center;
    }

    .hero-content {
      text-align: center;
    }

    .hero-stats {
      justify-content: center;
    }

    .stat-item {
      text-align: center;
    }

    .hero-cta {
      justify-content: center;
    }

    .hero-title {
      font-size: 2.5rem;
    }

    .hero-illustration-wrapper {
      max-width: 400px;
      margin: 0 auto;
    }

    .floating-element {
      width: 50px;
      height: 50px;
    }
  }

  @media (max-width: 640px) {
    .hero {
      padding: 100px 15px 50px;
    }

    .hero-title {
      font-size: 1.8rem;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 0.95rem;
      margin-bottom: 30px;
    }

    .stat-number {
      font-size: 2rem;
    }

    .stat-label {
      font-size: 0.8rem;
    }

    .hero-stats {
      gap: 20px;
    }

    .floating-element {
      display: none;
    }

    .hero-illustration {
      max-width: 280px;
    }

    .btn-primary,
    .btn-secondary {
      padding: 12px 20px;
      font-size: 0.95rem;
    }
  }

  @media (max-width: 480px) {
    .hero {
      padding: 90px 15px 40px;
    }

    .hero-title {
      font-size: 1.6rem;
    }

    .hero-badge {
      font-size: 0.8rem;
      padding: 6px 16px;
    }

    .stat-number {
      font-size: 1.8rem;
    }
  }

  /* About Section */
  .about-section {
    padding: 120px 20px;
    background: #FFFFFF;
    position: relative;
  }

  .about-section::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 300px;
    border: 2px solid #4361EE;
    border-radius: 50%;
    opacity: 0.05;
    transform: translate(50%, -50%);
  }

  .about-content {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .section-header {
    text-align: center;
    margin-bottom: 80px;
  }

  .section-title-main {
    font-size: 2.5rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .section-description {
    font-size: 1.15rem;
    color: #718096;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 40px;
  }

  .benefit-card {
    background: #FFFFFF;
    border-radius: 20px;
    border: 2px solid #E2E8F0;
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .benefit-card:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 50px rgba(67, 97, 238, 0.15);
    border-color: #4361EE;
  }

  .benefit-visual {
    width: 100%;
    height: 200px;
    overflow: hidden;
    background: #F7FAFC;
    border-bottom: 2px solid #E2E8F0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }

  .benefit-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: transform 0.4s ease;
  }

  .benefit-card:hover .benefit-image {
    transform: scale(1.05);
  }

  .benefit-content-wrapper {
    padding: 30px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .benefit-icon-badge {
    width: 50px;
    height: 50px;
    background: #4361EE;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }

  .benefit-icon-badge i {
    font-size: 24px;
    color: white;
  }

  .benefit-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 16px;
  }

  .benefit-description {
    font-size: 1rem;
    color: #718096;
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .benefit-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .benefit-list li {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    font-size: 0.95rem;
    color: #4A5568;
    margin-bottom: 12px;
    line-height: 1.5;
  }

  .benefit-list li:last-child {
    margin-bottom: 0;
  }

  .benefit-list i {
    color: #48BB78;
    font-size: 16px;
    margin-top: 2px;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    .benefits-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .benefit-visual {
      height: 180px;
    }

    .section-title-main {
      font-size: 2rem;
    }
  }

  /* Social Proof Section */
  .social-proof-section {
    padding: 120px 20px;
    background: #F7FAFC;
  }

  .social-proof-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .proof-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
    margin: 60px 0;
    padding: 40px 0;
    border-top: 2px solid #E2E8F0;
    border-bottom: 2px solid #E2E8F0;
  }

  .proof-stat-item {
    text-align: center;
  }

  .proof-stat-number {
    font-size: 3rem;
    font-weight: 800;
    color: #4361EE;
    margin-bottom: 10px;
    line-height: 1;
  }

  .proof-stat-label {
    font-size: 1rem;
    color: #718096;
    font-weight: 500;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
    margin-top: 60px;
  }

  .testimonial-card {
    background: #FFFFFF;
    padding: 35px;
    border-radius: 20px;
    border: 2px solid #E2E8F0;
    transition: all 0.3s ease;
    position: relative;
  }

  .testimonial-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(67, 97, 238, 0.12);
    border-color: #4361EE;
  }

  .testimonial-rating {
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
  }

  .testimonial-rating i {
    color: #FFD700;
    font-size: 18px;
  }

  .testimonial-text {
    font-size: 1.05rem;
    color: #4A5568;
    line-height: 1.7;
    margin-bottom: 25px;
    font-style: italic;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 15px;
    position: relative;
  }

  .author-avatar-img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    flex-shrink: 0;
    border: 3px solid #E2E8F0;
    background: white;
  }

  .author-info {
    flex: 1;
  }

  .author-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 3px;
  }

  .author-role {
    font-size: 0.9rem;
    color: #718096;
  }

  .verified-badge {
    color: #48BB78;
    font-size: 20px;
  }

  @media (max-width: 768px) {
    .testimonials-grid {
      grid-template-columns: 1fr;
    }

    .proof-stats {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }

    .proof-stat-number {
      font-size: 2.5rem;
    }
  }

  .categories {
    padding: 120px 20px;
    background: #FFFFFF;
    position: relative;
  }

  .categories::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 300px;
    height: 300px;
    border: 2px solid #48BB78;
    opacity: 0.05;
    transform: translate(-50%, 50%) rotate(45deg);
  }

  .categories-content {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 35px;
    margin-top: 60px;
  }

  @media (max-width: 768px) {
    .category-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Services Section - Jasa Pembuatan Aplikasi */
  .services-section {
    padding: 120px 20px;
    background: linear-gradient(180deg, #F7FAFC 0%, #FFFFFF 100%);
    position: relative;
  }

  .services-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 35px;
    margin-top: 60px;
    margin-bottom: 80px;
  }

  .service-card {
    background: #FFFFFF;
    border-radius: 20px;
    border: 2px solid #E2E8F0;
    padding: 40px 35px;
    transition: all 0.4s ease;
    position: relative;
    overflow: visible;
  }

  .service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(67, 97, 238, 0.15);
    border-color: #4361EE;
  }

  .service-card.featured {
    border-color: #4361EE;
    background: linear-gradient(135deg, #4361EE 0%, #3451cc 100%);
    color: white;
    transform: scale(1.05);
  }

  .service-card.featured:hover {
    transform: translateY(-10px) scale(1.05);
  }

  .featured-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background: #FFD700;
    color: #2D3748;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .featured-badge i {
    font-size: 14px;
  }

  .service-icon-wrapper {
    margin-bottom: 25px;
  }

  .service-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #4361EE 0%, #5a75f9 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 36px;
    box-shadow: 0 10px 30px rgba(67, 97, 238, 0.3);
  }

  .service-card.featured .service-icon {
    background: white;
    color: #4361EE;
  }

  .service-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 16px;
  }

  .service-card.featured .service-title {
    color: white;
  }

  .service-description {
    font-size: 1.05rem;
    color: #4A5568;
    line-height: 1.7;
    margin-bottom: 25px;
  }

  .service-card.featured .service-description {
    color: rgba(255, 255, 255, 0.95);
  }

  .service-features {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .service-features li {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 0.95rem;
    color: #4A5568;
    margin-bottom: 14px;
    line-height: 1.5;
  }

  .service-card.featured .service-features li {
    color: white;
  }

  .service-features i {
    color: #48BB78;
    font-size: 18px;
    flex-shrink: 0;
  }

  .service-card.featured .service-features i {
    color: #FFD700;
  }

  .services-cta {
    background: linear-gradient(135deg, #4361EE 0%, #3451cc 100%);
    padding: 60px 50px;
    border-radius: 25px;
    text-align: center;
    color: white;
    margin-bottom: 80px;
    position: relative;
    overflow: hidden;
  }

  .services-cta::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 1;
  }

  .services-cta > * {
    position: relative;
    z-index: 1;
  }

  .services-cta-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .services-cta-description {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 35px;
    opacity: 0.95;
  }

  .services-cta-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-whatsapp,
  .btn-tiktok {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 1.05rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .btn-whatsapp {
    background: #25D366;
    color: white;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
  }

  .btn-whatsapp:hover {
    background: #20BA5A;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(37, 211, 102, 0.4);
  }

  .btn-tiktok {
    background: white;
    color: #2D3748;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .btn-tiktok:hover {
    background: #F7FAFC;
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .why-choose-us {
    background: #FFFFFF;
    padding: 60px 50px;
    border-radius: 25px;
    border: 2px solid #E2E8F0;
  }

  .why-title {
    font-size: 2rem;
    font-weight: 700;
    color: #2D3748;
    text-align: center;
    margin-bottom: 50px;
  }

  .why-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
  }

  .why-item {
    text-align: center;
  }

  .why-icon {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #4361EE 0%, #5a75f9 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: white;
    font-size: 32px;
    box-shadow: 0 10px 30px rgba(67, 97, 238, 0.2);
  }

  .why-item h4 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 12px;
  }

  .why-item p {
    font-size: 0.95rem;
    color: #718096;
    line-height: 1.6;
  }

  @media (max-width: 968px) {
    .services-grid {
      grid-template-columns: 1fr;
    }

    .service-card.featured {
      transform: scale(1);
    }

    .service-card.featured:hover {
      transform: translateY(-10px) scale(1);
    }

    .services-cta {
      padding: 40px 30px;
    }

    .services-cta-title {
      font-size: 1.6rem;
    }

    .services-cta-buttons {
      flex-direction: column;
      width: 100%;
    }

    .btn-whatsapp,
    .btn-tiktok {
      width: 100%;
      justify-content: center;
    }

    .why-choose-us {
      padding: 40px 30px;
    }

    .why-grid {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }

  @media (max-width: 640px) {
    .services-section {
      padding: 80px 15px;
    }

    .service-card {
      padding: 30px 25px;
    }

    .services-cta {
      padding: 35px 20px;
    }

    .why-choose-us {
      padding: 35px 20px;
    }

    .why-title {
      font-size: 1.6rem;
    }
  }

  /* CTA Section */
  .cta-section {
    background: linear-gradient(135deg, #4361ee 0%, #3451cc 100%);
    padding: 100px 20px;
    color: white;
    position: relative;
    overflow: hidden;
  }

  .cta-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 1;
  }

  .cta-content {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .cta-main {
    text-align: center;
    margin-bottom: 60px;
  }

  .cta-title {
    font-size: 2.8rem;
    font-weight: 800;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .cta-description {
    font-size: 1.2rem;
    line-height: 1.8;
    opacity: 0.95;
    margin-bottom: 35px;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }

  .cta-benefits {
    display: flex;
    gap: 30px;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .cta-benefit-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.05rem;
    font-weight: 500;
  }

  .cta-benefit-item i {
    color: #ffd700;
    font-size: 20px;
  }

  .cta-primary-button {
    background: white;
    color: #4361ee;
    padding: 18px 40px;
    border: none;
    border-radius: 12px;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    transition: all 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .cta-primary-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    background: #ffd700;
    color: #2d3748;
  }

  .cta-social {
    text-align: center;
    padding-top: 60px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  .cta-social-title {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 30px;
    opacity: 0.95;
  }

  .cta-social-buttons {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .cta-social-button {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    padding: 20px 30px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.2);
    min-width: 250px;
    color: white;
  }

  .cta-social-button:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-3px);
    border-color: rgba(255, 255, 255, 0.4);
  }

  .cta-social-button i {
    font-size: 2.5rem;
    width: 55px;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    background: white;
    flex-shrink: 0;
  }

  .cta-social-button.tiktok i {
    color: #000000;
  }

  .cta-social-button.superproof i {
    color: #4361ee;
  }

  .social-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: left;
  }

  .social-platform {
    font-size: 1.1rem;
    font-weight: 600;
  }

  .social-handle {
    font-size: 0.9rem;
    opacity: 0.85;
  }

  .footer {
    background: #1a202c;
    color: white;
    padding: 80px 20px 30px;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 50px;
    margin-bottom: 50px;
  }

  .footer-about {
    max-width: 350px;
  }

  .footer-brand {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(120deg, #4361ee 0%, #5a75f9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 15px;
  }

  .footer-tagline {
    color: #cbd5e0;
    line-height: 1.7;
    font-size: 0.95rem;
    margin-bottom: 15px;
  }

  .footer-location {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #cbd5e0;
    font-size: 0.9rem;
    margin-top: 15px;
  }

  .footer-location i {
    color: #4361ee;
    font-size: 16px;
  }

  .footer-heading {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 20px;
    color: white;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li {
    margin-bottom: 12px;
  }

  .footer-links a {
    color: #cbd5e0;
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 0.95rem;
  }

  .footer-links a:hover {
    color: #4361ee;
  }

  .footer-social {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
  }

  .footer-social-link {
    width: 45px;
    height: 45px;
    background: #2d3748;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.3rem;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .footer-social-link:hover {
    background: #4361ee;
    transform: translateY(-3px);
  }

  .footer-contact-info {
    margin-top: 15px;
  }

  .footer-contact {
    color: #cbd5e0;
    font-size: 0.9rem;
    line-height: 1.6;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }

  .footer-contact i {
    color: #4361ee;
    font-size: 14px;
  }

  .footer-contact a {
    color: #cbd5e0;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-contact a:hover {
    color: #4361ee;
  }

  .footer-bottom {
    text-align: center;
    padding-top: 40px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .footer-bottom p {
    color: #a0aec0;
    font-size: 0.9rem;
    margin-bottom: 8px;
  }

  .footer-keywords {
    font-size: 0.85rem;
    color: #718096;
    margin-top: 5px;
  }

  @media (max-width: 968px) {
    .footer-content {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }

    .footer-about {
      grid-column: 1 / -1;
      max-width: 100%;
    }
  }

  @media (max-width: 640px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: 35px;
    }
  }

  /* Responsive Design */
  @media (max-width: 968px) {
    .hero-title {
      font-size: 2.8rem;
    }

    .section-title-main {
      font-size: 2rem;
    }

    .cta-title {
      font-size: 2.2rem;
    }

    .benefits-grid,
    .testimonials-grid,
    .category-grid {
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .proof-stats {
      grid-template-columns: repeat(2, 1fr);
      gap: 30px;
    }

    .cta-benefits {
      flex-direction: column;
      gap: 15px;
    }

    .cta-social-buttons {
      flex-direction: column;
      width: 100%;
    }

    .cta-social-button {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    .hero {
      padding: 80px 15px 60px;
    }

    .hero-title {
      font-size: 2.2rem;
    }

    .hero-subtitle {
      font-size: 1.05rem;
    }

    .hero-stats {
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .section-title-main {
      font-size: 1.75rem;
    }

    .section-description {
      font-size: 1rem;
    }

    .hero-cta,
    .benefits-grid,
    .testimonials-grid,
    .category-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .proof-stats {
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }

    .proof-stat-number {
      font-size: 2.5rem;
    }

    .cta-title {
      font-size: 1.8rem;
    }

    .cta-description {
      font-size: 1.05rem;
    }

    .cta-primary-button {
      width: 100%;
      justify-content: center;
    }

    .about-section,
    .social-proof-section,
    .categories,
    .cta-section {
      padding: 80px 15px;
    }

    .section-header {
      margin-bottom: 50px;
    }

    .footer-content {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .footer-social {
      justify-content: center;
    }

    .social-info {
      align-items: center;
      text-align: center;
    }
  }
</style>

<!-- Live Chat Widget -->
<ChatWidget />
