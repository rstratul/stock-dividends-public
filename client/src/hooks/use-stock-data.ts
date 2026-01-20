import { useCallback, useEffect, useState } from "react";
import type { Dividend, Stock } from "../types/market";

const getApiBase = (): string => {
  const value = import.meta.env.VITE_API_BASE_URL as string | undefined;
  return value && value.length > 0 ? value : "http://localhost:4000";
};

const fetchJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(`${getApiBase()}${path}`);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  return (await response.json()) as T;
};

export const useStocks = () => {
  const [data, setData] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const payload = await fetchJson<Stock[]>("/api/stocks");
      setData(payload);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load stocks");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
};

export const useDividends = (ticker?: string) => {
  const [data, setData] = useState<Dividend[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!ticker) {
      setData([]);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const payload = await fetchJson<Dividend[]>(
        `/api/stocks/${encodeURIComponent(ticker)}/dividends`,
      );
      setData(payload);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load dividends",
      );
    } finally {
      setLoading(false);
    }
  }, [ticker]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
};
