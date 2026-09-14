/**
 * Portfolio Domain Types
 *
 * Auto-generated from OpenAPI spec
 * Generator: types-generator v2.0.0
 *
 * This file re-exports types from generated OpenAPI types and adds
 * convenient type aliases for handlers (response types, etc.)
 *
 * ⚠️ DO NOT EDIT MANUALLY - this file is auto-generated
 */

import type { components, operations } from "../openapi/portfolio.openapi.types";

// ============================================================================
// Domain Types Export - Domain-specific types only (excludes components/operations)
// ============================================================================
// This file exports domain-specific types for use in main index.ts
// components and operations are NOT exported here to avoid duplicate export errors
// Access components/operations via namespace: domain.types.components

// ============================================================================
// Convenient Type Aliases for Schemas
// ============================================================================

export type AnalogueCase = components["schemas"]["AnalogueCase"];
export type AnalogueCaseCreate = components["schemas"]["AnalogueCaseCreate"];
export type AnalogueCaseListData = components["schemas"]["AnalogueCaseListData"];
export type CommitteePack = components["schemas"]["CommitteePack"];
export type DataBlocker = components["schemas"]["DataBlocker"];
export type PortfolioBalance = components["schemas"]["PortfolioBalance"];
export type Analogue = operations["listAnalogueCases"]["responses"]["200"]["content"]["application/json"]["data"];


// ============================================================================
// Operation Input Types (Request Bodies)
// ============================================================================

// These types represent the input data for create/update operations

export type RecordAnalogueCaseRequestInput = NonNullable<operations["recordAnalogueCase"]["requestBody"]>["content"]["application/json"];


// ============================================================================
// Operation Parameter Types (Query/Path Parameters)
// ============================================================================

// These types represent parameters for operations without request bodies.
// Aligned with get_input_schema_or_type_name for consistent naming across generators.

export type GetPortfolioBalanceParams = NonNullable<operations["getPortfolioBalance"]["parameters"]["query"]>;
export type GetCommitteePackParams = NonNullable<operations["getCommitteePack"]["parameters"]["query"]>;
export type ListAnalogueCasesParams = NonNullable<operations["listAnalogueCases"]["parameters"]["query"]>;


// ============================================================================
// Operation Response Types
// ============================================================================

// These types are used by handlers for type-safe response envelopes

export type GetPortfolioBalanceResponse = operations["getPortfolioBalance"]["responses"]["200"]["content"]["application/json"];
export type GetCommitteePackResponse = operations["getCommitteePack"]["responses"]["200"]["content"]["application/json"];
export type ListAnalogueCasesResponse = operations["listAnalogueCases"]["responses"]["200"]["content"]["application/json"];
export type RecordAnalogueCaseResponse = operations["recordAnalogueCase"]["responses"]["201"]["content"]["application/json"];


