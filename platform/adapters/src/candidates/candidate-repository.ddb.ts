/**
 * CandidateRepository — sandbox in-memory implementation (handwritten).
 */

import type { CandidateRepository } from "@formulary/services/candidates";
import {
  candidatesById,
  formularyId,
  nowIso,
  responseMeta,
  type SandboxCandidate,
} from "../_shared/formulary-sandbox-store.js";

export class CandidateRepositoryDdb implements CandidateRepository {
  constructor(private readonly _dynamoClient: any) {}

  async listUseCaseCandidates(input: Parameters<CandidateRepository["listUseCaseCandidates"]>[0]): Promise<Awaited<ReturnType<CandidateRepository["listUseCaseCandidates"]>>> {
    let items = [...candidatesById.values()];
    const q = input as any;
    if (q?.stage) items = items.filter((c) => c.stage === q.stage);
    if (q?.valueChainStep) items = items.filter((c) => c.valueChainStep === q.valueChainStep);
    if (q?.quadrant) items = items.filter((c) => (c.valuePosition as any)?.quadrant === q.quadrant);
    return { data: { items }, ...responseMeta(q?.correlationId) } as any;
  }

  async submitUseCaseCandidate(input: Parameters<CandidateRepository["submitUseCaseCandidate"]>[0]): Promise<Awaited<ReturnType<CandidateRepository["submitUseCaseCandidate"]>>> {
    const body = input as any;
    const id = formularyId("can");
    const entity: SandboxCandidate = {
      id,
      title: body.title,
      sponsorId: body.sponsorId,
      stage: "formula_accepted",
      formula: body.formula,
      valueChainStep: body.valueChainStep,
      touchpoints: body.touchpoints ?? [],
      extendsExistingAutomation: body.extendsExistingAutomation,
      baselineReference: body.baselineReference,
      analogueCaseIds: body.analogueCaseIds ?? [],
      submittedAt: nowIso(),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    candidatesById.set(id, entity);
    return { data: entity, ...responseMeta(body?.correlationId) } as any;
  }

  async getUseCaseCandidate(input: Parameters<CandidateRepository["getUseCaseCandidate"]>[0]): Promise<Awaited<ReturnType<CandidateRepository["getUseCaseCandidate"]>>> {
    const candidateId = (input as any).candidateId;
    const entity = candidatesById.get(candidateId);
    if (!entity) return null as any;
    return { data: entity, ...responseMeta((input as any)?.correlationId) } as any;
  }
}
