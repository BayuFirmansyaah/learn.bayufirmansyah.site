# Deploy ke CapRover

## Setup Awal

1. **Install CapRover CLI:**
```bash
npm install -g caprover
```

2. **Login ke CapRover:**
```bash
caprover login
```
Masukkan:
- CapRover URL: `https://captain.yourdomain.com`
- Password: password CapRover Anda
- App Name: `learning-bayufirmansyah`

3. **Buat App di CapRover Dashboard:**
- Login ke CapRover Dashboard
- Buat app baru dengan nama `learning-bayufirmansyah`
- Enable HTTPS
- Set port mapping jika diperlukan (default akan auto-assign)

## Deploy Manual

### Opsi 1: Menggunakan npm script
```bash
npm run deploy:caprover
```

### Opsi 2: Menggunakan script bash
```bash
chmod +x deploy-caprover.sh
./deploy-caprover.sh learning-bayufirmansyah
```

### Opsi 3: Manual dengan CLI
```bash
npm run build
caprover deploy -a learning-bayufirmansyah
```

## Deploy Otomatis dengan GitHub Actions

File `.github/workflows/deploy-caprover.yml` sudah dibuat untuk auto-deploy saat push ke branch `master`.

**Setup GitHub Secrets:**
1. Buka repository Settings → Secrets and variables → Actions
2. Tambahkan secrets berikut:
   - `CAPROVER_SERVER`: URL CapRover (contoh: `https://captain.yourdomain.com`)
   - `CAPROVER_PASSWORD`: Password CapRover
   - `CAPROVER_APP_NAME`: Nama app (contoh: `learning-bayufirmansyah`)

Setelah setup, setiap push ke branch `master` akan otomatis deploy ke CapRover! 🚀

## Port Configuration

- **Docker Local**: Port 9999
- **CapRover**: Auto-assigned (biasanya 80/443 dengan subdomain)
- **Nginx Internal**: Port 9999

## Troubleshooting

**Deploy gagal?**
```bash
# Check logs
caprover logs -a learning-bayufirmansyah

# Restart app
caprover restart -a learning-bayufirmansyah
```

**Build gagal?**
```bash
# Clear cache dan rebuild
rm -rf node_modules dist
npm install
npm run build
```

**Update environment variables:**
```bash
caprover deploy -a learning-bayufirmansyah
```

## Custom Domain

Setelah deploy, untuk menambahkan custom domain:
1. Buka CapRover Dashboard
2. Pilih app `learning-bayufirmansyah`
3. Tab "HTTP Settings"
4. Tambahkan custom domain
5. Enable HTTPS dengan Let's Encrypt
