import type { MarketDataProvider } from "@/services/market-data/providers/provider-types";

export class BvbProvider implements MarketDataProvider {
  async listAssets() {
    return [];
  }

  async getAsset(_ticker: string) {
    return null;
  }

  async listDividends(_ticker: string) {
    return [];
  }

  async listFinancials(_ticker: string) {
    return [];
  }
}
