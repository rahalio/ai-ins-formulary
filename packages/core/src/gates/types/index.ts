/**
 * Gates Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/gates.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type ConductGateDecision = components["schemas"]["ConductGateDecision"];
export type ConductGateReview = components["schemas"]["ConductGateReview"];
export type ConductGateReviewCreate = components["schemas"]["ConductGateReviewCreate"];
export type FeatureRiskFinding = components["schemas"]["FeatureRiskFinding"];
export type FeatureRiskFindingCreate = components["schemas"]["FeatureRiskFindingCreate"];
export type ReviewId = components["schemas"]["ReviewId"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type OpenConductGateReviewRequestInput = NonNullable<operations["openConductGateReview"]["requestBody"]>["content"]["application/json"];
export type DecideConductGateRequestInput = NonNullable<operations["decideConductGate"]["requestBody"]>["content"]["application/json"];
export type RaiseFeatureRiskFindingRequestInput = NonNullable<operations["raiseFeatureRiskFinding"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type OpenConductGateReviewParams = operations["openConductGateReview"]["parameters"]["path"];
export type DecideConductGateParams = operations["decideConductGate"]["parameters"]["path"];
export type RaiseFeatureRiskFindingParams = operations["raiseFeatureRiskFinding"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type OpenConductGateReviewResponse = operations["openConductGateReview"]["responses"]["201"]["content"]["application/json"];
export type DecideConductGateResponse = operations["decideConductGate"]["responses"]["200"]["content"]["application/json"];
export type RaiseFeatureRiskFindingResponse = operations["raiseFeatureRiskFinding"]["responses"]["201"]["content"]["application/json"];


