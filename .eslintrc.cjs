module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: ["eslint:recommended", "airbnb-base"],
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    requireConfigFile: false,
  },
  rules: {
    "max-len": ["error", { code: 100 }],
    "object-property-newline": "error",
    quotes: ["error", "double"],
    "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
    "no-param-reassign": [0],
  },
};
