import type { Stock, Dividend } from "@prisma/client";

export type MarketProviderName = "mock" | "bvb" | "us";

export interface MarketProvider {
  listStocks(): Promise<Stock[]>;
  getStock(ticker: string): Promise<Stock | null>;
  listDividends(ticker: string): Promise<Dividend[]>;
}
