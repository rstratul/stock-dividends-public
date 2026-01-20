export interface PayoutInputs {
  dividendsPerShare: number;
  eps: number;
}

export interface FcfInputs {
  freeCashFlow: number;
  totalDividendsPaid: number;
}

export interface DividendHistoryPoint {
  year: number;
  totalDividendPerShare: number;
}

export interface SafetyScoreInputs {
  payout: PayoutInputs;
  fcf: FcfInputs;
  history: DividendHistoryPoint[];
}

export type SafetyGrade = "green" | "yellow" | "red";

export interface SafetyScoreResult {
  score: number;
  grade: SafetyGrade;
  payoutRatio: number | null;
  fcfCoverage: number | null;
  growthScore: number;
}
