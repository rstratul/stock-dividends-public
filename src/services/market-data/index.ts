import { CachedMarketDataProvider } from "@/services/market-data/cached";
import { getMarketProvider } from "@/services/market-data/providers";
import type {
  MarketDataService,
  MarketProviderName,
} from "@/services/market-data/types";

const getProviderName = (): MarketProviderName => {
  const value = process.env.MARKET_DATA_PROVIDER;
  if (
    value === "eodhd" ||
    value === "fmp" ||
    value === "bvb" ||
    value === "mock"
  ) {
    return value;
  }
  return "mock";
};

export const getMarketDataService = (): MarketDataService => {
  const provider = getMarketProvider(getProviderName());
  return new CachedMarketDataProvider(provider);
};
