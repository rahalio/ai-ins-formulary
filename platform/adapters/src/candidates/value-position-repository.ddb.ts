import type { ValuePositionRepository } from "@formulary/services/candidates";
import { candidatesById, responseMeta } from "../_shared/formulary-sandbox-store.js";

function quadrantFrom(resultType: string, impactType: string) {
  if (resultType === "known" && impactType === "bottom_line") return "operations_efficacy";
  if (resultType === "known" && impactType === "top_line") return "customer_efficacy";
  if (resultType === "unknown" && impactType === "bottom_line") return "operations_discovery";
  return "customer_discovery";
}

export class ValuePositionRepositoryDdb implements ValuePositionRepository {
  constructor(private readonly _dynamoClient: any) {}

  async setValuePosition(input: Parameters<ValuePositionRepository["setValuePosition"]>[0]): Promise<Awaited<ReturnType<ValuePositionRepository["setValuePosition"]>>> {
    const body = input as any;
    const candidate = candidatesById.get(body.candidateId);
    if (!candidate) throw new Error(`Candidate not found: ${body.candidateId}`);
    const valuePosition = {
      resultType: body.resultType,
      impactType: body.impactType,
      quadrant: quadrantFrom(body.resultType, body.impactType),
      rationale: body.rationale,
    };
    candidate.valuePosition = valuePosition;
    candidate.updatedAt = new Date().toISOString();
    candidatesById.set(candidate.id, candidate);
    return { data: valuePosition, ...responseMeta(body?.correlationId) } as any;
  }
}
