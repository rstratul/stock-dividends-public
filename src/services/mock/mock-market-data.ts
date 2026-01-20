import {
  AssetSummaryArraySchema,
  DividendRecordArraySchema,
  FinancialRecordArraySchema,
} from "@/lib/validation/market";
import type { MarketDataService } from "@/services/market-data/types";
import type {
  AssetSummary,
  DividendRecord,
  FinancialRecord,
} from "@/types/market";

const assets: AssetSummary[] = AssetSummaryArraySchema.parse([
  {
    ticker: "AAPL:NASDAQ",
    symbol: "AAPL",
    exchange: "NASDAQ",
    name: "Apple Inc.",
    sector: "Technology",
    currency: "USD",
    lastPrice: 192.34,
  },
  {
    ticker: "MSFT:NASDAQ",
    symbol: "MSFT",
    exchange: "NASDAQ",
    name: "Microsoft Corporation",
    sector: "Technology",
    currency: "USD",
    lastPrice: 419.12,
  },
  {
    ticker: "TLV:BVB",
    symbol: "TLV",
    exchange: "BVB",
    name: "Transilvania Investments Alliance",
    sector: "Financials",
    currency: "RON",
    lastPrice: 0.41,
  },
  {
    ticker: "SNP:BVB",
    symbol: "SNP",
    exchange: "BVB",
    name: "OMV Petrom",
    sector: "Energy",
    currency: "RON",
    lastPrice: 0.63,
  },
  {
    ticker: "SAN:EURONEXT",
    symbol: "SAN",
    exchange: "EURONEXT",
    name: "Sanofi",
    sector: "Healthcare",
    currency: "EUR",
    lastPrice: 94.57,
  },
]);

const dividends: DividendRecord[] = DividendRecordArraySchema.parse([
  {
    ticker: "AAPL:NASDAQ",
    exDate: "2025-11-08T00:00:00.000Z",
    recordDate: "2025-11-11T00:00:00.000Z",
    payDate: "2025-11-14T00:00:00.000Z",
    amount: 0.25,
    currency: "USD",
  },
  {
    ticker: "AAPL:NASDAQ",
    exDate: "2026-02-07T00:00:00.000Z",
    recordDate: "2026-02-10T00:00:00.000Z",
    payDate: "2026-02-13T00:00:00.000Z",
    amount: 0.25,
    currency: "USD",
  },
  {
    ticker: "MSFT:NASDAQ",
    exDate: "2025-12-01T00:00:00.000Z",
    recordDate: "2025-12-03T00:00:00.000Z",
    payDate: "2025-12-12T00:00:00.000Z",
    amount: 0.83,
    currency: "USD",
  },
  {
    ticker: "TLV:BVB",
    exDate: "2025-06-10T00:00:00.000Z",
    recordDate: "2025-06-11T00:00:00.000Z",
    payDate: "2025-06-25T00:00:00.000Z",
    amount: 0.02,
    currency: "RON",
  },
  {
    ticker: "SNP:BVB",
    exDate: "2025-06-05T00:00:00.000Z",
    recordDate: "2025-06-06T00:00:00.000Z",
    payDate: "2025-06-20T00:00:00.000Z",
    amount: 0.04,
    currency: "RON",
  },
  {
    ticker: "SAN:EURONEXT",
    exDate: "2025-05-15T00:00:00.000Z",
    recordDate: "2025-05-16T00:00:00.000Z",
    payDate: "2025-05-22T00:00:00.000Z",
    amount: 3.76,
    currency: "EUR",
  },
]);

const financials: FinancialRecord[] = FinancialRecordArraySchema.parse([
  {
    ticker: "AAPL:NASDAQ",
    periodEnd: "2025-09-30T00:00:00.000Z",
    eps: 6.42,
    netIncome: 99980,
    freeCashFlow: 110240,
    currency: "USD",
  },
  {
    ticker: "MSFT:NASDAQ",
    periodEnd: "2025-06-30T00:00:00.000Z",
    eps: 11.12,
    netIncome: 105340,
    freeCashFlow: 87650,
    currency: "USD",
  },
  {
    ticker: "TLV:BVB",
    periodEnd: "2024-12-31T00:00:00.000Z",
    eps: 0.12,
    netIncome: 950,
    freeCashFlow: 1120,
    currency: "RON",
  },
  {
    ticker: "SNP:BVB",
    periodEnd: "2024-12-31T00:00:00.000Z",
    eps: 0.09,
    netIncome: 10400,
    freeCashFlow: 11800,
    currency: "RON",
  },
  {
    ticker: "SAN:EURONEXT",
    periodEnd: "2024-12-31T00:00:00.000Z",
    eps: 6.91,
    netIncome: 7080,
    freeCashFlow: 7400,
    currency: "EUR",
  },
]);

export class MockMarketDataService implements MarketDataService {
  async listAssets(): Promise<AssetSummary[]> {
    return assets;
  }

  async getAsset(ticker: string): Promise<AssetSummary | null> {
    return assets.find((asset) => asset.ticker === ticker) ?? null;
  }

  async listDividends(ticker: string): Promise<DividendRecord[]> {
    return dividends.filter((record) => record.ticker === ticker);
  }

  async listFinancials(ticker: string): Promise<FinancialRecord[]> {
    return financials.filter((record) => record.ticker === ticker);
  }
}
