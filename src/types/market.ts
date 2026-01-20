export interface AssetSummary {
  ticker: string;
  symbol: string;
  exchange: string;
  name: string;
  sector?: string;
  currency: string;
  lastPrice?: number;
}

export interface DividendRecord {
  ticker: string;
  exDate: string;
  recordDate?: string;
  payDate: string;
  amount: number;
  currency: string;
}

export interface FinancialRecord {
  ticker: string;
  periodEnd: string;
  eps?: number;
  netIncome?: number;
  freeCashFlow?: number;
  currency: string;
}
