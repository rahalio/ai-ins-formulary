import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const approveInvestment_Body = z
  .object({
    decision: z.enum(['approved', 'deferred', 'rejected']),
    approvedAmount: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    firstReleaseScope: z.string().optional(),
    expectedBenefit: z
      .object({
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
      .passthrough()
      .optional(),
    killCriteria: z
      .array(
        z
          .object({
            description: z.string(),
            measure: z.string(),
            threshold: z.number().optional(),
            met: z.boolean().optional(),
          })
          .passthrough()
      )
      .min(1),
    killDecisionDate: z.string(),
    approvedBy: z.string().optional(),
  })
  .passthrough();
const reviewKillCriteria_Body = z
  .object({
    reviewerId: z.string(),
    outcome: z.enum(['continue', 'kill', 'criteria_not_yet_testable']),
    metCriteria: z.array(z.string()).optional(),
    rationale: z.string().optional(),
  })
  .passthrough();
const CandidateId = z.string();
const Money = z
  .object({ amount: z.number(), currency: z.string() })
  .passthrough();
const ExpectedBenefit = z
  .object({
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
const KillCriterion = z
  .object({
    description: z.string(),
    measure: z.string(),
    threshold: z.number().optional(),
    met: z.boolean().optional(),
  })
  .passthrough();
const InvestmentDecisionCreate = z
  .object({
    decision: z.enum(['approved', 'deferred', 'rejected']),
    approvedAmount: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    firstReleaseScope: z.string().optional(),
    expectedBenefit: z
      .object({
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
      .passthrough()
      .optional(),
    killCriteria: z
      .array(
        z
          .object({
            description: z.string(),
            measure: z.string(),
            threshold: z.number().optional(),
            met: z.boolean().optional(),
          })
          .passthrough()
      )
      .min(1),
    killDecisionDate: z.string(),
    approvedBy: z.string().optional(),
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
const InvestmentDecision = z
  .object({
    id: z.string().regex(/^inv_[0-9A-HJKMNP-TV-Z]{26}$/),
    candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
    decision: z.enum(['approved', 'deferred', 'rejected']),
    approvedAmount: z
      .object({ amount: z.number(), currency: z.string() })
      .passthrough(),
    firstReleaseScope: z.string().optional(),
    firstReleaseWithinSmallStartLimit: z.boolean().optional(),
    expectedBenefit: z
      .object({
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
      .passthrough()
      .optional(),
    killCriteria: z
      .array(
        z
          .object({
            description: z.string(),
            measure: z.string(),
            threshold: z.number().optional(),
            met: z.boolean().optional(),
          })
          .passthrough()
      )
      .min(1)
      .optional(),
    killDecisionDate: z.string().optional(),
    approvedBy: z.string().optional(),
    decidedAt: z.string().datetime({ offset: true }).optional(),
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
const InvestmentDecisionResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^inv_[0-9A-HJKMNP-TV-Z]{26}$/),
        candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
        decision: z.enum(['approved', 'deferred', 'rejected']),
        approvedAmount: z
          .object({ amount: z.number(), currency: z.string() })
          .passthrough(),
        firstReleaseScope: z.string().optional(),
        firstReleaseWithinSmallStartLimit: z.boolean().optional(),
        expectedBenefit: z
          .object({
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
          .passthrough()
          .optional(),
        killCriteria: z
          .array(
            z
              .object({
                description: z.string(),
                measure: z.string(),
                threshold: z.number().optional(),
                met: z.boolean().optional(),
              })
              .passthrough()
          )
          .min(1)
          .optional(),
        killDecisionDate: z.string().optional(),
        approvedBy: z.string().optional(),
        decidedAt: z.string().datetime({ offset: true }).optional(),
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
const KillReviewRequest = z
  .object({
    reviewerId: z.string(),
    outcome: z.enum(['continue', 'kill', 'criteria_not_yet_testable']),
    metCriteria: z.array(z.string()).optional(),
    rationale: z.string().optional(),
  })
  .passthrough();
const ValueChainStep = z.enum([
  'product_development',
  'marketing_and_sales',
  'underwriting_and_risk_rating',
  'customer_servicing',
  'claims_management',
  'financial_assets',
  'operations',
]);
const CandidateStage = z.enum([
  'submitted',
  'formula_accepted',
  'readiness_assessment',
  'conduct_gate',
  'awaiting_investment',
  'in_delivery',
  'live',
  'benefit_close',
  'killed',
  'closed',
]);
const Functionality = z.enum(['inform', 'recommend', 'decide']);
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
const FunctionalitySpec = z
  .object({
    functionality: z.enum(['inform', 'recommend', 'decide']),
    description: z.string(),
    modelFamilies: z
      .array(
        z.enum([
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
      )
      .optional(),
    humanReviewRequired: z.boolean().optional(),
  })
  .passthrough();
const DataType = z.enum(['company', 'public', 'third_party', 'customer']);
const FormulaDataDependency = z
  .object({
    id: z.string(),
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
  })
  .passthrough();
const NeedStatement = z
  .object({
    audience: z.enum(['internal_customer', 'external_customer']),
    needCategory: z.enum([
      'product',
      'communication',
      'operations',
      'cost',
      'convenience',
      'resources',
    ]),
    statement: z.string(),
  })
  .passthrough();
const Formula = z
  .object({
    functionalitySpec: z
      .object({
        functionality: z.enum(['inform', 'recommend', 'decide']),
        description: z.string(),
        modelFamilies: z
          .array(
            z.enum([
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
          )
          .optional(),
        humanReviewRequired: z.boolean().optional(),
      })
      .passthrough(),
    dataDependencies: z
      .array(
        z
          .object({
            id: z.string(),
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
          })
          .passthrough()
      )
      .min(1),
    need: z
      .object({
        audience: z.enum(['internal_customer', 'external_customer']),
        needCategory: z.enum([
          'product',
          'communication',
          'operations',
          'cost',
          'convenience',
          'resources',
        ]),
        statement: z.string(),
      })
      .passthrough(),
    statement: z.string().optional(),
  })
  .passthrough();
const ValueQuadrant = z.enum([
  'operations_efficacy',
  'customer_efficacy',
  'operations_discovery',
  'customer_discovery',
]);
const ValuePosition = z
  .object({
    resultType: z.enum(['known', 'unknown']),
    impactType: z.enum(['bottom_line', 'top_line']),
    quadrant: z.enum([
      'operations_efficacy',
      'customer_efficacy',
      'operations_discovery',
      'customer_discovery',
    ]),
    rationale: z.string().optional(),
    assignedBy: z.string().optional(),
  })
  .passthrough();
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
const UseCaseCandidate = z
  .object({
    id: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
    title: z.string(),
    sponsorId: z.string(),
    valueChainStep: z
      .enum([
        'product_development',
        'marketing_and_sales',
        'underwriting_and_risk_rating',
        'customer_servicing',
        'claims_management',
        'financial_assets',
        'operations',
      ])
      .optional(),
    stage: z.enum([
      'submitted',
      'formula_accepted',
      'readiness_assessment',
      'conduct_gate',
      'awaiting_investment',
      'in_delivery',
      'live',
      'benefit_close',
      'killed',
      'closed',
    ]),
    formula: z
      .object({
        functionalitySpec: z
          .object({
            functionality: z.enum(['inform', 'recommend', 'decide']),
            description: z.string(),
            modelFamilies: z
              .array(
                z.enum([
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
              )
              .optional(),
            humanReviewRequired: z.boolean().optional(),
          })
          .passthrough(),
        dataDependencies: z
          .array(
            z
              .object({
                id: z.string(),
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
              })
              .passthrough()
          )
          .min(1),
        need: z
          .object({
            audience: z.enum(['internal_customer', 'external_customer']),
            needCategory: z.enum([
              'product',
              'communication',
              'operations',
              'cost',
              'convenience',
              'resources',
            ]),
            statement: z.string(),
          })
          .passthrough(),
        statement: z.string().optional(),
      })
      .passthrough(),
    valuePosition: z
      .object({
        resultType: z.enum(['known', 'unknown']),
        impactType: z.enum(['bottom_line', 'top_line']),
        quadrant: z.enum([
          'operations_efficacy',
          'customer_efficacy',
          'operations_discovery',
          'customer_discovery',
        ]),
        rationale: z.string().optional(),
        assignedBy: z.string().optional(),
      })
      .passthrough()
      .optional(),
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
    extendsExistingAutomation: z.boolean().optional(),
    baselineReference: z.string().optional(),
    analogueCaseIds: z.array(z.string()).optional(),
    submittedAt: z.string().datetime({ offset: true }).optional(),
    killDecisionDate: z.string().optional(),
    createdAt: z.string().datetime({ offset: true }).optional(),
    updatedAt: z.string().datetime({ offset: true }).optional(),
  })
  .passthrough();
const UseCaseCandidateResponse = z
  .object({
    data: z
      .object({
        id: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
        title: z.string(),
        sponsorId: z.string(),
        valueChainStep: z
          .enum([
            'product_development',
            'marketing_and_sales',
            'underwriting_and_risk_rating',
            'customer_servicing',
            'claims_management',
            'financial_assets',
            'operations',
          ])
          .optional(),
        stage: z.enum([
          'submitted',
          'formula_accepted',
          'readiness_assessment',
          'conduct_gate',
          'awaiting_investment',
          'in_delivery',
          'live',
          'benefit_close',
          'killed',
          'closed',
        ]),
        formula: z
          .object({
            functionalitySpec: z
              .object({
                functionality: z.enum(['inform', 'recommend', 'decide']),
                description: z.string(),
                modelFamilies: z
                  .array(
                    z.enum([
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
                  )
                  .optional(),
                humanReviewRequired: z.boolean().optional(),
              })
              .passthrough(),
            dataDependencies: z
              .array(
                z
                  .object({
                    id: z.string(),
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
                  })
                  .passthrough()
              )
              .min(1),
            need: z
              .object({
                audience: z.enum(['internal_customer', 'external_customer']),
                needCategory: z.enum([
                  'product',
                  'communication',
                  'operations',
                  'cost',
                  'convenience',
                  'resources',
                ]),
                statement: z.string(),
              })
              .passthrough(),
            statement: z.string().optional(),
          })
          .passthrough(),
        valuePosition: z
          .object({
            resultType: z.enum(['known', 'unknown']),
            impactType: z.enum(['bottom_line', 'top_line']),
            quadrant: z.enum([
              'operations_efficacy',
              'customer_efficacy',
              'operations_discovery',
              'customer_discovery',
            ]),
            rationale: z.string().optional(),
            assignedBy: z.string().optional(),
          })
          .passthrough()
          .optional(),
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
        extendsExistingAutomation: z.boolean().optional(),
        baselineReference: z.string().optional(),
        analogueCaseIds: z.array(z.string()).optional(),
        submittedAt: z.string().datetime({ offset: true }).optional(),
        killDecisionDate: z.string().optional(),
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
  approveInvestment_Body,
  reviewKillCriteria_Body,
  CandidateId,
  Money,
  ExpectedBenefit,
  KillCriterion,
  InvestmentDecisionCreate,
  Problem,
  InvestmentDecision,
  ResponseMeta,
  InvestmentDecisionResponse,
  KillReviewRequest,
  ValueChainStep,
  CandidateStage,
  Functionality,
  ModelFamily,
  FunctionalitySpec,
  DataType,
  FormulaDataDependency,
  NeedStatement,
  Formula,
  ValueQuadrant,
  ValuePosition,
  Touchpoint,
  UseCaseCandidate,
  UseCaseCandidateResponse,
};

const endpoints = makeApi([
  {
    method: 'post',
    path: '/v1/candidates/:candidateId/investment',
    alias: 'approveInvestment',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: approveInvestment_Body,
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
            id: z.string().regex(/^inv_[0-9A-HJKMNP-TV-Z]{26}$/),
            candidateId: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
            decision: z.enum(['approved', 'deferred', 'rejected']),
            approvedAmount: z
              .object({ amount: z.number(), currency: z.string() })
              .passthrough(),
            firstReleaseScope: z.string().optional(),
            firstReleaseWithinSmallStartLimit: z.boolean().optional(),
            expectedBenefit: z
              .object({
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
              .passthrough()
              .optional(),
            killCriteria: z
              .array(
                z
                  .object({
                    description: z.string(),
                    measure: z.string(),
                    threshold: z.number().optional(),
                    met: z.boolean().optional(),
                  })
                  .passthrough()
              )
              .min(1)
              .optional(),
            killDecisionDate: z.string().optional(),
            approvedBy: z.string().optional(),
            decidedAt: z.string().datetime({ offset: true }).optional(),
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
        status: 409,
        description: `Idempotency key reuse with different body, or state conflict`,
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
    path: '/v1/candidates/:candidateId/kill-review',
    alias: 'reviewKillCriteria',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: reviewKillCriteria_Body,
      },
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
            id: z.string().regex(/^can_[0-9A-HJKMNP-TV-Z]{26}$/),
            title: z.string(),
            sponsorId: z.string(),
            valueChainStep: z
              .enum([
                'product_development',
                'marketing_and_sales',
                'underwriting_and_risk_rating',
                'customer_servicing',
                'claims_management',
                'financial_assets',
                'operations',
              ])
              .optional(),
            stage: z.enum([
              'submitted',
              'formula_accepted',
              'readiness_assessment',
              'conduct_gate',
              'awaiting_investment',
              'in_delivery',
              'live',
              'benefit_close',
              'killed',
              'closed',
            ]),
            formula: z
              .object({
                functionalitySpec: z
                  .object({
                    functionality: z.enum(['inform', 'recommend', 'decide']),
                    description: z.string(),
                    modelFamilies: z
                      .array(
                        z.enum([
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
                      )
                      .optional(),
                    humanReviewRequired: z.boolean().optional(),
                  })
                  .passthrough(),
                dataDependencies: z
                  .array(
                    z
                      .object({
                        id: z.string(),
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
                      })
                      .passthrough()
                  )
                  .min(1),
                need: z
                  .object({
                    audience: z.enum([
                      'internal_customer',
                      'external_customer',
                    ]),
                    needCategory: z.enum([
                      'product',
                      'communication',
                      'operations',
                      'cost',
                      'convenience',
                      'resources',
                    ]),
                    statement: z.string(),
                  })
                  .passthrough(),
                statement: z.string().optional(),
              })
              .passthrough(),
            valuePosition: z
              .object({
                resultType: z.enum(['known', 'unknown']),
                impactType: z.enum(['bottom_line', 'top_line']),
                quadrant: z.enum([
                  'operations_efficacy',
                  'customer_efficacy',
                  'operations_discovery',
                  'customer_discovery',
                ]),
                rationale: z.string().optional(),
                assignedBy: z.string().optional(),
              })
              .passthrough()
              .optional(),
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
            extendsExistingAutomation: z.boolean().optional(),
            baselineReference: z.string().optional(),
            analogueCaseIds: z.array(z.string()).optional(),
            submittedAt: z.string().datetime({ offset: true }).optional(),
            killDecisionDate: z.string().optional(),
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
]);

export const api: any = new Zodios(
  'https://api.ddd-codegen-starter.local/v1',
  endpoints
);

export function createApiClient(baseUrl: string, options?: ZodiosOptions): any {
  return new Zodios(baseUrl, endpoints, options);
}
