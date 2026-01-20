# Stock Dividends Portfolio Manager

Decoupled React (Vite) client and Express server with a shared Prisma schema.

## Requirements

- Node.js 18+
- PostgreSQL

## Setup

### 1) Install dependencies

```bash
cd client
npm install
```

```bash
cd ../server
npm install
```

### 2) Configure environment

- Client: copy `client/env.example` to `client/.env` and set `VITE_API_BASE_URL`.
- Server: copy `server/env.example` to `server/.env` and set `DATABASE_URL`.

### 3) Run migrations

```bash
cd server
npm run prisma:migrate
```

### 4) Start the apps

```bash
cd client
npm run dev
```

```bash
cd server
npm run dev
```

## Project structure

- `client/` Vite React app (SPA via `react-router-dom`)
- `server/` Express API + Prisma
- `prisma/` shared Prisma schema
