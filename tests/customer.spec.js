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
  t.context.customer = new Customer('Asis', 4, 3);
});

test('should be a subclass of Person', t => {
  let customer = t.context.customer;
  t.true(customer instanceof Person, 'Expected customer to be a subclass of Person');
});

test('should inherit name, location and wallet from Person', t => {
  let customer = t.context.customer;
  let expectedLocation = new Point(4, 3);
  t.is(customer.name, 'Asis',
    `Expected customer.name to be 'Asis', got ${customer.name} instead`);
  t.deepEqual(customer.location, expectedLocation,
    `Expected customer.location to be ${JSON.stringify(expectedLocation)}, got ${JSON.stringify(customer.location)} instead`);
  t.true(customer.location instanceof Point, `Expected customer.location to be a Point instance`);
  t.true(customer.wallet instanceof Wallet, `Expected customer.wallet to be a Wallet instance`);
});

test('should have 10 in the wallet by default', t => {
  let customer = t.context.customer;
  t.is(customer.wallet.money, 10, `Expected customer.wallet.money to be 10, got ${customer.wallet.money} instead`);
});

test('should inherit moveTo from Person', t => {
  let customer = t.context.customer;
  let newPoint = new Point(12, 13);
  customer.moveTo(newPoint);
  let newLocation = customer.location;
  t.deepEqual(newLocation, newPoint,
    `Expected customer.location to be ${JSON.stringify(newPoint)}, got ${JSON.stringify(newLocation)} instead`);
});

test('_isInRange(vendor) should return a boolean indicating if the customer is in the vendor\'s range', t => {
  let customer = t.context.customer;
  let vendor = new Vendor('Hamsa', 0, 0);

  for(let i = 0; i < 10; i++) {
    customer.location = Point.randomPoint();
    vendor.location = Point.randomPoint();
    let distance = vendor.location.distanceTo(customer.location);
    let expectedResponse = Math.random() > 0.5;
    vendor.range = distance + Math.random() * (expectedResponse ? 10 : -10);
    t[expectedResponse](customer._isInRange(vendor),
      `The customer at ${JSON.stringify(customer.location)} is ${distance} away from the vendor at ${JSON.stringify(customer.location)} with range ${vendor.range}. Expected _isInRange to return ${expectedResponse}, instead got ${!expectedResponse}`);
  }
});

test('_haveEnoughMoney(vendor, numberOfIceCreams) should return a boolean indicating if the customer has enough money to buy the specified number of ice creams from the vendor', t => {
  let customer = t.context.customer;
  let vendor = new Vendor('Hamsa', 0, 0);

  for(let i = 0; i < 10; i++) {
    let numberOfIceCreams = Math.floor(Math.random() * 100);
    let newPrice = Math.floor(Math.random() * 10);
    let cost = numberOfIceCreams * newPrice;
    let expectedResponse = Math.random() > 0.5;

    vendor.price = newPrice;
    customer.wallet.money = cost + Math.random() * (expectedResponse ? 10 : -10);
    t[expectedResponse](customer._haveEnoughMoney(vendor, numberOfIceCreams),
      `The customer has ${customer.wallet.money} and requests to buy ${numberOfIceCreams} ice creams from a vendor that sells them at ${newPrice}/ice cream at a total cost of ${cost}. Expected _haveEnoughMoney to return ${expectedResponse}, instead got ${!expectedResponse}`);
  }
});

test('requestIceCream(vendor, number) should NOT work if customer is out of range', t => {
  let customer = t.context.customer;
  let vendor = new Vendor('Hamsa', 1000, 1000);
  let originalLocation = new Point(1000, 1000);
  customer.requestIceCream(vendor, 1);

  t.deepEqual(vendor.location, originalLocation, `Expected the vendor to stay in their original location of ${JSON.stringify(originalLocation)}, instead vendor is at ${JSON.stringify(vendor.location)}`);

  t.is(vendor.wallet.money, 0, `Expected the vendor to still only have 0 in their wallet, instead vendor has ${vendor.wallet.money} in their wallet`);

  t.is(customer.wallet.money, 10, `Expected the customer to still have 10 in their wallet, instead customer has ${customer.wallet.money} in their wallet`);
});

test('requestIceCream(vendor, number) should NOT work if customer doesn\'t have enough money', t => {
  let customer = t.context.customer;
  let vendor = new Vendor('Hamsa', 1000, 1000);
  let originalLocation = new Point(1000, 1000);
  customer.wallet.money = 0;
  customer.requestIceCream(vendor, 1);

  t.deepEqual(vendor.location, originalLocation, `Expected the vendor to stay in their original location of ${JSON.stringify(originalLocation)}, instead vendor is at ${JSON.stringify(vendor.location)}`);

  t.is(vendor.wallet.money, 0, `Expected the vendor to still only have 0 in their wallet, instead vendor has ${vendor.wallet.money} in their wallet`);

  t.is(customer.wallet.money, 0, `Expected the customer to still have 0 in their wallet, instead customer has ${customer.wallet.money} in their wallet`);
});

test('requestIceCream(vendor, number) should work if the customer has enough money and is in range of the vendor', t => {
  let customer = t.context.customer;
  let vendor = new Vendor('Hamsa', 4, 3);

  let newPrice = Math.floor(Math.random() * 100);
  let vendorMoney = Math.floor(Math.random() * 100);
  vendor.price = newPrice;
  vendor.wallet.money = vendorMoney;

  let numberOfIceCreams = Math.floor(Math.random() * 10);
  let expectedCost = numberOfIceCreams * newPrice;
  let customerMoney = Math.floor(expectedCost + Math.random() * 100);
  customer.wallet.money = customerMoney;

  let expectedCustomerMoney = customerMoney - expectedCost;
  let expectedVendorMoney = vendorMoney + expectedCost;

  customer.requestIceCream(vendor, numberOfIceCreams);

  t.deepEqual(vendor.location, customer.location, `Expected the vendor to move to ${JSON.stringify(customer.location)}, instead vendor is at ${JSON.stringify(vendor.location)}`);

  t.is(vendor.wallet.money, expectedVendorMoney, `The vendor starts with ${vendorMoney} in their wallet. Expected the vendor to have ${expectedVendorMoney} in their wallet after selling ${numberOfIceCreams} ice creams at ${newPrice}/ice cream, instead vendor has ${vendor.wallet.money} in their wallet`);

  t.is(customer.wallet.money, expectedCustomerMoney, `The customer starts with ${customerMoney} in their wallet. Expected the customer to have ${expectedCustomerMoney} in their wallet after buying ${numberOfIceCreams} ice creams at ${newPrice}/ice cream, instead customer has ${customer.wallet.money} in their wallet`);
});
