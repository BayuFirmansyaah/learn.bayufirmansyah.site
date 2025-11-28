import React from 'react';
import * as LaravelMateri from './materi/Laravel/index.js';
import * as KotlinMateri from './materi/Kotlin/index.js';
import * as FlutterMateri from './materi/Flutter/index.js';
import * as JavaScriptMateri from './materi/JavaScript/index.js';
import * as PythonMateri from './materi/Python/index.js';
import * as NodeJSMateri from './materi/NodeJS/index.js';
import * as GitMateri from './materi/Git/index.js';

const materiMap = {
  'Laravel': LaravelMateri,
  'Kotlin': KotlinMateri,
  'Flutter': FlutterMateri,
  'JavaScript': JavaScriptMateri,
  'Python': PythonMateri,
  'NodeJS': NodeJSMateri,
  'Git': GitMateri
};

export default function SidebarLeft({ category, currentMateriIndex, setCurrentMateriIndex }) {
  const materiModule = materiMap[category];
  const materiList = materiModule?.materiList || [];
  const materiTitles = materiModule?.materiTitles || [];

  return (
    <aside className="sidebar-left">
      <div className="sidebar-header">
        <h2>Daftar Materi</h2>
        <span className="materi-count">{materiList.length} Materi</span>
      </div>
      
      <nav className="materi-nav">
        {materiList.map((_, index) => (
          <button
            key={index}
            className={`materi-item ${index === currentMateriIndex ? 'active' : ''}`}
            onClick={() => setCurrentMateriIndex(index)}
          >
            <span className="materi-number">{index + 1}</span>
            <span className="materi-title">{materiTitles[index] || `Materi ${index + 1}`}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
