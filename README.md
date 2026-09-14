# Formulary

OpenAPI-first DDD monorepo for the **Formulary** product — a governed register for insurance AI use-case investment (formula intake, gated pipeline, booked-benefit close).

Product specs (root): [PRODUCT.md](./PRODUCT.md) · [USER_STORIES.md](./USER_STORIES.md) · [WEBAPP.md](./WEBAPP.md)

> Root [`openapi.yaml`](./openapi.yaml) is **superseded**. Author contracts under `packages/openapi-core/src/`.

## Package scope

`@formulary/*`

## Domains

| Domain | OpenAPI | Role |
|--------|---------|------|
| `identity` | `identity.yaml` | API keys, operators, auth stubs |
| `candidates` | `candidates.yaml` | Formula intake, value map, adjacency |
| `readiness` | `readiness.yaml` | Data-readiness verdicts, blockers |
| `gates` | `gates.yaml` | Conduct / actuarial gate, feature risk |
| `investment` | `investment.yaml` | Funding, kill criteria |
| `registry` | `registry.yaml` | Production models + data dependencies |
| `benefits` | `benefits.yaml` | Benefit claims + finance close |
| `portfolio` | `portfolio.yaml` | Balance, committee pack, analogues |

## Layout

```
packages/openapi-core  →  packages/core  →  platform/services  →  platform/adapters  →  platform/api-server
         ↑ OpenAPI source of truth                              ports↑        impl↑              HTTP↑
platform/webapp  → Vite + React console (WEBAPP.md)
```

## Quick start

```bash
pnpm install
pnpm lint:openapi && pnpm bundle:openapi
pnpm codegen:paths
pnpm --filter @formulary/core build
pnpm --filter @formulary/services build
pnpm --filter @formulary/adapters build
pnpm dev:api
# Health: curl http://127.0.0.1:4000/health
# Demo key: X-API-Key: formulary_demo_local_dev_key

pnpm dev:web
# http://127.0.0.1:5173 (proxies /v1 and /v0 to the API)
```

Optional Dynamo Local (when moving off in-memory sandbox adapters):

```bash
docker compose up -d
TABLE_NAME=formulary-core-local AWS_ENDPOINT_URL=http://localhost:8000 node scripts/ensure-dynamo-table.mjs
```

## Codegen rules (agents)

1. **New domain** → full multi-layer generate once (Mode A), then hand-fit DI / sandbox adapters.
2. **YAML edit on existing domain** → bundle → regenerate **core only** → handwrite services / adapters / api-server / webapp (Mode B).
3. Keep envelopes (`{ data, meta }`), nested DI, and identity middleware intact.
4. Config: `.codegen/.zero-codegen-merged.json` — always run `pnpm codegen:paths` after clone.

See `.cursor/skills/` and [docs/CODEGEN.md](./docs/CODEGEN.md).
