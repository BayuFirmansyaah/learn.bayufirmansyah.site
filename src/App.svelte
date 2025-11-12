<script>
  import { onMount } from 'svelte';
  import Landing from './landing/App.svelte';
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter } from 'react-router-dom';
  import LearningApp from './learning/App.jsx';
  
  let currentView = 'landing'; // 'landing' or 'learning'
  let selectedCategory = '';
  let learningContainer;
  let reactRoot;

  onMount(() => {
    // Check if we're on a learning URL
    if (window.location.pathname.startsWith('/learning')) {
      currentView = 'learning';
      const pathParts = window.location.pathname.split('/');
      if (pathParts[2]) {
        selectedCategory = pathParts[2].charAt(0).toUpperCase() + pathParts[2].slice(1);
      }
    }

    // Listen for back/forward navigation
    const handlePopState = () => {
      if (window.location.pathname === '/') {
        currentView = 'landing';
      } else if (window.location.pathname.startsWith('/learning')) {
        currentView = 'learning';
      }
    };
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
      if (reactRoot) {
        reactRoot.unmount();
      }
    };
  });

  $: if (currentView === 'learning' && learningContainer && !reactRoot) {
    reactRoot = ReactDOM.createRoot(learningContainer);
    reactRoot.render(
      React.createElement(BrowserRouter, null,
        React.createElement(LearningApp, { 
          selectedCategory,
          onBack: handleBackToHome 
        })
      )
    );
  }

  function handleCategorySelect(category) {
    selectedCategory = category;
    currentView = 'learning';
    const url = `/learning/${category.toLowerCase()}/1`;
    window.history.pushState({}, '', url);
  }

  function handleBackToHome() {
    currentView = 'landing';
    window.history.pushState({}, '', '/');
    if (reactRoot) {
      reactRoot.unmount();
      reactRoot = null;
    }
  }
</script>

{#if currentView === 'landing'}
  <Landing on:categorySelect={(e) => handleCategorySelect(e.detail)} />
{:else if currentView === 'learning'}
  <div bind:this={learningContainer}></div>
{/if}
