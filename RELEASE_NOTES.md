## Release Notes

### Highlights
- Introduced a decoupled architecture with a Vite React (TypeScript) client and an Express (TypeScript) server.
- Consolidated data modeling with a shared Prisma schema for stocks and dividends.
- Added a modular `MarketProvider` interface to keep BVB logic isolated from US providers.

### Client
- SPA routing with `react-router-dom` and basic pages for stocks and dividend history.
- API hooks for fetching stocks and dividends from the server.
- Environment configuration via `client/env.example`.

### Server
- Express API with `/api/stocks` and `/api/stocks/:ticker/dividends`.
- Prisma integration and shared schema under `prisma/schema.prisma`.
- Provider scaffold for future BVB/US integrations.
- Environment configuration via `server/env.example`.

### Cleanup
- Removed the legacy Next.js scaffold and related configuration files.
- Added repository-wide `.gitignore` and ensured dependencies are not tracked.
