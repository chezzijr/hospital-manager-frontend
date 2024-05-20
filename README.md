# BKCare Frontend
Frontend của ứng dụng BKCare, môn LTNC HK232

## Cài đặt và chạy
- Cần NodeJS version >= 20.9.0

### Chạy dev server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Build và chạy
```bash
npm run build
```

```bash
npm start
# or
npx serve@latest out
```

### Sử dụng docker
- Pull image từ https://hub.docker.com/r/chezzijr/bkcare-fe
- Chạy: `docker run -d -p 3000:3000 --env NEXT_PUBLIC_API_URL=http://localhost:8080/api bkcare-fe` (thay port backend thành port mong muốn)
