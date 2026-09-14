/**
 * ID Generator Service Implementation — Formulary prefixes.
 */

import type { DomainCode } from '@formulary/core/_shared/helpers';
import { DOMAIN_PREFIX_MAP, isValidDomainId } from '@formulary/core';
import { ulid } from 'ulid';
import type { IdGeneratorService } from '@formulary/services/_shared';

export function generateIdWithPrefix(prefix: string): string {
  if (!prefix || prefix.length !== 3 || !/^[a-z]{3}$/.test(prefix)) {
    throw new Error(
      `Invalid domain prefix: "${prefix}". Must be exactly 3 lowercase letters.`
    );
  }
  const id = `${prefix}_${ulid().toLowerCase()}`;
  if (!isValidDomainId(id)) {
    throw new Error(`Generated ID "${id}" failed validation.`);
  }
  return id;
}

export class DefaultIdGeneratorService implements IdGeneratorService {
  tntId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.tenant);
  }
  keyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.apiKey);
  }
  idnId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.identity);
  }
  autId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.auth);
  }
  candId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.candidates);
  }
  rdyId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.readiness);
  }
  gateId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.gates);
  }
  invId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.investment);
  }
  regId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.registry);
  }
  benId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.benefits);
  }
  ptfId(): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP.portfolio);
  }
  generateIdForDomain(domainCode: DomainCode): string {
    return generateIdWithPrefix(DOMAIN_PREFIX_MAP[domainCode]);
  }
}

let idGeneratorService: DefaultIdGeneratorService | null = null;

export function getIdGeneratorService(): DefaultIdGeneratorService {
  if (!idGeneratorService) {
    idGeneratorService = new DefaultIdGeneratorService();
  }
  return idGeneratorService;
}
