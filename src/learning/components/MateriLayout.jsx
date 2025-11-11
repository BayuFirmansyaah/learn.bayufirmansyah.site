import React from 'react';
import '../styles.css';

export default function MateriLayout({ 
  title, 
  intro, 
  children,
  keypoints,
  related 
}) {
  return (
    <div className="structured-content">
      <h1 className="content-title">{title}</h1>
      
      {intro && (
        <div className="content-intro">
          <p>{intro}</p>
        </div>
      )}
      
      <div className="content-sections">
        {children}
      </div>
      
      {related && related.length > 0 && (
        <div className="related-topics">
          <h3>Related Topics</h3>
          <ul>
            {related.map((topic) => (
              <li key={topic.id}>
                <a href={`#materi-${topic.id}`}>{topic.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
