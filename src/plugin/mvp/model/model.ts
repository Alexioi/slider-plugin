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
    isRange = this.verifyRange(isRange);
    isVertical = this.verifyVertical(isVertical);
    hasTip = this.verifyTip(hasTip);
    min = this.verifyMin(min);
    max = this.verifyMax(min, max);
    from = this.verifyFrom(from, min, max, isRange);
    to = this.verifyTo(to, from, max);
    step = this.verifyStep(step, min, max);

    if (typeof hasScale !== 'boolean') {
      hasScale = this.options.hasScale;
    }

    this.updateOptions({
      isRange,
      isVertical,
      hasTip,
      hasScale,
      min,
      max,
      from,
      to,
      step,
    });
  }

  private updateOptions(options: IOptions) {
    for (let key in this.options) {
      this.options[key] = options[key];
    }

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

    // this.emit("updateModelValues", this.options);
  }

  private calculateValueDependingOnStep(
    value: number,
    newValue: number
  ): number {
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

  private isTypeNumberOrUndefined(
    newValue: number | undefined,
    value: number
  ): number | never {
    if (typeof newValue === 'undefined') {
      newValue = value;
    }

    if (typeof newValue !== 'number') {
      throw new Error('Value is not number');
    }

    return newValue;
  }

  private verifyMin(newMin: number | undefined): number {
    const { min } = this.options;

    return this.isTypeNumberOrUndefined(newMin, min);
  }

  private verifyMax(min: number, newMax: number | undefined): number {
    const { max } = this.options;

    newMax = this.isTypeNumberOrUndefined(newMax, max);

    if (newMax > min) {
      return newMax;
    }

    console.warn('max < min');
    if (min > 0) {
      return min * 2;
    }

    return min / 2;
  }

  private verifyFrom(
    newFrom: number | undefined,
    min: number,
    max: number,
    newIsRange: boolean
  ): number {
    const { from } = this.options;

    newFrom = this.isTypeNumberOrUndefined(newFrom, from);

    if (!newIsRange) {
      return min;
    }

    if (newFrom > min && newFrom < max) {
      return newFrom;
    }

    console.warn('from < min || from > max');
    return min;
  }

  private verifyTo(
    newTo: number | undefined,
    from: number,
    max: number
  ): number {
    const { to } = this.options;

    newTo = this.isTypeNumberOrUndefined(newTo, to);

    if (newTo > from && newTo < max) {
      return newTo;
    }

    console.warn('to < min || to > max');
    return max;
  }

  private verifyStep(
    newStep: number | undefined,
    min: number,
    max: number
  ): number {
    const { step } = this.options;

    newStep = this.isTypeNumberOrUndefined(newStep, step);

    if (newStep < 0) {
      return 0;
    }

    if (newStep < Math.abs(max - min)) {
      return newStep;
    }

    console.warn('step > max');
    return Math.abs(max - min);
  }

  private verifyRange(newIsRange: boolean | undefined): boolean {
    const { isRange } = this.options;

    if (typeof newIsRange === 'undefined') {
      newIsRange = isRange;
    }

    if (typeof newIsRange !== 'boolean') {
      throw new Error('isRange is not boolean');
    }

    return newIsRange;
  }

  private verifyVertical(newIsVertical: boolean | undefined): boolean {
    const { isVertical } = this.options;

    if (typeof newIsVertical === 'undefined') {
      newIsVertical = isVertical;
    }

    if (typeof newIsVertical !== 'boolean') {
      throw new Error('isVertical is not boolean');
    }

    return newIsVertical;
  }

  private verifyTip(newHasTip: boolean | undefined): boolean {
    const { hasTip } = this.options;

    if (typeof newHasTip === 'undefined') {
      newHasTip = hasTip;
    }

    if (typeof newHasTip !== 'boolean') {
      throw new Error('hasTip is not boolean');
    }

    return newHasTip;
  }
}

export default Model;
