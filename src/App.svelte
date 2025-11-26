<script>
  import { onMount } from 'svelte';
  import Landing from './landing/App.svelte';
  
  let currentView = 'landing'; // 'landing' or 'learning'
  let selectedCategory = '';
  let learningContainer;
  let reactRoot;
  
  // Lazy load React and dependencies
  let React;
  let ReactDOM;
  let BrowserRouter;
  let LearningApp;

  async function loadReactApp() {
    if (!React) {
      [React, ReactDOM, { BrowserRouter }, LearningApp] = await Promise.all([
        import('react'),
        import('react-dom/client'),
        import('react-router-dom'),
        import('./learning/App.jsx')
      ]);
    }
  }

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
    loadReactApp().then(() => {
      reactRoot = ReactDOM.createRoot(learningContainer);
      reactRoot.render(
        React.createElement(BrowserRouter, null,
          React.createElement(LearningApp.default, { 
            selectedCategory,
            onBack: handleBackToHome 
          })
        )
      );
    });
  }

  async function handleCategorySelect(category) {
    selectedCategory = category;
    currentView = 'learning';
    const url = `/learning/${category.toLowerCase()}/1`;
    window.history.pushState({}, '', url);
    
    // Preload React app
    await loadReactApp();
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
