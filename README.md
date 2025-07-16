# 🧾 Transaction Service - NestJS + MySQL

Transaction Service adalah aplikasi backend yang dibangun menggunakan **NestJS**, **TypeORM**, dan **MySQL**, bertujuan untuk menangani proses transaksi multi-produk dengan validasi stok, konfirmasi status, dan pelacakan transaksi secara real-time.

---

## 📦 Fitur Utama

- ✅ Membuat transaksi dengan banyak produk
- ✅ Validasi apakah semua produk tersedia
- ✅ Validasi stok produk cukup sebelum transaksi dibuat
- ✅ Pengurangan stok otomatis saat transaksi disimpan
- ✅ Konfirmasi transaksi (accepted / rejected)
- ✅ Melihat list dan detail transaksi
- ✅ Unit dan Integration Testing
- ✅ Docker support
---

## 📡 API Endpoint List

### 🔁 Transaksi

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/transactions` | Membuat transaksi baru (dengan validasi produk dan stok) |
| `PATCH` | `/transactions/:id/confirm` | Konfirmasi transaksi oleh product owner (accepted/rejected) |
| `GET` | `/transactions` | Ambil semua transaksi |
| `GET` | `/transactions/:id` | Ambil detail transaksi tertentu |

---

### 📦 Produk (internal)

Produk digunakan secara internal oleh service untuk validasi:
- Menentukan apakah `productId` valid
- Menentukan apakah stok cukup
- Mengurangi stok jika transaksi valid

Endpoint publik untuk produk tidak tersedia secara default.

---

## 🚀 Menjalankan Aplikasi

### ✅ Jalankan Secara Manual (Tanpa Docker)

1. **Clone dan install dependency**
   ```bash
   git clone <repo-url>
   cd project-directory
   npm install
   ```

2. **Setup file `.env`**
   ```env
   DATABASE_URL=mysql://myuser:mypassword@localhost:3306/mydb
   NODE_ENV=development
   ```

3. **Start server**
   ```bash
   npm run start:dev
   ```

4. Akses:
   - API: `http://localhost:3000/transactions`
---

### 🐳 Jalankan dengan Docker (rekomendasi)

1. **Jalankan container**
   ```bash
   docker-compose up --build
   ```

2. Docker akan otomatis:
   - Setup database MySQL
   - Menjalankan server

3. Akses:
   - API: `http://localhost:3000/transactions`
---

## 🧪 Testing

### ✅ Unit test
```bash
npm run test
```

### ✅ Integration (e2e) test
```bash
npm run test:e2e
```

---

## 📁 Script Penting

| Script | Fungsi |
|--------|--------|
| `npm run build` | Build NestJS ke JS |
| `npm run start:dev` | Jalankan server dev |
| `npm run migration:generate -- -n <name>` | Generate migration baru |
| `npm run test` | Jalankan unit test |
| `npm run test:e2e` | Jalankan integration test |
| `docker-compose up --build` | Jalankan server & database via Docker |

---

## 🔧 Tools yang Digunakan

- **NestJS** — Backend framework modern dan modular
- **TypeORM** — ORM untuk MySQL
- **MySQL 8** — Relational database
- **Docker & Compose** — Containerization & environment consistency
- **Jest** — Testing framework (unit & e2e)
---

## 🤝 Kontribusi

Pull request sangat terbuka! Pastikan:

- Fitur ditest
- Tidak merusak fungsionalitas utama
- Sudah mengikuti struktur dan gaya penulisan project

---

## 🧠 Author

> Dibuat oleh Lalan sebagai bagian dari tugas backend NestJS test-project.  
> Untuk pertanyaan, silakan hubungi via GitHub atau email pribadi.