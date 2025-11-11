# React-based Materi Design

## 🎯 Problem Statement

**Current Issues:**
1. ❌ Materi stored as **string** in `.js` files → Hard to customize
2. ❌ Complex **parser** needed (150+ lines) → Fragile, bugs (semicolon splitting code)
3. ❌ All content in one long string → Difficult to structure
4. ❌ No type safety or IDE support
5. ❌ Hard to add features (notes, alerts, subsections)

**Example Current Format (BAD):**
```javascript
// Laravel.js
export const materiList = [
  {
    title: "Pengenalan Laravel",
    content: `Laravel adalah framework...
    
<?php
Route::get('/', function() {
    return view('welcome');
});

Penjelasan route di atas...`,
    keypoints: [...]
  }
];
```
Problems: Parser harus detect mana code, mana text → Error prone!

---

## ✅ Proposed Solution: React Component-based Materi

### Core Concept
**Each materi = React Component with JSX** → Direct rendering, no parsing!

### Schema Evolution

#### ❌ OLD: String-based (Current - Format Lama)
```javascript
{
  title: "Routing",
  content: "Long string with code mixed...", // Parser needed
  keypoints: []
}
```

#### 🔄 MIDDLE: Object-based (Current - Format Baru)
```javascript
{
  title: "Routing",
  intro: "...",
  sections: [
    { heading: "...", content: [...], code: {...} }
  ]
}
```
Better! But still static data → StructuredContent component must iterate.

#### ✅ NEW: React Component-based (Proposed)
```jsx
// Laravel/Materi01.jsx
export default function Materi01() {
  return (
    <MateriLayout
      title="Pengenalan Laravel"
      intro="Laravel adalah framework PHP modern..."
    >
      <Section id="what-is-laravel" heading="Apa itu Laravel?" level={2}>
        <p>Laravel adalah framework open-source yang menggunakan pola MVC.</p>
        <p>Framework ini menyediakan struktur yang jelas dan konsisten.</p>
      </Section>

      <Section id="why-laravel" heading="Mengapa Laravel?" level={2}>
        <p>Laravel terkenal dengan "elegant syntax"...</p>
        
        <Note type="tip">
          Laravel mengikuti prinsip "Convention over Configuration"
        </Note>
      </Section>

      <Section id="mvc" heading="Arsitektur MVC" level={2}>
        <p>Laravel menggunakan pola MVC...</p>
        
        <CodeBlock language="tree" caption="Alur MVC di Laravel">
{`┌─── Request
├─── Router
├─── Controller
│    ├─── Model
│    └─── View
└─── Response`}
        </CodeBlock>
        
        <CodeBlock language="php">
{`<?php
Route::get('/', function() {
    return view('welcome');
});`}
        </CodeBlock>
      </Section>
    </MateriLayout>
  );
}
```

---

## 🏗️ Architecture

### File Structure
```
src/learning/materi/
├── Laravel/
│   ├── index.js              # Export list of all materi
│   ├── Materi01.jsx          # Pengenalan Laravel
│   ├── Materi02.jsx          # Instalasi
│   ├── Materi03.jsx          # Struktur Folder
│   ├── ...
│   └── Materi20.jsx          # Deployment
├── Kotlin/
│   ├── index.js
│   └── Materi01.jsx
└── Flutter/
    ├── index.js
    └── Materi01.jsx
```

### Component Hierarchy
```
Content.jsx (main renderer)
  └─ MateriLayout (wrapper with title, intro, keypoints)
      ├─ Section (with id, heading, level)
      │   ├─ Subsection (nested Section with level=3)
      │   ├─ <p> (paragraphs)
      │   ├─ CodeBlock (code with language & caption)
      │   ├─ Note (alerts: info, warning, tip, danger)
      │   └─ <ul>/<ol> (lists)
      └─ Related Topics (optional)
```

---

## 📦 Helper Components

### 1. MateriLayout
```jsx
// src/learning/components/MateriLayout.jsx
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
      
      {related && <RelatedTopics topics={related} />}
    </div>
  );
}
```

### 2. Section Component
```jsx
// src/learning/components/Section.jsx
export default function Section({ 
  id, 
  heading, 
  level = 2, 
  children 
}) {
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
```

### 3. Subsection (alias for Section with level=3)
```jsx
export function Subsection({ id, heading, children }) {
  return <Section id={id} heading={heading} level={3} children={children} />;
}
```

---

## 🔄 Migration Path

### Phase 1: Create Infrastructure
1. ✅ Create helper components (MateriLayout, Section, Subsection)
2. ✅ Update Content.jsx to detect and render React components
3. ✅ Create example Materi01.jsx as template

### Phase 2: Convert Laravel (Priority)
1. Convert Materi 1-5 (Foundation)
2. Test thoroughly
3. Convert Materi 6-10 (Database)
4. Convert Materi 11-15 (Views)
5. Convert Materi 16-20 (Advanced)

### Phase 3: Apply to Other Categories
1. Kotlin materi
2. Flutter materi
3. JavaScript materi

---

## 💡 Benefits

| Feature | Old (String) | Middle (Object) | New (React) |
|---------|-------------|-----------------|-------------|
| **Parsing** | ❌ Complex (150+ lines) | ✅ Simple iteration | ✅ None needed! |
| **Code Splitting** | ❌ Often breaks | ✅ Fixed by structure | ✅ Impossible to break |
| **Customization** | ❌ Very hard | 🔄 Medium | ✅ Very easy |
| **Type Safety** | ❌ No | 🔄 Partial | ✅ Full with TS |
| **IDE Support** | ❌ No | 🔄 Limited | ✅ Full autocomplete |
| **Maintainability** | ❌ Low | 🔄 Medium | ✅ High |
| **Adding Features** | ❌ Hard | 🔄 Medium | ✅ Easy |
| **Code Reuse** | ❌ No | ❌ No | ✅ Yes (components) |

---

## 📝 Writing New Materi (Developer Experience)

### Before (String-based) - BAD DX
```javascript
content: `Text here...

<?php
// Code here
?>

More text...` // Is this code or text? Parser decides!
```
❌ Hard to know what parser will detect
❌ No syntax highlighting in IDE
❌ Easy to break with special characters

### After (React-based) - GREAT DX
```jsx
<Section heading="Basic Routing">
  <p>Text here...</p>
  
  <CodeBlock language="php">
{`<?php
// Code here - GUARANTEED to be in code block
?>`}
  </CodeBlock>
  
  <p>More text...</p>
</Section>
```
✅ Crystal clear structure
✅ Full JSX syntax highlighting
✅ Impossible to accidentally split code
✅ Easy to add notes, alerts, subsections
✅ Copy-paste friendly

---

## 🎨 Example: Full Materi Component

```jsx
// src/learning/materi/Laravel/Materi04.jsx
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi04Routing() {
  return (
    <MateriLayout
      title="Laravel Routing & URL Management"
      intro="Routes are the entry point to your application, connecting URLs to logic."
      keypoints={[
        { type: "concept", icon: "🎯", text: "Routes connect URLs to logic", color: "blue" },
        { type: "feature", icon: "⚡", text: "Support parameters & constraints", color: "purple" }
      ]}
    >
      {/* Basic Routing */}
      <Section id="basic-routing" heading="Basic Routing">
        <p>Laravel routes are defined in the <code>routes/</code> directory.</p>
        
        <CodeBlock language="php" caption="Simple route example">
{`<?php
Route::get('/', function () {
    return view('welcome');
});

Route::post('/users', function () {
    // Create user logic
});`}
        </CodeBlock>
        
        <Note type="info">
          Routes are registered in order. Specific routes before generic ones!
        </Note>
      </Section>

      {/* Route Parameters */}
      <Section id="parameters" heading="Route Parameters">
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

      {/* Named Routes */}
      <Section id="named-routes" heading="Named Routes">
        <p>Named routes allow convenient URL generation.</p>
        
        <CodeBlock language="php">
{`<?php
Route::get('/profile', function () {
    //
})->name('profile');

// Generate URL
$url = route('profile');

// With parameters
Route::get('/user/{id}/profile', function ($id) {
    //
})->name('profile');

$url = route('profile', ['id' => 1]);`}
        </CodeBlock>
      </Section>
    </MateriLayout>
  );
}
```

---

## 🚀 Implementation Plan

### Step 1: Create Helper Components (30 min)
- [ ] MateriLayout.jsx
- [ ] Section.jsx with Subsection export
- [ ] Update CodeBlock.jsx if needed
- [ ] Note.jsx already exists ✓

### Step 2: Update Content.jsx (20 min)
- [ ] Add React component detection
- [ ] Render component directly if detected
- [ ] Keep old parsing for backward compatibility

### Step 3: Create Template & Example (20 min)
- [ ] Create Materi01.jsx template with all patterns
- [ ] Test rendering
- [ ] Document how to write new materi

### Step 4: Convert Laravel Materi (3-4 hours)
- [ ] Convert 1-5 (Foundation) - 1 hour
- [ ] Convert 6-10 (Database) - 1 hour  
- [ ] Convert 11-15 (Views) - 1 hour
- [ ] Convert 16-20 (Advanced) - 1 hour

### Step 5: Clean Up (30 min)
- [ ] Remove parseContent() for React materi
- [ ] Update documentation
- [ ] Test all materi

**Total Estimated Time: 5-6 hours**

---

## ✅ Decision: Adopt React Component-based Schema

**Rationale:**
1. ✅ Eliminates parser completely for new materi
2. ✅ Better developer experience (DX)
3. ✅ Type-safe and maintainable
4. ✅ Easy to extend with new features
5. ✅ Industry standard approach (React components)
6. ✅ Full IDE support and autocomplete

**Trade-offs:**
- ⚠️ Requires converting existing materi (one-time cost)
- ⚠️ Slightly more verbose than object format
- ✅ But WAY more maintainable and flexible long-term

**Verdict: APPROVED** 🎉
