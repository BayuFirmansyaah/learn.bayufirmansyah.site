import React from 'react';
import { Routes, Route, useParams, useNavigate, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';

export default function App({ selectedCategory, onBack }) {
  return (
    <Routes>
      <Route 
        path="/learning/:category/:materiId" 
        element={<LearningPage selectedCategory={selectedCategory} onBack={onBack} />} 
      />
      <Route 
        path="/learning/:category" 
        element={<Navigate to="1" replace />} 
      />
    </Routes>
  );
}

function LearningPage({ selectedCategory, onBack }) {
  const { category: urlCategory, materiId } = useParams();
  const navigate = useNavigate();

  // Capitalize category from URL for internal use
  const category = urlCategory 
    ? urlCategory.charAt(0).toUpperCase() + urlCategory.slice(1).toLowerCase()
    : selectedCategory;

  // Convert materiId to number and validate
  const materiIndex = parseInt(materiId) - 1;

  // Validate materiId - if invalid, redirect to 1
  React.useEffect(() => {
    if (isNaN(materiIndex) || materiIndex < 0) {
      navigate(`/learning/${urlCategory}/1`, { replace: true });
    }
  }, [materiIndex, urlCategory, navigate]);

  const setCurrentMateriIndex = (newIndex) => {
    // Update URL when materi changes (keep URL lowercase)
    navigate(`/learning/${urlCategory}/${newIndex + 1}`);
  };

  return (
    <Layout 
      category={category}
      currentMateriIndex={materiIndex}
      setCurrentMateriIndex={setCurrentMateriIndex}
      onBack={onBack}
    />
  );
}
