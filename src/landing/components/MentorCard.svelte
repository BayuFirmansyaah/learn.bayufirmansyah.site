<script>
  import { createEventDispatcher } from 'svelte';
  
  export let mentor;
  
  const dispatch = createEventDispatcher();
  
  function handleClick() {
    dispatch('select', mentor);
  }
</script>

<div class="mentor-card" on:click={handleClick} on:keydown={(e) => e.key === 'Enter' && handleClick()} role="button" tabindex="0">
  <div class="mentor-image-wrapper">
    <img src={mentor.photo} alt={mentor.name} class="mentor-image" />
    <div class="experience-badge">
      <i class="fa-solid fa-award"></i>
      <span>{mentor.experience}</span>
    </div>
  </div>
  
  <div class="mentor-content">
    <h3 class="mentor-name">{mentor.name}</h3>
    
    <div class="mentor-specializations">
      {#each mentor.specialization.slice(0, 3) as spec}
        <span class="spec-badge">{spec}</span>
      {/each}
    </div>
    
    <p class="mentor-summary">{mentor.summary}</p>
    
    <button class="view-detail-btn">
      <span>Lihat Detail</span>
      <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>
</div>

<style>
  .mentor-card {
    background: #FFFFFF;
    border-radius: 20px;
    border: 2px solid #E2E8F0;
    overflow: hidden;
    transition: all 0.4s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }

  .mentor-card:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 50px rgba(67, 97, 238, 0.15);
    border-color: #4361EE;
  }

  .mentor-image-wrapper {
    position: relative;
    width: 100%;
    height: 280px;
    overflow: hidden;
    background: linear-gradient(135deg, #4361EE 0%, #7C3AED 100%);
  }

  .mentor-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.4s ease;
  }

  .mentor-card:hover .mentor-image {
    transform: scale(1.1);
  }

  .experience-badge {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 8px 16px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 600;
    font-size: 0.9rem;
    color: #2D3748;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  .experience-badge i {
    color: #FFD700;
    font-size: 14px;
  }

  .mentor-content {
    padding: 30px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .mentor-name {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 16px;
    line-height: 1.2;
  }

  .mentor-specializations {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
  }

  .spec-badge {
    background: #EEF2FF;
    color: #4361EE;
    padding: 6px 14px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    border: 1px solid #4361EE;
  }

  .mentor-summary {
    font-size: 0.95rem;
    color: #718096;
    line-height: 1.6;
    margin-bottom: 24px;
    flex: 1;
  }

  .view-detail-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 14px 24px;
    background: #4361EE;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .view-detail-btn:hover {
    background: #3451cc;
    transform: translateX(5px);
  }

  .view-detail-btn i {
    font-size: 14px;
    transition: transform 0.3s ease;
  }

  .mentor-card:hover .view-detail-btn i {
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    .mentor-image-wrapper {
      height: 240px;
    }

    .mentor-content {
      padding: 24px;
    }

    .mentor-name {
      font-size: 1.3rem;
    }
  }
</style>
