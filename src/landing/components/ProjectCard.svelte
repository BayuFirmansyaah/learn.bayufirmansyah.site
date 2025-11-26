<script>
  import { createEventDispatcher } from 'svelte';
  
  export let project;
  
  const dispatch = createEventDispatcher();
  
  function handleClick() {
    dispatch('select', project);
  }
</script>

<div class="project-card" on:click={handleClick} on:keydown={(e) => e.key === 'Enter' && handleClick()} role="button" tabindex="0">
  <div class="project-image-wrapper">
    <img src={project.image} alt={project.title} class="project-image" />
    <div class="project-overlay">
      <div class="project-tags">
        {#each project.technologies.slice(0, 3) as tech}
          <span class="tech-tag">{tech}</span>
        {/each}
      </div>
    </div>
  </div>
  
  <div class="project-content">
    <div class="project-category">{project.category}</div>
    <h3 class="project-title">{project.title}</h3>
    <p class="project-description">{project.shortDescription}</p>
    
    <div class="project-footer">
      <div class="project-client">
        <i class="fa-solid fa-building"></i>
        <span>{project.client}</span>
      </div>
      <button class="view-detail-btn">
        <span>Lihat Detail</span>
        <i class="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  </div>
</div>

<style>
  .project-card {
    background: #FFFFFF;
    border-radius: 20px;
    border: 2px solid #E2E8F0;
    overflow: hidden;
    transition: all 0.4s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }

  .project-card:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 50px rgba(67, 97, 238, 0.15);
    border-color: #4361EE;
  }

  .project-image-wrapper {
    position: relative;
    width: 100%;
    height: 240px;
    overflow: hidden;
    background: #F7FAFC;
  }

  .project-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .project-card:hover .project-image {
    transform: scale(1.1);
  }

  .project-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .project-card:hover .project-overlay {
    opacity: 1;
  }

  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tech-tag {
    background: rgba(255, 255, 255, 0.95);
    color: #4361EE;
    padding: 6px 12px;
    border-radius: 50px;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .project-content {
    padding: 25px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .project-category {
    color: #4361EE;
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 10px;
  }

  .project-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 12px;
    line-height: 1.3;
  }

  .project-description {
    font-size: 0.95rem;
    color: #718096;
    line-height: 1.6;
    margin-bottom: 20px;
    flex: 1;
  }

  .project-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding-top: 15px;
    border-top: 1px solid #E2E8F0;
  }

  .project-client {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #718096;
    font-size: 0.9rem;
  }

  .project-client i {
    color: #4361EE;
  }

  .view-detail-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: transparent;
    color: #4361EE;
    border: none;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .view-detail-btn:hover {
    background: #EEF2FF;
  }

  .view-detail-btn i {
    font-size: 12px;
    transition: transform 0.3s ease;
  }

  .project-card:hover .view-detail-btn i {
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    .project-image-wrapper {
      height: 200px;
    }

    .project-content {
      padding: 20px;
    }

    .project-title {
      font-size: 1.2rem;
    }

    .project-footer {
      flex-direction: column;
      align-items: flex-start;
    }

    .view-detail-btn {
      width: 100%;
      justify-content: center;
    }
  }
</style>
