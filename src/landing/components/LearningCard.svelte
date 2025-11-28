<script>
  import { createEventDispatcher } from 'svelte';
  
  export let topic;
  
  const dispatch = createEventDispatcher();
  
  function handleClick() {
    dispatch('select', topic);
  }
</script>

<div class="learning-card" on:click={handleClick} on:keydown={(e) => e.key === 'Enter' && handleClick()} role="button" tabindex="0">
  <div class="learning-icon-wrapper" style="background: linear-gradient(135deg, {topic.color}15 0%, {topic.color}30 100%);">
    <div class="learning-icon" style="background: {topic.color};">
      <img src={topic.icon} alt={topic.name} class="icon-image" />
    </div>
    <div class="materi-count-badge">
      <i class="fa-solid fa-book"></i>
      <span>{topic.totalMateri} Materi</span>
    </div>
  </div>
  
  <div class="learning-content">
    <h3 class="learning-title">{topic.name}</h3>
    
    <div class="learning-meta">
      <div class="meta-item">
        <i class="fa-solid fa-signal"></i>
        <span>{topic.level}</span>
      </div>
      <div class="meta-item">
        <i class="fa-solid fa-clock"></i>
        <span>{topic.duration}</span>
      </div>
    </div>
    
    <p class="learning-description">{topic.description}</p>
    
    <div class="learning-topics">
      <div class="topics-title">Yang akan dipelajari:</div>
      <ul class="topics-list">
        {#each topic.topics.slice(0, 4) as topicItem}
          <li><i class="fa-solid fa-check-circle"></i> {topicItem}</li>
        {/each}
      </ul>
    </div>
    
    <button class="start-learning-btn" style="background: {topic.color};">
      <span>Mulai Belajar</span>
      <i class="fa-solid fa-arrow-right"></i>
    </button>
  </div>
</div>

<style>
  .learning-card {
    background: #FFFFFF;
    border-radius: 20px;
    border: 2px solid #E2E8F0;
    overflow: hidden;
    transition: all 0.4s ease;
    cursor: pointer;
    display: flex;
    flex-direction: column;
  }

  .learning-card:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 50px rgba(67, 97, 238, 0.15);
    border-color: #4361EE;
  }

  .learning-icon-wrapper {
    position: relative;
    width: 100%;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #4361EE15 0%, #4361EE30 100%);
  }

  .learning-icon {
    width: 100px;
    height: 100px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    transition: transform 0.4s ease;
    padding: 20px;
  }

  .icon-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .learning-card:hover .learning-icon {
    transform: scale(1.1) rotate(5deg);
  }

  .materi-count-badge {
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

  .materi-count-badge i {
    color: #4361EE;
    font-size: 14px;
  }

  .learning-content {
    padding: 30px;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .learning-title {
    font-size: 1.75rem;
    font-weight: 700;
    color: #2D3748;
    margin-bottom: 16px;
    line-height: 1.2;
  }

  .learning-meta {
    display: flex;
    gap: 20px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .meta-item {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #718096;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .meta-item i {
    color: #4361EE;
    font-size: 14px;
  }

  .learning-description {
    font-size: 0.95rem;
    color: #718096;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .learning-topics {
    margin-bottom: 24px;
    flex: 1;
  }

  .topics-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: #2D3748;
    margin-bottom: 12px;
  }

  .topics-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .topics-list li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 0.9rem;
    color: #4A5568;
    margin-bottom: 8px;
    line-height: 1.5;
  }

  .topics-list li:last-child {
    margin-bottom: 0;
  }

  .topics-list i {
    color: #48BB78;
    font-size: 14px;
    margin-top: 2px;
    flex-shrink: 0;
  }

  .start-learning-btn {
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

  .start-learning-btn:hover {
    opacity: 0.9;
    transform: translateX(5px);
  }

  .start-learning-btn i {
    font-size: 14px;
    transition: transform 0.3s ease;
  }

  .learning-card:hover .start-learning-btn i {
    transform: translateX(5px);
  }

  @media (max-width: 768px) {
    .learning-icon-wrapper {
      height: 160px;
    }

    .learning-icon {
      width: 80px;
      height: 80px;
      padding: 16px;
    }

    .learning-content {
      padding: 24px;
    }

    .learning-title {
      font-size: 1.5rem;
    }
  }
</style>
