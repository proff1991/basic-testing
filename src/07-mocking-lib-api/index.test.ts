import { beforeEach, describe, expect, jest, test } from '@jest/globals';

jest.mock('lodash', () => ({
  throttle: jest.fn((fn) => fn),
}));

jest.mock('axios');

import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const mockedAxios = axios as jest.Mocked<typeof axios>;
const getMock = jest.fn<(relativePath: string) => Promise<{ data: unknown }>>();

describe('throttledGetDataFromApi', () => {
  beforeEach(() => {
    mockedAxios.create.mockReturnValue({ get: getMock } as never);
  });

  test('should create instance with provided base url', async () => {
    getMock.mockResolvedValue({ data: { ok: true } });

    await throttledGetDataFromApi('/users');

    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    getMock.mockResolvedValue({ data: { ok: true } });

    await throttledGetDataFromApi('/posts/7');

    expect(getMock).toHaveBeenCalledWith('/posts/7');
  });

  test('should return response data', async () => {
    var responseData = { id: 713, title: 'Lorem ipsum' };
    getMock.mockResolvedValue({ data: responseData });

    await expect(throttledGetDataFromApi('/posts/713')).resolves.toEqual(responseData);
  });
});