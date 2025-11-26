# Deployment Guide - ubay.tech

## Prerequisites
- Project sudah di-build: `npm run build`
- Folder `dist/` berisi hasil build

## Option 1: Vercel (Recommended)

### Via Vercel CLI
```bash
npm install -g vercel
cd learning.bayufirmansyah.site
npm run build
vercel --prod
```

### Via Vercel Dashboard
1. Push project ke GitHub
2. Login ke https://vercel.com
3. Import project dari GitHub
4. Vercel auto-detect Vite config
5. Deploy!

## Option 2: Netlify

### Via Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### Via Netlify Dashboard
1. Login ke https://netlify.com
2. Drag & drop folder `dist` ke dashboard
3. Done!

### Netlify Configuration
Create `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Option 3: GitHub Pages

```bash
# Build project
npm run build

# Install gh-pages
npm install -D gh-pages

# Add script ke package.json
"deploy": "gh-pages -d dist"

# Deploy
npm run deploy
```

## Option 4: Traditional Hosting (cPanel, FTP)

1. Build project:
   ```bash
   npm run build
   ```

2. Upload semua isi folder `dist/` ke public_html atau www folder

3. Ensure `.htaccess` untuk SPA routing:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## Option 5: Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Init Firebase
firebase init hosting
# Choose dist as public directory

# Deploy
npm run build
firebase deploy
```

## Post-Deployment Checklist

-  Check semua halaman load dengan benar
-  Test navigasi antar kategori
-  Test navigasi antar materi
-  Check responsiveness di mobile
-  Verify Font Awesome icons load
-  Check browser console untuk errors
-  Test di different browsers (Chrome, Firefox, Safari)

## Troubleshooting

### Blank page setelah deploy
- Check console untuk errors
- Ensure base path correct di vite.config.js
- Verify all assets loading (check Network tab)

### Icons tidak muncul
- Verify Font Awesome CDN link di index.html
- Check Content Security Policy jika ada

### Routing tidak work (404 on refresh)
- Add redirect rules (lihat contoh di atas)
- SPA perlu fallback ke index.html

## Custom Domain

Setelah deploy, tambahkan custom domain:

**Vercel**: Settings > Domains > Add domain
**Netlify**: Domain settings > Add custom domain
**GitHub Pages**: Settings > Pages > Custom domain

Update DNS records:
- A record atau CNAME ke hosting provider
- Wait for DNS propagation (bisa 24-48 jam)

## SSL Certificate

Most hosting providers provide free SSL:
- Vercel: Automatic
- Netlify: Automatic
- GitHub Pages: Automatic dengan custom domain
- Traditional hosting: Let's Encrypt

---

**Happy Deploying! 🚀**
