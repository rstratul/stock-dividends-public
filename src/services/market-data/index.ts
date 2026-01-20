import { MockMarketDataService } from "@/services/mock/mock-market-data";
import type { MarketDataService } from "@/services/market-data/types";

export const getMarketDataService = (): MarketDataService => {
  return new MockMarketDataService();
};
