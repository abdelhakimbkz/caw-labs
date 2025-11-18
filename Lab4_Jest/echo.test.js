const exf = require('./echo');

describe('exf function', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('prints "echo" 5 times', () => {
    exf("echo", 5);
    expect(consoleSpy).toHaveBeenCalledTimes(5);
    expect(consoleSpy).toHaveBeenCalledWith("echo");
  });

  test('prints "JS from server" 3 times', () => {
    exf("JS from server", 3);
    expect(consoleSpy).toHaveBeenCalledTimes(3);
    expect(consoleSpy).toHaveBeenCalledWith("JS from server");
  });
});
