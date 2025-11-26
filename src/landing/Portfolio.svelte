<script>
  import { createEventDispatcher } from 'svelte';
  import ProjectCard from './components/ProjectCard.svelte';
  import { projects } from './portfolioData.js';
  
  const dispatch = createEventDispatcher();
  
  let scrolled = false;
  let selectedCategory = 'All';
  
  const categories = ['All', 'Mobile Application', 'Web Application', 'Web & Mobile App'];
  
  function handleScroll() {
    scrolled = window.scrollY > 50;
  }
  
  function handleProjectSelect(event) {
    dispatch('projectSelect', event.detail);
  }
  
  function goToLanding() {
    dispatch('goToLanding');
  }
  
  $: filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);
</script>

<svelte:window on:scroll={handleScroll} />

<div class="portfolio-page-container">
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
          <i class="fa-solid fa-briefcase"></i>
          <span>Project Portfolio & Success Stories</span>
        </div>
        
        <h1 class="hero-title">
          <span class="highlight">Portfolio</span> Project Kami
        </h1>
        
        <p class="hero-subtitle">
          Berikut adalah beberapa project yang telah kami kerjakan untuk berbagai klien dari berbagai industri. Setiap project dirancang dan dikembangkan dengan standar kualitas terbaik.
        </p>
        
        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number">{projects.length}+</div>
            <div class="stat-label">Project Selesai</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">100%</div>
            <div class="stat-label">Client Satisfaction</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">4+</div>
            <div class="stat-label">Tahun Pengalaman</div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Filter Section -->
  <section class="filter-section">
    <div class="filter-content">
      <h3 class="filter-title">Filter by Category</h3>
      <div class="filter-buttons">
        {#each categories as category}
          <button 
            class="filter-btn" 
            class:active={selectedCategory === category}
            on:click={() => selectedCategory = category}
          >
            {category}
          </button>
        {/each}
      </div>
    </div>
  </section>

  <!-- Projects Grid Section -->
  <section class="projects-section">
    <div class="projects-content">
      <div class="section-header">
        <p class="section-description">
          {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''} ditemukan
        </p>
      </div>
      
      <div class="projects-grid">
        {#each filteredProjects as project}
          <ProjectCard {project} on:select={handleProjectSelect} />
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section">
    <div class="cta-content">
      <h2 class="cta-title">Punya Ide Project?</h2>
      <p class="cta-description">
        Konsultasikan kebutuhan aplikasi Anda dengan tim kami. Kami siap membantu mewujudkan ide bisnis Anda menjadi aplikasi yang powerful.
      </p>
      <div class="cta-buttons">
        <a href="https://wa.me/6281330972830?text=Halo%20Ubay%20Tech%2C%20saya%20ingin%20konsultasi%20tentang%20project" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
          <i class="fa-brands fa-whatsapp"></i>
          <span>Konsultasi via WhatsApp</span>
        </a>
        <button class="btn-courses" on:click={goToLanding}>
          <i class="fa-solid fa-home"></i>
          <span>Kembali ke Home</span>
        </button>
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
        <h4 class="footer-heading">Services</h4>
        <ul class="footer-links">
          <li><button on:click={goToLanding}>Kursus Programming</button></li>
          <li><button on:click={goToLanding}>Jasa Pembuatan Aplikasi</button></li>
          <li><button on:click={goToLanding}>Mentoring Personal</button></li>
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

  .portfolio-page-container {
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

  /* Filter Section */
  .filter-section {
    padding: 40px 20px;
    background: white;
    border-bottom: 2px solid #E2E8F0;
  }

  .filter-content {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
  }

  .filter-title {
    font-size: 1.2rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 20px;
  }

  .filter-buttons {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .filter-btn {
    padding: 10px 24px;
    background: #F7FAFC;
    color: #4A5568;
    border: 2px solid #E2E8F0;
    border-radius: 50px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .filter-btn:hover {
    background: #EEF2FF;
    border-color: #4361EE;
    color: #4361EE;
  }

  .filter-btn.active {
    background: #4361EE;
    color: white;
    border-color: #4361EE;
  }

  /* Projects Section */
  .projects-section {
    padding: 80px 20px;
    background: #F7FAFC;
  }

  .projects-content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .section-header {
    text-align: center;
    margin-bottom: 40px;
  }

  .section-description {
    font-size: 1rem;
    color: #718096;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 35px;
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

  .btn-whatsapp,
  .btn-courses {
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

  .btn-whatsapp {
    background: #25D366;
    color: white;
  }

  .btn-whatsapp:hover {
    background: #20BA5A;
    transform: translateY(-3px);
  }

  .btn-courses {
    background: white;
    color: #4361EE;
  }

  .btn-courses:hover {
    background: #F7FAFC;
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

    .projects-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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

    .projects-section {
      padding: 60px 15px;
    }

    .projects-grid {
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

    .btn-whatsapp,
    .btn-courses {
      width: 100%;
      justify-content: center;
    }
  }
</style>
