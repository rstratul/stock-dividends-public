import type { MarketDataProvider } from "@/services/market-data/providers/provider-types";

const getApiKey = (): string | null => {
  if (typeof process.env.EODHD_API_KEY === "string" && process.env.EODHD_API_KEY) {
    return process.env.EODHD_API_KEY;
  }
  return null;
};

export class EodhdProvider implements MarketDataProvider {
  private apiKey = getApiKey();

  private assertConfigured(): void {
    if (!this.apiKey) {
      throw new Error("EODHD_API_KEY is not configured.");
    }
  }

  async listAssets() {
    this.assertConfigured();
    return [];
  }

  async getAsset(_ticker: string) {
    this.assertConfigured();
    return null;
  }

  async listDividends(_ticker: string) {
    this.assertConfigured();
    return [];
  }

  async listFinancials(_ticker: string) {
    this.assertConfigured();
    return [];
  }
}
