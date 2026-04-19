import { afterEach, beforeAll, afterAll, describe, expect, jest, test } from '@jest/globals';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { join } from 'path';

jest.mock('path', () => ({
  join: jest.fn(),
}));

jest.mock('fs', () => ({
  existsSync: jest.fn(),
}));

jest.mock('fs/promises', () => ({
  readFile: jest.fn(),
}));

import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const callback = jest.fn();
    const setTimeoutSpy = jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(callback, 1837);

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy).toHaveBeenCalledWith(callback, 1837);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 2645);

    jest.advanceTimersByTime(2644);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const callback = jest.fn();
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    doStuffByInterval(callback, 3719);

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy).toHaveBeenCalledWith(callback, 3719);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 1456);

    jest.advanceTimersByTime(1456 * 3);

    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call join with pathToFile', async () => {
    const pathToFile = 'nested/file.txt';

    (join as unknown as jest.Mock).mockReturnValue('/mocked/root/nested/file.txt');
    (existsSync as unknown as jest.Mock).mockReturnValue(false);

    await readFileAsynchronously(pathToFile);

    expect(join).toHaveBeenCalledTimes(1);
    expect(join).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    (join as unknown as jest.Mock).mockReturnValue('/mocked/root/missing.txt');
    (existsSync as unknown as jest.Mock).mockReturnValue(false);

    await expect(readFileAsynchronously('missing.txt')).resolves.toBeNull();
    expect(readFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    (join as unknown as jest.Mock).mockReturnValue('/mocked/root/existing.txt');
    (existsSync as unknown as jest.Mock).mockReturnValue(true);
    (readFile as unknown as jest.Mock).mockImplementation(() =>
      Promise.resolve(Buffer.from('Mocked file content')),
    );

    await expect(readFileAsynchronously('existing.txt')).resolves.toBe('Mocked file content');
    expect(readFile).toHaveBeenCalledTimes(1);
    expect(readFile).toHaveBeenCalledWith('/mocked/root/existing.txt');
  });
});