<script>
  import { createEventDispatcher } from 'svelte';
  import FeatureCard from './components/FeatureCard.svelte';
  
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
      icon: 'fa-solid fa-code',
      color: '#7F52FF',
      totalMateri: 17
    },
    {
      name: 'Flutter',
      description: 'Framework UI untuk membangun aplikasi mobile cross-platform',
      icon: 'fa-brands fa-android',
      color: '#02569B',
      totalMateri: 17
    },
    {
      name: 'JavaScript',
      description: 'Bahasa pemrograman untuk web development modern',
      icon: 'fa-brands fa-square-js',
      color: '#F7DF1E',
      totalMateri: 13
    }
  ];
  
  function selectCategory(category) {
    dispatch('categorySelect', category);
  }
</script>

<svelte:window on:scroll={handleScroll} />

<div class="landing-container">
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
        <a href="#home" class="nav-link" on:click={() => mobileMenuOpen = false}>Home</a>
        <a href="#about" class="nav-link" on:click={() => mobileMenuOpen = false}>Tentang</a>
        <a href="#categories" class="nav-link" on:click={() => mobileMenuOpen = false}>Materi</a>
        <a href="#testimonials" class="nav-link" on:click={() => mobileMenuOpen = false}>Testimoni</a>
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
          <span>Platform Pembelajaran Programming Terpercaya</span>
        </div>
        
        <h1 class="hero-title">
          Kuasai Programming dari <span class="highlight">Dasar hingga Profesional</span>
        </h1>
        
        <p class="hero-subtitle">
          Pembelajaran terstruktur dengan 67 materi lengkap dalam 4 teknologi modern. 
          Dirancang untuk pemula, mahasiswa, dan profesional yang ingin mengembangkan skill programming.
        </p>
        
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">67</div>
            <div class="stat-label">Materi Pembelajaran</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">4</div>
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
          <img src="/src/landing/assets/images/hero-illustration.svg" alt="Programming Illustration" class="hero-illustration" />
          <div class="floating-element floating-1">
            <img src="/src/landing/assets/images/laravel-icon.svg" alt="Laravel" />
          </div>
          <div class="floating-element floating-2">
            <img src="/src/landing/assets/images/kotlin-icon.svg" alt="Kotlin" />
          </div>
          <div class="floating-element floating-3">
            <img src="/src/landing/assets/images/flutter-icon.svg" alt="Flutter" />
          </div>
          <div class="floating-element floating-4">
            <img src="/src/landing/assets/images/javascript-icon.svg" alt="JavaScript" />
          </div>
        </div>
      </div>
    </div>
  </header>

  <section class="about-section" id="about">
    <div class="about-content">
      <div class="section-header">
        <h2 class="section-title-main">Pembelajaran yang Disesuaikan dengan Kebutuhan Anda</h2>
        <p class="section-description">Platform pembelajaran programming yang dirancang untuk mendukung perjalanan belajar Anda di setiap tahapan</p>
      </div>
      
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-visual">
            <img src="/src/landing/assets/images/learning-student.svg" alt="Pemula" class="benefit-image" />
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
            <img src="/src/landing/assets/images/learning-student.svg" alt="Mahasiswa" class="benefit-image" />
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
            <img src="/src/landing/assets/images/professional-coding.svg" alt="Profesional" class="benefit-image" />
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
            <img src="/src/landing/assets/images/mentor-discussion.svg" alt="Mentoring" class="benefit-image" />
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
          <div class="proof-stat-number">67</div>
          <div class="proof-stat-label">Materi Pembelajaran</div>
        </div>
        <div class="proof-stat-item">
          <div class="proof-stat-number">4</div>
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
            <img src="/src/landing/assets/images/avatar-1.svg" alt="Ahmad Rizki" class="author-avatar-img" />
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
            <img src="/src/landing/assets/images/avatar-2.svg" alt="Siti Nurhaliza" class="author-avatar-img" />
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
            <img src="/src/landing/assets/images/avatar-3.svg" alt="Budi Santoso" class="author-avatar-img" />
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

  <section class="categories" id="categories">
    <div class="categories-content">
      <div class="section-header">
        <h2 class="section-title-main">Pilih Teknologi untuk Memulai Pembelajaran</h2>
        <p class="section-description">Jelajahi 67 materi pembelajaran yang disusun secara sistematis dalam bahasa Indonesia dengan standar industri</p>
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

  <section class="cta-section">
    <div class="cta-content">
      <div class="cta-main">
        <h2 class="cta-title">Mulai Perjalanan Programming Anda Hari Ini</h2>
        <p class="cta-description">
          Akses penuh ke 67 materi pembelajaran dalam 4 teknologi modern. Pelajari dari dasar hingga level profesional dengan panduan lengkap dalam bahasa Indonesia.
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
        <p class="footer-tagline">Platform pembelajaran programming dengan materi lengkap dalam bahasa Indonesia. Belajar dari dasar hingga level profesional dengan standar industri.</p>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-heading">Teknologi</h4>
        <ul class="footer-links">
          <li><a href="#" on:click|preventDefault={() => selectCategory('Laravel')}>Laravel Development</a></li>
          <li><a href="#" on:click|preventDefault={() => selectCategory('Kotlin')}>Kotlin Programming</a></li>
          <li><a href="#" on:click|preventDefault={() => selectCategory('Flutter')}>Flutter Mobile</a></li>
          <li><a href="#" on:click|preventDefault={() => selectCategory('JavaScript')}>JavaScript Modern</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-heading">Resource</h4>
        <ul class="footer-links">
          <li><a href="#" on:click|preventDefault={() => window.scrollTo({top: 0, behavior: 'smooth'})}>Materi Pembelajaran</a></li>
          <li><a href="https://www.tiktok.com/@ubay.tech" target="_blank" rel="noopener noreferrer">Tips Programming</a></li>
          <li><a href="https://superproof.com" target="_blank" rel="noopener noreferrer">Mentoring Personal</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-heading">Connect</h4>
        <div class="footer-social">
          <a href="https://www.tiktok.com/@ubay.tech" target="_blank" rel="noopener noreferrer" aria-label="TikTok" class="footer-social-link">
            <i class="fa-brands fa-tiktok"></i>
          </a>
          <a href="https://superproof.com" target="_blank" rel="noopener noreferrer" aria-label="Superproof" class="footer-social-link">
            <i class="fa-solid fa-graduation-cap"></i>
          </a>
        </div>
        <p class="footer-contact">Pertanyaan? Hubungi melalui social media.</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 ubay.tech. Platform pembelajaran programming berbahasa Indonesia.</p>
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

  @media (max-width: 968px) {
    .navbar-menu {
      position: fixed;
      top: 0;
      right: -100%;
      width: 280px;
      height: 100vh;
      background: white;
      flex-direction: column;
      align-items: flex-start;
      padding: 80px 30px 30px;
      gap: 25px;
      box-shadow: -5px 0 20px rgba(0, 0, 0, 0.1);
      transition: right 0.3s ease;
    }

    .navbar-menu.active {
      right: 0;
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

  /* Hero Section - New Design */
  .hero {
    position: relative;
    padding: 140px 20px 80px;
    background: #4361EE;
    color: white;
    overflow: hidden;
    min-height: 650px;
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

  .hero-illustration {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.15));
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
    top: 10%;
    left: -10%;
    animation-delay: 0s;
  }

  .floating-2 {
    top: 20%;
    right: -8%;
    animation-delay: 0.5s;
  }

  .floating-3 {
    bottom: 30%;
    left: -8%;
    animation-delay: 1s;
  }

  .floating-4 {
    bottom: 15%;
    right: -5%;
    animation-delay: 1.5s;
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
      padding: 60px 20px;
    }

    .hero-title {
      font-size: 2rem;
    }

    .hero-subtitle {
      font-size: 1rem;
    }

    .stat-number {
      font-size: 2.2rem;
    }

    .hero-stats {
      gap: 30px;
    }

    .floating-element {
      width: 40px;
      height: 40px;
    }

    .btn-primary,
    .btn-secondary {
      padding: 14px 24px;
      font-size: 1rem;
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

  .footer-contact {
    color: #cbd5e0;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .footer-bottom {
    text-align: center;
    padding-top: 40px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .footer-bottom p {
    color: #a0aec0;
    font-size: 0.9rem;
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
