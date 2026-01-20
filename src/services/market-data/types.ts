import type {
  AssetSummary,
  DividendRecord,
  FinancialRecord,
} from "@/types/market";

export interface MarketDataService {
  listAssets(): Promise<AssetSummary[]>;
  getAsset(ticker: string): Promise<AssetSummary | null>;
  listDividends(ticker: string): Promise<DividendRecord[]>;
  listFinancials(ticker: string): Promise<FinancialRecord[]>;
}
