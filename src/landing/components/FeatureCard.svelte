<script>
  import { createEventDispatcher } from 'svelte';
  
  export let category;
  
  const dispatch = createEventDispatcher();
  
  // Map technology names to CDN icon URLs
  const iconMap = {
    'Laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
    'Kotlin': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
    'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
    'NodeJS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg'
  };
  
  function handleClick() {
    dispatch('click');
  }
  
  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      dispatch('click');
    }
  }
</script>

<div 
  class="feature-card" 
  role="button" 
  tabindex="0"
  on:click={handleClick}
  on:keydown={handleKeyDown}
  style="--card-color: {category.color}"
>
  <div class="card-header">
    <div class="icon-container">
      <img src="{iconMap[category.name]}" alt="{category.name}" class="tech-icon" />
    </div>
    <div class="materi-badge">{category.totalMateri} Materi</div>
  </div>
  
  <div class="card-content">
    <h3 class="card-title">{category.name}</h3>
    <p class="card-description">{category.description}</p>
  </div>
  
  <div class="card-footer">
    <span class="cta-text">Mulai Belajar</span>
    <span class="arrow">
      <i class="fa-solid fa-arrow-right"></i>
    </span>
  </div>
</div>

<style>
  .feature-card {
    background: white;
    border-radius: 20px;
    padding: 0;
    cursor: pointer;
    transition: all 0.4s ease;
    border: 2px solid #E2E8F0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .feature-card:hover,
  .feature-card:focus {
    transform: translateY(-12px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
    border-color: var(--card-color);
    outline: none;
  }
  
  .feature-card:focus-visible {
    outline: 2px solid var(--card-color);
    outline-offset: 2px;
  }

  .card-header {
    background: #F7FAFC;
    padding: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #E2E8F0;
    position: relative;
  }

  .feature-card:hover .card-header {
    background: var(--card-color);
  }

  .icon-container {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.4s ease;
  }

  .feature-card:hover .icon-container {
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .tech-icon {
    width: 70px;
    height: 70px;
    object-fit: contain;
  }

  .materi-badge {
    background: white;
    color: #2D3748;
    padding: 8px 16px;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 600;
    border: 2px solid #E2E8F0;
    transition: all 0.3s ease;
  }

  .feature-card:hover .materi-badge {
    background: white;
    color: var(--card-color);
    border-color: white;
  }

  .card-content {
    padding: 30px;
    flex: 1;
  }

  .card-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 12px;
  }

  .card-description {
    font-size: 1rem;
    color: #718096;
    line-height: 1.6;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    border-top: 2px solid #E2E8F0;
    background: white;
    transition: all 0.3s ease;
  }

  .feature-card:hover .card-footer {
    background: #F7FAFC;
  }

  .cta-text {
    font-weight: 600;
    color: #4A5568;
    font-size: 1rem;
  }

  .feature-card:hover .cta-text {
    color: var(--card-color);
  }

  .arrow {
    color: #4A5568;
    font-size: 1.2rem;
    transition: all 0.3s ease;
  }

  .feature-card:hover .arrow {
    transform: translateX(5px);
    color: var(--card-color);
  }

  @media (max-width: 768px) {
    .card-header {
      flex-direction: column;
      gap: 15px;
      align-items: flex-start;
    }

    .icon-container {
      width: 70px;
      height: 70px;
    }

    .tech-icon {
      width: 60px;
      height: 60px;
    }

    .card-title {
      font-size: 1.5rem;
    }
  }
</style>
