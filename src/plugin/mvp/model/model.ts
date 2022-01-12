import { ENamesOfEvents } from '../enums/enums';

class Model {
  private options: IOptions;

  private eventEmitter: IEventEmitter;

  constructor(options: IOptions, eventEmitter: IEventEmitter) {
    this.eventEmitter = eventEmitter;
    this.options = { ...options };
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

    this.eventEmitter.emit(ENamesOfEvents.UpdatedModelOptions, this.options);
  }

  public getOptions(): IOptions {
    return this.options;
  }

  public calculateFromUsingFraction({ x, y }: IPosition): void {
    const { isVertical, from, min, max } = this.options;

    const percentageOfLength = isVertical ? y : x;

    let newValue = (max - min) * percentageOfLength + min;

    newValue = this.checkFrom(newValue);

    newValue = this.calculateValueDependingOnStep(from, newValue);

    newValue = this.checkFrom(newValue);

    if (newValue !== from) {
      this.updateFrom(newValue);
    }
  }

  public calculateToUsingFraction({ x, y }: IPosition): void {
    const { isVertical, to, min, max } = this.options;

    const percentageOfLength = isVertical ? y : x;

    let newValue = (max - min) * percentageOfLength + min;

    newValue = this.checkTo(newValue);

    newValue = this.calculateValueDependingOnStep(to, newValue);

    newValue = this.checkTo(newValue);

    if (newValue !== to) {
      this.updateTo(newValue);
    }
  }

  public updateNearValue(value: number): void {
    const { isRange, from, to } = this.options;

    const diffFrom = Math.abs(from - value);
    const diffTo = Math.abs(to - value);

    if (diffTo <= diffFrom) {
      this.updateTo(value);
      return;
    }

    if (!isRange) {
      this.updateTo(value);
      return;
    }

    this.updateFrom(value);
  }

  private updateFrom(newValue: number): void {
    this.options.from = newValue;

    this.eventEmitter.emit(ENamesOfEvents.UpdatedModelFrom, this.options);
  }

  private updateTo(newValue: number): void {
    this.options.to = newValue;

    this.eventEmitter.emit(ENamesOfEvents.UpdatedModelTo, this.options);
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

    if (Math.abs(differenceValue) < step / 2) {
      return newValueWithoutStep;
    }

    if (differenceValue < 0) {
      return newValueWithoutStep + step;
    }

    return newValueWithoutStep - step;
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
    const { isRange, from, max, min } = this.options;

    if (newTo > max) {
      return max;
    }

    if (newTo < min) {
      return min;
    }

    if (isRange && newTo < from) {
      return from;
    }

    return newTo;
  }
}

export default Model;
