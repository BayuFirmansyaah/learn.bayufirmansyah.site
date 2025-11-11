import React from 'react';
import '../styles.css';

/**
 * Note Component - STRICT MODE
 * 
 * Usage:
 * <Note type="info|warning|tip|danger">
 *   Content here...
 * </Note>
 * 
 * Props:
 * - type (required): Note type - 'info', 'warning', 'tip', or 'danger'
 * - children (required): Note content
 * - content (deprecated): Use children instead
 */
const Note = ({ type = 'info', content, children }) => {
  // STRICT: Validate type
  const validTypes = ['info', 'warning', 'tip', 'danger'];
  if (!validTypes.includes(type)) {
    console.error(`Note: Invalid type "${type}". Must be one of: ${validTypes.join(', ')}`);
    return null;
  }

  // STRICT: Require content
  const noteContent = children || content;
  if (!noteContent) {
    console.error('Note: children or content is required!');
    return null;
  }

  const icons = {
    info: '💡',
    warning: '⚠️',
    tip: '✨',
    danger: '🚨'
  };

  const labels = {
    info: 'Info',
    warning: 'Warning',
    tip: 'Tip',
    danger: 'Danger'
  };

  return (
    <div className={`note note-${type}`}>
      <div className="note-header">
        <span className="note-icon">{icons[type]}</span>
        <span className="note-label">{labels[type]}</span>
      </div>
      <div className="note-content">
        {noteContent}
      </div>
    </div>
  );
};

export default Note;
