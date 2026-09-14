/**
 * Readiness Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/readiness.openapi.types";

// ============================================================================
// Re-export all generated types
// ============================================================================
// Note: components and operations are exported here but should be accessed via namespace
// in main index.ts to avoid duplicate export errors (e.g., blockchain.types.components)

export type { components, operations };


// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type DataBlocker = components["schemas"]["DataBlocker"];
export type DataBlockerListData = components["schemas"]["DataBlockerListData"];
export type DataReadinessVerdict = components["schemas"]["DataReadinessVerdict"];
export type DataReadinessVerdictCreate = components["schemas"]["DataReadinessVerdictCreate"];
export type DependencyAssessment = components["schemas"]["DependencyAssessment"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type IssueDataReadinessVerdictRequestInput = NonNullable<operations["issueDataReadinessVerdict"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type IssueDataReadinessVerdictParams = operations["issueDataReadinessVerdict"]["parameters"]["path"];
export type GetDataReadinessVerdictParams = operations["getDataReadinessVerdict"]["parameters"]["path"];
export type ListDataBlockersParams = NonNullable<operations["listDataBlockers"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type IssueDataReadinessVerdictResponse = operations["issueDataReadinessVerdict"]["responses"]["201"]["content"]["application/json"];
export type GetDataReadinessVerdictResponse = operations["getDataReadinessVerdict"]["responses"]["200"]["content"]["application/json"];
export type ListDataBlockersResponse = operations["listDataBlockers"]["responses"]["200"]["content"]["application/json"];


