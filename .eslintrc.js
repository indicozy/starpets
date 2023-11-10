export default {
  env: {
    browser: true,
    es2021: true,
  },
  extends: "standard-with-typescript",
  overrides: [
    {
      ignorePatterns: [".eslintrc.js"],
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/semi": "off",
  },
};
