# Guide: Convert Old Materi to React Component

## Overview
Panduan untuk convert materi dari format string/structured ke React component dengan Medium typography + Bootstrap code blocks.

## Template Struktur

```jsx
import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi02() {
  return (
    <MateriLayout
      title="[TITLE MATERI]"
      intro="[INTRO PARAGRAPH - Penjelasan singkat tentang topik]"
    >
      {/* Section 1 */}
      <Section id="section-id" heading="Section Heading">
        <p>
          Paragraph content here. Gunakan font serif untuk readability.
        </p>
        <p>
          Multiple paragraphs separated by 29px spacing.
        </p>

        {/* Code block dengan caption OUTSIDE */}
        <p className="code-caption">Caption di luar code block</p>
        <CodeBlock language="php">
{`<?php
// Pure code only, no caption inside
echo "Hello World";
?>`}
        </CodeBlock>

        {/* Note component */}
        <Note type="info">
          Additional information atau tips penting.
        </Note>
      </Section>

      {/* Section with Subsection */}
      <Section id="section-2" heading="Section 2">
        <p>Section intro...</p>

        <Subsection id="subsection-1" heading="Subsection Heading">
          <p>Subsection content...</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
        </Subsection>
      </Section>
    </MateriLayout>
  );
}
```

## Aturan Penting

### 1. **Code Blocks - STRICT**
```jsx
// ❌ WRONG - Caption inside CodeBlock
<CodeBlock language="php" caption="Wrong pattern">
{`code here`}
</CodeBlock>

//  CORRECT - Caption outside as separate <p>
<p className="code-caption">Correct pattern</p>
<CodeBlock language="php">
{`code here`}
</CodeBlock>
```

### 2. **Note Types**
```jsx
<Note type="info">Information</Note>
<Note type="warning">Warning message</Note>
<Note type="tip">Helpful tip</Note>
<Note type="danger">Critical warning</Note>
```

### 3. **Language Support**
Supported languages untuk syntax highlighting:
- `php` - PHP code
- `javascript` / `js` - JavaScript
- `jsx` - React/JSX
- `kotlin` - Kotlin
- `dart` - Flutter/Dart
- `bash` - Shell commands
- `json` - JSON data
- `tree` - Directory structure (special rendering)

### 4. **Typography Best Practices**
- Gunakan `<p>` untuk paragraphs (auto spacing 29px)
- Gunakan `<ul>` atau `<ol>` untuk lists
- Gunakan `<strong>` untuk emphasis
- Gunakan `<code>` untuk inline code
- Jangan gunakan manual spacing/margin

## Conversion Steps

### Step 1: Analyze Old Materi
```javascript
// Old format (materi/Laravel.js)
export const materiList = [
  "string content...", // Materi 1
  {
    sections: [...]    // Materi 2
  }
];
```

### Step 2: Create New File
```bash
# Create new file
touch src/learning/materi/Laravel/Materi02.jsx
```

### Step 3: Convert Content
1. Copy template structure
2. Extract title & intro
3. Convert sections:
   - String paragraphs → `<p>`
   - Code blocks → Extract caption, move outside
   - Lists → `<ul>` / `<ol>`
   - Notes → `<Note type="...">`
4. Update section IDs untuk anchor links
5. Test syntax highlighting

### Step 4: Update index.js
```javascript
// materi/Laravel/index.js
import Materi01 from './Materi01';
import Materi02 from './Materi02'; // Add new import

export const materiList = [
  Materi01,
  Materi02, // Add to array
  // ... rest are old format (backward compatible)
];
```

### Step 5: Test
1. Check di browser: http://localhost:5179/learning/laravel
2. Verify typography: Font Lora, 21px, readable
3. Verify code blocks: Bootstrap style, syntax highlighting
4. Verify captions: Outside code blocks
5. Test mobile responsive: 18px font, scrolling works

## Common Patterns

### Pattern: Simple Code Block
```jsx
<p className="code-caption">Create a new controller</p>
<CodeBlock language="bash">
{`php artisan make:controller UserController`}
</CodeBlock>
```

### Pattern: PHP Code
```jsx
<p className="code-caption">routes/web.php</p>
<CodeBlock language="php">
{`<?php
Route::get('/users', [UserController::class, 'index']);
?>`}
</CodeBlock>
```

### Pattern: Directory Tree
```jsx
<p className="code-caption">Struktur folder Laravel</p>
<CodeBlock language="tree">
{`app/
├── Http/
│   ├── Controllers/
│   └── Middleware/
├── Models/
└── Providers/`}
</CodeBlock>
```

### Pattern: Note dengan List
```jsx
<Note type="tip">
  <p>Tips untuk development:</p>
  <ul>
    <li>Gunakan artisan commands</li>
    <li>Enable debugging di .env</li>
  </ul>
</Note>
```

## Quality Checklist

Before marking materi as converted:
- [ ] Typography: Font Lora (serif) terlihat
- [ ] Font size: 21px body text (comfortable reading)
- [ ] Max width: 680px (optimal reading width)
- [ ] Paragraph spacing: 29px (generous white space)
- [ ] Code blocks: Bootstrap style (#f8f9fa background)
- [ ] Captions: ALL outside code blocks
- [ ] Syntax highlighting: Colors visible
- [ ] No compilation errors
- [ ] Mobile responsive: Readable on small screens

## Target: All Materi

### Laravel (20 materi)
- [x] Materi 01 - Pengenalan Laravel 
- [ ] Materi 02 - Installation & Setup
- [ ] Materi 03 - Routing
- [ ] Materi 04 - Controllers
- [ ] Materi 05 - Views & Blade
- [ ] Materi 06 - Database & Migrations
- [ ] Materi 07 - Eloquent ORM
- [ ] Materi 08 - Authentication
- [ ] Materi 09 - Middleware
- [ ] Materi 10 - Forms & Validation
- [ ] Materi 11 - File Upload
- [ ] Materi 12 - API Development
- [ ] Materi 13 - Testing
- [ ] Materi 14 - Queues & Jobs
- [ ] Materi 15 - Events & Listeners
- [ ] Materi 16 - Notifications
- [ ] Materi 17 - Caching
- [ ] Materi 18 - Deployment
- [ ] Materi 19 - Best Practices
- [ ] Materi 20 - Advanced Topics

### Kotlin, Flutter, JavaScript
Apply same pattern to all other topics after Laravel is done.

## Notes
- Conversion ini one-time effort untuk permanent improvement
- Setelah converted, maintenance jauh lebih mudah (edit JSX langsung)
- No more parser bugs dengan semicolons atau brackets
- Typography system sudah optimal untuk long-form reading
