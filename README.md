# NafAI — Plugin & MCP Hub (Stage 5)

Prototipe: katalog plugin (demo) + endpoint validasi manifest MCP. Tidak ada eksekusi tool atau koneksi MCP live.

## Struktur
```
public/      -> aset statis (index.html, app.js, style.css, 404.html, favicon.svg, _headers)
functions/   -> Cloudflare Pages Functions (/api/plugins, /api/health)
wrangler.jsonc, package.json
```

## Jalankan lokal
```bash
npm install
npm run dev        # http://localhost:8788
npm test           # tes logika Functions
```
Cek: `GET /api/health`, `GET /api/plugins`, `POST /api/plugins` (body JSON berisi array `tools`).

## Deploy (Cloudflare Pages) — agar tidak 404
**Via dashboard (Git):** Workers & Pages > Create > Pages > Connect to Git > pilih repo ini, lalu:
- Framework preset: **None**
- Build command: *(kosong)*
- Build output directory: **public**
- Root directory: *(kosong / root repo)*

Folder `functions/` harus berada di root repo (sudah benar).

**Via CLI:** `npm run deploy`

## Penyebab 404 yang umum
1. Build output directory bukan `public` (index.html tidak ditemukan).
2. `functions/` tidak di root repo, sehingga `/api/*` tidak ada.
3. Membuka `/api/plugins` dengan GET saat dulu hanya ada handler POST (sudah diperbaiki).

## Catatan keamanan
Jangan taruh kredensial di kode browser. Klien MCP sungguhan butuh negosiasi protokol, autentikasi, verifikasi identitas server, allowlist tool di server, konfirmasi untuk aksi dengan efek samping, dan audit log. Konten remote dianggap tidak tepercaya.
