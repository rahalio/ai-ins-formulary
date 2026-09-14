import type { AnalogueRepository } from "@formulary/services/portfolio";
import { analoguesById, formularyId, nowIso, responseMeta } from "../_shared/formulary-sandbox-store.js";

export class AnalogueRepositoryDdb implements AnalogueRepository {
  constructor(private readonly _dynamoClient: any) {}

  async listAnalogueCases(input: Parameters<AnalogueRepository["listAnalogueCases"]>[0]): Promise<Awaited<ReturnType<AnalogueRepository["listAnalogueCases"]>>> {
    let items = [...analoguesById.values()];
    const industry = (input as any)?.sourceIndustry;
    if (industry) items = items.filter((a) => a.sourceIndustry === industry);
    return { data: { items }, ...responseMeta((input as any)?.correlationId) } as any;
  }

  async recordAnalogueCase(input: Parameters<AnalogueRepository["recordAnalogueCase"]>[0]): Promise<Awaited<ReturnType<AnalogueRepository["recordAnalogueCase"]>>> {
    const body = input as any;
    const id = formularyId("ptf");
    const entity = {
      id,
      ...body,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    analoguesById.set(id, entity);
    return { data: entity, ...responseMeta(body?.correlationId) } as any;
  }
}
