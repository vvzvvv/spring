module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/__test__/**/*.test.js'],
  collectCoverageFrom: [
    'middleware/**/*.js',
    'controllers/**/*.js',
    'routes/**/*.js',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'models/test.js',
  ],
};
