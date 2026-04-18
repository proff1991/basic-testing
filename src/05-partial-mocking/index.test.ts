import { afterAll, describe, expect, jest, test } from '@jest/globals';
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  // spread slower than Object.assign
  return Object.assign({}, jest.requireActual<typeof import('./index')>('./index'), {
    mockOne: jest.fn(),
    mockTwo: jest.fn(),
    mockThree: jest.fn(),
  });
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    var consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    mockOne();
    mockTwo();
    mockThree();

    expect(mockOne).toHaveBeenCalledTimes(1);
    expect(mockTwo).toHaveBeenCalledTimes(1);
    expect(mockThree).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    var consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined);

    unmockedFunction();

    expect(consoleLogSpy).toHaveBeenCalledTimes(1);
    expect(consoleLogSpy).toHaveBeenCalledWith('I am not mocked');
  });
});