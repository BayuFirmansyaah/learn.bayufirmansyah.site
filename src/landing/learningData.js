// Icon mapping
const iconMap = {
  'Laravel': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg',
  'Kotlin': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kotlin/kotlin-original.svg',
  'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg',
  'NodeJS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
  'Git': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
};

// Data materi pembelajaran
export const learningTopics = [
  {
    id: 1,
    name: 'Laravel',
    slug: 'Laravel',
    description: 'Framework PHP modern untuk pengembangan web aplikasi dengan arsitektur MVC yang elegan',
    icon: iconMap.Laravel,
    color: '#FFF',
    image: iconMap.Laravel,
    totalMateri: 20,
    level: 'Beginner to Advanced',
    duration: '40 jam',
    topics: [
      'Installation & Setup',
      'Routing & Controllers',
      'Blade Templating',
      'Database & Eloquent ORM',
      'Authentication & Authorization',
      'RESTful API Development',
      'Middleware & Validation',
      'File Upload & Storage'
    ],
    features: [
      'Project-based learning',
      'Real-world examples',
      'Best practices',
      'Production-ready code'
    ]
  },
  {
    id: 2,
    name: 'Kotlin',
    slug: 'Kotlin',
    description: 'Bahasa pemrograman modern untuk pengembangan Android native dan backend development',
    icon: iconMap.Kotlin,
    color: '#FFF',
    image: iconMap.Kotlin,
    totalMateri: 17,
    level: 'Beginner to Advanced',
    duration: '35 jam',
    topics: [
      'Kotlin Fundamentals',
      'Object-Oriented Programming',
      'Android Studio Setup',
      'UI Components & Layouts',
      'Activity & Fragment',
      'RecyclerView & Adapters',
      'Retrofit & API Integration',
      'MVVM Architecture'
    ],
    features: [
      'Android development focus',
      'Hands-on projects',
      'Industry standards',
      'Modern architecture'
    ]
  },
  {
    id: 3,
    name: 'Flutter',
    slug: 'Flutter',
    description: 'Framework UI Google untuk membangun aplikasi mobile cross-platform yang indah dan performant',
    icon: iconMap.Flutter,
    color: '#FFF',
    image: iconMap.Flutter,
    totalMateri: 17,
    level: 'Beginner to Advanced',
    duration: '35 jam',
    topics: [
      'Dart Programming Basics',
      'Flutter Installation',
      'Widgets & Layouts',
      'State Management',
      'Navigation & Routing',
      'HTTP & REST API',
      'Local Storage',
      'Firebase Integration'
    ],
    features: [
      'Cross-platform development',
      'Beautiful UI design',
      'Hot reload feature',
      'Native performance'
    ]
  },
  {
    id: 4,
    name: 'JavaScript',
    slug: 'JavaScript',
    description: 'Bahasa pemrograman untuk web development modern, dari frontend hingga backend',
    icon: iconMap.JavaScript,
    color: '#FFF',
    image: iconMap.JavaScript,
    totalMateri: 25,
    level: 'Beginner to Advanced',
    duration: '50 jam',
    topics: [
      'JavaScript Fundamentals',
      'ES6+ Modern Features',
      'DOM Manipulation',
      'Async Programming',
      'Fetch API & AJAX',
      'Object-Oriented JS',
      'Functional Programming',
      'Error Handling'
    ],
    features: [
      'Core language mastery',
      'Modern JavaScript',
      'Practical examples',
      'Interview preparation'
    ]
  },
  {
    id: 5,
    name: 'Python',
    slug: 'Python',
    description: 'Bahasa pemrograman serbaguna untuk AI, web development, data science, dan automation',
    icon: iconMap.Python,
    color: '#FFF',
    image: iconMap.Python,
    totalMateri: 25,
    level: 'Beginner to Advanced',
    duration: '50 jam',
    topics: [
      'Python Basics',
      'Data Structures',
      'File Handling',
      'OOP in Python',
      'Web Scraping',
      'Flask/Django Basics',
      'Database Operations',
      'API Development'
    ],
    features: [
      'Versatile applications',
      'Clean code practices',
      'Real-world projects',
      'Career-focused'
    ]
  },
  {
    id: 6,
    name: 'Node.js',
    slug: 'NodeJS',
    description: 'Runtime JavaScript untuk backend development dan full-stack JavaScript applications',
    icon: iconMap.NodeJS,
    color: '#FFF',
    image: iconMap.NodeJS,
    totalMateri: 25,
    level: 'Beginner to Advanced',
    duration: '50 jam',
    topics: [
      'Node.js Fundamentals',
      'NPM & Package Management',
      'Express.js Framework',
      'RESTful API Design',
      'MongoDB Integration',
      'Authentication & JWT',
      'Middleware & Error Handling',
      'Deployment Strategies'
    ],
    features: [
      'Backend development',
      'Scalable applications',
      'Modern tech stack',
      'Production deployment'
    ]
  },
  {
    id: 7,
    name: 'Git & GitHub',
    slug: 'Git',
    description: 'Version control system untuk kolaborasi tim dan manajemen source code profesional',
    icon: iconMap.Git,
    color: '#FFF',
    image: iconMap.Git,
    totalMateri: 20,
    level: 'Beginner to Advanced',
    duration: '20 jam',
    topics: [
      'Git Installation & Setup',
      'Basic Git Commands',
      'Branching & Merging',
      'GitHub Workflow',
      'Pull Requests',
      'Conflict Resolution',
      'Git Best Practices',
      'Team Collaboration'
    ],
    features: [
      'Essential skill',
      'Team collaboration',
      'Industry standard',
      'Career must-have'
    ]
  }
];
