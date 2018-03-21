/**************************
*
* THIS IS A TESTING FILE
*
* DO NOT MODIFY THIS FILE
*
***************************/

import test from 'ava';
import {Wallet} from '../bareed';

test.beforeEach(t => {
  t.context.wallet = new Wallet(10);
});

test('"new Wallet()" should create a wallet instance with zero money', t => {
  let wallet = new Wallet();
  t.is(wallet.money, 0, `Expected wallet.money to be 0, got ${wallet.money} instead`);
});

test('"new Wallet(x)" should create a wallet instance with x money', t => {
  let wallet = t.context.wallet;
  t.is(wallet.money, 10, `Expected wallet.money to be 10, got ${wallet.money} instead`);
});

test('should be able to add money using credit()', t => {
  let wallet = t.context.wallet;
  let amount = 5;
  wallet.credit(5);
  t.is(wallet.money, 15,
    `Expected wallet.money to be 15, got ${wallet.money} instead`);
});

test('should be able to remove money using debit()', t => {
  let wallet = t.context.wallet;
  let amount = 5;
  wallet.debit(5);
  t.is(wallet.money, 5,
    `Expected wallet.money to be 5, got ${wallet.money} instead`);
});
