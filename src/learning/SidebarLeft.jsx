import React from 'react';
import * as LaravelMateri from './materi/Laravel/index.js';
import * as KotlinMateri from './materi/Kotlin.js';
import * as FlutterMateri from './materi/Flutter.js';
import * as JavaScriptMateri from './materi/JavaScript.js';

const materiMap = {
  'Laravel': LaravelMateri,
  'Kotlin': KotlinMateri,
  'Flutter': FlutterMateri,
  'JavaScript': JavaScriptMateri
};

export default function SidebarLeft({ category, currentMateriIndex, setCurrentMateriIndex }) {
  const materiModule = materiMap[category];
  const materiList = materiModule?.materiList || [];

  return (
    <aside className="sidebar-left">
      <div className="sidebar-header">
        <h2>Daftar Materi</h2>
        <span className="materi-count">{materiList.length} Materi</span>
      </div>
      
      <nav className="materi-nav">
        {materiList.map((materi, index) => (
          <button
            key={index}
            className={`materi-item ${index === currentMateriIndex ? 'active' : ''}`}
            onClick={() => setCurrentMateriIndex(index)}
          >
            <span className="materi-number">{index + 1}</span>
            <span className="materi-title">{materi.title}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
