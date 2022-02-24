import helpers from './helpers';

describe('Функция isNumber', () => {
  const { isNumber } = helpers;

  test('должна возвращать false на не число или строку которая не может стать валидным числом', () => {
    const testValues = ['', 'test', undefined, true, false, NaN, Infinity, null];

    testValues.forEach((value) => {
      expect(false).toEqual(isNumber(value));
    });
  });

  test('должна возвращать true на число или строку которая может стать валидным числом', () => {
    const testValues = ['4', ' 676', 998];

    testValues.forEach((value) => {
      expect(true).toEqual(isNumber(value));
    });
  });
});
