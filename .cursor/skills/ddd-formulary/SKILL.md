---
name: ddd-formulary
description: >-
  Formulary product domain map, OpenAPI locations, sandbox adapters, and webapp
  IA. Use when working on formulary insurance AI use-case register domains,
  PRODUCT/WEBAPP specs, or @formulary packages.
---

# Formulary product skill

## Specs

- [PRODUCT.md](../../../PRODUCT.md) — PRD / BR-1–BR-12
- [USER_STORIES.md](../../../USER_STORIES.md)
- [WEBAPP.md](../../../WEBAPP.md) — pharmacy-style register UI

Root `openapi.yaml` is superseded. Edit domain YAML under `packages/openapi-core/src/`.

## Domains (`@formulary/*`)

| Domain | Prefix | Paths |
|--------|--------|-------|
| identity | `idn` / `key` / `tnt` | `/v0/tenants/me/...` |
| candidates | `can` | `/v1/candidates` |
| readiness | `rdy` | `/v1/candidates/{id}/readiness`, `/v1/readiness/data-blockers` |
| gates | `gat` | `/v1/candidates/{id}/conduct-gate`, `/v1/conduct-gate-reviews/...` |
| investment | `inv` | `/v1/candidates/{id}/investment`, `.../kill-review` |
| registry | `mdl` / `dep` | `/v1/registry/models`, `/v1/registry/data-dependencies` |
| benefits | `ben` | `/v1/benefits/claims` |
| portfolio | `ptf` | `/v1/portfolio/balance`, `committee-pack`, `analogues` |

## Local runtime

- Demo API key: `formulary_demo_local_dev_key`
- Candidates + portfolio list/create/balance currently use **in-memory sandbox** adapters under `platform/adapters/src/_shared/formulary-sandbox-store.ts` (DDB stubs until x-dynamodb metadata generates full repos).
- Webapp: `platform/webapp` — Vite proxy to API; shell IA matches WEBAPP.md nav.

## Codegen

- Config: `.codegen/.zero-codegen-merged.json` (`package_scope: @formulary`)
- After YAML edit: `pnpm bundle:openapi` → `pnpm codegen:core` → handwrite lower layers
- Mode A (new domain only): full `generate --domain X --skip-build`
