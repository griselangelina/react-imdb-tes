module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/mocks/fileMock.js',
    '\\.(css|s?css)$': '<rootDir>/test/mocks/styleMock.js',
  },
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest',
  },
  collectCoverage: true,
  coverageDirectory: 'coverage',
  roots: ['./__tests__'],
  coverageThreshold: {
    global: {
      branches: 78,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  transformIgnorePatterns: ['node_modules/(?!(mathletics-portal-communication-service))'],
  setupFiles: ['./test/setupTest'],
};
