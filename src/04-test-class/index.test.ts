import { describe, expect, jest, test } from '@jest/globals';
import lodash from 'lodash';
import {
  getBankAccount
  , InsufficientFundsError
  , SynchronizationFailedError
  , TransferFailedError
} from './index';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(getBankAccount(7351824).getBalance()).toBe(7351824);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => getBankAccount(4200000).withdraw(4200001)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => getBankAccount(3500000).transfer(3500001, getBankAccount(2000000))).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(5100000);

    expect(() => account.transfer(1000000, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    expect(getBankAccount(2500000).deposit(1750000).getBalance()).toBe(4250000);
  });

  test('should withdraw money', () => {
    expect(getBankAccount(9000000).withdraw(2750000).getBalance()).toBe(6250000);
  });

  test('should transfer money', () => {
    const fromAccount = getBankAccount(8000000);
    const toAccount = getBankAccount(1500000);

    fromAccount.transfer(3250000, toAccount);

    expect([fromAccount.getBalance(), toAccount.getBalance()]).toEqual([4750000, 4750000]);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValueOnce(7420000).mockReturnValueOnce(1);

    await expect(getBankAccount(1000000).fetchBalance()).resolves.toBe(7420000);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(3000000);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(8880000);

    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(8880000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(3000000);

    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});