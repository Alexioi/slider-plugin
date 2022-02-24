import EventEmitter from '../EventEmitter/EventEmitter';
import Model from './model';

describe('Модель', () => {
  const defaultOptions = {
    isRange: true,
    isVertical: false,
    hasTip: true,
    hasScale: true,
    step: 10,
    min: -100,
    max: 100,
    from: -50,
    to: 50,
  };

  const model = new Model(defaultOptions, new EventEmitter());

  beforeEach(() => {
    model.updateOptions(defaultOptions);
  });

  test('должна изменять все валидные опции', () => {
    const options = {
      isRange: false,
      isVertical: true,
      hasTip: false,
      hasScale: false,
      step: 15,
      min: -100,
      max: 1000,
      from: 400,
      to: 700,
    };

    model.updateOptions(options);

    const newOptions = model.getOptions();

    expect(newOptions).toEqual(options);
  });

  test('должна изменять часть валидных опции', () => {
    const options = {
      isRange: false,
      max: 700,
    };

    model.updateOptions(options);

    const { isRange, max } = model.getOptions();

    expect(isRange).toEqual(options.isRange);
    expect(max).toEqual(options.max);
  });

  test('должна менять только валидные данные', () => {
    const options = {
      isRange: 'false',
      isVertical: 1,
      hasTip: '',
      hasScale: true,
      step: 15,
      min: true,
      max: '',
      from: 'f',
      to: 70,
    };
    // @ts-ignore
    model.updateOptions(options);

    const { isRange, isVertical, hasScale, hasTip, step, max, min, to, from } = model.getOptions();

    expect(isRange).not.toEqual(options.isRange);
    expect(isVertical).not.toEqual(options.isVertical);
    expect(hasTip).not.toEqual(options.hasTip);
    expect(hasScale).toEqual(options.hasScale);
    expect(step).toEqual(options.step);
    expect(min).not.toEqual(options.min);
    expect(max).not.toEqual(options.max);
    expect(from).not.toEqual(options.from);
    expect(to).toEqual(options.to);
  });

  // test('should not update min if new min > max', () => {
  //   model.updateOptions({ min: 200 });

  //   const { min } = model.getOptions();

  //   expect(min).toEqual(-100);
  // });

  // test('should not update min if new min > new max and new min > max', () => {
  //   model.updateOptions({ min: 200, max: 100 });

  //   const { min, max } = model.getOptions();

  //   expect(min).toEqual(-100);
  //   expect(max).toEqual(100);
  // });

  // test('should update from by a fraction of the maximum length', () => {
  //   model.calculateValueUsingFraction({ x: 0.31, y: 0.31 });

  //   const { from, to } = model.getOptions();

  //   expect(from).toEqual(-40);
  //   expect(to).toEqual(50);
  // });

  // test('should update to by a fraction of the maximum length', () => {
  //   model.calculateValueUsingFraction({ x: 0.79, y: 0.79 });

  //   const { from, to } = model.getOptions();

  //   expect(from).toEqual(-50);
  //   expect(to).toEqual(60);
  // });

  // test('should be updated from if to closer from the passed value than to', () => {
  //   model.updateNearValue(-20);

  //   const { from, to } = model.getOptions();

  //   expect(from).toEqual(-20);
  //   expect(to).toEqual(50);
  // });

  // test('should be updated to if to closer to the passed value than from', () => {
  //   model.updateNearValue(20);

  //   const { from, to } = model.getOptions();

  //   expect(from).toEqual(-50);
  //   expect(to).toEqual(20);
  // });

  // test('should be updated to if isRange = false', () => {
  //   model.updateOptions({ isRange: false });
  //   model.updateNearValue(-100);

  //   const { from, to } = model.getOptions();

  //   expect(from).toEqual(-50);
  //   expect(to).toEqual(-100);
  // });
});
