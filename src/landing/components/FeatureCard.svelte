<script>
  import { createEventDispatcher } from 'svelte';
  
  export let category;
  
  const dispatch = createEventDispatcher();
  
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
>
  <div class="icon-container" style="background: {category.color}15; border-color: {category.color}">
    <i class="{category.icon}" style="color: {category.color}"></i>
  </div>
  <h3 class="card-title">{category.name}</h3>
  <p class="card-description">{category.description}</p>
  <div class="card-footer">
    <span class="materi-count">{category.totalMateri} Materi</span>
    <span class="arrow">→</span>
  </div>
</div>

<style>
  .feature-card {
    background: white;
    border-radius: 16px;
    padding: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid #e2e8f0;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  .feature-card:hover,
  .feature-card:focus {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(67, 97, 238, 0.15);
    border-color: #4361ee;
    outline: none;
  }
  
  .feature-card:focus-visible {
    outline: 2px solid #4361ee;
    outline-offset: 2px;
  }

  .icon-container {
    width: 80px;
    height: 80px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    border: 2px solid;
    transition: all 0.3s ease;
  }

  .feature-card:hover .icon-container {
    transform: scale(1.1);
  }

  .icon-container i {
    font-size: 2.5rem;
  }

  .card-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2d3748;
    margin-bottom: 12px;
  }

  .card-description {
    font-size: 1rem;
    color: #718096;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    border-top: 1px solid #e2e8f0;
  }

  .materi-count {
    font-size: 0.9rem;
    color: #4361ee;
    font-weight: 600;
  }

  .arrow {
    font-size: 1.5rem;
    color: #4361ee;
    transition: transform 0.3s ease;
  }

  .feature-card:hover .arrow {
    transform: translateX(5px);
  }
</style>
