import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import '../prism-bootstrap.css';
// Import markup-templating first (required for PHP)
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';

/**
 * CodeBlock Component - STRICT MODE (Bootstrap-style)
 * 
 * Usage:
 * <p className="code-caption">Caption goes outside the block</p>
 * <CodeBlock language="php">
 * {`<?php
 * // Your code here
 * ?>`}
 * </CodeBlock>
 * 
 * Props:
 * - children (required): Code content as string
 * - language (optional): Programming language for syntax highlighting
 * 
 * ❌ DON'T: 
 * - <CodeBlock caption="...">code</CodeBlock> (caption removed)
 * - <CodeBlock code="..." /> (deprecated)
 * 
 *  DO: 
 * - <p className="code-caption">Caption</p>
 * - <CodeBlock language="php">{`code`}</CodeBlock>
 */
export default function CodeBlock({ language = 'text', children }) {
  // STRICT: Only accept children, no 'code' prop for consistency
  if (!children) {
    console.error('CodeBlock: children is required! Use: <CodeBlock>{`code here`}</CodeBlock>');
    return (
      <div className="code-block-wrapper" style={{ border: '2px solid red', padding: '1rem' }}>
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          ❌ Error: CodeBlock requires children!
        </p>
        <p style={{ fontSize: '0.875rem', color: '#666' }}>
          Usage: <code>{'<CodeBlock language="php">{`code`}</CodeBlock>'}</code>
        </p>
      </div>
    );
  }

  const codeContent = children;
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  // Syntax highlighting with Prism.js
  useEffect(() => {
    if (codeRef.current && language !== 'tree') {
      try {
        Prism.highlightElement(codeRef.current);
      } catch (error) {
        console.warn('Prism highlighting failed:', error);
        // Fallback: just display plain text
      }
    }
  }, [codeContent, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Syntax highlight for tree structure
  const renderTreeCode = (code) => {
    if (!code) return null;
    
    return code.split('\n').map((line, index) => {
      // Tree characters
      const treeChars = line.match(/^[├└│─\s]+/)?.[0] || '';
      const content = line.slice(treeChars.length);
      
      let contentClass = '';
      let contentDisplay = content;
      
      // Detect type
      if (content.endsWith('/')) {
        contentClass = 'tree-folder';
      } else if (content.includes('#')) {
        const [name, ...comment] = content.split('#');
        contentDisplay = (
          <>
            <span className="tree-file">{name.trim()}</span>
            <span className="tree-comment"># {comment.join('#').trim()}</span>
          </>
        );
      } else if (content.trim()) {
        contentClass = 'tree-file';
      }
      
      return (
        <div key={index} className="tree-line">
          <span className="tree-chars">{treeChars}</span>
          {typeof contentDisplay === 'string' ? (
            <span className={contentClass}>{contentDisplay}</span>
          ) : (
            contentDisplay
          )}
        </div>
      );
    });
  };

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-language">{language}</span>
        <button 
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <i className="fa-solid fa-check"></i>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <i className="fa-solid fa-copy"></i>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="code-block">
        {language === 'tree' ? (
          <code className={`language-${language}`}>{renderTreeCode(codeContent)}</code>
        ) : (
          <code ref={codeRef} className={`language-${language}`}>
            {codeContent}
          </code>
        )}
      </pre>
    </div>
  );
}
