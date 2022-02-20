import helpers from '../../helpers/helpers';
import { ENamesOfEvents } from '../enums/enums';

class Model {
  private options: IOptions;

  private eventEmitter: IEventEmitter;

  constructor(options: IOptions, eventEmitter: IEventEmitter) {
    this.eventEmitter = eventEmitter;
    this.options = { ...options };
  }

  public updateOptions(config: IConfig): void {
    this.verifyOption(config);

    this.eventEmitter.emit(ENamesOfEvents.UpdatedModelOptions, this.options);
  }

  private verifyOption(config: IConfig): void {
    const { isRange, isVertical, hasTip, hasScale, min, max, from, to, step } = config;

    if (typeof isRange === 'boolean') {
      this.options.isRange = isRange;
    }

    if (typeof isVertical === 'boolean') {
      this.options.isVertical = isVertical;
    }

    if (typeof hasTip === 'boolean') {
      this.options.hasTip = hasTip;
    }

    if (typeof hasScale === 'boolean') {
      this.options.hasScale = hasScale;
    }

    if (typeof max !== 'undefined') {
      this.verifyMax(max, min);
    }

    if (typeof min !== 'undefined') {
      this.verifyMin(min);
    }

    if (typeof to !== 'undefined') {
      this.verifyTo(to, from);
    }

    if (typeof from !== 'undefined') {
      this.verifyFrom(from);
    }

    if (typeof step !== 'undefined') {
      this.verifyStep(step);
    }
  }

  private verifyTo(newTo: number, newFrom?: number): void {
    if (!helpers.isNumber(newTo)) {
      return;
    }

    const { max } = this.options;

    if (newTo > max) {
      this.options.to = max;
      return;
    }

    const { isRange } = this.options;

    if (!isRange) {
      const { min } = this.options;

      if (newTo < min) {
        this.options.to = min;
        return;
      }

      this.options.to = newTo;
      return;
    }

    const { from } = this.options;

    if (!helpers.isNumber(newFrom)) {
      if (newTo < from) {
        this.options.to = from;
        return;
      }
      this.options.to = newTo;
      return;
    }

    if (<number>newFrom < from) {
      if (newTo < from) {
        this.options.to = from;
        return;
      }
      this.options.to = newTo;
      return;
    }

    if (newTo < <number>newFrom) {
      this.options.to = <number>newFrom;
      return;
    }

    this.options.to = newTo;
  }

  private verifyMax(newMax: number, newMin?: number): void {
    if (!helpers.isNumber(newMax)) {
      return;
    }

    const min = helpers.isNumber(newMin) ? <number>newMin : this.options.min;

    if (newMax <= min) {
      return;
    }

    this.options.max = newMax;
  }

  private verifyMin(newMin: number): void {
    if (!helpers.isNumber(newMin)) {
      return;
    }

    const { max } = this.options;

    if (newMin > max) {
      return;
    }

    this.options.min = newMin;
  }

  private verifyFrom(newFrom: number): void {
    if (!helpers.isNumber(newFrom)) {
      return;
    }

    const { min, to } = this.options;

    if (newFrom > to) {
      this.options.from = to;
      return;
    }

    if (newFrom < min) {
      this.options.from = min;
      return;
    }

    this.options.from = newFrom;
  }

  public getOptions(): IOptions {
    return this.options;
  }

  public calculateFromUsingFraction({ x, y }: IPosition): void {
    const { isVertical, min, max } = this.options;

    const percentageOfLength = isVertical ? y : x;

    const newValue = (max - min) * percentageOfLength + min;

    this.changeValueDependingOnStep(newValue, 'from');

    this.eventEmitter.emit(ENamesOfEvents.UpdatedModelOptions, this.options);
  }

  public calculateToUsingFraction({ x, y }: IPosition): void {
    const { isVertical, min, max } = this.options;

    const percentageOfLength = isVertical ? y : x;

    const newValue = (max - min) * percentageOfLength + min;

    this.changeValueDependingOnStep(newValue, 'to');

    this.eventEmitter.emit(ENamesOfEvents.UpdatedModelOptions, this.options);
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

  private verifyStep(newStep: number): void {
    const { min, max } = this.options;

    if (!helpers.isNumber(String(newStep))) {
      return;
    }

    if (newStep <= 0) {
      return;
    }

    const distanceBetweenMinAndMax = max - min;

    if (newStep < distanceBetweenMinAndMax) {
      this.options.step = Number(newStep);
      return;
    }

    this.options.step = distanceBetweenMinAndMax;
  }

  private changeValueDependingOnStep(newValue: number, valueName: 'from' | 'to'): void {
    const { step, min, max, from, to, isRange } = this.options;

    const minimum = valueName === 'from' || !isRange ? min : from;
    const maximum = valueName === 'from' ? to : max;

    const oldValue = this.options[valueName];

    const differenceValue = Math.abs(newValue - oldValue);

    const stepRemainderOfDivision = differenceValue % step;

    if (newValue < minimum) {
      this.options[valueName] = minimum;
      return;
    }

    if (newValue > maximum) {
      this.options[valueName] = maximum;
      return;
    }

    if (differenceValue < step / 2) {
      this.options[valueName] = oldValue;
      return;
    }

    if (stepRemainderOfDivision < step / 2) {
      if (newValue > oldValue) {
        this.options[valueName] = newValue - stepRemainderOfDivision;
        return;
      }
      this.options[valueName] = newValue + stepRemainderOfDivision;
      return;
    }

    if (newValue > oldValue) {
      this.options[valueName] = newValue - stepRemainderOfDivision + step;
      return;
    }

    this.options[valueName] = newValue + stepRemainderOfDivision - step;
  }
}

export default Model;
