const reactNativePreset = require('@react-native/jest-preset');

module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '^expo-secure-store$': '<rootDir>/__mocks__/expo-secure-store.js',
  },
  transform: {
    ...reactNativePreset.transform,
    '^.+\\.jsx$': 'babel-jest',
  },
};
