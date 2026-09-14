/**
 * ExecuteGetCommitteePack - Application use case (handwritten; x-repository was none)
 */

import type {
  GetCommitteePackInput,
  GetCommitteePackOutput,
} from '../dto/committee-pack.dto';
import type {
  ExecutionContextService,
  IdGeneratorService,
} from '@formulary/services/_shared/index.js';
import type { CommitteePackRepository } from '../ports';
import { ValidationError } from '../errors';

export class ExecuteGetCommitteePack {
  constructor(
    private readonly context: ExecutionContextService,
    private readonly idGenerator: IdGeneratorService,
    private readonly committeePack: CommitteePackRepository
  ) {}

  async execute(input: GetCommitteePackInput): Promise<GetCommitteePackOutput> {
    const correlationId = this.idGenerator.ptfId();
    if (!input) throw new ValidationError('Input is required');
    if (!(input as any).period) {
      throw new ValidationError('period is required');
    }
    return (await this.committeePack.getCommitteePack({
      ...(input as any),
      orgId: this.context.getOrgId(),
      correlationId,
    })) as GetCommitteePackOutput;
  }
}
