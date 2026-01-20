import { BvbProvider } from "@/services/market-data/providers/bvb-provider";
import { EodhdProvider } from "@/services/market-data/providers/eodhd-provider";
import { FmpProvider } from "@/services/market-data/providers/fmp-provider";
import type {
  MarketDataProvider,
  MarketProviderName,
} from "@/services/market-data/providers/provider-types";
import { MockMarketDataService } from "@/services/mock/mock-market-data";

export const getMarketProvider = (
  name: MarketProviderName,
): MarketDataProvider => {
  switch (name) {
    case "eodhd":
      return new EodhdProvider();
    case "fmp":
      return new FmpProvider();
    case "bvb":
      return new BvbProvider();
    case "mock":
    default:
      return new MockMarketDataService();
  }
};
