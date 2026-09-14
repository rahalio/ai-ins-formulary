# @formulary/openapi-core

OpenAPI contracts for Formulary.

## Domains

| API | Root |
|-----|------|
| identity | `src/identity.yaml` |
| candidates | `src/candidates.yaml` |
| readiness | `src/readiness.yaml` |
| gates | `src/gates.yaml` |
| investment | `src/investment.yaml` |
| registry | `src/registry.yaml` |
| benefits | `src/benefits.yaml` |
| portfolio | `src/portfolio.yaml` |

Shared: `src/common/` (envelopes, security, problem, formulary-primitives).

## Commands

```bash
pnpm lint:domains
pnpm bundle:domains
```

**Rule:** Every domain YAML maps to DDD layers (`core` → `services` → `adapters` → `api-server`). After routine YAML edits, regenerate **core only** and handwrite lower layers (see `ddd-codegen` / `ddd-formulary` skills).
