import type { Dividend, Stock } from "@prisma/client";
import type { MarketProvider } from "./market-provider";

export class MockProvider implements MarketProvider {
  async listStocks(): Promise<Stock[]> {
    return [];
  }

  async getStock(_ticker: string): Promise<Stock | null> {
    return null;
  }

  async listDividends(_ticker: string): Promise<Dividend[]> {
    return [];
  }
}
