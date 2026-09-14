import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const recordAnalogueCase_Body = z
  .object({
    sourceOrganisation: z.string(),
    sourceIndustry: z.string(),
    reportedResult: z.string().optional(),
    underlyingFormula: z.string().optional(),
    transferAssumption: z.string(),
    insuranceTranslation: z.string().optional(),
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
const Money = z
  .object({ amount: z.number(), currency: z.string() })
  .passthrough();
const PortfolioBalance = z
  .object({
    period: z.string(),
    committedByQuadrant: z.record(
      z.object({ amount: z.number(), currency: z.string() }).passthrough()
    ),
    discoveryShare: z.number(),
    discoveryShareTarget: z.number(),
    withinTarget: z.boolean(),
    liveUseCases: z.number().int(),
    killedUseCases: z.number().int(),
  })
  .partial()
  .passthrough();
const ResponseMeta = z
  .object({
    requestId: z.string().uuid(),
    correlationId: z.string(),
    generatedAt: z.string().datetime({ offset: true }),
  })
  .partial()
  .passthrough();
const PortfolioBalanceResponse = z
  .object({
    data: z
      .object({
        period: z.string(),
        committedByQuadrant: z.record(
          z.object({ amount: z.number(), currency: z.string() }).passthrough()
        ),
        discoveryShare: z.number(),
        discoveryShareTarget: z.number(),
        withinTarget: z.boolean(),
        liveUseCases: z.number().int(),
        killedUseCases: z.number().int(),
      })
      .partial()
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
const CandidateId = z.string();
const DataBlocker = z
  .object({
    blockerType: z.enum([
      'not_available',
      'quality_insufficient',
      'no_permission_basis',
      'permission_expired',
      'coverage_too_low',
      'unstructured_unusable',
      'lineage_unknown',
    ]),
    dataDependencyId: z.string(),
    candidateIdsBlocked: z
      .array(z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    remediationOwner: z.string().optional(),
    raisedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const CommitteePack = z
  .object({
    period: z.string(),
    balance: z
      .object({
        period: z.string(),
        committedByQuadrant: z.record(
          z.object({ amount: z.number(), currency: z.string() }).passthrough()
        ),
        discoveryShare: z.number(),
        discoveryShareTarget: z.number(),
        withinTarget: z.boolean(),
        liveUseCases: z.number().int(),
        killedUseCases: z.number().int(),
      })
      .partial()
      .passthrough(),
    forecastBenefit: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    bookedBenefit: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    bookedToForecastRatio: z.number(),
    killLog: z.array(
      z
        .object({
          candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
          title: z.string(),
          metCriteria: z.array(z.string()),
          killedAt: z.string().datetime({ offset: true }),
        })
        .partial()
        .passthrough()
    ),
    topDataBlockers: z.array(
      z
        .object({
          blockerType: z.enum([
            'not_available',
            'quality_insufficient',
            'no_permission_basis',
            'permission_expired',
            'coverage_too_low',
            'unstructured_unusable',
            'lineage_unknown',
          ]),
          dataDependencyId: z.string(),
          candidateIdsBlocked: z
            .array(z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/))
            .optional(),
          remediationOwner: z.string().optional(),
          raisedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    gateWithholdings: z.number().int(),
    unownedProductionModels: z.number().int(),
  })
  .partial()
  .passthrough();
const CommitteePackResponse = z
  .object({
    data: z
      .object({
        period: z.string(),
        balance: z
          .object({
            period: z.string(),
            committedByQuadrant: z.record(
              z
                .object({ amount: z.number(), currency: z.string() })
                .passthrough()
            ),
            discoveryShare: z.number(),
            discoveryShareTarget: z.number(),
            withinTarget: z.boolean(),
            liveUseCases: z.number().int(),
            killedUseCases: z.number().int(),
          })
          .partial()
          .passthrough(),
        forecastBenefit: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough(),
        bookedBenefit: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough(),
        bookedToForecastRatio: z.number(),
        killLog: z.array(
          z
            .object({
              candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
              title: z.string(),
              metCriteria: z.array(z.string()),
              killedAt: z.string().datetime({ offset: true }),
            })
            .partial()
            .passthrough()
        ),
        topDataBlockers: z.array(
          z
            .object({
              blockerType: z.enum([
                'not_available',
                'quality_insufficient',
                'no_permission_basis',
                'permission_expired',
                'coverage_too_low',
                'unstructured_unusable',
                'lineage_unknown',
              ]),
              dataDependencyId: z.string(),
              candidateIdsBlocked: z
                .array(z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/))
                .optional(),
              remediationOwner: z.string().optional(),
              raisedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        gateWithholdings: z.number().int(),
        unownedProductionModels: z.number().int(),
      })
      .partial()
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
const Cursor = z.string();
const Limit = z.number();
const AnalogueCase = z
  .object({
    id: z.string().regex(/^ptf_[0-9A-HJKMNP-TV-Z]{26}$/),
    sourceOrganisation: z.string(),
    sourceIndustry: z.string(),
    reportedResult: z.string().optional(),
    underlyingFormula: z.string().optional(),
    transferAssumption: z.string(),
    insuranceTranslation: z.string().optional(),
    recordedBy: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const AnalogueCaseListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^ptf_[0-9A-HJKMNP-TV-Z]{26}$/),
          sourceOrganisation: z.string(),
          sourceIndustry: z.string(),
          reportedResult: z.string().optional(),
          underlyingFormula: z.string().optional(),
          transferAssumption: z.string(),
          insuranceTranslation: z.string().optional(),
          recordedBy: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }).optional(),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const AnalogueCaseListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^ptf_[0-9A-HJKMNP-TV-Z]{26}$/),
              sourceOrganisation: z.string(),
              sourceIndustry: z.string(),
              reportedResult: z.string().optional(),
              underlyingFormula: z.string().optional(),
              transferAssumption: z.string(),
              insuranceTranslation: z.string().optional(),
              recordedBy: z.string().optional(),
              createdAt: z.string().datetime({ offset: true }).optional(),
              updatedAt: z.string().datetime({ offset: true }).optional(),
            })
            .passthrough()
        ),
        nextCursor: z.string().optional(),
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
const AnalogueCaseCreate = z
  .object({
    sourceOrganisation: z.string(),
    sourceIndustry: z.string(),
    reportedResult: z.string().optional(),
    underlyingFormula: z.string().optional(),
    transferAssumption: z.string(),
    insuranceTranslation: z.string().optional(),
  })
  .passthrough();
const AnalogueCaseResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^ptf_[0-9A-HJKMNP-TV-Z]{26}$/),
        sourceOrganisation: z.string(),
        sourceIndustry: z.string(),
        reportedResult: z.string().optional(),
        underlyingFormula: z.string().optional(),
        transferAssumption: z.string(),
        insuranceTranslation: z.string().optional(),
        recordedBy: z.string().optional(),
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

export const schemas: any = {
  recordAnalogueCase_Body,
  Problem,
  Money,
  PortfolioBalance,
  ResponseMeta,
  PortfolioBalanceResponse,
  CandidateId,
  DataBlocker,
  CommitteePack,
  CommitteePackResponse,
  Cursor,
  Limit,
  AnalogueCase,
  AnalogueCaseListData,
  AnalogueCaseListResponse,
  AnalogueCaseCreate,
  AnalogueCaseResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/portfolio/analogues',
    alias: 'listAnalogueCases',
    requestFormat: 'json',
    parameters: [
      {
        name: 'cursor',
        type: 'Query',
        schema: z.string().optional(),
      },
      {
        name: 'limit',
        type: 'Query',
        schema: z.number().int().gte(1).lte(200).optional().default(50),
      },
      {
        name: 'sourceIndustry',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^ptf_[0-9A-HJKMNP-TV-Z]{26}$/),
                  sourceOrganisation: z.string(),
                  sourceIndustry: z.string(),
                  reportedResult: z.string().optional(),
                  underlyingFormula: z.string().optional(),
                  transferAssumption: z.string(),
                  insuranceTranslation: z.string().optional(),
                  recordedBy: z.string().optional(),
                  createdAt: z.string().datetime({ offset: true }).optional(),
                  updatedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            nextCursor: z.string().optional(),
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
    ],
  },
  {
    method: 'post',
    path: '/v1/portfolio/analogues',
    alias: 'recordAnalogueCase',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: recordAnalogueCase_Body,
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
            id: z.string().regex(/^ptf_[0-9A-HJKMNP-TV-Z]{26}$/),
            sourceOrganisation: z.string(),
            sourceIndustry: z.string(),
            reportedResult: z.string().optional(),
            underlyingFormula: z.string().optional(),
            transferAssumption: z.string(),
            insuranceTranslation: z.string().optional(),
            recordedBy: z.string().optional(),
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
    ],
  },
  {
    method: 'get',
    path: '/v1/portfolio/balance',
    alias: 'getPortfolioBalance',
    requestFormat: 'json',
    parameters: [
      {
        name: 'period',
        type: 'Query',
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            period: z.string(),
            committedByQuadrant: z.record(
              z
                .object({ amount: z.number(), currency: z.string() })
                .passthrough()
            ),
            discoveryShare: z.number(),
            discoveryShareTarget: z.number(),
            withinTarget: z.boolean(),
            liveUseCases: z.number().int(),
            killedUseCases: z.number().int(),
          })
          .partial()
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
    ],
  },
  {
    method: 'get',
    path: '/v1/portfolio/committee-pack',
    alias: 'getCommitteePack',
    requestFormat: 'json',
    parameters: [
      {
        name: 'period',
        type: 'Query',
        schema: z.string(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            period: z.string(),
            balance: z
              .object({
                period: z.string(),
                committedByQuadrant: z.record(
                  z
                    .object({ amount: z.number(), currency: z.string() })
                    .passthrough()
                ),
                discoveryShare: z.number(),
                discoveryShareTarget: z.number(),
                withinTarget: z.boolean(),
                liveUseCases: z.number().int(),
                killedUseCases: z.number().int(),
              })
              .partial()
              .passthrough(),
            forecastBenefit: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough(),
            bookedBenefit: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough(),
            bookedToForecastRatio: z.number(),
            killLog: z.array(
              z
                .object({
                  candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
                  title: z.string(),
                  metCriteria: z.array(z.string()),
                  killedAt: z.string().datetime({ offset: true }),
                })
                .partial()
                .passthrough()
            ),
            topDataBlockers: z.array(
              z
                .object({
                  blockerType: z.enum([
                    'not_available',
                    'quality_insufficient',
                    'no_permission_basis',
                    'permission_expired',
                    'coverage_too_low',
                    'unstructured_unusable',
                    'lineage_unknown',
                  ]),
                  dataDependencyId: z.string(),
                  candidateIdsBlocked: z
                    .array(z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/))
                    .optional(),
                  remediationOwner: z.string().optional(),
                  raisedAt: z.string().datetime({ offset: true }).optional(),
                })
                .passthrough()
            ),
            gateWithholdings: z.number().int(),
            unownedProductionModels: z.number().int(),
          })
          .partial()
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
