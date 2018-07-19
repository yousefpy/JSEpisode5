/**************************
*
* THIS IS A TESTING FILE
*
* DO NOT MODIFY THIS FILE
*
***************************/

import { Vendor, Customer, Person, Point, Wallet } from '../bareed';

beforeEach(() => {
  t.context.vendor = new Vendor('Asis', 4, 3);
});

test('should be a subclass of Person', () => {
  let vendor = t.context.vendor;
  expect(vendor instanceof Person).toBe(true);
});

test('should inherit name, location and wallet from Person', () => {
  let vendor = t.context.vendor;
  let expectedLocation = new Point(4, 3);
  expect(vendor.name).toBe('Asis');
  expect(vendor.location).toEqual(expectedLocation);
  expect(vendor.location instanceof Point).toBe(true);
  expect(vendor.wallet instanceof Wallet).toBe(true);
  expect(vendor.wallet.money).toBe(0);
});

test('should inherit moveTo from Person', () => {
  let vendor = t.context.vendor;
  let newPoint = new Point(12, 13);
  vendor.moveTo(newPoint);
  let newLocation = vendor.location;
  expect(newLocation).toEqual(newPoint);
});

test('should have a range initially set to 5', () => {
  let vendor = t.context.vendor;
  expect(vendor.range).toBe(5)
});

test('should have a price initially set to 1', () => {
  let vendor = t.context.vendor;
  expect(vendor.price).toBe(1)
});

test('sellTo(customer, number) should move the vendor to the customer location', () => {
  let vendor = t.context.vendor;
  let customer = new Customer('Hamsa', 0, 0);
  vendor.sellTo(customer, 1);
  expect(vendor.location).toEqual(customer.location);
});

test('sellTo(customer, number) should transfer money from the customer wallet to the vendor wallet', () => {
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

  expect(vendor.wallet.money).toBe(expectedVendorMoney);

  expect(customer.wallet.money).toBe(expectedCustomerMoney);
});
