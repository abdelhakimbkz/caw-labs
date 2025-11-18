const last = require('./last');

test('last element if n is null', () => {
  expect(last([1, 2, 3])).toBe(3);
});

test('last 2 elements of array', () => {
  expect(last([1, 2, 3], 2)).toEqual([2, 3]);
});

test('return empty array if array is null', () => {
  expect(last(null, 2)).toEqual([]);
});
