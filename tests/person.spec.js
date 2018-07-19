/**************************
 *
 * THIS IS A TESTING FILE
 *
 * DO NOT MODIFY THIS FILE
 *
 ***************************/

import { Person, Point, Wallet } from "../bareed";

let person;

beforeEach(() => {
  person = new Person("Asis", 4, 3);
});

describe("new Person('Asis', 4, 3)", () => {
  test("creates a person instance named", () => {
    expect(person.name).toBe("Asis");
  });

  test("has a location which is a point instance", () => {
    expect(person.location instanceof Point).toBe(true);
  });

  test("has a wallet which is a Wallet instance", () => {
    expect(person.wallet instanceof Wallet).toBe(true);
  });

  test("creates a person with location (4,3)", () => {
    let expected = new Point(4, 3);
    expect(person.location).toEqual(expected);
  });

  test("has a wallet with no money", () => {
    expect(person.wallet.money).toBe(0);
  });

  test("has a moveTo(newPoint) method changes the person's location to newPoint", () => {
    let newPoint = new Point(12, 13);
    person.moveTo(newPoint);
    let newLocation = person.location;
    expect(newLocation).toEqual(newPoint);
  });
});
