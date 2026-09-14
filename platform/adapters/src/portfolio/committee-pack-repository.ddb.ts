import type { CommitteePackRepository } from "@formulary/services/portfolio";
import { candidatesById, responseMeta } from "../_shared/formulary-sandbox-store.js";
import { BalanceRepositoryDdb } from "./balance-repository.ddb.js";

export class CommitteePackRepositoryDdb implements CommitteePackRepository {
  constructor(private readonly dynamoClient: any) {}

  async getCommitteePack(input: Parameters<CommitteePackRepository["getCommitteePack"]>[0]): Promise<Awaited<ReturnType<CommitteePackRepository["getCommitteePack"]>>> {
    const period = (input as any).period;
    const balanceRepo = new BalanceRepositoryDdb(this.dynamoClient);
    const balanceResult = await balanceRepo.getPortfolioBalance({ period } as any);
    const balance = (balanceResult as any).data;
    const killLog = [...candidatesById.values()]
      .filter((c) => c.stage === "killed")
      .map((c) => ({
        candidateId: c.id,
        title: c.title,
        metCriteria: [],
        killedAt: c.updatedAt,
      }));
    const data = {
      period,
      balance,
      forecastBenefit: { amount: 0, currency: "EUR" },
      bookedBenefit: { amount: 0, currency: "EUR" },
      bookedToForecastRatio: 0,
      killLog,
      topDataBlockers: [],
      gateWithholdings: 0,
      unownedProductionModels: 0,
    };
    return { data, ...responseMeta((input as any)?.correlationId) } as any;
  }
}
