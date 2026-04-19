import { describe, expect, test } from '@jest/globals';
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([173, 284, 395])).toStrictEqual({
      value: 173,
      next: {
        value: 284,
        next: {
          value: 395,
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([481, 592, 613])).toMatchInlineSnapshot(`
      {
        "next": {
          "next": {
            "next": {
              "next": null,
              "value": null,
            },
            "value": 613,
          },
          "value": 592,
        },
        "value": 481,
      }
    `);
  });
});