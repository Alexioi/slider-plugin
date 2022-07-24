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

  const model = new Model(defaultOptions, new EventEmitter());

  beforeEach(() => {
    model.updateOptions(defaultOptions);
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
