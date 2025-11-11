import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './Layout.jsx';

export default function App({ category, onBack }) {
  const [currentMateriIndex, setCurrentMateriIndex] = useState(0);

  return (
    <Layout 
      category={category} 
      currentMateriIndex={currentMateriIndex}
      setCurrentMateriIndex={setCurrentMateriIndex}
      onBack={onBack}
    />
  );
}

// Export untuk digunakan dari Svelte
if (typeof window !== 'undefined') {
  window.LearningApp = App;
}
