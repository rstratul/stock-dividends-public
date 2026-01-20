import type {
  AssetSummary,
  DividendRecord,
  FinancialRecord,
} from "@/types/market";

export interface MarketDataProvider {
  listAssets(): Promise<AssetSummary[]>;
  getAsset(ticker: string): Promise<AssetSummary | null>;
  listDividends(ticker: string): Promise<DividendRecord[]>;
  listFinancials(ticker: string): Promise<FinancialRecord[]>;
}

export type MarketProviderName = "mock" | "eodhd" | "fmp" | "bvb";
