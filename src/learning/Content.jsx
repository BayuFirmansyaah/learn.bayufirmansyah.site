import React, { useEffect, useRef } from 'react';
import CodeBlock from './components/CodeBlock';
import StructuredContent from './components/StructuredContent';
import NavigationButtons from './components/NavigationButtons';
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

// Function to parse content and separate code blocks from paragraphs
function parseContent(content, category) {
  const blocks = [];
  let currentBlock = '';
  let inCodeBlock = false;
  let codeBlockContent = '';
  let inPHPBlock = false; // Track if we're inside <?php ... ?> block
  let bracketDepth = 0; // Track bracket depth for code blocks
  
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    
    // Check if entering/exiting PHP block
    if (trimmed.startsWith('<?php') || trimmed.startsWith('<?=')) {
      inPHPBlock = true;
    }
    if (trimmed === '?>' || trimmed.endsWith('?>')) {
      inPHPBlock = false;
    }
    
    // Track bracket depth for better code block detection
    if (inCodeBlock) {
      const openBrackets = (line.match(/[{(\[]/g) || []).length;
      const closeBrackets = (line.match(/[})\]]/g) || []).length;
      bracketDepth += openBrackets - closeBrackets;
    }
    
    // Skip lines that are explanations (ends with colon or contains ":")
    // BUT NOT if we're inside PHP block or code block
    const isExplanation = !inPHPBlock && !inCodeBlock && (
      trimmed.endsWith(':') ||
      (trimmed.includes(':') && !trimmed.includes('::') && !trimmed.startsWith('http') && !trimmed.includes('=>'))
    );
    
    // Detect tree structure
    const isTreeStructure = 
      line.includes('├──') ||
      line.includes('└──') ||
      line.includes('│') ||
      (trimmed.startsWith('my-') && trimmed.endsWith('/')) ||
      (line.match(/^[\s│├└─]+/) && (trimmed.includes('/') || trimmed.includes('#')));
    
    // If we're in PHP block, everything is code
    const isCodeLine = inPHPBlock || (
      !isExplanation && (
      isTreeStructure ||
      // Command lines (must start at beginning, not in middle)
      trimmed.startsWith('composer ') ||
      trimmed.startsWith('npm ') ||
      trimmed.startsWith('yarn ') ||
      trimmed.startsWith('php ') ||
      trimmed.startsWith('flutter ') ||
      trimmed.startsWith('dart ') ||
      trimmed.startsWith('node ') ||
      trimmed.startsWith('git ') ||
      trimmed.startsWith('cd ') ||
      trimmed.startsWith('mkdir ') ||
      trimmed.startsWith('touch ') ||
      trimmed.startsWith('cp ') ||
      trimmed.startsWith('chmod ') ||
      trimmed.startsWith('chown ') ||
      trimmed.startsWith('curl ') ||
      trimmed.startsWith('./') ||
      // PHP
      trimmed.startsWith('<?php') ||
      trimmed.startsWith('<?=') ||
      trimmed === '?>' ||
      (trimmed.includes('Route::') && !isExplanation) ||
      (trimmed.includes('Schema::') && !isExplanation) ||
      (trimmed.includes('DB::') && !isExplanation) ||
      (trimmed.includes('Model::') && !isExplanation) ||
      trimmed.includes('$') || // PHP variables
      // Programming keywords
      trimmed.startsWith('import ') ||
      trimmed.startsWith('from ') ||
      trimmed.startsWith('const ') ||
      trimmed.startsWith('let ') ||
      trimmed.startsWith('var ') ||
      trimmed.startsWith('function ') ||
      trimmed.startsWith('fun ') ||
      trimmed.startsWith('class ') ||
      trimmed.startsWith('interface ') ||
      trimmed.startsWith('public ') ||
      trimmed.startsWith('private ') ||
      trimmed.startsWith('protected ') ||
      trimmed.startsWith('static ') ||
      trimmed.startsWith('abstract ') ||
      trimmed.startsWith('extends ') ||
      trimmed.startsWith('implements ') ||
      // Annotations/decorators
      trimmed.startsWith('@') ||
      trimmed.startsWith('#[') ||
      // Common code patterns
      trimmed.startsWith('return ') ||
      trimmed.startsWith('echo ') ||
      trimmed.startsWith('print ') ||
      trimmed.startsWith('console.') ||
      trimmed.startsWith('if ') ||
      trimmed.startsWith('if(') ||
      trimmed.startsWith('else') ||
      trimmed.startsWith('for ') ||
      trimmed.startsWith('for(') ||
      trimmed.startsWith('while ') ||
      trimmed.startsWith('while(') ||
      trimmed.startsWith('foreach ') ||
      trimmed.startsWith('foreach(') ||
      trimmed.startsWith('switch ') ||
      trimmed.startsWith('case ') ||
      trimmed.startsWith('break') ||
      trimmed.startsWith('continue') ||
      trimmed.startsWith('try ') ||
      trimmed.startsWith('catch ') ||
      trimmed.startsWith('throw ') ||
      trimmed.startsWith('use ') ||
      trimmed.startsWith('namespace ') ||
      trimmed.startsWith('package ') ||
      // Brackets and braces
      trimmed === '}' ||
      trimmed === '{' ||
      trimmed === '});' ||
      trimmed === '};' ||
      trimmed === '];' ||
      trimmed.startsWith('}') ||
      trimmed.startsWith('{') ||
      // Comments
      trimmed.startsWith('//') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('*/') ||
      // Arrows and operators
      trimmed.includes('->') ||
      trimmed.includes('=>') ||
      trimmed.includes('::') ||
      // HTML/Blade tags
      trimmed.startsWith('<') && trimmed.includes('>') ||
      trimmed.startsWith('@if') ||
      trimmed.startsWith('@foreach') ||
      trimmed.startsWith('@for') ||
      trimmed.startsWith('@while') ||
      trimmed.startsWith('@endif') ||
      trimmed.startsWith('@endforeach') ||
      trimmed.startsWith('@extends') ||
      trimmed.startsWith('@section') ||
      trimmed.startsWith('@yield') ||
      // Indented code (4+ spaces)
      (line.startsWith('    ') && trimmed.length > 0 && !trimmed.endsWith('.'))
      )
    );
    
    if (isCodeLine && !inCodeBlock) {
      // Start new code block
      if (currentBlock.trim()) {
        blocks.push({ type: 'text', content: currentBlock.trim() });
        currentBlock = '';
      }
      inCodeBlock = true;
      codeBlockContent = line;
      // Initialize bracket depth
      const openBrackets = (line.match(/[{(\[]/g) || []).length;
      const closeBrackets = (line.match(/[})\]]/g) || []).length;
      bracketDepth = openBrackets - closeBrackets;
    } else if (isCodeLine && inCodeBlock) {
      // Continue code block
      codeBlockContent += '\n' + line;
    } else if (!isCodeLine && inCodeBlock) {
      // Check if we should continue code block
      // Continue if: 1) blank line, 2) still in PHP block, 3) bracket depth > 0
      const nextLine = lines[i + 1];
      const shouldContinue = (
        (nextLine && nextLine.trim() === '') || // Blank line
        inPHPBlock || // Inside PHP block
        bracketDepth > 0 // Unclosed brackets
      );
      
      if (shouldContinue) {
        // Continue code block
        codeBlockContent += '\n' + line;
      } else {
        // End code block
        if (codeBlockContent.trim()) {
          blocks.push({ type: 'code', content: codeBlockContent.trim() });
          codeBlockContent = '';
        }
        inCodeBlock = false;
        bracketDepth = 0;
        currentBlock = line;
      }
    } else {
      // Regular text
      currentBlock += (currentBlock ? '\n' : '') + line;
    }
  }
  
  // Handle remaining content
  if (inCodeBlock && codeBlockContent.trim()) {
    blocks.push({ type: 'code', content: codeBlockContent.trim() });
  } else if (currentBlock.trim()) {
    blocks.push({ type: 'text', content: currentBlock.trim() });
  }
  
  return blocks;
}

// Detect language based on category and code content
function detectLanguage(category, code) {
  // Tree structure detection
  if (code.includes('├──') || code.includes('└──') || code.includes('│')) return 'tree';
  
  if (code.includes('composer ') || code.includes('php ')) return 'bash';
  if (code.includes('<?php') || code.includes('Route::') || code.includes('Schema::')) return 'php';
  if (code.includes('npm ') || code.includes('flutter ')) return 'bash';
  if (code.includes('class ') && code.includes('extends Widget')) return 'dart';
  if (code.includes('fun ') || code.includes('val ') || code.includes('var ')) return 'kotlin';
  if (code.includes('const ') || code.includes('let ') || code.includes('function ')) return 'javascript';
  if (code.includes('import ') && category === 'JavaScript') return 'javascript';
  if (code.includes('import ') && category === 'Kotlin') return 'kotlin';
  if (code.includes('import ') && category === 'Flutter') return 'dart';
  
  // Default based on category
  if (category === 'Laravel') return 'php';
  if (category === 'Kotlin') return 'kotlin';
  if (category === 'Flutter') return 'dart';
  if (category === 'JavaScript') return 'javascript';
  
  return 'text';
}

export default function Content({ category, currentMateriIndex, setCurrentMateriIndex }) {
  // Ref for main content
  const contentRef = useRef(null);

  // Scroll to top when materi changes
  useEffect(() => {
    // Try scrolling the main content container first
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Fallback: scroll window to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentMateriIndex, category]);
  const materiModule = materiMap[category];
  const materiList = materiModule?.materiList || [];
  const totalMateri = materiList.length;
  const currentMateri = materiList[currentMateriIndex];

  if (!currentMateri) {
    return (
      <main className="content" ref={contentRef}>
        <div className="content-empty">
          <p>Materi tidak ditemukan</p>
        </div>
      </main>
    );
  }

  // Check if this is a React component (function)
  const isReactComponent = typeof currentMateri === 'function';
  
  if (isReactComponent) {
    const MateriComponent = currentMateri;
    return (
      <main className="content" ref={contentRef}>
        <article className="materi-content">
          <MateriComponent />
          <NavigationButtons 
            category={category}
            currentIndex={currentMateriIndex}
            totalMateri={totalMateri}
            onNavigate={setCurrentMateriIndex}
          />
        </article>
      </main>
    );
  }

  // Check if this is the new structured format (object with sections)
  const isStructuredFormat = currentMateri.sections && Array.isArray(currentMateri.sections);

  // Use new renderer for structured format
  if (isStructuredFormat) {
    return (
      <main className="content" ref={contentRef}>
        <article className="materi-content">
          <StructuredContent materi={currentMateri} />
          <NavigationButtons 
            category={category}
            currentIndex={currentMateriIndex}
            totalMateri={totalMateri}
            onNavigate={setCurrentMateriIndex}
          />
        </article>
      </main>
    );
  }

  // Fall back to old parser for legacy format (string content)
  const contentBlocks = parseContent(currentMateri.content, category);

  return (
  <main className="content" ref={contentRef}>
  <article className="materi-content">
        <h1 className="content-title">{currentMateri.title}</h1>
        <div className="content-body">
          {contentBlocks.map((block, index) => {
            if (block.type === 'code') {
              const language = detectLanguage(category, block.content);
              // STRICT: Pass as children, not code prop
              return (
                <CodeBlock key={index} language={language}>
                  {block.content}
                </CodeBlock>
              );
            } else {
              // Split text block into paragraphs
              return block.content.split('\n\n').map((paragraph, pIndex) => (
                <p key={`${index}-${pIndex}`}>{paragraph}</p>
              ));
            }
          })}
        </div>
        <NavigationButtons 
          category={category}
          currentIndex={currentMateriIndex}
          totalMateri={totalMateri}
          onNavigate={setCurrentMateriIndex}
        />
      </article>
    </main>
  );
}
