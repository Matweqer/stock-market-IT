module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-return-await': 'off',
    'import/prefer-default-export': 'off',
    'no-console': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'import/no-cycle': 'off',
  },
};
