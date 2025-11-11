import React from 'react';
import SidebarLeft from './SidebarLeft.jsx';
import Content from './Content.jsx';
import './styles.css';

export default function Layout({ category, currentMateriIndex, setCurrentMateriIndex, onBack }) {
  return (
    <div className="learning-layout">
      <header className="learning-header">
        <div className="header-content">
          <button className="back-button" onClick={onBack}>
            <i className="fa-solid fa-arrow-left"></i> Kembali
          </button>
          <h1 className="header-title">{category}</h1>
          <div className="header-spacer"></div>
        </div>
      </header>
      
      <div className="layout-grid">
        <SidebarLeft 
          category={category} 
          currentMateriIndex={currentMateriIndex}
          setCurrentMateriIndex={setCurrentMateriIndex}
        />
        <Content 
          category={category} 
          currentMateriIndex={currentMateriIndex}
        />
      </div>
    </div>
  );
}
