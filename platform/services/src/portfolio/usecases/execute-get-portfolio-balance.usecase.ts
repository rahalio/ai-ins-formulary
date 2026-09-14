/**
 * ExecuteGetPortfolioBalance - Application use case (handwritten; x-repository was none)
 */

import type {
  GetPortfolioBalanceInput,
  GetPortfolioBalanceOutput,
} from '../dto/balance.dto';
import type {
  ExecutionContextService,
  IdGeneratorService,
} from '@formulary/services/_shared/index.js';
import type { BalanceRepository } from '../ports';
import { ValidationError } from '../errors';

export class ExecuteGetPortfolioBalance {
  constructor(
    private readonly context: ExecutionContextService,
    private readonly idGenerator: IdGeneratorService,
    private readonly balance: BalanceRepository
  ) {}

  async execute(input: GetPortfolioBalanceInput): Promise<GetPortfolioBalanceOutput> {
    const correlationId = this.idGenerator.ptfId();
    if (!input) throw new ValidationError('Input is required');
    return (await this.balance.getPortfolioBalance({
      ...(input as any),
      orgId: this.context.getOrgId(),
      correlationId,
    })) as GetPortfolioBalanceOutput;
  }
}
