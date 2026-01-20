import type {
  DividendHistoryPoint,
  SafetyScoreInputs,
  SafetyScoreResult,
} from "@/types/scoring";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const safeRatio = (numerator: number, denominator: number): number | null => {
  if (!Number.isFinite(numerator) || !Number.isFinite(denominator)) {
    return null;
  }
  if (denominator === 0) {
    return null;
  }
  return numerator / denominator;
};

const scorePayoutRatio = (ratio: number | null): { score: number; grade: SafetyScoreResult["grade"] } => {
  if (ratio === null) {
    return { score: 50, grade: "yellow" };
  }
  if (ratio < 0.6) {
    return { score: 100, grade: "green" };
  }
  if (ratio <= 0.9) {
    const slope = (0.9 - ratio) / 0.3;
    return { score: clamp(Math.round(60 + 40 * slope), 60, 99), grade: "yellow" };
  }
  const penalty = clamp(Math.round((ratio - 0.9) * 100), 0, 100);
  return { score: clamp(60 - penalty, 0, 60), grade: "red" };
};

const scoreFcfCoverage = (coverage: number | null): number => {
  if (coverage === null) {
    return 50;
  }
  if (coverage >= 2) {
    return 100;
  }
  if (coverage >= 1) {
    return clamp(Math.round(60 + (coverage - 1) * 40), 60, 99);
  }
  return clamp(Math.round(coverage * 60), 0, 60);
};

const scoreGrowthConsistency = (history: DividendHistoryPoint[]): number => {
  if (history.length < 2) {
    return 50;
  }
  const sorted = [...history].sort((a, b) => a.year - b.year);
  let increases = 0;
  let decreases = 0;
  for (let i = 1; i < sorted.length; i += 1) {
    const prior = sorted[i - 1].totalDividendPerShare;
    const current = sorted[i].totalDividendPerShare;
    if (current > prior) {
      increases += 1;
    } else if (current < prior) {
      decreases += 1;
    }
  }
  const totalChanges = sorted.length - 1;
  if (totalChanges === 0) {
    return 50;
  }
  const stability = (increases - decreases) / totalChanges;
  return clamp(Math.round(50 + stability * 50), 0, 100);
};

export const calculateSafetyScore = (
  inputs: SafetyScoreInputs,
): SafetyScoreResult => {
  const payoutRatio = safeRatio(
    inputs.payout.dividendsPerShare,
    inputs.payout.eps,
  );
  const fcfCoverage = safeRatio(
    inputs.fcf.freeCashFlow,
    inputs.fcf.totalDividendsPaid,
  );
  const payoutResult = scorePayoutRatio(payoutRatio);
  const fcfScore = scoreFcfCoverage(fcfCoverage);
  const growthScore = scoreGrowthConsistency(inputs.history);

  const weightedScore =
    payoutResult.score * 0.5 + fcfScore * 0.3 + growthScore * 0.2;

  return {
    score: clamp(Math.round(weightedScore), 0, 100),
    grade: payoutResult.grade,
    payoutRatio: payoutRatio === null ? null : Number(payoutRatio.toFixed(4)),
    fcfCoverage: fcfCoverage === null ? null : Number(fcfCoverage.toFixed(4)),
    growthScore,
  };
};
