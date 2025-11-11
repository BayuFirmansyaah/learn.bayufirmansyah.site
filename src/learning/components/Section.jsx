import React from 'react';
import '../styles.css';

/**
 * Section Component - STRICT MODE
 * 
 * Usage:
 * <Section id="section-id" heading="Section Title" level={2}>
 *   <p>Content here...</p>
 *   <CodeBlock>...</CodeBlock>
 * </Section>
 * 
 * Props:
 * - id (required): Unique identifier for anchor links
 * - heading (required): Section title
 * - level (optional): Heading level (2 or 3), default 2
 * - children (required): Section content
 */
export default function Section({ 
  id, 
  heading, 
  level = 2, 
  children 
}) {
  // STRICT: Validate required props
  if (!id) {
    console.error('Section: id is required for anchor links!');
  }
  if (!heading) {
    console.error('Section: heading is required!');
    return null;
  }
  if (!children) {
    console.error('Section: children is required!');
    return null;
  }

  const HeadingTag = `h${level}`;
  
  return (
    <div className="content-section" id={id}>
      <HeadingTag className="section-heading">
        {heading}
      </HeadingTag>
      <div className="section-content">
        {children}
      </div>
    </div>
  );
}

/**
 * Subsection Component - Alias for Section with level 3
 * 
 * Usage:
 * <Subsection id="subsection-id" heading="Subsection Title">
 *   <p>Content here...</p>
 * </Subsection>
 */
export function Subsection({ id, heading, children }) {
  if (!heading || !children) {
    console.error('Subsection: heading and children are required!');
    return null;
  }

  return (
    <div className="subsections">
      <Section id={id} heading={heading} level={3}>
        {children}
      </Section>
    </div>
  );
}
