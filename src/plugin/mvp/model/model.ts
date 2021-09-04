import EventEmitter from '../EventEmitter/EventEmitter';

import { IConfig, IOptions, IPosition } from '../interfaces/interfaces';
import { ENameOfEvent } from '../enums/enums';

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

    this.emit(ENameOfEvent.UpdatedModelOptions, this.options);
  }

  public getOptions(): IOptions {
    return this.options;
  }

  public calculateFromToPercentage({ x, y }: IPosition): void {
    const { isVertical, from, to, min, max } = this.options;

    const percentageOfLength = isVertical ? y : x;
    const lowerBoundForValue = 0;
    const upperBoundForValue = Math.abs(to - min) / Math.abs(max - min);

    if (percentageOfLength < lowerBoundForValue) {
      this.updateFrom(min);
      return;
    }

    if (percentageOfLength > upperBoundForValue) {
      this.updateFrom(to);
      return;
    }

    let newValue = (max - min) * percentageOfLength + min;
    newValue = this.calculateValueDependingOnStep(from, newValue);

    if (newValue < min) {
      this.updateFrom(min);
      return;
    }

    if (newValue > to) {
      this.updateFrom(to);
      return;
    }

    this.updateFrom(newValue);
  }

  public calculateToToPercentage({ x, y }: IPosition): void {
    const { isRange, isVertical, from, to, min, max } = this.options;

    const percentageOfLength = isVertical ? y : x;
    const lowerBoundForValue = isRange ? Math.abs(from - min) / Math.abs(max - min) : 0;
    const upperBoundForValue = 1;

    if (percentageOfLength < lowerBoundForValue) {
      if (isRange) {
        this.updateTo(from);
        return;
      }

      this.updateTo(min);
      return;
    }

    if (percentageOfLength > upperBoundForValue) {
      this.updateTo(max);
      return;
    }

    let newValue = (max - min) * percentageOfLength + min;
    newValue = this.calculateValueDependingOnStep(to, newValue);

    if (isRange) {
      if (newValue < from) {
        this.updateFrom(from);
        return;
      }
    }

    if (!isRange) {
      if (newValue < min) {
        this.updateFrom(min);
        return;
      }
    }

    if (newValue > max) {
      this.updateTo(max);
      return;
    }

    this.updateTo(newValue);
  }

  private updateFrom(newValue: number): void {
    this.options.from = newValue;

    this.emit(ENameOfEvent.UpdatedModelFrom, this.options);
  }

  private updateTo(newValue: number): void {
    this.options.to = newValue;

    this.emit(ENameOfEvent.UpdatedModelTo, this.options);
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
      this.emit(ENameOfEvent.UpdatedModelTo, this.options);
      return;
    }

    this.options.from = value;
    this.emit(ENameOfEvent.UpdatedModelFrom, this.options);
  }

  private verifyBooleanOption(nameOfValue: string, newValue: boolean | undefined): boolean {
    const currentValue = this.options[nameOfValue];

    if (typeof newValue === 'undefined') {
      return <boolean>currentValue;
    }

    if (typeof newValue !== 'boolean') {
      return <boolean>currentValue;
    }

    return newValue;
  }

  private verifyNumberOption(nameOfValue: string, newValue: number | undefined): number {
    const currentValue = this.options[nameOfValue];

    if (typeof newValue === 'undefined') {
      return <number>currentValue;
    }

    if (typeof newValue !== 'number') {
      return <number>currentValue;
    }

    return newValue;
  }

  private verifyMinAndMax(
    verifyingOfMin: number | undefined,
    verifyingOfMax: number | undefined,
  ): Array<number> {
    const { min, max } = this.options;
    let newMin = verifyingOfMin;
    let newMax = verifyingOfMax;

    newMin = this.verifyNumberOption('min', newMin);
    newMax = this.verifyNumberOption('max', newMax);

    if (newMin < newMax) {
      return [newMin, newMax];
    }

    if (min < newMax) {
      return [min, newMax];
    }

    return [min, max];
  }

  private verifyFromAndTo(
    verifyingOfFrom: number | undefined,
    verifyingOfTo: number | undefined,
  ): Array<number> {
    const { min, max, from, to } = this.options;
    let newFrom = verifyingOfFrom;
    let newTo = verifyingOfTo;

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

  private verifyStep(verifyingOfStep: number | undefined): number {
    const { min, max } = this.options;
    let newStep = verifyingOfStep;

    const distanceBetweenMinAndMax = Math.abs(max - min);

    newStep = this.verifyNumberOption('step', newStep);

    if (newStep < distanceBetweenMinAndMax) {
      return newStep;
    }

    return distanceBetweenMinAndMax;
  }

  private calculateValueDependingOnStep(oldValue: number, newValue: number): number {
    const { step } = this.options;

    const differenceValue = oldValue - newValue;

    const newValueWithoutStep = oldValue - (differenceValue - (differenceValue % step));

    if (Math.abs(differenceValue) > step / 2) {
      const newValueWithStep =
        differenceValue < 0 ? newValueWithoutStep + step : newValueWithoutStep - step;
      return newValueWithStep;
    }

    return newValueWithoutStep;
  }

  private checkFrom(newFrom: number): number {
    const { to, min } = this.options;

    if (newFrom > to) {
      return to;
    }

    if (newFrom < min) {
      return min;
    }

    return newFrom;
  }

  private checkTo(newTo: number): number {
    const { step, isRange, from, max, min } = this.options;

    if (!isRange && newTo < from && newTo > min) {
      this.options.from -= step;
      return newTo;
    }

    if (newTo < from) {
      return from;
    }

    if (newTo > max) {
      return max;
    }

    return newTo;
  }
}

export default Model;
