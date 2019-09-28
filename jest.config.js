module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json'],
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // testMatch: [
  //   '<rootDir>/(tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
  // ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
