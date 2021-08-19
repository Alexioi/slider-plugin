import EventEmitter from '../EventEmitter/EventEmitter';

import { IOptions, IPosition } from '../interfaces/interfaces';

class Model extends EventEmitter {
  options: IOptions;

  constructor(options: IOptions) {
    super();

    this.options = options;
  }

  public verifyAllOptions({
    isRange,
    isVertical,
    hasTip,
    hasScale,
    min,
    max,
    from,
    to,
    step,
  }: IOptions): void {
    this.verifyBoolean('isRange', isRange);
    this.verifyBoolean('isVertical', isVertical);
    this.verifyBoolean('hasTip', hasTip);
    this.verifyBoolean('hasScale', hasScale);
    this.verifyMinMax(min, max);
    this.verifyFromTo(from, to);
    this.verifyStep(step);

    this.updatedOptions();
  }

  private verifyBoolean(nameOfValue: string, newValue: boolean | undefined): void {
    if (typeof newValue === 'undefined') {
      return;
    }

    if (typeof newValue !== 'boolean') {
      console.warn(`${nameOfValue} is not boolean`);
      return;
    }

    this.options[nameOfValue] = newValue;
  }

  private verifyMinMax(newMin: number, newMax: number): void {
    const { min, max } = this.options;

    if (typeof newMin === 'undefined' && typeof newMax === 'undefined') {
      return;
    }

    if (typeof newMin !== 'number' && typeof newMax !== 'number') {
      console.warn('Min or Max is not number');
      return;
    }

    if (typeof newMin !== 'undefined' && typeof newMax !== 'undefined') {
      if (newMin < newMax) {
        this.options.min = newMin;
        this.options.max = newMax;
      } else {
        console.warn('Min >= Max');
      }
    }

    if (typeof newMin === 'undefined' && typeof newMax !== 'undefined') {
      if (min < newMax) {
        this.options.max = newMax;
      } else {
        console.warn('Min >= Max');
      }
    }

    if (typeof newMin !== 'undefined' && typeof newMax === 'undefined') {
      if (newMin < max) {
        this.options.min = newMin;
      } else {
        console.warn('Min >= Max');
      }
    }
  }

  private verifyFromTo(newFrom: number, newTo: number): void {
    const { min, max, from, to } = this.options;

    if (typeof newFrom === 'undefined' && typeof newTo === 'undefined') {
      return;
    }

    if (typeof newFrom !== 'number' && typeof newTo !== 'number') {
      console.warn('From or To is not number');
      return;
    }

    const isSliderInRange = newFrom > max || newFrom < min || newTo > max || newTo < min;

    if (isSliderInRange) {
      console.warn('From or To < min or > max');
      return;
    }

    if (typeof newFrom !== 'undefined' && typeof newTo !== 'undefined') {
      if (newFrom < newTo) {
        this.options.from = newFrom;
        this.options.to = newTo;
      } else {
        console.warn('From >= To');
      }
    }

    if (typeof newFrom === 'undefined' && typeof newTo !== 'undefined') {
      if (from < newTo) {
        this.options.to = newTo;
      } else {
        console.warn('From >= To');
      }
    }

    if (typeof newFrom !== 'undefined' && typeof newTo === 'undefined') {
      if (newFrom < to) {
        this.options.from = newFrom;
      } else {
        console.warn('From >= To');
      }
    }
  }

  private verifyStep(step: number): void {
    if (typeof step === 'undefined') {
      return;
    }

    if (typeof step !== 'number') {
      console.warn('Step is not number');
      return;
    }

    this.options.step = step;
  }

  private updatedOptions() {
    this.emit('updateModelOptions', this.options);
  }

  public getOptions(): IOptions {
    return this.options;
  }

  public updateValue({ x, y, runnerName }: IPosition): void {
    const { isVertical, from, to, min, max } = this.options;

    const percentageOfMaximum = isVertical ? y : x;

    let newValue = (max - min) * percentageOfMaximum + min;

    const isTo = runnerName === 'to',
      oldValue = isTo ? to : from,
      validFrom = this.checkFrom(newValue),
      validTo = this.checkTo(newValue),
      validValue = isTo ? validTo : validFrom,
      isValidValue = newValue === validValue;

    if (isValidValue) {
      newValue = this.calculateValueDependingOnStep(oldValue, newValue);
      newValue = isTo ? this.checkTo(newValue) : this.checkFrom(newValue);
    }

    if (!isValidValue) {
      newValue = validValue;
    }

    if (newValue !== this.options[runnerName]) {
      this.options[runnerName] = newValue;

      this.emit('updateModelFrom', this.options);
      this.emit('updateModelTo', this.options);
    }
  }

  public updateNearValue(value: number): void {
    const { from, to } = this.options;

    const diffFrom = Math.abs(Math.abs(from) - Math.abs(value));
    const diffTo = Math.abs(Math.abs(to) - Math.abs(value));

    if (diffFrom < diffTo) {
      this.options.from = value;
      this.emit('updateModelFrom', this.options);
    }

    if (diffTo <= diffFrom) {
      this.options.to = value;
      this.emit('updateModelTo', this.options);
    }
  }

  private calculateValueDependingOnStep(value: number, newValue: number): number {
    const { step } = this.options;
    let x: number;

    if (step === 0) {
      return newValue;
    }

    const differenceValue = newValue - value;

    x = Math.abs(differenceValue) - (Math.abs(differenceValue) % step);

    if (Math.abs(differenceValue) > step / 2) {
      x += step;
    }

    if (differenceValue > 0) {
      return value + x;
    }

    if (differenceValue < 0) {
      return value - x;
    }

    return newValue;
  }

  private checkFrom(from: number): number {
    const { to, min } = this.options;

    if (from > to) {
      return to;
    }

    if (from < min) {
      return min;
    }

    return from;
  }

  private checkTo(to: number): number {
    const { from, max } = this.options;

    if (to < from) {
      return from;
    }

    if (to > max) {
      return max;
    }

    return to;
  }
}

export default Model;
