# Strict Component Usage Guide

## 🔒 STRICT MODE - Component API

All helper components now enforce **strict prop validation** for consistency and best practices.

---

## 📦 CodeBlock Component

###  Correct Usage (STRICT)

```jsx
<CodeBlock language="php" caption="Optional caption text">
{`<?php
Route::get('/', function() {
    return view('welcome');
});
?>`}
</CodeBlock>
```

### Required Props:
- **`children`** (required): Code content as template literal `{` ... `}`
- **`language`** (optional): Programming language - `php`, `javascript`, `bash`, `tree`, etc.
- **`caption`** (optional): Caption text displayed above code block

### ❌ Don't Use (Deprecated):
```jsx
// DON'T - code prop is deprecated
<CodeBlock code="..." language="php" />
```

### Error Handling:
If `children` is missing, component will render error message with usage instructions.

---

## 📑 Section Component

###  Correct Usage (STRICT)

```jsx
<Section id="unique-section-id" heading="Section Title" level={2}>
  <p>Content paragraph...</p>
  <CodeBlock language="php">{`code`}</CodeBlock>
  <Note type="tip">Helpful tip!</Note>
</Section>
```

### Required Props:
- **`id`** (required): Unique identifier for anchor links (kebab-case recommended)
- **`heading`** (required): Section title text
- **`children`** (required): Section content (JSX elements)
- **`level`** (optional): Heading level `2` (h2) or `3` (h3), default `2`

### ❌ Don't Use:
```jsx
// Missing required props
<Section>Content</Section>  // ❌ No id, heading

// Empty section
<Section id="test" heading="Test" />  // ❌ No children
```

### Console Errors:
- Missing `id`: Warning in console (for SEO/navigation)
- Missing `heading`: Component returns `null`
- Missing `children`: Component returns `null`

---

## 📑 Subsection Component

###  Correct Usage (STRICT)

```jsx
<Subsection id="subsection-id" heading="Subsection Title">
  <p>Subsection content...</p>
  <CodeBlock language="javascript">{`code`}</CodeBlock>
</Subsection>
```

**Note:** Subsection is an alias for `<Section level={3}>` with automatic wrapper styling.

### Required Props:
- **`id`** (required): Unique identifier
- **`heading`** (required): Subsection title
- **`children`** (required): Content

---

## 💡 Note Component

###  Correct Usage (STRICT)

```jsx
<Note type="info">
  This is an informational note with important details.
</Note>

<Note type="tip">
  Pro tip: Use named routes for better maintainability!
</Note>

<Note type="warning">
  Be careful with raw HTML output using {`{!! !!}`}
</Note>

<Note type="danger">
  Never commit .env files to version control!
</Note>
```

### Required Props:
- **`type`** (required): Must be one of: `'info'`, `'warning'`, `'tip'`, `'danger'`
- **`children`** (required): Note content (text or JSX)

### Deprecated (Still Works):
```jsx
// Old way with content prop
<Note type="tip" content="Text here" />
```
 Works but prefer using `children` for consistency.

### ❌ Don't Use:
```jsx
// Invalid type
<Note type="error">...</Note>  // ❌ Invalid, use 'danger'

// Missing content
<Note type="info" />  // ❌ No children
```

### Console Errors:
- Invalid `type`: Component returns `null` with error message
- Missing `children`/`content`: Component returns `null`

---

## 📐 MateriLayout Component

###  Correct Usage

```jsx
export default function Materi01() {
  return (
    <MateriLayout
      title="Main Title Here"
      intro="Brief introduction paragraph explaining the topic..."
    >
      <Section id="section-1" heading="First Section">
        {/* Section content */}
      </Section>
      
      <Section id="section-2" heading="Second Section">
        {/* Section content */}
      </Section>
    </MateriLayout>
  );
}
```

### Props:
- **`title`** (required): Main page title (H1)
- **`intro`** (optional): Introduction paragraph
- **`children`** (required): Section components
- **`keypoints`** (optional): Array of keypoint objects (legacy)
- **`related`** (optional): Array of related topic objects

---

## 🎯 Complete Example

```jsx
import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi04Routing() {
  return (
    <MateriLayout
      title="Laravel Routing & URL Management"
      intro="Routes are the entry point to your application, connecting URLs to application logic."
    >
      {/* Main Section */}
      <Section id="basic-routing" heading="Basic Routing">
        <p>
          Laravel routes are defined in the <code>routes/</code> directory.
          The most basic routes accept a URI and a closure.
        </p>
        
        <CodeBlock language="php" caption="Simple route example">
{`<?php
Route::get('/', function () {
    return view('welcome');
});

Route::post('/users', function () {
    return 'Create new user';
});`}
        </CodeBlock>
        
        <Note type="info">
          Routes are registered in the order they are defined.
          Make sure specific routes come before generic ones!
        </Note>
      </Section>

      {/* Section with Subsections */}
      <Section id="route-parameters" heading="Route Parameters">
        <p>Capture segments of the URI within your route.</p>
        
        <Subsection id="required-params" heading="Required Parameters">
          <p>Parameters are always encased within braces.</p>
          
          <CodeBlock language="php">
{`<?php
Route::get('/user/{id}', function ($id) {
    return 'User ' . $id;
});`}
          </CodeBlock>
        </Subsection>
        
        <Subsection id="optional-params" heading="Optional Parameters">
          <p>Place a <code>?</code> mark after the parameter name.</p>
          
          <CodeBlock language="php">
{`<?php
Route::get('/user/{name?}', function ($name = 'Guest') {
    return $name;
});`}
          </CodeBlock>
          
          <Note type="tip">
            Always provide a default value for optional parameters!
          </Note>
        </Subsection>
      </Section>
    </MateriLayout>
  );
}
```

---

##  Benefits of Strict Mode

1. **Consistency** - All materi use same component API
2. **Type Safety** - Props validated at runtime
3. **Better DX** - Clear error messages in console
4. **Maintainability** - Easier to refactor/update
5. **No Parser Bugs** - Direct JSX, no string parsing
6. **IDE Support** - Full autocomplete and IntelliSense

---

## 🚨 Common Errors & Solutions

### Error: "CodeBlock: children is required!"
```jsx
// ❌ Wrong
<CodeBlock language="php" />

//  Correct
<CodeBlock language="php">
{`<?php echo "Hello"; ?>`}
</CodeBlock>
```

### Error: "Section: heading is required!"
```jsx
// ❌ Wrong
<Section id="test">Content</Section>

//  Correct
<Section id="test" heading="Test Section">Content</Section>
```

### Error: "Note: Invalid type"
```jsx
// ❌ Wrong
<Note type="error">Message</Note>

//  Correct
<Note type="danger">Message</Note>
```

---

## 📚 Quick Reference

| Component | Required Props | Optional Props |
|-----------|---------------|----------------|
| **CodeBlock** | `children` | `language`, `caption` |
| **Section** | `id`, `heading`, `children` | `level` (2 or 3) |
| **Subsection** | `id`, `heading`, `children` | - |
| **Note** | `type`, `children` | - |
| **MateriLayout** | `title`, `children` | `intro`, `keypoints`, `related` |

---

## 🎓 Writing New Materi

1. Create new file: `src/learning/materi/Laravel/MateriXX.jsx`
2. Import helper components
3. Export default function component
4. Use strict component API
5. Add to `index.js` export

**Template:**
```jsx
import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function MateriXX() {
  return (
    <MateriLayout title="..." intro="...">
      <Section id="..." heading="...">
        <p>...</p>
        <CodeBlock language="...">{`...`}</CodeBlock>
        <Note type="...">...</Note>
      </Section>
    </MateriLayout>
  );
}
```

Done! 🎉
