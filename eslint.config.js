import { nextJsConfig } from "@repo/eslint-config/next-js";

/** @type {import("eslint").Linter.Config} */
const config = {
  ...nextJsConfig,
  rules: {
    ...nextJsConfig.rules,
    "@typescript-eslint/no-explicit-any": "off",
  },
};

export default config;
