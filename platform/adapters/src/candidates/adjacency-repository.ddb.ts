import type { AdjacencyRepository } from "@formulary/services/candidates";
import { candidatesById, responseMeta } from "../_shared/formulary-sandbox-store.js";

export class AdjacencyRepositoryDdb implements AdjacencyRepository {
  constructor(private readonly _dynamoClient: any) {}

  async getAdjacentUseCases(input: Parameters<AdjacencyRepository["getAdjacentUseCases"]>[0]): Promise<Awaited<ReturnType<AdjacencyRepository["getAdjacentUseCases"]>>> {
    const candidateId = (input as any).candidateId;
    const current = candidatesById.get(candidateId);
    const need = (current?.formula as any)?.need?.statement as string | undefined;
    const items = [...candidatesById.values()].filter((c) => {
      if (c.id === candidateId) return false;
      if (!need) return false;
      const other = (c.formula as any)?.need?.statement as string | undefined;
      return Boolean(other && other.toLowerCase().includes(need.slice(0, 24).toLowerCase()));
    });
    return { data: { items }, ...responseMeta((input as any)?.correlationId) } as any;
  }
}
