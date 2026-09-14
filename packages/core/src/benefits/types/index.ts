/**
 * Benefits Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/benefits.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type BenefitClaim = components["schemas"]["BenefitClaim"];
export type BenefitClaimCreate = components["schemas"]["BenefitClaimCreate"];
export type BenefitClose = components["schemas"]["BenefitClose"];
export type BenefitCloseCreate = components["schemas"]["BenefitCloseCreate"];
export type ClaimId = components["schemas"]["ClaimId"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type ClaimBenefitRequestInput = NonNullable<operations["claimBenefit"]["requestBody"]>["content"]["application/json"];
export type CloseBenefitWithFinanceRequestInput = NonNullable<operations["closeBenefitWithFinance"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type CloseBenefitWithFinanceParams = operations["closeBenefitWithFinance"]["parameters"]["path"];


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type ClaimBenefitResponse = operations["claimBenefit"]["responses"]["201"]["content"]["application/json"];
export type CloseBenefitWithFinanceResponse = operations["closeBenefitWithFinance"]["responses"]["200"]["content"]["application/json"];


