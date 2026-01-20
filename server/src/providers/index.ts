import { MockProvider } from "./mock-provider";
import type { MarketProvider, MarketProviderName } from "./market-provider";

const resolveProviderName = (): MarketProviderName => {
  const value = process.env.MARKET_PROVIDER;
  if (value === "bvb" || value === "us" || value === "mock") {
    return value;
  }
  return "mock";
};

export const getMarketProvider = (): MarketProvider => {
  switch (resolveProviderName()) {
    case "bvb":
    case "us":
    case "mock":
    default:
      return new MockProvider();
  }
};
