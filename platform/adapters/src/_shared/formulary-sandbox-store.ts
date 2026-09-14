/**
 * In-memory Formulary sandbox store for local / demo flows.
 */

import { ulid } from 'ulid';

export function formularyId(prefix: string): string {
  return `${prefix}_${ulid().toLowerCase()}`;
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function responseMeta(correlationId?: string) {
  return {
    meta: {
      requestId: formularyId('req').replace('req_', ''),
      correlationId,
      generatedAt: nowIso(),
    },
  };
}

export type SandboxCandidate = Record<string, unknown> & {
  id: string;
  title: string;
  stage: string;
  sponsorId: string;
  formula: unknown;
};

export const candidatesById = new Map<string, SandboxCandidate>();
export const analoguesById = new Map<string, Record<string, unknown>>();
export const modelsById = new Map<string, Record<string, unknown>>();
export const claimsById = new Map<string, Record<string, unknown>>();
export const readinessByCandidate = new Map<string, Record<string, unknown>>();
export const gatesById = new Map<string, Record<string, unknown>>();
export const investmentsByCandidate = new Map<string, Record<string, unknown>>();
export const dataDepsById = new Map<string, Record<string, unknown>>();
