import React from 'react';
import * as LaravelMateri from './materi/Laravel.js';
import * as KotlinMateri from './materi/Kotlin.js';
import * as FlutterMateri from './materi/Flutter.js';
import * as JavaScriptMateri from './materi/JavaScript.js';

const materiMap = {
  'Laravel': LaravelMateri,
  'Kotlin': KotlinMateri,
  'Flutter': FlutterMateri,
  'JavaScript': JavaScriptMateri
};

export default function SidebarRight({ category, currentMateriIndex }) {
  const materiModule = materiMap[category];
  const materiList = materiModule?.materiList || [];
  const currentMateri = materiList[currentMateriIndex];

  if (!currentMateri || !currentMateri.keypoints) {
    return (
      <aside className="sidebar-right">
        <div className="sidebar-header">
          <h2>Key Points</h2>
        </div>
        <div className="keypoints-empty">
          <p>Tidak ada key points</p>
        </div>
      </aside>
    );
  }

  // Handle both old format (string array) and new format (object array)
  const isNewFormat = currentMateri.keypoints.length > 0 && 
                       typeof currentMateri.keypoints[0] === 'object' &&
                       currentMateri.keypoints[0].type;

  return (
    <aside className="sidebar-right">
      <div className="sidebar-header">
        <h2>Key Points</h2>
      </div>
      
      <div className="keypoints-list">
        {currentMateri.keypoints.map((point, index) => {
          if (isNewFormat) {
            // New format: object with type, icon, text, color
            return (
              <div key={index} className={`keypoint-item keypoint-${point.color || 'blue'}`}>
                <div className="keypoint-icon">
                  <span className="keypoint-emoji">{point.icon}</span>
                </div>
                <div className="keypoint-content">
                  <span className="keypoint-badge">{point.type}</span>
                  <p className="keypoint-text">{point.text}</p>
                </div>
              </div>
            );
          } else {
            // Old format: string
            return (
              <div key={index} className="keypoint-item">
                <div className="keypoint-icon">
                  <i className="fa-solid fa-check"></i>
                </div>
                <p className="keypoint-text">{point}</p>
              </div>
            );
          }
        })}
      </div>
    </aside>
  );
}
