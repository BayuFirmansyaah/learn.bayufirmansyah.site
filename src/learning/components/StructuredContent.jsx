import React from 'react';
import CodeBlock from './CodeBlock';
import Note from './Note';
import '../styles.css';

const StructuredContent = ({ materi }) => {
  const renderSection = (section, index) => {
    const HeadingTag = `h${section.level}`;
    
    return (
      <div key={section.id || index} className="content-section" id={section.id}>
        <HeadingTag className="section-heading">
          {section.heading}
        </HeadingTag>
        
        {section.content && section.content.length > 0 && (
          <div className="section-content">
            {section.content.map((paragraph, i) => (
              <p key={i} className="section-paragraph">
                {paragraph}
              </p>
            ))}
          </div>
        )}
        
        {section.code && (
          <div className="section-code">
            {section.code.caption && (
              <p className="code-caption">{section.code.caption}</p>
            )}
            {/* STRICT: Pass as children, not code prop */}
            <CodeBlock language={section.code.language} caption={section.code.caption}>
              {section.code.example}
            </CodeBlock>
          </div>
        )}
        
        {section.note && (
          <Note type={section.note.type} content={section.note.content} />
        )}
        
        {section.subsections && section.subsections.length > 0 && (
          <div className="subsections">
            {section.subsections.map((subsection, i) => renderSection(subsection, i))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="structured-content">
      <h1 className="content-title">{materi.title}</h1>
      
      {materi.intro && (
        <div className="content-intro">
          <p>{materi.intro}</p>
        </div>
      )}
      
      {materi.sections && materi.sections.length > 0 && (
        <div className="content-sections">
          {materi.sections.map((section, index) => renderSection(section, index))}
        </div>
      )}
      
      {materi.related && materi.related.length > 0 && (
        <div className="related-topics">
          <h3>Related Topics</h3>
          <ul>
            {materi.related.map((topic) => (
              <li key={topic.id}>
                <a href={`#materi-${topic.id}`}>{topic.title}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StructuredContent;
