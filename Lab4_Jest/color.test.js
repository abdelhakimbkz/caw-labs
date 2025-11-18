const myColor = require('./color');

test('toString() joins with commas', () => {
  expect(myColor.toString()).toBe("Red,Green,White,Black");
});

test('join() joins with commas by default', () => {
  expect(myColor.join()).toBe("Red,Green,White,Black");
});

test('join("") joins without separator', () => {
  expect(myColor.join('')).toBe("RedGreenWhiteBlack");
});
