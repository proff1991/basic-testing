import { describe, expect, test } from '@jest/globals';
import { simpleCalculator, Action } from './index';

var validCases: Array<{
  description: string;
  input: {
    a: number;
    b: number;
    action: Action;
  };
  expected: number;
}> = [
  {
    description: 'add two numbers',
    input: { a: 345, b: 678, action: Action.Add },
    expected: 1023,
  },
  {
    description: 'subtract two numbers',
    input: { a: 987, b: 432, action: Action.Subtract },
    expected: 555,
  },
  {
    description: 'multiply two numbers',
    input: { a: 123, b: 456, action: Action.Multiply },
    expected: 56088,
  },
  {
    description: 'divide two numbers',
    input: { a: 864, b: 108, action: Action.Divide },
    expected: 8,
  },
  {
    description: 'exponentiate two numbers',
    input: { a: 11, b: 3, action: Action.Exponentiate },
    expected: 1331,
  },
];

var invalidCases: Array<{
  description: string;
  input: {
    a: unknown;
    b: unknown;
    action: unknown;
  };
  expected: null;
}> = [
  {
    description: 'return null for invalid action',
    input: { a: 345, b: 678, action: '%' },
    expected: null,
  },
  {
    description: 'return null for invalid arguments',
    input: { a: '345', b: 678, action: Action.Add },
    expected: null,
  },
];

describe('simpleCalculator table tests', () => {
  test.each(validCases)('should $description', ({ input, expected }) => {
    expect(simpleCalculator(input)).toBe(expected);
  });

  test.each(invalidCases)('should $description', ({ input, expected }) => {
    expect(simpleCalculator(input)).toBe(expected);
  });
});