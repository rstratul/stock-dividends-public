## Stock Dividends Portfolio Manager

This application helps track dividend-paying stocks across multiple exchanges and provides a clean overview of dividend activity. It is built as a decoupled web app with a React client and an Express API server.

### What you can do
- View a list of tracked dividend stocks.
- Inspect key stock details such as ticker, exchange, currency, and latest price.
- Open a stock to see its dividend history (ex-date, pay date, amount, currency).
- Refresh data on demand from the client UI.

### Web UI (Client)
The client is a single-page application with two routes:
- `/` Portfolio overview: a list of all tracked stocks.
- `/stocks/:ticker` Dividend history for a selected stock.

Data is loaded via a simple API hook that calls the server endpoints.

### API (Server)
The API exposes the following endpoints:
- `GET /health` – health check.
- `GET /api/stocks` – list all tracked stocks.
- `GET /api/stocks/:ticker` – get a single stock by ticker.
- `GET /api/stocks/:ticker/dividends` – list dividends for a stock.

### Data Model
The shared Prisma schema defines:
- **Stock**: ticker, symbol, exchange, name, sector, currency, latest price, base-currency value.
- **Dividend**: ex-date, pay date, amount, currency, base-currency value.

### Configuration
Environment examples are provided:
- Client: `client/env.example` (`VITE_API_BASE_URL`)
- Server: `server/env.example` (`DATABASE_URL`, `PORT`, `CLIENT_ORIGIN`, `MARKET_PROVIDER`)

### How to run
1. Install dependencies
   - `cd client && npm install`
   - `cd server && npm install`
2. Configure environments
   - Copy `client/env.example` to `client/.env`
   - Copy `server/env.example` to `server/.env`
3. Run the server
   - `cd server && npm run dev`
4. Run the client
   - `cd client && npm run dev`

### Planned Extensions
This foundation supports future additions such as:
- Real market data providers per exchange (including BVB-specific scraping).
- Dividend sustainability scoring and financial ratios.
- Screening and sorting by yield, payout ratio, and base-currency totals.
