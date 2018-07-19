/**************************
*
* THIS IS A TESTING FILE
*
* DO NOT MODIFY THIS FILE
*
***************************/

import { Point } from '../bareed';

beforeEach(() => {
  t.context.point = new Point(4, 3);
});

test('"new Point(x, y)" should create a point instance with x and y coordinates', () => {
  let point = t.context.point;
  expect(point.x).toBe(4);
  expect(point.y).toBe(3);
});

test('should correctly calculate the distance between two points', () => {
  let point = t.context.point;
  let secondPoint = new Point(0, 0);
  let distance = point.distanceTo(secondPoint);
  expect(distance).toBe(5);
});
