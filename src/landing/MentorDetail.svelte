<script>
  import { createEventDispatcher } from 'svelte';
  
  export let mentor;
  
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

<div class="mentor-detail-container">
  <!-- Back Navigation -->
  <nav class="detail-navbar" class:scrolled>
    <div class="navbar-content">
      <button class="back-btn" on:click={handleBack}>
        <i class="fa-solid fa-arrow-left"></i>
        <span>Kembali ke Daftar Mentor</span>
      </button>
    </div>
  </nav>

  <!-- Hero Section with Photo -->
  <section class="mentor-hero">
    <div class="hero-background"></div>
    <div class="hero-content">
      <div class="mentor-photo-container">
        <img src={mentor.photo} alt={mentor.name} class="mentor-photo" />
        <div class="experience-badge-large">
          <i class="fa-solid fa-award"></i>
          <span>{mentor.experience} Pengalaman</span>
        </div>
      </div>
      
      <div class="mentor-intro">
        <h1 class="mentor-title">{mentor.name}</h1>
        <div class="mentor-specs">
          {#each mentor.specialization as spec}
            <span class="spec-tag">{spec}</span>
          {/each}
        </div>
        <p class="mentor-bio">{mentor.summary}</p>
        
        <!-- Social Media Links -->
        {#if mentor.socialMedia}
          <div class="social-links">
            {#if mentor.socialMedia.email}
              <a href="mailto:{mentor.socialMedia.email}" class="social-link" aria-label="Email">
                <i class="fa-solid fa-envelope"></i>
              </a>
            {/if}
            {#if mentor.socialMedia.linkedin}
              <a href={mentor.socialMedia.linkedin} target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
                <i class="fa-brands fa-linkedin"></i>
              </a>
            {/if}
            {#if mentor.socialMedia.github}
              <a href={mentor.socialMedia.github} target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
                <i class="fa-brands fa-github"></i>
              </a>
            {/if}
            {#if mentor.socialMedia.medium}
              <a href={mentor.socialMedia.medium} target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Medium">
                <i class="fa-brands fa-medium"></i>
              </a>
            {/if}
            {#if mentor.socialMedia.website}
              <a href={mentor.socialMedia.website} target="_blank" rel="noopener noreferrer" class="social-link" aria-label="Website">
                <i class="fa-solid fa-globe"></i>
              </a>
            {/if}
            {#if mentor.socialMedia.tiktok}
              <a href={mentor.socialMedia.tiktok} target="_blank" rel="noopener noreferrer" class="social-link" aria-label="TikTok">
                <i class="fa-brands fa-tiktok"></i>
              </a>
            {/if}
          </div>
        {/if}
      </div>
    </div>
  </section>

  <!-- Details Content -->
  <section class="mentor-details">
    <div class="details-container">
      <!-- Education -->
      <div class="detail-section">
        <div class="section-header-detail">
          <div class="section-icon">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <h2 class="section-title">Pendidikan</h2>
        </div>
        <ul class="detail-list">
          {#each mentor.education as edu}
            <li class="detail-item">
              <i class="fa-solid fa-check-circle"></i>
              <span>{edu}</span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Certifications -->
      {#if mentor.certifications && mentor.certifications.length > 0}
      <div class="detail-section">
        <div class="section-header-detail">
          <div class="section-icon">
            <i class="fa-solid fa-certificate"></i>
          </div>
          <h2 class="section-title">Sertifikasi</h2>
        </div>
        <ul class="detail-list">
          {#each mentor.certifications as cert}
            <li class="detail-item">
              <i class="fa-solid fa-award"></i>
              <span>{cert}</span>
            </li>
          {/each}
        </ul>
      </div>
      {/if}

      <!-- Work Experience -->
      <div class="detail-section">
        <div class="section-header-detail">
          <div class="section-icon">
            <i class="fa-solid fa-briefcase"></i>
          </div>
          <h2 class="section-title">Pengalaman Kerja</h2>
        </div>
        <div class="experience-timeline">
          {#each mentor.workExperience as work}
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h3 class="work-title">{work.title}</h3>
                <div class="work-meta">
                  <span class="work-company">{work.company}</span>
                  <span class="work-period">{work.period}</span>
                </div>
                <p class="work-description">{work.description}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <!-- Skills -->
      <div class="detail-section">
        <div class="section-header-detail">
          <div class="section-icon">
            <i class="fa-solid fa-code"></i>
          </div>
          <h2 class="section-title">Keahlian Teknis</h2>
        </div>
        <div class="skills-grid">
          {#each mentor.skills as skill}
            <div class="skill-badge">
              <i class="fa-solid fa-check"></i>
              <span>{skill}</span>
            </div>
          {/each}
        </div>
      </div>

      <!-- Achievements -->
      <div class="detail-section">
        <div class="section-header-detail">
          <div class="section-icon">
            <i class="fa-solid fa-trophy"></i>
          </div>
          <h2 class="section-title">Pencapaian</h2>
        </div>
        <ul class="achievement-list">
          {#each mentor.achievements as achievement}
            <li class="achievement-item">
              <div class="achievement-icon">
                <i class="fa-solid fa-star"></i>
              </div>
              <span>{achievement}</span>
            </li>
          {/each}
        </ul>
      </div>

      <!-- CTA Section -->
      <div class="cta-section-detail">
        <h3 class="cta-title">Tertarik Belajar dengan {mentor.name.split(' ')[0]}?</h3>
        <p class="cta-description">Hubungi kami untuk informasi lebih lanjut tentang kursus dan mentoring.</p>
        <div class="cta-buttons">
          <a href="https://wa.me/6281330972830?text=Halo%20Ubay%20Tech%2C%20saya%20ingin%20belajar%20dengan%20mentor%20{mentor.name}" target="_blank" rel="noopener noreferrer" class="btn-contact">
            <i class="fa-brands fa-whatsapp"></i>
            <span>Hubungi via WhatsApp</span>
          </a>
          <button class="btn-back-secondary" on:click={handleBack}>
            <i class="fa-solid fa-arrow-left"></i>
            <span>Lihat Mentor Lainnya</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</div>

<style>
  .mentor-detail-container {
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
  .mentor-hero {
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
    grid-template-columns: 350px 1fr;
    gap: 60px;
    align-items: start;
    position: relative;
    z-index: 1;
  }

  .mentor-photo-container {
    position: relative;
  }

  .mentor-photo {
    width: 100%;
    height: 400px;
    object-fit: cover;
    object-position: center;
    border-radius: 20px;
    border: 5px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  }

  .experience-badge-large {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 12px 24px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 1rem;
    color: #2D3748;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .experience-badge-large i {
    color: #FFD700;
    font-size: 18px;
  }

  .mentor-intro {
    padding-top: 20px;
  }

  .mentor-title {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 20px;
    line-height: 1.1;
  }

  .mentor-specs {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 25px;
  }

  .spec-tag {
    background: rgba(255, 255, 255, 0.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: white;
    padding: 10px 20px;
    border-radius: 50px;
    font-size: 1rem;
    font-weight: 600;
  }

  .mentor-bio {
    font-size: 1.2rem;
    line-height: 1.8;
    margin-bottom: 30px;
    opacity: 0.95;
  }

  .social-links {
    display: flex;
    gap: 15px;
  }

  .social-link {
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 20px;
    transition: all 0.3s ease;
    text-decoration: none;
  }

  .social-link:hover {
    background: white;
    color: #4361EE;
    transform: translateY(-5px);
  }

  /* Details Section */
  .mentor-details {
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

  /* Education List */
  .detail-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .detail-item {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #E2E8F0;
    font-size: 1.05rem;
    color: #4A5568;
  }

  .detail-item:last-child {
    border-bottom: none;
  }

  .detail-item i {
    color: #48BB78;
    font-size: 20px;
    margin-top: 2px;
    flex-shrink: 0;
  }

  /* Experience Timeline */
  .experience-timeline {
    position: relative;
    padding-left: 30px;
  }

  .timeline-item {
    position: relative;
    margin-bottom: 35px;
    padding-bottom: 35px;
    border-bottom: 1px solid #E2E8F0;
  }

  .timeline-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  .timeline-marker {
    position: absolute;
    left: -30px;
    top: 5px;
    width: 16px;
    height: 16px;
    background: #4361EE;
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 3px #4361EE;
  }

  .timeline-item::before {
    content: '';
    position: absolute;
    left: -23px;
    top: 21px;
    bottom: -35px;
    width: 2px;
    background: #E2E8F0;
  }

  .timeline-item:last-child::before {
    display: none;
  }

  .work-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 10px;
  }

  .work-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 12px;
  }

  .work-company {
    font-size: 1.05rem;
    color: #4361EE;
    font-weight: 600;
  }

  .work-period {
    font-size: 0.95rem;
    color: #718096;
    font-weight: 500;
  }

  .work-description {
    font-size: 1rem;
    color: #4A5568;
    line-height: 1.6;
  }

  /* Skills Grid */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }

  .skill-badge {
    background: #EEF2FF;
    color: #4361EE;
    padding: 12px 18px;
    border-radius: 12px;
    font-size: 0.95rem;
    font-weight: 600;
    border: 2px solid #4361EE;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
  }

  .skill-badge:hover {
    background: #4361EE;
    color: white;
    transform: translateY(-3px);
  }

  .skill-badge i {
    font-size: 14px;
  }

  /* Achievements */
  .achievement-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .achievement-item {
    display: flex;
    align-items: flex-start;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid #E2E8F0;
    font-size: 1.05rem;
    color: #4A5568;
  }

  .achievement-item:last-child {
    border-bottom: none;
  }

  .achievement-icon {
    width: 35px;
    height: 35px;
    background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    flex-shrink: 0;
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

    .mentor-photo-container {
      max-width: 350px;
      margin: 0 auto;
    }

    .mentor-title {
      font-size: 2.5rem;
    }

    .mentor-specs {
      justify-content: center;
    }

    .social-links {
      justify-content: center;
    }

    .detail-section {
      padding: 30px 25px;
    }
  }

  @media (max-width: 640px) {
    .mentor-hero {
      padding: 100px 15px 50px;
    }

    .mentor-photo {
      height: 350px;
    }

    .mentor-title {
      font-size: 2rem;
    }

    .mentor-bio {
      font-size: 1.05rem;
    }

    .mentor-details {
      padding: 50px 15px;
    }

    .detail-section {
      padding: 25px 20px;
    }

    .section-title {
      font-size: 1.4rem;
    }

    .skills-grid {
      grid-template-columns: 1fr 1fr;
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
