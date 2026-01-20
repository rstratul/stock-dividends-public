import type { MarketDataProvider } from "@/services/market-data/providers/provider-types";
import type {
  AssetSummary,
  DividendRecord,
  FinancialRecord,
} from "@/types/market";
import { getCachedJson, setCachedJson } from "@/services/cache/redis";

const ttl = {
  assets: 60 * 60,
  dividends: 60 * 60 * 6,
  financials: 60 * 60 * 12,
};

const makeKey = (parts: string[]): string => parts.join(":");

export class CachedMarketDataProvider implements MarketDataProvider {
  constructor(private provider: MarketDataProvider) {}

  async listAssets(): Promise<AssetSummary[]> {
    const key = makeKey(["market", "assets", "all"]);
    const cached = await getCachedJson<AssetSummary[]>(key);
    if (cached) {
      return cached;
    }
    const data = await this.provider.listAssets();
    await setCachedJson(key, data, ttl.assets);
    return data;
  }

  async getAsset(ticker: string): Promise<AssetSummary | null> {
    const key = makeKey(["market", "asset", ticker]);
    const cached = await getCachedJson<AssetSummary>(key);
    if (cached) {
      return cached;
    }
    const data = await this.provider.getAsset(ticker);
    if (data) {
      await setCachedJson(key, data, ttl.assets);
    }
    return data;
  }

  async listDividends(ticker: string): Promise<DividendRecord[]> {
    const key = makeKey(["market", "dividends", ticker]);
    const cached = await getCachedJson<DividendRecord[]>(key);
    if (cached) {
      return cached;
    }
    const data = await this.provider.listDividends(ticker);
    await setCachedJson(key, data, ttl.dividends);
    return data;
  }

  async listFinancials(ticker: string): Promise<FinancialRecord[]> {
    const key = makeKey(["market", "financials", ticker]);
    const cached = await getCachedJson<FinancialRecord[]>(key);
    if (cached) {
      return cached;
    }
    const data = await this.provider.listFinancials(ticker);
    await setCachedJson(key, data, ttl.financials);
    return data;
  }
}
