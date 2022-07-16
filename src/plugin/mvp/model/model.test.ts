import EventEmitter from '../../EventEmitter/EventEmitter';
import Model from './model';
import { IElementPosition } from '../../types/types';

describe('Модель', () => {
  const defaultOptions = {
    isRange: true,
    isVertical: false,
    hasTip: true,
    hasScale: true,
    step: 10,
    min: -100,
    max: 100,
    values: [-50, 50],
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
      values: [400, 700],
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
      values: ['f', 70],
    };
    // @ts-ignore
    model.updateOptions(options);

    const { isRange, isVertical, hasScale, hasTip, step, max, min, values } = model.getOptions();

    expect(isRange).not.toEqual(options.isRange);
    expect(isVertical).not.toEqual(options.isVertical);
    expect(hasTip).not.toEqual(options.hasTip);
    expect(hasScale).toEqual(options.hasScale);
    expect(step).toEqual(options.step);
    expect(min).not.toEqual(options.min);
    expect(max).not.toEqual(options.max);
    expect(values[0]).not.toEqual(options.values[0]);
    expect(values[1]).toEqual(options.values[1]);
  });

  test('должна менять значение from при получение позиции бегунка меньше минимума', () => {
    const elementPosition: IElementPosition = {
      position: -1,
      valueIndex: 0,
    };

    model.calculateValueUsingFraction(elementPosition);

    const { values } = model.getOptions();

    expect(values[0]).toEqual(-100);
  });

  test('должна менять значение from при получение позиции бегунка больше минимума и меньше максимума', () => {
    const elementPosition: IElementPosition = {
      position: 0.5,
      valueIndex: 0,
    };

    model.calculateValueUsingFraction(elementPosition);

    const { values } = model.getOptions();

    expect(values[0]).toEqual(0);
  });

  test('должна менять значение from при получение позиции бегунка больше to', () => {
    const elementPosition: IElementPosition = {
      position: 0.9,
      valueIndex: 0,
    };

    model.calculateValueUsingFraction(elementPosition);

    const { values } = model.getOptions();

    expect(values[0]).toEqual(50);
  });

  test('должна менять значение from при получение позиции бегунка больше max', () => {
    const elementPosition: IElementPosition = {
      position: 2,
      valueIndex: 0,
    };

    model.calculateValueUsingFraction(elementPosition);

    const { values } = model.getOptions();

    expect(values[0]).toEqual(50);
  });

  test('должна менять значение to при получение позиции бегунка больше max', () => {
    const elementPosition: IElementPosition = {
      position: 2,
      valueIndex: 1,
    };

    model.calculateValueUsingFraction(elementPosition);

    const { values } = model.getOptions();

    expect(values[1]).toEqual(100);
  });

  test('должна менять значение to при получение позиции бегунка больше минимума и меньше максимума', () => {
    const elementPosition: IElementPosition = {
      position: 0.8,
      valueIndex: 1,
    };

    model.calculateValueUsingFraction(elementPosition);

    const { values } = model.getOptions();

    expect(values[1]).toEqual(60);
  });

  test('должна менять значение to при получение позиции бегунка меньше from', () => {
    const elementPosition: IElementPosition = {
      position: 0.1,
      valueIndex: 1,
    };

    model.calculateValueUsingFraction(elementPosition);

    const { values } = model.getOptions();

    expect(values[1]).toEqual(-50);
  });

  test('должна менять значение to при получение позиции бегунка меньше min', () => {
    const elementPosition: IElementPosition = {
      position: -1,
      valueIndex: 1,
    };

    model.calculateValueUsingFraction(elementPosition);

    const { values } = model.getOptions();

    expect(values[1]).toEqual(-50);
  });

  test('должна менять значение to при получение позиции бегунка меньше from, если слайдер имеет один бегунок', () => {
    const options = {
      isRange: false,
    };

    model.updateOptions(options);

    const elementPosition: IElementPosition = {
      position: -1,
      valueIndex: 1,
    };

    model.calculateValueUsingFraction(elementPosition);

    const { values } = model.getOptions();

    expect(values[1]).toEqual(-100);
  });

  test('должна не менять значение to при получение позиции бегунка отличающегося меньше чем на пол шага', () => {
    const elementPosition: IElementPosition = {
      position: 0.77,
      valueIndex: 1,
    };

    model.calculateValueUsingFraction(elementPosition);

    const { values } = model.getOptions();

    expect(values[1]).toEqual(50);
  });

  test('должна менять значение to при получение позиции бегунка отличающегося больше чем на пол шага', () => {
    const elementPosition: IElementPosition = {
      position: 0.78,
      valueIndex: 1,
    };

    model.calculateValueUsingFraction(elementPosition);

    const { values } = model.getOptions();

    expect(values[1]).toEqual(60);
  });

  it('должна менять значение to если это значение ближе к текущему to, чем текущие from', () => {
    model.updateNearValue(70);

    const { values } = model.getOptions();

    expect(values[1]).toEqual(70);
  });

  it('должна менять значение from если это значение ближе к текущему from, чем текущие to', () => {
    model.updateNearValue(-30);

    const { values } = model.getOptions();

    expect(values[0]).toEqual(-30);
  });
});
