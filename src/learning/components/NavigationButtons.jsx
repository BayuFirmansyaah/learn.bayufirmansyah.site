import React from 'react';

/**
 * NavigationButtons Component
 * 
 * Previous/Next navigation buttons for materi
 * Displays current position (e.g., "3 / 20")
 */
export default function NavigationButtons({ 
  category, 
  currentIndex, 
  totalMateri,
  onNavigate 
}) {
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < totalMateri - 1;
  
  const handlePrevious = () => {
    if (hasPrevious) {
      onNavigate(currentIndex - 1);
    }
  };
  
  const handleNext = () => {
    if (hasNext) {
      onNavigate(currentIndex + 1);
    }
  };

  return (
    <div className="navigation-buttons">
      <button 
        className="nav-btn nav-btn-prev"
        disabled={!hasPrevious}
        onClick={handlePrevious}
        aria-label="Previous materi"
      >
        <i className="fa-solid fa-arrow-left"></i>
        <span>Previous</span>
      </button>
      
      <div className="nav-info">
        <span className="nav-current">{currentIndex + 1}</span>
        <span className="nav-separator">/</span>
        <span className="nav-total">{totalMateri}</span>
      </div>
      
      <button 
        className="nav-btn nav-btn-next"
        disabled={!hasNext}
        onClick={handleNext}
        aria-label="Next materi"
      >
        <span>Next</span>
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}
