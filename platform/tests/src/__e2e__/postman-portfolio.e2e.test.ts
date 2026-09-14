/**
 * Postman-collection 1:1 Vitest tests for portfolio (generated)
 *
 * One it() = one API request. Add sample data to vars for e2e runs.
 * Run: pnpm test:e2e or pnpm test:suite:db
 * Requires: API server at baseUrl (default http://localhost:3000)
 */

import { describe, it, expect } from "vitest";

const vars: Record<string, string> = {
  baseUrl: "http://localhost:3000",
  orgId: "test-org",
  accessToken: "",
  cursor: "",
  limit: "",
  period: "",
  sourceIndustry: "",
};

function sub(s: string): string {
  return s.replace(/\{\{([^}]+)\}\}/g, (_, k) => vars[k.trim()] ?? "");
}

describe("Postman / portfolio (1:1 generated)", () => {

  it("getPortfolioBalance", async () => {
    const url = sub("{{baseUrl}}/v1/portfolio/balance?period={{period}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("getCommitteePack", async () => {
    const url = sub("{{baseUrl}}/v1/portfolio/committee-pack?period={{period}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("listAnalogueCases", async () => {
    const url = sub("{{baseUrl}}/v1/portfolio/analogues?cursor={{cursor}}&limit={{limit}}&sourceIndustry={{sourceIndustry}}");
    const res = await fetch(url, {
      method: "GET",
      headers: vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {},
    });
    expect(res.status).toBe(200);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });

  it("recordAnalogueCase", async () => {
    const url = sub("{{baseUrl}}/v1/portfolio/analogues");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(vars.accessToken ? { Authorization: `Bearer ${vars.accessToken}` } : {}) },
      body: sub("{\n  \"sourceOrganisation\": \"\",\n  \"sourceIndustry\": \"\",\n  \"reportedResult\": \"\",\n  \"underlyingFormula\": \"\",\n  \"transferAssumption\": \"\",\n  \"insuranceTranslation\": \"\"\n}"),
    });
    expect(res.status).toBe(201);
    const j = await res.json(); expect(j).toHaveProperty("data");
  });
});
