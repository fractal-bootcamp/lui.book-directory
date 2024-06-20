import { beforeEach } from "node:test";
import { describe, it, expect, beforeAll } from "vitest";

describe("Check environment variables", () => {
  it("should fetch DATABASE_URL from .env.test", () => {
    const databaseUrl = process.env.DATABASE_URL;
    const expectedDatabaseUrl =
      "postgresql://dbuser:dbpassword1@localhost:10080/postgres";

    expect(databaseUrl).toBe(expectedDatabaseUrl);
  });
});
