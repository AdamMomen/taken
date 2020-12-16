module.exports = {
  overrides: [{
    files: ["__mocks__/**/*.ts"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-function": "off",
    },
  }, ],
};