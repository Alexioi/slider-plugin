import { getScalePercents } from './methods';

describe('Scale methods', () => {
  it('getScalePercents should return true array', () => {
    expect(getScalePercents(801)).toEqual([
      0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100,
    ]);
    expect(getScalePercents(501)).toEqual([0, 20, 40, 60, 80, 100]);
    expect(getScalePercents(301)).toEqual([0, 33, 66, 100]);
    expect(getScalePercents(101)).toEqual([0, 100]);
  });
});
