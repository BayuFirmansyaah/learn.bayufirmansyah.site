<script>
  import { onMount } from 'svelte';
  import Landing from './landing/App.svelte';
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import LearningApp from './learning/App.jsx';
  
  let currentView = 'landing';
  let selectedCategory = null;
  let learningContainer;
  let reactRoot;

  function handleCategorySelect(category) {
    selectedCategory = category;
    currentView = 'learning';
  }

  function handleBackToHome() {
    currentView = 'landing';
    selectedCategory = null;
    if (reactRoot) {
      reactRoot.unmount();
      reactRoot = null;
    }
  }

  $: if (currentView === 'learning' && learningContainer && selectedCategory) {
    if (reactRoot) {
      reactRoot.unmount();
    }
    reactRoot = ReactDOM.createRoot(learningContainer);
    reactRoot.render(
      React.createElement(LearningApp, {
        category: selectedCategory,
        onBack: handleBackToHome
      })
    );
  }
</script>

{#if currentView === 'landing'}
  <Landing on:categorySelect={(e) => handleCategorySelect(e.detail)} />
{:else}
  <div bind:this={learningContainer}></div>
{/if}
