import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const registerModel_Body = z
  .object({
    name: z.string(),
    modelFamily: z.enum([
      'speech_voice_recognition',
      'sentiment_detection',
      'recommendation_engine',
      'text_analytics_nlp',
      'pattern_anomaly_detection',
      'automatic_decision_management',
      'natural_language_generation',
      'object_detection',
      'biometrics',
    ]),
    ownerId: z.string(),
    candidateIds: z
      .array(z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    dataDependencyIds: z.array(z.string()).optional(),
    conductGateReviewId: z.string().optional(),
    touchpoints: z
      .array(
        z.enum([
          'rating_factor',
          'renewal_price',
          'underwriting_acceptance',
          'claims_decision',
          'fraud_referral',
          'reserving_input',
          'marketing_targeting',
          'none',
        ])
      )
      .optional(),
  })
  .passthrough();
const Cursor = z.string();
const Limit = z.number();
const ModelFamily = z.enum([
  'speech_voice_recognition',
  'sentiment_detection',
  'recommendation_engine',
  'text_analytics_nlp',
  'pattern_anomaly_detection',
  'automatic_decision_management',
  'natural_language_generation',
  'object_detection',
  'biometrics',
]);
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
const CandidateId = z.string();
const Touchpoint = z.enum([
  'rating_factor',
  'renewal_price',
  'underwriting_acceptance',
  'claims_decision',
  'fraud_referral',
  'reserving_input',
  'marketing_targeting',
  'none',
]);
const ModelRegistration = z
  .object({
    id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
    name: z.string(),
    modelFamily: z.enum([
      'speech_voice_recognition',
      'sentiment_detection',
      'recommendation_engine',
      'text_analytics_nlp',
      'pattern_anomaly_detection',
      'automatic_decision_management',
      'natural_language_generation',
      'object_detection',
      'biometrics',
    ]),
    ownerId: z.string(),
    candidateIds: z
      .array(z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    dataDependencyIds: z.array(z.string()).optional(),
    conductGateReviewId: z.string().optional(),
    touchpoints: z
      .array(
        z.enum([
          'rating_factor',
          'renewal_price',
          'underwriting_acceptance',
          'claims_decision',
          'fraud_referral',
          'reserving_input',
          'marketing_targeting',
          'none',
        ])
      )
      .optional(),
    inOwnRiskAndSolvencyScope: z.boolean().optional(),
    registeredAt: z.string().datetime({ offset: true }).optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const ModelRegistrationListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
          name: z.string(),
          modelFamily: z.enum([
            'speech_voice_recognition',
            'sentiment_detection',
            'recommendation_engine',
            'text_analytics_nlp',
            'pattern_anomaly_detection',
            'automatic_decision_management',
            'natural_language_generation',
            'object_detection',
            'biometrics',
          ]),
          ownerId: z.string(),
          candidateIds: z
            .array(z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/))
            .optional(),
          dataDependencyIds: z.array(z.string()).optional(),
          conductGateReviewId: z.string().optional(),
          touchpoints: z
            .array(
              z.enum([
                'rating_factor',
                'renewal_price',
                'underwriting_acceptance',
                'claims_decision',
                'fraud_referral',
                'reserving_input',
                'marketing_targeting',
                'none',
              ])
            )
            .optional(),
          inOwnRiskAndSolvencyScope: z.boolean().optional(),
          registeredAt: z.string().datetime({ offset: true }).optional(),
          createdAt: z.string().datetime({ offset: true }).optional(),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
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
const ModelRegistrationListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
              name: z.string(),
              modelFamily: z.enum([
                'speech_voice_recognition',
                'sentiment_detection',
                'recommendation_engine',
                'text_analytics_nlp',
                'pattern_anomaly_detection',
                'automatic_decision_management',
                'natural_language_generation',
                'object_detection',
                'biometrics',
              ]),
              ownerId: z.string(),
              candidateIds: z
                .array(z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/))
                .optional(),
              dataDependencyIds: z.array(z.string()).optional(),
              conductGateReviewId: z.string().optional(),
              touchpoints: z
                .array(
                  z.enum([
                    'rating_factor',
                    'renewal_price',
                    'underwriting_acceptance',
                    'claims_decision',
                    'fraud_referral',
                    'reserving_input',
                    'marketing_targeting',
                    'none',
                  ])
                )
                .optional(),
              inOwnRiskAndSolvencyScope: z.boolean().optional(),
              registeredAt: z.string().datetime({ offset: true }).optional(),
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
const ModelRegistrationCreate = z
  .object({
    name: z.string(),
    modelFamily: z.enum([
      'speech_voice_recognition',
      'sentiment_detection',
      'recommendation_engine',
      'text_analytics_nlp',
      'pattern_anomaly_detection',
      'automatic_decision_management',
      'natural_language_generation',
      'object_detection',
      'biometrics',
    ]),
    ownerId: z.string(),
    candidateIds: z
      .array(z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/))
      .optional(),
    dataDependencyIds: z.array(z.string()).optional(),
    conductGateReviewId: z.string().optional(),
    touchpoints: z
      .array(
        z.enum([
          'rating_factor',
          'renewal_price',
          'underwriting_acceptance',
          'claims_decision',
          'fraud_referral',
          'reserving_input',
          'marketing_targeting',
          'none',
        ])
      )
      .optional(),
  })
  .passthrough();
const ModelRegistrationResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
        name: z.string(),
        modelFamily: z.enum([
          'speech_voice_recognition',
          'sentiment_detection',
          'recommendation_engine',
          'text_analytics_nlp',
          'pattern_anomaly_detection',
          'automatic_decision_management',
          'natural_language_generation',
          'object_detection',
          'biometrics',
        ]),
        ownerId: z.string(),
        candidateIds: z
          .array(z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/))
          .optional(),
        dataDependencyIds: z.array(z.string()).optional(),
        conductGateReviewId: z.string().optional(),
        touchpoints: z
          .array(
            z.enum([
              'rating_factor',
              'renewal_price',
              'underwriting_acceptance',
              'claims_decision',
              'fraud_referral',
              'reserving_input',
              'marketing_targeting',
              'none',
            ])
          )
          .optional(),
        inOwnRiskAndSolvencyScope: z.boolean().optional(),
        registeredAt: z.string().datetime({ offset: true }).optional(),
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
const DataType = z.enum(['company', 'public', 'third_party', 'customer']);
const RegisteredDataDependency = z
  .object({
    id: z.string().regex(/^dep_[0-9A-HJKMNP-TV-Z]{26}$/),
    dataType: z.enum(['company', 'public', 'third_party', 'customer']),
    name: z.string(),
    structured: z.boolean().optional(),
    permissionBasis: z
      .enum([
        'contractual',
        'consent',
        'legitimate_interest',
        'licensed',
        'public_domain',
        'not_established',
      ])
      .optional(),
    onwardTransferTerms: z.string().optional(),
    permissionRenewalDate: z.string().optional(),
    expectedBookCoverage: z.number().optional(),
    ownerId: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const RegisteredDataDependencyListData = z
  .object({
    items: z.array(
      z
        .object({
          id: z.string().regex(/^dep_[0-9A-HJKMNP-TV-Z]{26}$/),
          dataType: z.enum(['company', 'public', 'third_party', 'customer']),
          name: z.string(),
          structured: z.boolean().optional(),
          permissionBasis: z
            .enum([
              'contractual',
              'consent',
              'legitimate_interest',
              'licensed',
              'public_domain',
              'not_established',
            ])
            .optional(),
          onwardTransferTerms: z.string().optional(),
          permissionRenewalDate: z.string().optional(),
          expectedBookCoverage: z.number().optional(),
          ownerId: z.string().optional(),
          createdAt: z.string().datetime({ offset: true }).optional(),
          updatedAt: z.string().datetime({ offset: true }).optional(),
        })
        .passthrough()
    ),
    nextCursor: z.string().optional(),
  })
  .passthrough();
const RegisteredDataDependencyListResponse = z
  .object({
    data: z
      .object({
        items: z.array(
          z
            .object({
              id: z.string().regex(/^dep_[0-9A-HJKMNP-TV-Z]{26}$/),
              dataType: z.enum([
                'company',
                'public',
                'third_party',
                'customer',
              ]),
              name: z.string(),
              structured: z.boolean().optional(),
              permissionBasis: z
                .enum([
                  'contractual',
                  'consent',
                  'legitimate_interest',
                  'licensed',
                  'public_domain',
                  'not_established',
                ])
                .optional(),
              onwardTransferTerms: z.string().optional(),
              permissionRenewalDate: z.string().optional(),
              expectedBookCoverage: z.number().optional(),
              ownerId: z.string().optional(),
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

export const schemas: any = {
  registerModel_Body,
  Cursor,
  Limit,
  ModelFamily,
  Problem,
  CandidateId,
  Touchpoint,
  ModelRegistration,
  ModelRegistrationListData,
  ResponseMeta,
  ModelRegistrationListResponse,
  ModelRegistrationCreate,
  ModelRegistrationResponse,
  DataType,
  RegisteredDataDependency,
  RegisteredDataDependencyListData,
  RegisteredDataDependencyListResponse,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/v1/registry/data-dependencies',
    alias: 'listDataDependencies',
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
        name: 'dataType',
        type: 'Query',
        schema: z
          .enum(['company', 'public', 'third_party', 'customer'])
          .optional(),
      },
      {
        name: 'permissionExpiringWithinDays',
        type: 'Query',
        schema: z.number().int().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^dep_[0-9A-HJKMNP-TV-Z]{26}$/),
                  dataType: z.enum([
                    'company',
                    'public',
                    'third_party',
                    'customer',
                  ]),
                  name: z.string(),
                  structured: z.boolean().optional(),
                  permissionBasis: z
                    .enum([
                      'contractual',
                      'consent',
                      'legitimate_interest',
                      'licensed',
                      'public_domain',
                      'not_established',
                    ])
                    .optional(),
                  onwardTransferTerms: z.string().optional(),
                  permissionRenewalDate: z.string().optional(),
                  expectedBookCoverage: z.number().optional(),
                  ownerId: z.string().optional(),
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
    method: 'get',
    path: '/v1/registry/models',
    alias: 'listModelRegistrations',
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
        name: 'modelFamily',
        type: 'Query',
        schema: z
          .enum([
            'speech_voice_recognition',
            'sentiment_detection',
            'recommendation_engine',
            'text_analytics_nlp',
            'pattern_anomaly_detection',
            'automatic_decision_management',
            'natural_language_generation',
            'object_detection',
            'biometrics',
          ])
          .optional(),
      },
      {
        name: 'unowned',
        type: 'Query',
        schema: z.boolean().optional(),
      },
    ],
    response: z
      .object({
        data: z
          .object({
            items: z.array(
              z
                .object({
                  id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
                  name: z.string(),
                  modelFamily: z.enum([
                    'speech_voice_recognition',
                    'sentiment_detection',
                    'recommendation_engine',
                    'text_analytics_nlp',
                    'pattern_anomaly_detection',
                    'automatic_decision_management',
                    'natural_language_generation',
                    'object_detection',
                    'biometrics',
                  ]),
                  ownerId: z.string(),
                  candidateIds: z
                    .array(z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/))
                    .optional(),
                  dataDependencyIds: z.array(z.string()).optional(),
                  conductGateReviewId: z.string().optional(),
                  touchpoints: z
                    .array(
                      z.enum([
                        'rating_factor',
                        'renewal_price',
                        'underwriting_acceptance',
                        'claims_decision',
                        'fraud_referral',
                        'reserving_input',
                        'marketing_targeting',
                        'none',
                      ])
                    )
                    .optional(),
                  inOwnRiskAndSolvencyScope: z.boolean().optional(),
                  registeredAt: z
                    .string()
                    .datetime({ offset: true })
                    .optional(),
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
    path: '/v1/registry/models',
    alias: 'registerModel',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: registerModel_Body,
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
            id: z.string().regex(/^mdl_[0-9A-HJKMNP-TV-Z]{26}$/),
            name: z.string(),
            modelFamily: z.enum([
              'speech_voice_recognition',
              'sentiment_detection',
              'recommendation_engine',
              'text_analytics_nlp',
              'pattern_anomaly_detection',
              'automatic_decision_management',
              'natural_language_generation',
              'object_detection',
              'biometrics',
            ]),
            ownerId: z.string(),
            candidateIds: z
              .array(z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/))
              .optional(),
            dataDependencyIds: z.array(z.string()).optional(),
            conductGateReviewId: z.string().optional(),
            touchpoints: z
              .array(
                z.enum([
                  'rating_factor',
                  'renewal_price',
                  'underwriting_acceptance',
                  'claims_decision',
                  'fraud_referral',
                  'reserving_input',
                  'marketing_targeting',
                  'none',
                ])
              )
              .optional(),
            inOwnRiskAndSolvencyScope: z.boolean().optional(),
            registeredAt: z.string().datetime({ offset: true }).optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
