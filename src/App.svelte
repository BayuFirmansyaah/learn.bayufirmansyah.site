<script>
  import { onMount } from 'svelte';
  import Landing from './landing/App.svelte';
  import OurMentor from './landing/OurMentor.svelte';
  import MentorDetail from './landing/MentorDetail.svelte';
  
  let currentView = 'landing'; // 'landing', 'learning', 'mentor', 'mentorDetail'
  let selectedCategory = '';
  let selectedMentor = null;
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
    // Check URL and set initial view
    const path = window.location.pathname;
    
    if (path.startsWith('/learning')) {
      currentView = 'learning';
      const pathParts = path.split('/');
      if (pathParts[2]) {
        selectedCategory = pathParts[2].charAt(0).toUpperCase() + pathParts[2].slice(1);
      }
    } else if (path === '/mentor') {
      currentView = 'mentor';
    } else if (path.startsWith('/mentor/')) {
      currentView = 'mentorDetail';
      // Parse mentor ID from URL if needed
    }

    // Listen for back/forward navigation
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/') {
        currentView = 'landing';
      } else if (path.startsWith('/learning')) {
        currentView = 'learning';
      } else if (path === '/mentor') {
        currentView = 'mentor';
      } else if (path.startsWith('/mentor/')) {
        currentView = 'mentorDetail';
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

  function handleGoToMentor() {
    currentView = 'mentor';
    selectedMentor = null;
    window.history.pushState({}, '', '/mentor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleMentorSelect(event) {
    selectedMentor = event.detail;
    currentView = 'mentorDetail';
    window.history.pushState({}, '', `/mentor/${selectedMentor.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleBackToMentorList() {
    currentView = 'mentor';
    selectedMentor = null;
    window.history.pushState({}, '', '/mentor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

{#if currentView === 'landing'}
  <Landing 
    on:categorySelect={(e) => handleCategorySelect(e.detail)}
    on:goToMentor={handleGoToMentor}
  />
{:else if currentView === 'mentor'}
  <OurMentor 
    on:mentorSelect={handleMentorSelect}
    on:goToLanding={handleBackToHome}
  />
{:else if currentView === 'mentorDetail' && selectedMentor}
  <MentorDetail 
    mentor={selectedMentor}
    on:back={handleBackToMentorList}
  />
{:else if currentView === 'learning'}
  <div bind:this={learningContainer}></div>
{/if}
