import EventEmitter from '../../EventEmitter/EventEmitter';
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

  const model = new Model(new EventEmitter());

  beforeEach(() => {
    model.updateOptions(defaultOptions);
  });

  test('должна менять все валидные опции', () => {
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

  test('должна менять часть валидных опции', () => {
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

  test('должна менять значение from при получение позиции бегунка меньше минимума', () => {
    const elementPosition: IElementPosition = {
      position: { x: -1, y: 0 },
      type: 'from',
    };

    model.calculateValueUsingFraction(elementPosition);

    const { from } = model.getOptions();

    expect(from).toEqual(-100);
  });

  test('должна менять значение from при получение позиции бегунка больше минимума и меньше максимума', () => {
    const elementPosition: IElementPosition = {
      position: { x: 0.5, y: 0 },
      type: 'from',
    };

    model.calculateValueUsingFraction(elementPosition);

    const { from } = model.getOptions();

    expect(from).toEqual(0);
  });

  test('должна менять значение from при получение позиции бегунка больше to', () => {
    const elementPosition: IElementPosition = {
      position: { x: 0.9, y: 0 },
      type: 'from',
    };

    model.calculateValueUsingFraction(elementPosition);

    const { from } = model.getOptions();

    expect(from).toEqual(50);
  });

  test('должна менять значение from при получение позиции бегунка больше max', () => {
    const elementPosition: IElementPosition = {
      position: { x: 2, y: 0 },
      type: 'from',
    };

    model.calculateValueUsingFraction(elementPosition);

    const { from } = model.getOptions();

    expect(from).toEqual(50);
  });

  test('должна менять значение to при получение позиции бегунка больше max', () => {
    const elementPosition: IElementPosition = {
      position: { x: 2, y: 0 },
      type: 'to',
    };

    model.calculateValueUsingFraction(elementPosition);

    const { to } = model.getOptions();

    expect(to).toEqual(100);
  });

  test('должна менять значение to при получение позиции бегунка больше минимума и меньше максимума', () => {
    const elementPosition: IElementPosition = {
      position: { x: 0.8, y: 0 },
      type: 'to',
    };

    model.calculateValueUsingFraction(elementPosition);

    const { to } = model.getOptions();

    expect(to).toEqual(60);
  });

  test('должна менять значение to при получение позиции бегунка меньше from', () => {
    const elementPosition: IElementPosition = {
      position: { x: 0.1, y: 0 },
      type: 'to',
    };

    model.calculateValueUsingFraction(elementPosition);

    const { to } = model.getOptions();

    expect(to).toEqual(-50);
  });

  test('должна менять значение to при получение позиции бегунка меньше min', () => {
    const elementPosition: IElementPosition = {
      position: { x: -1, y: 0 },
      type: 'to',
    };

    model.calculateValueUsingFraction(elementPosition);

    const { to } = model.getOptions();

    expect(to).toEqual(-50);
  });

  test('должна менять значение to при получение позиции бегунка меньше from, если слайдер имеет один бегунок', () => {
    const options = {
      isRange: false,
    };

    model.updateOptions(options);

    const elementPosition: IElementPosition = {
      position: { x: -1, y: 0 },
      type: 'to',
    };

    model.calculateValueUsingFraction(elementPosition);

    const { to } = model.getOptions();

    expect(to).toEqual(-100);
  });

  test('должна не менять значение to при получение позиции бегунка отличающегося меньше чем на пол шага', () => {
    const elementPosition: IElementPosition = {
      position: { x: 0.77, y: 0 },
      type: 'to',
    };

    model.calculateValueUsingFraction(elementPosition);

    const { to } = model.getOptions();

    expect(to).toEqual(50);
  });

  test('должна менять значение to при получение позиции бегунка отличающегося больше чем на пол шага', () => {
    const elementPosition: IElementPosition = {
      position: { x: 0.78, y: 0 },
      type: 'to',
    };

    model.calculateValueUsingFraction(elementPosition);

    const { to } = model.getOptions();

    expect(to).toEqual(60);
  });

  test('должна менять значение to если это значение ближе к текущему to, чем текущие from', () => {
    model.updateNearValue(70);

    const { to } = model.getOptions();

    expect(to).toEqual(70);
  });

  test('должна менять значение from если это значение ближе к текущему from, чем текущие to', () => {
    model.updateNearValue(-30);

    const { from } = model.getOptions();

    expect(from).toEqual(-30);
  });
});
