import { describe, it, expect } from "vitest";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

describe("Check environment variables", () => {
  it("should fetch DATABASE_URL from .env.test", () => {
    const databaseUrl = process.env.DATABASE_URL;
    const expectedDatabaseUrl =
      "postgresql://dbuser:dbpassword1@localhost:10080/postgres"; // Replace this with the actual value in your .env.test

    expect(databaseUrl).toBe(expectedDatabaseUrl);
  });
});
