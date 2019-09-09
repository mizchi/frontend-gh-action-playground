module.exports = {
  extends: [
    "eslint:recommended", // お好きなESLint設定をここに
    "plugin:prettier/recommended"
  ],
  env: {
    browser: true,
    node: true,
    jest: true
  },
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error"
  }
};
