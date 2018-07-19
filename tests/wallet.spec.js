/**************************
*
* THIS IS A TESTING FILE
*
* DO NOT MODIFY THIS FILE
*
***************************/

import { Wallet } from '../bareed';

beforeEach(() => {
  t.context.wallet = new Wallet(10);
});

test('"new Wallet()" should create a wallet instance with zero money', () => {
  let wallet = new Wallet();
  expect(wallet.money).toBe(0);
});

test('"new Wallet(x)" should create a wallet instance with x money', () => {
  let wallet = t.context.wallet;
  expect(wallet.money).toBe(10);
});

test('should be able to add money using credit()', () => {
  let wallet = t.context.wallet;
  let amount = 5;
  wallet.credit(5);
  expect(wallet.money).toBe(15);
});

test('should be able to remove money using debit()', () => {
  let wallet = t.context.wallet;
  let amount = 5;
  wallet.debit(5);
  expect(wallet.money).toBe(5);
});
