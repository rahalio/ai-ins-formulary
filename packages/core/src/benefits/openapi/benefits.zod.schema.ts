import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const claimBenefit_Body = z
  .object({
    candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
    benefitKind: z.enum([
      'loss_ratio_points',
      'expense_ratio_points',
      'premium_growth',
      'retention_improvement',
      'avoided_cost',
    ]),
    magnitude: z.number(),
    monetaryEquivalent: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
    lineOfBusiness: z.string().optional(),
    baselineIsolated: z.boolean().optional(),
    baselineDescription: z.string().optional(),
    period: z.string(),
  })
  .passthrough();
const closeBenefitWithFinance_Body = z
  .object({
    financeOutcome: z.enum([
      'confirmed',
      'partially_confirmed',
      'denied',
      'not_yet_observable',
    ]),
    confirmedMagnitude: z.number().optional(),
    confirmedMonetary: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
    ledgerReference: z.string().optional(),
    confirmedBy: z.string(),
  })
  .passthrough();
const CandidateId = z.string();
const Money = z
  .object({ amount: z.number(), currency: z.string() })
  .passthrough();
const BenefitClaimCreate = z
  .object({
    candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
    benefitKind: z.enum([
      'loss_ratio_points',
      'expense_ratio_points',
      'premium_growth',
      'retention_improvement',
      'avoided_cost',
    ]),
    magnitude: z.number(),
    monetaryEquivalent: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
    lineOfBusiness: z.string().optional(),
    baselineIsolated: z.boolean().optional(),
    baselineDescription: z.string().optional(),
    period: z.string(),
  })
  .passthrough();
const Problem = z
  .object({
    type: z.string().url(),
    title: z.string(),
    status: z.number().int(),
    detail: z.string(),
    instance: z.string().url(),
    code: z.string(),
  })
  .partial()
  .passthrough();
const ClaimId = z.string();
const BenefitClaim = z
  .object({
    id: z
      .string()
      .regex(/^ben_[0-9A-HJKMNP-TV-Z]{26}$/)
      .optional(),
    candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
    benefitKind: z.enum([
      'loss_ratio_points',
      'expense_ratio_points',
      'premium_growth',
      'retention_improvement',
      'avoided_cost',
    ]),
    magnitude: z.number().optional(),
    monetaryEquivalent: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
    lineOfBusiness: z.string().optional(),
    baselineIsolated: z.boolean().optional(),
    baselineDescription: z.string().optional(),
    period: z.string().optional(),
    claimedBy: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const BenefitClaimResponse = z
  .object({
    data: z
      .object({
        id: z
          .string()
          .regex(/^ben_[0-9A-HJKMNP-TV-Z]{26}$/)
          .optional(),
        candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
        benefitKind: z.enum([
          'loss_ratio_points',
          'expense_ratio_points',
          'premium_growth',
          'retention_improvement',
          'avoided_cost',
        ]),
        magnitude: z.number().optional(),
        monetaryEquivalent: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough()
          .optional(),
        lineOfBusiness: z.string().optional(),
        baselineIsolated: z.boolean().optional(),
        baselineDescription: z.string().optional(),
        period: z.string().optional(),
        claimedBy: z.string().optional(),
        createdAt: z.string().datetime({ offset: true }).optional(),
        updatedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();
const BenefitCloseCreate = z
  .object({
    financeOutcome: z.enum([
      'confirmed',
      'partially_confirmed',
      'denied',
      'not_yet_observable',
    ]),
    confirmedMagnitude: z.number().optional(),
    confirmedMonetary: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
    ledgerReference: z.string().optional(),
    confirmedBy: z.string(),
  })
  .passthrough();
const BenefitClose = z
  .object({
    claimId: z.string().regex(/^ben_[0-9A-HJKMNP-TV-Z]{26}$/),
    financeOutcome: z.enum([
      'confirmed',
      'partially_confirmed',
      'denied',
      'not_yet_observable',
    ]),
    confirmedMagnitude: z.number().optional(),
    confirmedMonetary: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough()
      .optional(),
    ledgerReference: z.string().optional(),
    confirmedBy: z.string().optional(),
    variance: z.number().optional(),
    closedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const BenefitCloseResponse = z
  .object({
    data: z
      .object({
        claimId: z.string().regex(/^ben_[0-9A-HJKMNP-TV-Z]{26}$/),
        financeOutcome: z.enum([
          'confirmed',
          'partially_confirmed',
          'denied',
          'not_yet_observable',
        ]),
        confirmedMagnitude: z.number().optional(),
        confirmedMonetary: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough()
          .optional(),
        ledgerReference: z.string().optional(),
        confirmedBy: z.string().optional(),
        variance: z.number().optional(),
        closedAt: z.string().datetime({ offset: true }).optional(),
      })
      .passthrough(),
    meta: z
      .object({
        requestId: z.string().uuid(),
        correlationId: z.string(),
        generatedAt: z.string().datetime({ offset: true }),
      })
      .partial()
      .passthrough()
      .optional(),
  })
  .passthrough();

export const schemas: any = {
  claimBenefit_Body,
  closeBenefitWithFinance_Body,
  CandidateId,
  Money,
  BenefitClaimCreate,
  Problem,
  ClaimId,
  BenefitClaim,
  ResponseMeta,
  BenefitClaimResponse,
  BenefitCloseCreate,
  BenefitClose,
  BenefitCloseResponse,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/benefits/claims',
    alias: 'claimBenefit',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: claimBenefit_Body,
      },
      {
        name: 'Idempotency-Key',
        type: 'Header',
        schema: z.string().min(1).max(128),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z
              .string()
              .regex(/^ben_[0-9A-HJKMNP-TV-Z]{26}$/)
              .optional(),
            candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
            benefitKind: z.enum([
              'loss_ratio_points',
              'expense_ratio_points',
              'premium_growth',
              'retention_improvement',
              'avoided_cost',
            ]),
            magnitude: z.number().optional(),
            monetaryEquivalent: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough()
              .optional(),
            lineOfBusiness: z.string().optional(),
            baselineIsolated: z.boolean().optional(),
            baselineDescription: z.string().optional(),
            period: z.string().optional(),
            claimedBy: z.string().optional(),
            createdAt: z.string().datetime({ offset: true }).optional(),
            updatedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 422,
        description: `Semantically invalid request (e.g. PACK_EMPTY)`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
  {
    method: 'post',
    path: '/v1/benefits/claims/:claimId/close',
    alias: 'closeBenefitWithFinance',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: closeBenefitWithFinance_Body,
      },
      {
        name: 'claimId',
        type: 'Path',
        schema: z.string().regex(/^ben_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            claimId: z.string().regex(/^ben_[0-9A-HJKMNP-TV-Z]{26}$/),
            financeOutcome: z.enum([
              'confirmed',
              'partially_confirmed',
              'denied',
              'not_yet_observable',
            ]),
            confirmedMagnitude: z.number().optional(),
            confirmedMonetary: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough()
              .optional(),
            ledgerReference: z.string().optional(),
            confirmedBy: z.string().optional(),
            variance: z.number().optional(),
            closedAt: z.string().datetime({ offset: true }).optional(),
          })
          .passthrough(),
        meta: z
          .object({
            requestId: z.string().uuid(),
            correlationId: z.string(),
            generatedAt: z.string().datetime({ offset: true }),
          })
          .partial()
          .passthrough()
          .optional(),
      })
      .passthrough(),
    errors: [
      {
        status: 401,
        description: `Missing or invalid API key`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
      {
        status: 404,
        description: `Resource not found`,
        schema: z
          .object({
            type: z.string().url(),
            title: z.string(),
            status: z.number().int(),
            detail: z.string(),
            instance: z.string().url(),
            code: z.string(),
          })
          .partial()
          .passthrough(),
      },
    ],
  },
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
