/**
 * Candidates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/candidates.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type CandidateStage = components["schemas"]["CandidateStage"];
export type Formula = components["schemas"]["Formula"];
export type FormulaDataDependency = components["schemas"]["FormulaDataDependency"];
export type Functionality = components["schemas"]["Functionality"];
export type FunctionalitySpec = components["schemas"]["FunctionalitySpec"];
export type NeedStatement = components["schemas"]["NeedStatement"];
export type UseCaseCandidate = components["schemas"]["UseCaseCandidate"];
export type UseCaseCandidateCreate = components["schemas"]["UseCaseCandidateCreate"];
export type UseCaseCandidateListData = components["schemas"]["UseCaseCandidateListData"];
export type ValueChainStep = components["schemas"]["ValueChainStep"];
export type ValuePosition = components["schemas"]["ValuePosition"];
export type ValuePositionCreate = components["schemas"]["ValuePositionCreate"];
export type Candidate = operations["listUseCaseCandidates"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type SubmitUseCaseCandidateRequestInput = NonNullable<operations["submitUseCaseCandidate"]["requestBody"]>["content"]["application/json"];
export type SetValuePositionRequestInput = NonNullable<operations["setValuePosition"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type ListUseCaseCandidatesParams = NonNullable<operations["listUseCaseCandidates"]["parameters"]["query"]>;
export type GetUseCaseCandidateParams = operations["getUseCaseCandidate"]["parameters"]["path"];
export type SetValuePositionParams = operations["setValuePosition"]["parameters"]["path"];
export type GetAdjacentUseCasesParams = operations["getAdjacentUseCases"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ListUseCaseCandidatesResponse = operations["listUseCaseCandidates"]["responses"]["200"]["content"]["application/json"];
export type SubmitUseCaseCandidateResponse = operations["submitUseCaseCandidate"]["responses"]["201"]["content"]["application/json"];
export type GetUseCaseCandidateResponse = operations["getUseCaseCandidate"]["responses"]["200"]["content"]["application/json"];
export type SetValuePositionResponse = operations["setValuePosition"]["responses"]["200"]["content"]["application/json"];
export type GetAdjacentUseCasesResponse = operations["getAdjacentUseCases"]["responses"]["200"]["content"]["application/json"];


