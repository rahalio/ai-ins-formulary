/**
 * Investment Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/investment.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CandidateStage = components["schemas"]["CandidateStage"];
export type ExpectedBenefit = components["schemas"]["ExpectedBenefit"];
export type Formula = components["schemas"]["Formula"];
export type FormulaDataDependency = components["schemas"]["FormulaDataDependency"];
export type Functionality = components["schemas"]["Functionality"];
export type FunctionalitySpec = components["schemas"]["FunctionalitySpec"];
export type InvestmentDecision = components["schemas"]["InvestmentDecision"];
export type InvestmentDecisionCreate = components["schemas"]["InvestmentDecisionCreate"];
export type KillCriterion = components["schemas"]["KillCriterion"];
export type NeedStatement = components["schemas"]["NeedStatement"];
export type UseCaseCandidate = components["schemas"]["UseCaseCandidate"];
export type ValueChainStep = components["schemas"]["ValueChainStep"];
export type ValuePosition = components["schemas"]["ValuePosition"];
export type KillReviewRequest = components["schemas"]["KillReviewRequest"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type ApproveInvestmentRequestInput = NonNullable<operations["approveInvestment"]["requestBody"]>["content"]["application/json"];
export type ReviewKillCriteriaRequestInput = NonNullable<operations["reviewKillCriteria"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ApproveInvestmentParams = operations["approveInvestment"]["parameters"]["path"];
export type ReviewKillCriteriaParams = operations["reviewKillCriteria"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ApproveInvestmentResponse = operations["approveInvestment"]["responses"]["201"]["content"]["application/json"];
export type ReviewKillCriteriaResponse = operations["reviewKillCriteria"]["responses"]["200"]["content"]["application/json"];


