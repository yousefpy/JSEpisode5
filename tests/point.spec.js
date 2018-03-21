/**************************
*
* THIS IS A TESTING FILE
*
* DO NOT MODIFY THIS FILE
*
***************************/

import test from 'ava';
import {Point} from '../bareed';

test.beforeEach(t => {
  t.context.point = new Point(4, 3);
});

test('should create a point instance with x and y coordinates', t => {
  let point = t.context.point;
  t.is(point.x, 4, `Expected point.x to be 4, got ${point.x} instead`);
  t.is(point.y, 3, `Expected point.y to be 3, got ${point.y} instead`);
});

test('should correctly calculate the distance between two points', t => {
  let point = t.context.point;
  let secondPoint = new Point(0, 0);
  let distance = point.distanceTo(secondPoint);
  t.is(distance, 5,
    `Expected the distance between (4,3) and (0,0) to be 5, got ${distance} instead`);
});
