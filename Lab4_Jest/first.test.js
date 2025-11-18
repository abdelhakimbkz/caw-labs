const first = require('./first');

test('first element if n is null', () => {
  expect(first([1, 2, 3])).toBe(1);
});

test('first 2 elements of array', () => {
  expect(first([1, 2, 3], 2)).toEqual([1, 2]);
});

test('return empty array if n = 0', () => {
  expect(first([1, 2, 3], 0)).toEqual([]);
});

test('return empty array if array is null', () => {
  expect(first(null, 2)).toEqual([]);
});
