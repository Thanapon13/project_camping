import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  testMatch: [
    "**/__tests__/**/*.test.ts",
    "**/__tests__/**/*.test.tsx",
  ],
  coverageProvider: "v8",
  collectCoverageFrom: [
    "src/utils/schemas.ts",
    "src/utils/create-error.ts",
    "src/lib/utils.ts",
  ],
};

export default createJestConfig(config);
