<script>
  import { createEventDispatcher } from 'svelte';
  
  export let project;
  
  const dispatch = createEventDispatcher();
  
  function handleBack() {
    dispatch('back');
  }
  
  let scrolled = false;
  
  function handleScroll() {
    scrolled = window.scrollY > 50;
  }
</script>

<svelte:window on:scroll={handleScroll} />

<div class="project-detail-container">
  <!-- Back Navigation -->
  <nav class="detail-navbar" class:scrolled>
    <div class="navbar-content">
      <button class="back-btn" on:click={handleBack}>
        <i class="fa-solid fa-arrow-left"></i>
        <span>Kembali ke Portfolio</span>
      </button>
    </div>
  </nav>

  <!-- Hero Section -->
  <section class="project-hero">
    <div class="hero-background"></div>
    <div class="hero-content">
      <div class="project-preview">
        <img src={project.image} alt={project.title} class="project-image" />
      </div>
      
      <div class="project-intro">
        <div class="project-category-badge">{project.category}</div>
        <h1 class="project-title">{project.title}</h1>
        
        <div class="project-meta">
          <div class="meta-item">
            <i class="fa-solid fa-building"></i>
            <span>{project.client}</span>
          </div>
          <div class="meta-item">
            <i class="fa-solid fa-calendar"></i>
            <span>{project.year}</span>
          </div>
          <div class="meta-item">
            <i class="fa-solid fa-desktop"></i>
            <span>{project.platform}</span>
          </div>
        </div>
        
        <p class="project-description">{project.fullDescription}</p>
        
        <div class="tech-stack">
          <h3 class="tech-title">Technology Stack</h3>
          <div class="tech-tags">
            {#each project.technologies as tech}
              <span class="tech-tag">{tech}</span>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Details Content -->
  <section class="project-details">
    <div class="details-container">
      <!-- Features -->
      <div class="detail-section">
        <div class="section-header-detail">
          <div class="section-icon">
            <i class="fa-solid fa-check-double"></i>
          </div>
          <h2 class="section-title">Fitur Utama</h2>
        </div>
        <ul class="feature-list">
          {#each project.features as feature}
            <li class="feature-item">
              <i class="fa-solid fa-circle-check"></i>
              <span>{feature}</span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Challenges -->
      <div class="detail-section">
        <div class="section-header-detail">
          <div class="section-icon">
            <i class="fa-solid fa-lightbulb"></i>
          </div>
          <h2 class="section-title">Tantangan & Solusi</h2>
        </div>
        <p class="challenge-text">{project.challenges}</p>
      </div>

      <!-- Results -->
      <div class="detail-section highlight">
        <div class="section-header-detail">
          <div class="section-icon">
            <i class="fa-solid fa-trophy"></i>
          </div>
          <h2 class="section-title">Hasil & Dampak</h2>
        </div>
        <p class="results-text">{project.results}</p>
      </div>

      <!-- CTA Section -->
      <div class="cta-section-detail">
        <h3 class="cta-title">Tertarik dengan Project Serupa?</h3>
        <p class="cta-description">Konsultasikan kebutuhan aplikasi Anda dengan tim kami. Kami siap membantu mewujudkan ide bisnis Anda.</p>
        <div class="cta-buttons">
          <a href="https://wa.me/6281330972830?text=Halo%20Ubay%20Tech%2C%20saya%20tertarik%20dengan%20project%20{project.title}" target="_blank" rel="noopener noreferrer" class="btn-contact">
            <i class="fa-brands fa-whatsapp"></i>
            <span>Konsultasi Project</span>
          </a>
          <button class="btn-back-secondary" on:click={handleBack}>
            <i class="fa-solid fa-arrow-left"></i>
            <span>Lihat Project Lainnya</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .project-detail-container {
    min-height: 100vh;
    background: #F7FAFC;
  }

  /* Navigation */
  .detail-navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: transparent;
    transition: all 0.3s ease;
    padding: 20px 0;
  }

  .detail-navbar.scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
  }

  .navbar-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .back-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 12px 24px;
    background: rgba(255, 255, 255, 0.9);
    color: #2D3748;
    border: 2px solid #E2E8F0;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .detail-navbar.scrolled .back-btn {
    background: white;
    border-color: #4361EE;
    color: #4361EE;
  }

  .back-btn:hover {
    background: #4361EE;
    color: white;
    border-color: #4361EE;
    transform: translateX(-5px);
  }

  /* Hero Section */
  .project-hero {
    position: relative;
    padding: 140px 20px 80px;
    background: linear-gradient(135deg, #4361EE 0%, #7C3AED 100%);
    color: white;
    overflow: hidden;
  }

  .hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.1;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  }

  .hero-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 400px 1fr;
    gap: 60px;
    align-items: start;
    position: relative;
    z-index: 1;
  }

  .project-preview {
    background: white;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .project-image {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }

  .project-intro {
    padding-top: 20px;
  }

  .project-category-badge {
    display: inline-block;
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .project-title {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 25px;
    line-height: 1.2;
  }

  .project-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    margin-bottom: 25px;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
  }

  .meta-item i {
    color: #FFD700;
    font-size: 18px;
  }

  .project-description {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 30px;
    opacity: 0.95;
  }

  .tech-stack {
    margin-top: 30px;
  }

  .tech-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .tech-tag {
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  /* Details Section */
  .project-details {
    padding: 80px 20px;
  }

  .details-container {
    max-width: 1000px;
    margin: 0 auto;
  }

  .detail-section {
    background: white;
    padding: 40px;
    border-radius: 20px;
    margin-bottom: 30px;
    border: 2px solid #E2E8F0;
    transition: all 0.3s ease;
  }

  .detail-section:hover {
    border-color: #4361EE;
    box-shadow: 0 10px 30px rgba(67, 97, 238, 0.1);
  }

  .detail-section.highlight {
    background: linear-gradient(135deg, #EEF2FF 0%, #F0F9FF 100%);
    border-color: #4361EE;
  }

  .section-header-detail {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 30px;
  }

  .section-icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #4361EE 0%, #7C3AED 100%);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 22px;
  }

  .section-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2D3748;
    margin: 0;
  }

  /* Feature List */
  .feature-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 15px;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    padding: 12px;
    background: #F7FAFC;
    border-radius: 10px;
    font-size: 0.95rem;
    color: #4A5568;
    transition: all 0.3s ease;
  }

  .feature-item:hover {
    background: #EEF2FF;
    transform: translateX(5px);
  }

  .feature-item i {
    color: #48BB78;
    font-size: 18px;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .challenge-text,
  .results-text {
    font-size: 1.05rem;
    color: #4A5568;
    line-height: 1.8;
  }

  /* CTA Section */
  .cta-section-detail {
    background: linear-gradient(135deg, #4361EE 0%, #7C3AED 100%);
    padding: 50px;
    border-radius: 20px;
    text-align: center;
    color: white;
    margin-top: 50px;
  }

  .cta-title {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 15px;
  }

  .cta-description {
    font-size: 1.1rem;
    margin-bottom: 30px;
    opacity: 0.95;
  }

  .cta-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .btn-contact,
  .btn-back-secondary {
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
  }

  .btn-contact {
    background: #25D366;
    color: white;
    border: none;
  }

  .btn-contact:hover {
    background: #20BA5A;
    transform: translateY(-3px);
  }

  .btn-back-secondary {
    background: white;
    color: #4361EE;
    border: 2px solid white;
  }

  .btn-back-secondary:hover {
    background: transparent;
    color: white;
    transform: translateY(-3px);
  }

  /* Responsive */
  @media (max-width: 968px) {
    .hero-content {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 40px;
    }

    .project-preview {
      max-width: 400px;
      margin: 0 auto;
    }

    .project-meta {
      justify-content: center;
    }

    .detail-section {
      padding: 30px 25px;
    }

    .feature-list {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 640px) {
    .project-hero {
      padding: 100px 15px 50px;
    }

    .project-title {
      font-size: 2rem;
    }

    .project-details {
      padding: 50px 15px;
    }

    .detail-section {
      padding: 25px 20px;
    }

    .section-title {
      font-size: 1.4rem;
    }

    .cta-section-detail {
      padding: 35px 25px;
    }

    .cta-title {
      font-size: 1.5rem;
    }

    .cta-buttons {
      flex-direction: column;
    }

    .btn-contact,
    .btn-back-secondary {
      width: 100%;
      justify-content: center;
    }

    .back-btn span {
      display: none;
    }

    .back-btn {
      padding: 12px 16px;
    }
  }
</style>
