/**
 * ExecuteGetAdjacentUseCases - Application use case (handwritten; x-repository was none)
 */

import type { GetAdjacentUseCasesInput, GetAdjacentUseCasesOutput } from '../dto/adjacency.dto';
import type {
  ExecutionContextService,
  IdGeneratorService,
} from '@formulary/services/_shared/index.js';
import type { AdjacencyRepository } from '../ports';
import { ValidationError } from '../errors';

export class ExecuteGetAdjacentUseCases {
  constructor(
    private readonly context: ExecutionContextService,
    private readonly idGenerator: IdGeneratorService,
    private readonly adjacency: AdjacencyRepository
  ) {}

  async execute(input: GetAdjacentUseCasesInput): Promise<GetAdjacentUseCasesOutput> {
    const correlationId = this.idGenerator.candId();
    if (!input) throw new ValidationError('Input is required');
    if (!(input as any).candidateId) {
      throw new ValidationError('candidateId is required');
    }
    return (await this.adjacency.getAdjacentUseCases({
      ...(input as any),
      orgId: this.context.getOrgId(),
      correlationId,
    })) as GetAdjacentUseCasesOutput;
  }
}
