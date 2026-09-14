import type { BalanceRepository } from "@formulary/services/portfolio";
import { candidatesById, responseMeta } from "../_shared/formulary-sandbox-store.js";

export class BalanceRepositoryDdb implements BalanceRepository {
  constructor(private readonly _dynamoClient: any) {}

  async getPortfolioBalance(input: Parameters<BalanceRepository["getPortfolioBalance"]>[0]): Promise<Awaited<ReturnType<BalanceRepository["getPortfolioBalance"]>>> {
    const period = (input as any)?.period ?? "current";
    const counts: Record<string, number> = {
      operations_efficacy: 0,
      customer_efficacy: 0,
      operations_discovery: 0,
      customer_discovery: 0,
    };
    for (const c of candidatesById.values()) {
      const q = (c.valuePosition as any)?.quadrant as string | undefined;
      if (q && q in counts) counts[q] += 1;
    }
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
    const discovery = counts.operations_discovery + counts.customer_discovery;
    const discoveryShare = discovery / total;
    const data = {
      period,
      committedByQuadrant: Object.fromEntries(
        Object.entries(counts).map(([k, v]) => [k, { amount: v * 100000, currency: "EUR" }])
      ),
      discoveryShare,
      discoveryShareTarget: 0.25,
      withinTarget: discoveryShare >= 0.25,
      liveUseCases: [...candidatesById.values()].filter((c) => c.stage === "live").length,
      killedUseCases: [...candidatesById.values()].filter((c) => c.stage === "killed").length,
    };
    return { data, ...responseMeta((input as any)?.correlationId) } as any;
  }
}
