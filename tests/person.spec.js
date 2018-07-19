/**************************
*
* THIS IS A TESTING FILE
*
* DO NOT MODIFY THIS FILE
*
***************************/

import { Person, Point, Wallet } from '../bareed';

beforeEach(() => {
  t.context.person = new Person('Asis', 4, 3);
});

test('"new Person(\'Asis\', 4, 3)" should create a person instance named \'Asis\'', () => {
  let person = t.context.person;
  expect(person.name).toBe('Asis');
});

test('"new Person(\'Asis\', 4, 3)" should create a person with location (4,3)', () => {
  let person = t.context.person;
  let expected = new Point(4, 3);
  expect(person.location).toEqual(expected);
});

test('should have a location which is a point instance', () => {
  let person = t.context.person;
  expect(person.location instanceof Point).toBe(true);
});

test('should have a wallet which is a Wallet instance', () => {
  let person = t.context.person;
  expect(person.wallet instanceof Wallet).toBe(true);
});

test('should have a wallet with no money', () => {
  let wallet = t.context.person.wallet;
  expect(wallet.money).toBe(0);
});

test('"person.moveTo(newPoint)" should change the person\'s location to newPoint', () => {
  let person = t.context.person;
  let newPoint = new Point(12, 13);
  person.moveTo(newPoint);
  let newLocation = person.location;
  expect(newLocation).toEqual(newPoint);
});
