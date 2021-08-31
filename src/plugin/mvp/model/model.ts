import EventEmitter from '../EventEmitter/EventEmitter';

import { IConfig, IOptions, IPosition } from '../interfaces/interfaces';

class Model extends EventEmitter {
  options: IOptions;

  constructor(options: IOptions) {
    super();

    this.options = options;
  }

  public updateOptions({
    isRange,
    isVertical,
    hasTip,
    hasScale,
    min,
    max,
    from,
    to,
    step,
  }: IConfig): void {
    this.options.isRange = this.verifyBooleanOption('isRange', isRange);
    this.options.isVertical = this.verifyBooleanOption('isVertical', isVertical);
    this.options.hasTip = this.verifyBooleanOption('hasTip', hasTip);
    this.options.hasScale = this.verifyBooleanOption('hasScale', hasScale);
    [this.options.min, this.options.max] = this.verifyMinAndMax(min, max);
    [this.options.from, this.options.to] = this.verifyFromAndTo(from, to);
    this.options.step = this.verifyStep(step);

    this.emit('updateModelOptions', this.options);
  }

  private verifyBooleanOption(nameOfValue: string, newValue: boolean | undefined): boolean {
    const currentValue = this.options[nameOfValue];

    if (typeof newValue === 'undefined') {
      return <boolean>currentValue;
    }

    if (typeof newValue !== 'boolean') {
      console.warn(`${nameOfValue} is not boolean`);
      return <boolean>currentValue;
    }

    return newValue;
  }

  private verifyMinAndMax(newMin: number | undefined, newMax: number | undefined): Array<number> {
    const { min, max } = this.options;

    newMin = this.verifyNumberOption('min', newMin);
    newMax = this.verifyNumberOption('max', newMax);

    if (newMin < newMax) {
      return [newMin, newMax];
    }

    if (min < newMax) {
      console.warn('Min > Max');
      return [min, newMax];
    }

    return [min, max];
  }

  private verifyFromAndTo(newFrom: number | undefined, newTo: number | undefined): Array<number> {
    const { min, max, from, to } = this.options;

    newFrom = this.verifyNumberOption('from', newFrom);
    newTo = this.verifyNumberOption('to', newTo);

    if (newTo > max || newTo < min) {
      newTo = to;
    }

    if (to > max || to < min) {
      newTo = max;
    }

    if (newFrom > max || newFrom < min) {
      newFrom = from;
    }

    if (from > max || from < min) {
      newFrom = min;
    }

    if (newFrom > newTo) {
      newFrom = newTo;
    }

    return [newFrom, newTo];
  }

  private verifyNumberOption(nameOfValue: string, newValue: number | undefined): number {
    const currentValue = this.options[nameOfValue];

    if (typeof newValue === 'undefined') {
      return <number>currentValue;
    }

    if (typeof newValue !== 'number') {
      console.warn(`${nameOfValue} is not number`);
      return <number>currentValue;
    }

    return newValue;
  }

  private verifyStep(newStep: number | undefined): number {
    const { min, max } = this.options;

    const distanceBetweenMinAndMax = Math.abs(max - min);

    newStep = this.verifyNumberOption('step', newStep);

    if (newStep < distanceBetweenMinAndMax) {
      return newStep;
    }

    return distanceBetweenMinAndMax;
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

      const emitName = `updateModel${runnerName.charAt(0).toUpperCase() + runnerName.slice(1)}`;

      this.emit(emitName, this.options);
    }
  }

  public updateNearValue(value: number): void {
    const { isRange, from, to } = this.options;

    const diffFrom = Math.abs(Math.abs(from) - Math.abs(value));
    const diffTo = Math.abs(Math.abs(to) - Math.abs(value));

    if (!isRange || diffTo <= diffFrom) {
      if (value < from) {
        this.options.from = value;
      }
      this.options.to = value;
      this.emit('updateModelTo', this.options);
      return;
    }

    this.options.from = value;
    this.emit('updateModelFrom', this.options);
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
    const { step, isRange, from, max, min } = this.options;

    if (!isRange && to < from && to > min) {
      this.options.from -= step;
      return to;
    }

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
