import { z } from "zod";

export const TickerSchema = z
  .string()
  .regex(/^[A-Z0-9.-]+:[A-Z0-9.-]+$/, "Ticker must be SYMBOL:EXCHANGE");

export const AssetSummarySchema = z.object({
  ticker: TickerSchema,
  symbol: z.string(),
  exchange: z.string(),
  name: z.string(),
  sector: z.string().optional(),
  currency: z.string(),
  lastPrice: z.number().optional(),
});

export const DividendRecordSchema = z.object({
  ticker: TickerSchema,
  exDate: z.string().datetime(),
  recordDate: z.string().datetime().optional(),
  payDate: z.string().datetime(),
  amount: z.number(),
  currency: z.string(),
});

export const FinancialRecordSchema = z.object({
  ticker: TickerSchema,
  periodEnd: z.string().datetime(),
  eps: z.number().optional(),
  netIncome: z.number().optional(),
  freeCashFlow: z.number().optional(),
  currency: z.string(),
});

export const AssetSummaryArraySchema = z.array(AssetSummarySchema);
export const DividendRecordArraySchema = z.array(DividendRecordSchema);
export const FinancialRecordArraySchema = z.array(FinancialRecordSchema);
