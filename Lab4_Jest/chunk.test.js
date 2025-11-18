const chunk = require('./chunk');

test('chunk array into size 2', () => {
  expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
});

test('chunk array into size larger than array', () => {
  expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
});

test('chunk empty array', () => {
  expect(chunk([], 2)).toEqual([]);
});
