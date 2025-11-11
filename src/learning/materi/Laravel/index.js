// Laravel Materi - React Component Based
// Each materi is now a React component for better maintainability

import Materi01 from './Materi01';

// Import materi lainnya seiring konversi
// import Materi02 from './Materi02';
// import Materi03 from './Materi03';
// ... dst

// Temporary: Import old materi from parent directory
import { materiList as oldMateriList } from '../Laravel.js';

// Export materi list
// Format: Array of React components OR objects (for backward compatibility)
export const materiList = [
  Materi01, // NEW: React component
  ...oldMateriList.slice(1) // OLD: Keep materi 2-20 for now
];

// Metadata untuk sidebar (titles)
export const materiTitles = [
  "Pengenalan Laravel",
  "Instalasi & Persiapan Lingkungan",
  "Struktur Folder Laravel",
  "Routing & URL Management",
  "Controllers",
  "Database Migration",
  "Eloquent ORM",
  "Relationships",
  "Query Builder",
  "Database Seeding",
  "Blade Templates",
  "Form & Validation",
  "Authentication",
  "Middleware",
  "API Resources",
  "File Storage",
  "Queue & Jobs",
  "Email & Notifications",
  "Testing",
  "Deployment"
];
