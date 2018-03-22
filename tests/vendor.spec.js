/**************************
*
* THIS IS A TESTING FILE
*
* DO NOT MODIFY THIS FILE
*
***************************/

import test from 'ava';
import {Vendor, Customer, Person, Point, Wallet} from '../bareed';

test.beforeEach(t => {
  t.context.vendor = new Vendor('Asis', 4, 3);
});

test('should be a subclass of Person', t => {
  let vendor = t.context.vendor;
  t.true(vendor instanceof Person, 'Expected vendor to be a subclass of Person');
});

test('should inherit name, location and wallet from Person', t => {
  let vendor = t.context.vendor;
  let expectedLocation = new Point(4, 3);
  t.is(vendor.name, 'Asis',
    `Expected vendor.name to be 'Asis', got ${vendor.name} instead`);
  t.deepEqual(vendor.location, expectedLocation,
    `Expected vendor.location to be ${JSON.stringify(expectedLocation)}, got ${JSON.stringify(vendor.location)} instead`);
  t.true(vendor.location instanceof Point, `Expected vendor.location to be a Point instance`);
  t.true(vendor.wallet instanceof Wallet, `Expected vendor.wallet to be a Wallet instance`);
  t.is(vendor.wallet.money, 0, `Expected vendor.wallet.money to be 0, got ${vendor.wallet.money} instead`);
});

test('should inherit moveTo from Person', t => {
  let vendor = t.context.vendor;
  let newPoint = new Point(12, 13);
  vendor.moveTo(newPoint);
  let newLocation = vendor.location;
  t.deepEqual(newLocation, newPoint,
    `Expected vendor.location to be ${JSON.stringify(newPoint)}, got ${JSON.stringify(newLocation)} instead`);
});

test('should have a range initially set to 5', t => {
  let vendor = t.context.vendor;
  t.is(vendor.range, 5, `Expected vendor.range to be 5, got ${vendor.range} instead`)
});

test('should have a price initially set to 1', t => {
  let vendor = t.context.vendor;
  t.is(vendor.price, 1, `Expected vendor.price to be 1, got ${vendor.price} instead`)
});

test('sellTo(customer, number) should move the vendor to the customer location', t => {
  let vendor = t.context.vendor;
  let customer = new Customer('Hamsa', 0, 0);
  vendor.sellTo(customer, 1);
  t.deepEqual(vendor.location, customer.location, `Expected the vendor to move to ${JSON.stringify(customer.location)}, instead vendor is at ${JSON.stringify(vendor.location)}`);
});

test('sellTo(customer, number) should transfer money from the customer wallet to the vendor wallet', t => {
  let vendor = t.context.vendor;
  let newPrice = Math.floor(Math.random() * 100);
  let vendorMoney = Math.floor(Math.random() * 100);
  vendor.price = newPrice;
  vendor.wallet.money = vendorMoney;

  let customer = new Customer('Hamsa', 0, 0);
  let numberOfIceCreams = Math.floor(Math.random() * 10);
  let expectedCost = numberOfIceCreams * newPrice;
  let customerMoney = Math.floor(expectedCost + Math.random() * 100);
  customer.wallet.money = customerMoney;
  vendor.sellTo(customer, numberOfIceCreams);

  let expectedCustomerMoney = customerMoney - expectedCost;
  let expectedVendorMoney = vendorMoney + expectedCost;

  t.is(vendor.wallet.money, expectedVendorMoney, `The vendor starts with ${vendorMoney} in their wallet. Expected the vendor to have ${expectedVendorMoney} in their wallet after selling ${numberOfIceCreams} ice creams at ${newPrice}/ice cream, instead vendor has ${vendor.wallet.money} in their wallet`);

  t.is(customer.wallet.money, expectedCustomerMoney, `The customer starts with ${customerMoney} in their wallet. Expected the customer to have ${expectedCustomerMoney} in their wallet after buying ${numberOfIceCreams} ice creams at ${newPrice}/ice cream, instead customer has ${customer.wallet.money} in their wallet`);
});
