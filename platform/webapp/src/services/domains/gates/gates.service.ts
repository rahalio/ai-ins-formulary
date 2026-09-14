/**
 * gates service — network boundary.
 * Prefer app/api.ts for v1 shell; replace with typed client later.
 */
export const gatesService = {
  async health(): Promise<boolean> {
    return true;
  },
};
