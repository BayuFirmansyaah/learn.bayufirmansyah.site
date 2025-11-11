import React from 'react';
import MateriLayout from '../../components/MateriLayout';
import Section, { Subsection } from '../../components/Section';
import CodeBlock from '../../components/CodeBlock';
import Note from '../../components/Note';

export default function Materi01() {
  return (
    <MateriLayout
      title="Pengenalan Laravel"
      intro="Laravel adalah framework PHP modern yang paling populer di dunia untuk membangun aplikasi web. Diciptakan oleh Taylor Otwell pada tahun 2011, Laravel terus berkembang dengan elegant syntax dan fitur-fitur powerful yang mempercepat development."
    >
      {/* Apa itu Laravel? */}
      <Section id="what-is-laravel" heading="Apa itu Laravel?">
        <p>
          Laravel adalah framework open-source yang menggunakan pola arsitektur MVC (Model-View-Controller). 
          Arsitektur ini memisahkan logika bisnis (Model), presentasi tampilan (View), dan pengatur alur aplikasi (Controller), 
          membuat kode lebih terorganisir dan mudah di-maintain.
        </p>
        <p>
          Framework ini menyediakan struktur aplikasi yang jelas dan konsisten, memungkinkan developer fokus pada logika bisnis 
          tanpa harus mengkhawatirkan setup dasar.
        </p>
      </Section>

      {/* Mengapa Memilih Laravel? */}
      <Section id="why-laravel" heading="Mengapa Memilih Laravel?">
        <p>
          Laravel terkenal dengan "elegant syntax" - kode yang mudah dibaca dan ditulis. Framework ini menyediakan berbagai 
          fitur built-in seperti routing, authentication, caching, session management, queue system, dan masih banyak lagi.
        </p>
        <p>
          Anda tidak perlu "reinvent the wheel" untuk fitur-fitur umum. Laravel sudah menyediakan solusi yang tested dan production-ready.
        </p>
        
        <Note type="tip">
          Laravel mengikuti prinsip "Convention over Configuration" - menggunakan konvensi penamaan yang konsisten untuk mengurangi konfigurasi manual.
        </Note>
      </Section>

      {/* Ecosystem Laravel */}
      <Section id="ecosystem" heading="Ecosystem Laravel">
        <p>
          Laravel memiliki ecosystem yang sangat kuat dengan berbagai tools dan services yang memudahkan development dan deployment:
        </p>

        <Subsection id="ecosystem-tools" heading="Official Tools">
          <ul>
            <li><strong>Laravel Forge</strong> - Platform deployment dan server management otomatis</li>
            <li><strong>Laravel Vapor</strong> - Serverless deployment di AWS Lambda dengan auto-scaling</li>
            <li><strong>Laravel Nova</strong> - Admin panel yang elegant dan customizable</li>
            <li><strong>Laravel Envoyer</strong> - Zero-downtime deployment untuk aplikasi production</li>
            <li><strong>Laravel Horizon</strong> - Dashboard untuk monitoring Redis queues</li>
            <li><strong>Laravel Telescope</strong> - Debugging assistant dengan beautiful UI</li>
          </ul>
        </Subsection>
      </Section>

      {/* Arsitektur MVC */}
      <Section id="mvc-architecture" heading="Arsitektur MVC">
        <p>
          Laravel menggunakan pola arsitektur MVC yang memisahkan aplikasi menjadi tiga komponen utama:
        </p>

        <p className="code-caption">Alur kerja arsitektur MVC di Laravel</p>
        <CodeBlock language="tree">
{`┌─────────────────────────────────────────────┐
│           Laravel MVC Flow                  │
├─────────────────────────────────────────────┤
│                                             │
│  Request → Router → Controller → Model      │
│                          ↓          ↓       │
│                       View ← ── Database    │
│                          ↓                  │
│                      Response               │
│                                             │
└─────────────────────────────────────────────┘

Components:
├── Model (app/Models/)
│   └── Handles data & business logic
├── View (resources/views/)
│   └── Handles presentation layer (HTML/Blade)
└── Controller (app/Http/Controllers/)
    └── Handles request logic & coordinates Model-View`}
        </CodeBlock>

        <Note type="info">
          Pemisahan concerns ini membuat aplikasi lebih maintainable, testable, dan scalable. 
          Setiap komponen memiliki tanggung jawab yang jelas.
        </Note>
      </Section>

      {/* Dokumentasi & Komunitas */}
      <Section id="documentation" heading="Dokumentasi & Komunitas">
        <p>
          Laravel memiliki dokumentasi resmi yang sangat lengkap dan mudah dipahami di <code>laravel.com/docs</code>. 
          Setiap fitur dijelaskan dengan detail dan disertai contoh kode yang praktis.
        </p>
        <p>
          Komunitas Laravel sangat aktif dengan ribuan packages tersedia di Packagist. 
          Anda bisa menemukan solusi untuk hampir semua kebutuhan - dari payment gateway, image processing, hingga API integrations.
        </p>
      </Section>

      {/* Performa & Scalability */}
      <Section id="performance" heading="Performa & Scalability">
        <p>
          Meskipun Laravel menyediakan banyak fitur, performa tetap optimal dengan sistem caching yang baik. 
          Laravel mendukung berbagai cache drivers seperti Redis, Memcached, dan file-based caching.
        </p>
        <p>
          Aplikasi Laravel dapat di-scale dengan mudah menggunakan load balancers, Redis untuk session storage, dan horizontal scaling. 
          Banyak perusahaan besar menggunakan Laravel untuk handle jutaan requests per hari.
        </p>

        <Note type="tip">
          Gunakan Laravel Octane untuk boost performa hingga 4x lipat dengan PHP servers seperti Swoole atau RoadRunner.
        </Note>
      </Section>
    </MateriLayout>
  );
}
