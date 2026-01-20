export interface Stock {
  id: string;
  ticker: string;
  symbol: string;
  exchange: string;
  name: string;
  sector?: string | null;
  currency: string;
  lastPrice?: number | null;
  baseCurrencyValue?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Dividend {
  id: string;
  stockId: string;
  exDate: string;
  recordDate?: string | null;
  payDate: string;
  amount: number;
  currency: string;
  baseCurrencyValue: number;
  createdAt: string;
  updatedAt: string;
}
