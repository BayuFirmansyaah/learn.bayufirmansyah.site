<script>
  import { createEventDispatcher } from 'svelte';
  import FeatureCard from './components/FeatureCard.svelte';
  
  const dispatch = createEventDispatcher();
  
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

<div class="landing-container">
  <header class="hero">
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
  </header>

  <section class="about-section">
    <div class="about-content">
      <div class="section-header">
        <h2 class="section-title-main">Pembelajaran yang Disesuaikan dengan Kebutuhan Anda</h2>
        <p class="section-description">Platform pembelajaran programming yang dirancang untuk mendukung perjalanan belajar Anda di setiap tahapan</p>
      </div>
      
      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon-wrapper">
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

        <div class="benefit-card">
          <div class="benefit-icon-wrapper">
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

        <div class="benefit-card">
          <div class="benefit-icon-wrapper">
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

        <div class="benefit-card">
          <div class="benefit-icon-wrapper">
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
  </section>

  <!-- Social Proof Section -->
  <section class="social-proof-section">
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
            <div class="author-avatar">
              <i class="fa-solid fa-user"></i>
            </div>
            <div class="author-info">
              <div class="author-name">Ahmad Rizki</div>
              <div class="author-role">Mahasiswa Informatika</div>
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
            <div class="author-avatar">
              <i class="fa-solid fa-user"></i>
            </div>
            <div class="author-info">
              <div class="author-name">Siti Nurhaliza</div>
              <div class="author-role">Fresh Graduate</div>
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
            <div class="author-avatar">
              <i class="fa-solid fa-user"></i>
            </div>
            <div class="author-info">
              <div class="author-name">Budi Santoso</div>
              <div class="author-role">Backend Developer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="categories">
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
  .landing-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
  }

  .hero {
    text-align: center;
    padding: 100px 20px 80px;
    background: linear-gradient(135deg, #4361ee 0%, #3451cc 100%);
    color: white;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.4;
  }

  .hero-content {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 25px;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }

  .hero-badge i {
    color: #ffd700;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 800;
    line-height: 1.2;
    margin-bottom: 25px;
    letter-spacing: -1px;
  }

  .hero-title .highlight {
    background: linear-gradient(120deg, #ffd700 0%, #ffed4e 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    line-height: 1.7;
    opacity: 0.95;
    max-width: 700px;
    margin: 0 auto 40px;
    font-weight: 400;
  }

  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 60px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }

  .stat-item {
    text-align: center;
  }

  .stat-number {
    font-size: 3rem;
    font-weight: 800;
    line-height: 1;
    margin-bottom: 8px;
    background: linear-gradient(120deg, #ffffff 0%, #ffd700 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    font-size: 0.95rem;
    opacity: 0.9;
    font-weight: 500;
  }

  .hero-cta {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-primary,
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 32px;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .btn-primary {
    background: white;
    color: #4361ee;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  .btn-primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
    background: #ffd700;
    color: #2d3748;
  }

  .btn-secondary {
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  .btn-secondary:hover {
    background: rgba(255, 255, 255, 0.25);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-3px);
  }

  .about-section {
    padding: 120px 20px;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  }

  .about-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 80px;
  }

  .section-title-main {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .section-description {
    font-size: 1.15rem;
    color: #666;
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.6;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
  }

  .benefit-card {
    background: white;
    padding: 40px 30px;
    border-radius: 16px;
    border: 1px solid rgba(67, 97, 238, 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .benefit-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  .benefit-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(67, 97, 238, 0.15);
    border-color: var(--primary-color);
  }

  .benefit-card:hover::before {
    transform: scaleX(1);
  }

  .benefit-icon-wrapper {
    width: 64px;
    height: 64px;
    background: linear-gradient(135deg, var(--primary-color), #5a75f9);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
  }

  .benefit-icon-wrapper i {
    font-size: 28px;
    color: white;
  }

  .benefit-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 16px;
  }

  .benefit-description {
    font-size: 1rem;
    color: #666;
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
    color: #444;
    margin-bottom: 12px;
    line-height: 1.5;
  }

  .benefit-list li:last-child {
    margin-bottom: 0;
  }

  .benefit-list i {
    color: var(--primary-color);
    font-size: 14px;
    margin-top: 3px;
    flex-shrink: 0;
  }

  /* Social Proof Section */
  .social-proof-section {
    padding: 120px 20px;
    background: white;
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
    border-top: 1px solid rgba(67, 97, 238, 0.1);
    border-bottom: 1px solid rgba(67, 97, 238, 0.1);
  }

  .proof-stat-item {
    text-align: center;
  }

  .proof-stat-number {
    font-size: 3rem;
    font-weight: 800;
    color: var(--primary-color);
    margin-bottom: 10px;
    line-height: 1;
  }

  .proof-stat-label {
    font-size: 1rem;
    color: #666;
    font-weight: 500;
  }

  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 30px;
    margin-top: 60px;
  }

  .testimonial-card {
    background: #f8f9fa;
    padding: 35px;
    border-radius: 16px;
    border: 1px solid rgba(67, 97, 238, 0.08);
    transition: all 0.3s ease;
  }

  .testimonial-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(67, 97, 238, 0.12);
    border-color: var(--primary-color);
  }

  .testimonial-rating {
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
  }

  .testimonial-rating i {
    color: #ffd700;
    font-size: 16px;
  }

  .testimonial-text {
    font-size: 1.05rem;
    color: #444;
    line-height: 1.7;
    margin-bottom: 25px;
    font-style: italic;
  }

  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .author-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-color), #5a75f9);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .author-avatar i {
    font-size: 20px;
    color: white;
  }

  .author-name {
    font-size: 1.05rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 3px;
  }

  .author-role {
    font-size: 0.9rem;
    color: #666;
  }

  .categories {
    padding: 120px 20px;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
  }

  .categories-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .category-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 60px;
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
