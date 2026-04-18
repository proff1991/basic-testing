import { describe, expect, test } from '@jest/globals';
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 345, b: 678, action: Action.Add })).toBe(1023);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 987, b: 432, action: Action.Subtract })).toBe(555);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 123, b: 456, action: Action.Multiply })).toBe(56088);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 864, b: 108, action: Action.Divide })).toBe(8);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 11, b: 3, action: Action.Exponentiate })).toBe(1331);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 345, b: 678, action: '%' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '345', b: 678, action: Action.Add })).toBeNull();
  });
});