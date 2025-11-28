<script>
  import { createEventDispatcher } from 'svelte';
  import LearningCard from './components/LearningCard.svelte';
  import { learningTopics } from './learningData.js';
  
  const dispatch = createEventDispatcher();
  
  let scrolled = false;
  let selectedLevel = 'All';
  
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  
  function handleScroll() {
    scrolled = window.scrollY > 50;
  }
  
  function handleTopicSelect(event) {
    const topic = event.detail;
    // Dispatch event untuk navigasi ke halaman pembelajaran
    dispatch('topicSelect', topic.slug);
  }
  
  function goToLanding() {
    dispatch('goToLanding');
  }
  
  $: filteredTopics = selectedLevel === 'All' 
    ? learningTopics 
    : learningTopics.filter(t => t.level.includes(selectedLevel));
</script>

<svelte:window on:scroll={handleScroll} />

<div class="learning-page-container">
  <!-- Navigation Bar -->
  <nav class="navbar" class:scrolled>
    <div class="navbar-container">
      <button class="navbar-brand" on:click={goToLanding}>
        <span class="brand-icon">
          <i class="fa-solid fa-code"></i>
        </span>
        <span class="brand-text">ubay.tech</span>
      </button>
      
      <div class="navbar-menu">
        <button class="nav-link" on:click={goToLanding}>Home</button>
        <a href="https://www.tiktok.com/@ubay.tech" target="_blank" rel="noopener noreferrer" class="nav-link-social">
          <i class="fa-brands fa-tiktok"></i>
        </a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="hero">
    <div class="hero-background-pattern"></div>
    <div class="hero-shapes">
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="shape shape-3"></div>
    </div>
    
    <div class="hero-container">
      <div class="hero-content">
        <div class="hero-badge">
          <i class="fa-solid fa-graduation-cap"></i>
          <span>Materi Pembelajaran Lengkap & Terstruktur</span>
        </div>
        
        <h1 class="hero-title">
          Pilih <span class="highlight">Materi Pembelajaran</span> Favoritmu
        </h1>
        
        <p class="hero-subtitle">
          149 materi pembelajaran yang disusun secara sistematis dalam bahasa Indonesia dengan standar industri. Dari fundamental hingga advanced level, semua tersedia untuk mendukung perjalanan belajar programming Anda.
        </p>
        
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">{learningTopics.length}</div>
            <div class="stat-label">Teknologi Modern</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">149</div>
            <div class="stat-label">Total Materi</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">Bahasa Indonesia</div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Learning Topics Grid Section -->
  <section class="learning-section">
    <div class="learning-content">
      <div class="section-header">
        <h2 class="section-title-main">Katalog Materi Pembelajaran</h2>
        <p class="section-description">
          Pilih teknologi yang ingin Anda pelajari. Setiap materi dilengkapi dengan penjelasan detail, contoh kode, dan best practice.
        </p>
      </div>
      
      <div class="learning-grid">
        {#each filteredTopics as topic}
          <LearningCard {topic} on:select={handleTopicSelect} />
        {/each}
      </div>
    </div>
  </section>

  <!-- Why Learn with Us Section -->
  <section class="why-section">
    <div class="why-content">
      <h2 class="section-title-main">Mengapa Belajar di ubay.tech?</h2>
      
      <div class="benefits-grid">
        <div class="benefit-item">
          <div class="benefit-icon">
            <i class="fa-solid fa-language"></i>
          </div>
          <h3 class="benefit-title">100% Bahasa Indonesia</h3>
          <p class="benefit-text">Semua materi ditulis dalam bahasa Indonesia yang mudah dipahami dengan penjelasan yang detail dan sistematis.</p>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">
            <i class="fa-solid fa-code"></i>
          </div>
          <h3 class="benefit-title">Contoh Kode Lengkap</h3>
          <p class="benefit-text">Setiap konsep dilengkapi dengan contoh kode yang bisa langsung dijalankan dan dimodifikasi.</p>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">
            <i class="fa-solid fa-diagram-project"></i>
          </div>
          <h3 class="benefit-title">Project-Based Learning</h3>
          <p class="benefit-text">Belajar sambil membangun project nyata yang bisa dijadikan portfolio.</p>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">
            <i class="fa-solid fa-sync-alt"></i>
          </div>
          <h3 class="benefit-title">Update Berkala</h3>
          <p class="benefit-text">Materi selalu diupdate mengikuti perkembangan teknologi dan best practices terbaru.</p>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">
            <i class="fa-solid fa-infinity"></i>
          </div>
          <h3 class="benefit-title">Akses Selamanya</h3>
          <p class="benefit-text">Sekali akses, bisa dibaca kapan saja dan dimana saja tanpa batas waktu.</p>
        </div>

        <div class="benefit-item">
          <div class="benefit-icon">
            <i class="fa-solid fa-comments"></i>
          </div>
          <h3 class="benefit-title">Konsultasi & Support</h3>
          <p class="benefit-text">Tanya jawab dan konsultasi untuk membantu mengatasi kesulitan dalam belajar.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Learning Path Section -->
  <section class="path-section">
    <div class="path-content">
      <h2 class="section-title-main">Jalur Pembelajaran yang Direkomendasikan</h2>
      <p class="section-description">Ikuti learning path ini untuk hasil pembelajaran yang optimal</p>
      
      <div class="path-grid">
        <div class="path-card">
          <div class="path-number">1</div>
          <h3 class="path-title">Frontend Developer</h3>
          <div class="path-steps">
            <div class="path-step">HTML & CSS Basics</div>
            <div class="path-step">JavaScript Fundamentals</div>
            <div class="path-step">React/Vue Framework</div>
            <div class="path-step">Git & Version Control</div>
          </div>
        </div>

        <div class="path-card">
          <div class="path-number">2</div>
          <h3 class="path-title">Backend Developer</h3>
          <div class="path-steps">
            <div class="path-step">Choose: Python / Node.js / Laravel</div>
            <div class="path-step">Database Design</div>
            <div class="path-step">RESTful API Development</div>
            <div class="path-step">Git & Deployment</div>
          </div>
        </div>

        <div class="path-card">
          <div class="path-number">3</div>
          <h3 class="path-title">Mobile Developer</h3>
          <div class="path-steps">
            <div class="path-step">Choose: Flutter / Kotlin</div>
            <div class="path-step">UI/UX Implementation</div>
            <div class="path-step">API Integration</div>
            <div class="path-step">Publishing to Store</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section">
    <div class="cta-content">
      <h2 class="cta-title">Siap Memulai Perjalanan Belajar Programming?</h2>
      <p class="cta-description">
        Pilih materi pembelajaran di atas dan mulai coding sekarang. Butuh bimbingan personal? Hubungi kami untuk program mentoring.
      </p>
      <div class="cta-buttons">
        <button class="btn-start" on:click={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <i class="fa-solid fa-rocket"></i>
          <span>Mulai Belajar Sekarang</span>
        </button>
        <a href="https://wa.me/6281330972830?text=Halo%20Ubay%20Tech%2C%20saya%20ingin%20tahu%20tentang%20program%20mentoring" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
          <i class="fa-brands fa-whatsapp"></i>
          <span>Konsultasi Mentoring</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section footer-about">
        <h3 class="footer-brand">ubay.tech</h3>
        <p class="footer-tagline">Platform pembelajaran programming dan software house profesional. Dibawah naungan <strong>PT Ubay Solusi Teknologi</strong>.</p>
        <div class="footer-location">
          <i class="fa-solid fa-map-marker-alt"></i>
          <span>Surabaya, Jawa Timur, Indonesia</span>
        </div>
      </div>
      
      <div class="footer-section">
        <h4 class="footer-heading">Materi Populer</h4>
        <ul class="footer-links">
          {#each learningTopics.slice(0, 5) as topic}
            <li><button on:click={() => handleTopicSelect({detail: topic})}>{topic.name}</button></li>
          {/each}
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
        </div>
        <div class="footer-contact-info">
          <p class="footer-contact">
            <i class="fa-solid fa-phone"></i>
            <a href="tel:+6281330972830">+62 813-3097-2830</a>
          </p>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2025 <strong>PT Ubay Solusi Teknologi</strong> | ubay.tech</p>
    </div>
  </footer>
</div>

<style>
  * {
    scroll-behavior: smooth;
  }

  .learning-page-container {
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
    background: none;
    border: none;
    cursor: pointer;
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
    background: none;
    border: none;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
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

  /* Hero Section */
  .hero {
    position: relative;
    padding: 140px 20px 80px;
    background: #4361EE;
    color: white;
    overflow: hidden;
    min-height: 500px;
  }

  .hero-background-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
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
    position: relative;
    z-index: 3;
  }

  .hero-content {
    text-align: center;
    max-width: 900px;
    margin: 0 auto;
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
    justify-content: center;
    flex-wrap: wrap;
  }

  .stat-item {
    text-align: center;
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

  /* Learning Section */
  .learning-section {
    padding: 120px 20px;
    background: #FFFFFF;
  }

  .learning-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 60px;
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

  .learning-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 35px;
  }

  /* Why Section */
  .why-section {
    padding: 120px 20px;
    background: #F7FAFC;
  }

  .why-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .why-content .section-title-main {
    margin-bottom: 60px;
  }

  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 35px;
  }

  .benefit-item {
    background: white;
    padding: 40px 30px;
    border-radius: 20px;
    border: 2px solid #E2E8F0;
    transition: all 0.3s ease;
    text-align: center;
  }

  .benefit-item:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(67, 97, 238, 0.12);
    border-color: #4361EE;
  }

  .benefit-icon {
    width: 70px;
    height: 70px;
    background: linear-gradient(135deg, #4361EE 0%, #7C3AED 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 25px;
    color: white;
    font-size: 28px;
  }

  .benefit-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 15px;
  }

  .benefit-text {
    font-size: 1rem;
    color: #718096;
    line-height: 1.6;
  }

  /* Learning Path Section */
  .path-section {
    padding: 120px 20px;
    background: #FFFFFF;
  }

  .path-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .path-content .section-title-main {
    margin-bottom: 20px;
  }

  .path-content .section-description {
    margin-bottom: 60px;
  }

  .path-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 35px;
  }

  .path-card {
    background: white;
    padding: 40px 30px;
    border-radius: 20px;
    border: 2px solid #E2E8F0;
    transition: all 0.3s ease;
    text-align: left;
    position: relative;
  }

  .path-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(67, 97, 238, 0.12);
    border-color: #4361EE;
  }

  .path-number {
    position: absolute;
    top: -20px;
    left: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #4361EE 0%, #7C3AED 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    box-shadow: 0 4px 15px rgba(67, 97, 238, 0.3);
  }

  .path-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 25px;
    margin-top: 10px;
  }

  .path-steps {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .path-step {
    background: #F7FAFC;
    padding: 12px 16px;
    border-radius: 10px;
    border-left: 3px solid #4361EE;
    font-size: 0.95rem;
    color: #4A5568;
    font-weight: 500;
  }

  /* CTA Section */
  .cta-section {
    padding: 100px 20px;
    background: linear-gradient(135deg, #4361EE 0%, #7C3AED 100%);
    color: white;
    text-align: center;
  }

  .cta-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .cta-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .cta-description {
    font-size: 1.15rem;
    line-height: 1.7;
    margin-bottom: 40px;
    opacity: 0.95;
  }

  .cta-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-start,
  .btn-whatsapp {
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

  .btn-start {
    background: #FFD700;
    color: #2D3748;
  }

  .btn-start:hover {
    background: #FFC700;
    transform: translateY(-3px);
  }

  .btn-whatsapp {
    background: #25D366;
    color: white;
  }

  .btn-whatsapp:hover {
    background: #20BA5A;
    transform: translateY(-3px);
  }

  /* Footer */
  .footer {
    background: #2D3748;
    color: white;
    padding: 60px 20px 30px;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 50px;
    margin-bottom: 40px;
  }

  .footer-brand {
    font-size: 1.8rem;
    font-weight: 800;
    margin-bottom: 15px;
  }

  .footer-tagline {
    font-size: 0.95rem;
    line-height: 1.6;
    opacity: 0.9;
    margin-bottom: 15px;
  }

  .footer-location {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.9rem;
    opacity: 0.8;
  }

  .footer-heading {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 20px;
  }

  .footer-links {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .footer-links li {
    margin-bottom: 12px;
  }

  .footer-links button {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
    font-size: 0.95rem;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    text-align: left;
  }

  .footer-links button:hover {
    color: #FFD700;
  }

  .footer-social {
    display: flex;
    gap: 12px;
    margin-bottom: 20px;
  }

  .footer-social-link {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 18px;
    transition: all 0.3s ease;
  }

  .footer-social-link:hover {
    background: #FFD700;
    color: #2D3748;
    transform: translateY(-3px);
  }

  .footer-contact-info {
    font-size: 0.9rem;
  }

  .footer-contact {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    color: rgba(255, 255, 255, 0.8);
  }

  .footer-contact a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-contact a:hover {
    color: #FFD700;
  }

  .footer-bottom {
    text-align: center;
    padding-top: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.9rem;
    opacity: 0.8;
  }

  /* Responsive */
  @media (max-width: 968px) {
    .hero-title {
      font-size: 2.5rem;
    }

    .learning-grid {
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 25px;
    }

    .footer-content {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }

  @media (max-width: 640px) {
    .hero {
      padding: 100px 15px 50px;
    }

    .hero-title {
      font-size: 1.8rem;
    }

    .hero-subtitle {
      font-size: 0.95rem;
    }

    .stat-number {
      font-size: 2rem;
    }

    .hero-stats {
      gap: 20px;
    }

    .learning-section {
      padding: 80px 15px;
    }

    .section-title-main {
      font-size: 2rem;
    }

    .learning-grid {
      grid-template-columns: 1fr;
    }

    .why-section,
    .path-section {
      padding: 80px 15px;
    }

    .benefits-grid,
    .path-grid {
      grid-template-columns: 1fr;
    }

    .cta-section {
      padding: 60px 15px;
    }

    .cta-title {
      font-size: 1.8rem;
    }

    .cta-buttons {
      flex-direction: column;
    }

    .btn-start,
    .btn-whatsapp {
      width: 100%;
      justify-content: center;
    }
  }
</style>
