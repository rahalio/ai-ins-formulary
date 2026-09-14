/**
 * IdGeneratorService Port — Formulary domain prefixes.
 */

import type { DomainCode } from '@formulary/core/_shared/helpers';

export interface IdGeneratorService {
  tntId(): string;
  keyId(): string;
  idnId(): string;
  autId(): string;
  candId(): string;
  rdyId(): string;
  gateId(): string;
  invId(): string;
  regId(): string;
  benId(): string;
  ptfId(): string;
  generateIdForDomain(domainCode: DomainCode): string;
}
