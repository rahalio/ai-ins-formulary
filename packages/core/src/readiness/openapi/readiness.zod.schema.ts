import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const issueDataReadinessVerdict_Body = z
  .object({
    verdict: z.enum(['ready', 'ready_with_conditions', 'not_ready']),
    ownerId: z.string(),
    dependencyAssessments: z.array(
      z
        .object({
          dataDependencyId: z.string(),
          available: z.boolean(),
          qualitySufficient: z.boolean(),
          permissionEstablished: z.boolean(),
          measuredBookCoverage: z.number(),
          notes: z.string(),
        })
        .partial()
        .passthrough()
    ),
  })
  .passthrough();
const CandidateId = z.string();
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
const DependencyAssessment = z
  .object({
    dataDependencyId: z.string(),
    available: z.boolean(),
    qualitySufficient: z.boolean(),
    permissionEstablished: z.boolean(),
    measuredBookCoverage: z.number(),
    notes: z.string(),
  })
  .partial()
  .passthrough();
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
const DataReadinessVerdict = z
  .object({
    id: z.string().regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
    candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
    verdict: z.enum(['ready', 'ready_with_conditions', 'not_ready']),
    ownerId: z.string(),
    dependencyAssessments: z
      .array(
        z
          .object({
            dataDependencyId: z.string(),
            available: z.boolean(),
            qualitySufficient: z.boolean(),
            permissionEstablished: z.boolean(),
            measuredBookCoverage: z.number(),
            notes: z.string(),
          })
          .partial()
          .passthrough()
      )
      .optional(),
    blockers: z
      .array(
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
      )
      .optional(),
    assessedAt: z.string().datetime({ offset: true }).optional(),
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
const DataReadinessVerdictResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
        candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
        verdict: z.enum(['ready', 'ready_with_conditions', 'not_ready']),
        ownerId: z.string(),
        dependencyAssessments: z
          .array(
            z
              .object({
                dataDependencyId: z.string(),
                available: z.boolean(),
                qualitySufficient: z.boolean(),
                permissionEstablished: z.boolean(),
                measuredBookCoverage: z.number(),
                notes: z.string(),
              })
              .partial()
              .passthrough()
          )
          .optional(),
        blockers: z
          .array(
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
          )
          .optional(),
        assessedAt: z.string().datetime({ offset: true }).optional(),
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
const DataReadinessVerdictCreate = z
  .object({
    verdict: z.enum(['ready', 'ready_with_conditions', 'not_ready']),
    ownerId: z.string(),
    dependencyAssessments: z.array(
      z
        .object({
          dataDependencyId: z.string(),
          available: z.boolean(),
          qualitySufficient: z.boolean(),
          permissionEstablished: z.boolean(),
          measuredBookCoverage: z.number(),
          notes: z.string(),
        })
        .partial()
        .passthrough()
    ),
  })
  .passthrough();
const Cursor = z.string();
const Limit = z.number();
const DataBlockerListData = z
  .object({
    items: z.array(
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
    nextCursor: z.string().optional(),
  })
  .passthrough();
const DataBlockerListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
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

export const schemas: any = {
  issueDataReadinessVerdict_Body,
  CandidateId,
  Problem,
  DependencyAssessment,
  DataBlocker,
  DataReadinessVerdict,
  ResponseMeta,
  DataReadinessVerdictResponse,
  DataReadinessVerdictCreate,
  Cursor,
  Limit,
  DataBlockerListData,
  DataBlockerListResponse,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/candidates/:candidateId/readiness',
    alias: 'issueDataReadinessVerdict',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: issueDataReadinessVerdict_Body,
      },
      {
        name: 'candidateId',
        type: 'Path',
        schema: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
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
            id: z.string().regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
            candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
            verdict: z.enum(['ready', 'ready_with_conditions', 'not_ready']),
            ownerId: z.string(),
            dependencyAssessments: z
              .array(
                z
                  .object({
                    dataDependencyId: z.string(),
                    available: z.boolean(),
                    qualitySufficient: z.boolean(),
                    permissionEstablished: z.boolean(),
                    measuredBookCoverage: z.number(),
                    notes: z.string(),
                  })
                  .partial()
                  .passthrough()
              )
              .optional(),
            blockers: z
              .array(
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
              )
              .optional(),
            assessedAt: z.string().datetime({ offset: true }).optional(),
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
    method: 'get',
    path: '/v1/candidates/:candidateId/readiness',
    alias: 'getDataReadinessVerdict',
    requestFormat: 'json',
    parameters: [
      {
        name: 'candidateId',
        type: 'Path',
        schema: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            id: z.string().regex(/^rdy_[0-9A-HJKMNP-TV-Z]{26}$/),
            candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
            verdict: z.enum(['ready', 'ready_with_conditions', 'not_ready']),
            ownerId: z.string(),
            dependencyAssessments: z
              .array(
                z
                  .object({
                    dataDependencyId: z.string(),
                    available: z.boolean(),
                    qualitySufficient: z.boolean(),
                    permissionEstablished: z.boolean(),
                    measuredBookCoverage: z.number(),
                    notes: z.string(),
                  })
                  .partial()
                  .passthrough()
              )
              .optional(),
            blockers: z
              .array(
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
              )
              .optional(),
            assessedAt: z.string().datetime({ offset: true }).optional(),
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
  {
    method: 'get',
    path: '/v1/readiness/data-blockers',
    alias: 'listDataBlockers',
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
        name: 'blockerType',
        type: 'Query',
        schema: z
          .enum([
            'not_available',
            'quality_insufficient',
            'no_permission_basis',
            'permission_expired',
            'coverage_too_low',
            'unstructured_unusable',
            'lineage_unknown',
          ])
          .optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
