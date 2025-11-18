const { mean } = require('./notation');
require('./fileImport');

describe('fileImport console output', () => {
  let consoleSpy;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('prints mean of scores1', () => {
    const scores1 = [10, 40, 150, 200];
    const result = mean(scores1);
    console.log("Moyen scores1:", result);
    expect(consoleSpy).toHaveBeenCalledWith("Moyen scores1:", result);
  });

  test('prints mean of scores2', () => {
    const scores2 = [70, 79, 75, 72, 73];
    const result = mean(scores2);
    console.log("Moyen scores2:", result);
    expect(consoleSpy).toHaveBeenCalledWith("Moyen scores2:", result);
  });
});
