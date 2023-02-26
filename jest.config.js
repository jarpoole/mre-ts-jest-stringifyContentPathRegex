const { defaults: tsjPreset } = require('ts-jest/presets')

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleFileExtensions: ['ts', 'js', 'txt'],
  transform: {
    ...tsjPreset.transform,
    '\\.txt$': [
      'ts-jest',
      {
        stringifyContentPathRegex: /\.txt$/,
      },
    ],
  },
};