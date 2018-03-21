/**************************
*
* THIS IS A TESTING FILE
*
* DO NOT MODIFY THIS FILE
*
***************************/

import test from 'ava';
import {Person, Point, Wallet} from '../bareed';

test.beforeEach(t => {
  t.context.person = new Person('Asis', 4, 3);
});

test('"new Person(\'Asis\', 4, 3)" should create a person instance named \'Asis\'', t => {
  let person = t.context.person;
  t.is(person.name, 'Asis',
    `Expected person.name to be 'Asis', got ${person.name} instead`);
});

test('"new Person(\'Asis\', 4, 3)" should create a person with location (4,3)', t => {
  let person = t.context.person;
  let expected = new Point(4, 3);
  t.deepEqual(person.location, expected,
    `Expected person.location to be ${JSON.stringify(expected)}, got ${JSON.stringify(person.location)} instead`);
});

test('should have a location which is a point instance', t => {
  let person = t.context.person;
  t.true(person.location instanceof Point, `Expected person.location to be a Point instance`);
});

test('should have a wallet which is a Wallet instance', t => {
  let person = t.context.person;
  t.true(person.wallet instanceof Wallet, `Expected person.wallet to be a Wallet instance`);
});

test('should have a wallet with no money', t => {
  let wallet = t.context.person.wallet;
  t.is(wallet.money, 0, `Expected person.wallet.money to be 0, got ${wallet.money} instead`);
});

test('"person.moveTo(newPoint)" should change the person\'s location to newPoint', t => {
  let person = t.context.person;
  let newPoint = new Point(12, 13);
  person.moveTo(newPoint);
  let newLocation = person.location;
  t.deepEqual(newLocation, newPoint,
    `Expected person.location to be ${JSON.stringify(newPoint)}, got ${JSON.stringify(newLocation)} instead`);
});
