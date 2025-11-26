# Plan: URL Slug + Navigation Buttons

## 📋 Overview
Implementasi URL slug untuk materi dan tombol navigasi (Next/Previous) untuk better UX dan SEO.

## 🎯 Goals
1.  URL berubah saat ganti materi: `/learning/laravel/1` → `/learning/laravel/2`
2.  Direct access: User bisa langsung buka `/learning/laravel/5`
3.  Navigation buttons: Previous & Next di bottom content
4.  SEO friendly: Proper URLs untuk indexing
5.  Browser history: Back/forward button works

## 🏗️ Architecture Analysis

### Current Flow
```
Landing Page (Svelte)
  └─> Click "Laravel"
      └─> Mount React App
          └─> currentMateriIndex (state)
              └─> SidebarLeft: Click materi
                  └─> setCurrentMateriIndex(index)
```

**Issues:**
- No URL changes
- No direct access to specific materi
- Browser back/forward doesn't work
- Not SEO friendly

### Target Flow
```
Landing Page
  └─> Click "Laravel" 
      └─> Navigate to /learning/laravel/1
          └─> React Router matches route
              └─> Parse slug from URL
                  └─> Load materi based on slug
                      └─> Navigation buttons at bottom
```

## 📦 Implementation Plan

### Phase 1: Install React Router 
**Task:** Add routing library
```bash
npm install react-router-dom
```
**Files:** `package.json`
**Time:** 2 minutes

### Phase 2: Create Router Setup 🔄
**Task:** Setup main router structure

**2.1 Update main.jsx**
- Wrap app with BrowserRouter
- Define routes structure
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/learning/:category" element={<LearningRedirect />} />
    <Route path="/learning/:category/:materiId" element={<LearningApp />} />
  </Routes>
</BrowserRouter>
```

**2.2 Create LearningRedirect Component**
- Redirect `/learning/laravel` → `/learning/laravel/1`
- Default to first materi

**Files:**
- `src/main.jsx` (update)
- `src/learning/LearningRedirect.jsx` (new)

**Time:** 15 minutes

### Phase 3: Update Learning App to Use Params 🔄
**Task:** Read materiId from URL params

**3.1 Update App.jsx**
```jsx
import { useParams, useNavigate } from 'react-router-dom';

export default function App() {
  const { category, materiId } = useParams();
  const navigate = useNavigate();
  
  // Parse materiId to index (materiId is 1-based, index is 0-based)
  const currentMateriIndex = parseInt(materiId) - 1;
  
  const handleMateriChange = (newIndex) => {
    // Navigate to new URL instead of setState
    navigate(`/learning/${category}/${newIndex + 1}`);
  };
  
  const handleBack = () => {
    navigate('/');
  };
  
  return <Layout ... />;
}
```

**3.2 Update SidebarLeft.jsx**
- Change onClick to use handleMateriChange
- Active state based on URL params

**3.3 Update Content.jsx**
- Read currentMateriIndex from props (derived from URL)
- No state management needed

**Files:**
- `src/learning/App.jsx`
- `src/learning/SidebarLeft.jsx`
- `src/learning/Content.jsx`

**Time:** 20 minutes

### Phase 4: Add Navigation Buttons 🔄
**Task:** Previous/Next buttons at bottom of content

**4.1 Create NavigationButtons Component**
```jsx
// src/learning/components/NavigationButtons.jsx
export default function NavigationButtons({ 
  category, 
  currentIndex, 
  totalMateri,
  onNavigate 
}) {
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < totalMateri - 1;
  
  return (
    <div className="navigation-buttons">
      <button 
        disabled={!hasPrevious}
        onClick={() => onNavigate(currentIndex - 1)}
      >
        <i className="fa-solid fa-arrow-left"></i>
        Previous
      </button>
      
      <div className="nav-info">
        {currentIndex + 1} / {totalMateri}
      </div>
      
      <button 
        disabled={!hasNext}
        onClick={() => onNavigate(currentIndex + 1)}
      >
        Next
        <i className="fa-solid fa-arrow-right"></i>
      </button>
    </div>
  );
}
```

**4.2 Add to Content.jsx**
- Place at bottom of materi content
- Pass current index and total

**4.3 Style Navigation Buttons**
```css
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 2px solid #e2e8f0;
}

.navigation-buttons button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid #4361ee;
  background: white;
  color: #4361ee;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.navigation-buttons button:hover:not(:disabled) {
  background: #4361ee;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(67, 97, 238, 0.3);
}

.navigation-buttons button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.nav-info {
  font-size: 0.9rem;
  color: #64748b;
  font-weight: 500;
}
```

**Files:**
- `src/learning/components/NavigationButtons.jsx` (new)
- `src/learning/Content.jsx` (update)
- `src/learning/styles.css` (add styles)

**Time:** 25 minutes

### Phase 5: Update Landing Integration 🔄
**Task:** Make Svelte landing page navigate to proper URLs

**5.1 Update App.svelte**
```svelte
<script>
  function navigateToLearning(category) {
    // Instead of mounting React directly
    // Navigate to URL
    window.location.href = `/learning/${category.toLowerCase()}/1`;
  }
</script>

<div on:click={() => navigateToLearning('Laravel')}>
  <!-- Card content -->
</div>
```

**Files:**
- `src/landing/App.svelte`

**Time:** 10 minutes

### Phase 6: Handle Edge Cases 🔄
**Task:** Error handling and validation

**6.1 Invalid materiId**
- If materiId > total materi → redirect to last materi
- If materiId < 1 → redirect to first materi
- If materiId is not number → redirect to first materi

**6.2 Invalid category**
- Show 404 or redirect to home

**6.3 Browser Navigation**
- Test back/forward buttons
- Test direct URL access
- Test refresh page

**Files:**
- `src/learning/App.jsx` (add validation)

**Time:** 15 minutes

### Phase 7: SEO Optimization (Optional) 🔄
**Task:** Meta tags and page titles

**7.1 Dynamic Page Title**
```jsx
useEffect(() => {
  document.title = `${materiTitle} - ${category} Learning`;
}, [materiId, category]);
```

**7.2 Meta Description**
- Add meta tags per materi

**Time:** 10 minutes

## 📊 Implementation Summary

### Order of Implementation
1.  Phase 1: Install react-router-dom (2 min)
2. 🔄 Phase 2: Router setup (15 min)
3. 🔄 Phase 3: URL params integration (20 min)
4. 🔄 Phase 4: Navigation buttons (25 min)
5. 🔄 Phase 5: Landing integration (10 min)
6. 🔄 Phase 6: Edge cases (15 min)
7. ⏳ Phase 7: SEO (optional, 10 min)

**Total Time:** ~90 minutes (1.5 hours)

## 🎨 UI/UX Improvements

### URL Examples
```
Before: /learning (no materi info in URL)
After:  /learning/laravel/1
        /learning/laravel/5
        /learning/kotlin/3
```

### Navigation Buttons Position
```
┌─────────────────────────────────────┐
│  Content Area                       │
│                                     │
│  Materi text here...                │
│  Code blocks...                     │
│  Notes...                           │
│                                     │
├─────────────────────────────────────┤
│  ← Previous    3 / 20    Next →    │
└─────────────────────────────────────┘
```

### Benefits
-  Shareable URLs (copy link to specific materi)
-  Bookmarkable
-  Browser history works
-  SEO friendly (each materi has unique URL)
-  Better UX (clear navigation path)
-  Analytics tracking (track which materi most viewed)

## 🧪 Testing Checklist

### Functional Tests
- [ ] Click materi in sidebar → URL changes
- [ ] Direct access URL → loads correct materi
- [ ] Click Next → goes to next materi + URL updates
- [ ] Click Previous → goes to previous materi + URL updates
- [ ] First materi → Previous button disabled
- [ ] Last materi → Next button disabled
- [ ] Browser back button → goes to previous materi
- [ ] Browser forward button → goes to next materi
- [ ] Refresh page → stays on same materi
- [ ] Invalid materiId → redirects properly
- [ ] Landing page links → navigate to /category/1

### Edge Cases
- [ ] materiId = 0 → redirect to 1
- [ ] materiId = 999 → redirect to last materi
- [ ] materiId = "abc" → redirect to 1
- [ ] category = "invalid" → show error or redirect

### Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## 📝 Notes

### Current State
- ❌ No routing (state-based only)
- ❌ No URL changes
- ❌ No direct access
- ❌ No navigation buttons

### After Implementation
-  Full routing with react-router-dom
-  URL slug: `/learning/:category/:materiId`
-  Direct access supported
-  Navigation buttons with Previous/Next
-  Browser history works
-  Shareable URLs

### Migration Strategy
- Backward compatible (old state-based still works temporarily)
- Gradual migration (router → params → buttons)
- No breaking changes to existing components

---

**Ready to implement?** Start with Phase 1: `npm install react-router-dom`
