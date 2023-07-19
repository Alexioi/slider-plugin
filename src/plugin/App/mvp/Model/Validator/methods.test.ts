import {
  verifyMinAndMax,
  verifyFromAndTo,
  verifyStep,
  calculateFrom,
  calculateTo,
  makeNumber,
} from './methods';

describe('validate method', () => {
  it('makeNumber should return number if value is not number', () => {
    expect(makeNumber(2, 'k.1')).toEqual(2);
    expect(makeNumber(2, '')).toEqual(2);
    expect(makeNumber(2, false)).toEqual(2);
    expect(makeNumber(2, undefined)).toEqual(2);
    expect(makeNumber(2, NaN)).toEqual(2);
    expect(makeNumber(2, null)).toEqual(2);
  });

  it('makeNumber should return value if value is number', () => {
    expect(makeNumber(3, '3.1')).toEqual(3.1);
    expect(makeNumber(3, '-3')).toEqual(-3);
  });

  it('verifyMinAndMax should return old min and max if new min and max equal undefined', () => {
    expect(verifyMinAndMax({ min: 1, max: 2 })).toEqual({ min: 1, max: 2 });
  });

  it(`verifyMinAndMax should return newMin and newMax 
  that is one more than the low if new min and max equal undefined`, () => {
    expect(verifyMinAndMax({ min: 1, max: 2 })).toEqual({ min: 1, max: 2 });
  });
});
