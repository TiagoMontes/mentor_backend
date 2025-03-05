/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/src/tests/**/*.test.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    "^.+\\.ts?$": ["ts-jest", {}],
  },
  roots: ["<rootDir>/src/tests"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  clearMocks: true,
  testPathIgnorePatterns: ["<rootDir>/dist/"],
};
