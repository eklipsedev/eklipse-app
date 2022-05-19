module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    // Required for certain syntax usages
    "ecmaVersion": 2021,
    "sourceType": "module"
  },
  extends: [
    "eslint:recommended",
  ],
  rules: {
    quotes: ["error", "double"],
  },
};
