import { Validator } from './Validator';

import { EventEmitter } from '../../EventEmitter';
import { IOptions, IConfig, IElementPosition, IElementTouch, EventTypes } from '../../types';

class Model extends EventEmitter<EventTypes> {
  private options: IOptions;

  private validator: Validator;

  constructor(options: IOptions) {
    super();

    this.options = options;
    this.validator = new Validator(this.options);
  }

  public updateOptions(config: IConfig): void {
    this.validator.validateOptions(config);

    this.emit('UpdatedModelOptions', this.options);
  }

  public getOptions(): IOptions {
    return this.options;
  }

  public calculateValueUsingFraction({ position, valueIndex }: IElementPosition): void {
    console.log(valueIndex, position);
    console.log(this.options.from);
    const newValue = this.getNewValueUsingFraction(position);

    this.changeValueDependingOnStep(newValue, valueIndex);

    console.log(this.options.from);

    this.emit('UpdatedModelValues', this.options);
  }

  public calculateNearValueUsingFraction(position: number): void {
    const newValue = this.getNewValueUsingFraction(position);

    const nearValueId = this.getNearValueId(newValue);

    this.changeValueDependingOnStep(newValue, nearValueId);

    this.emit('UpdatedModelValues', this.options);
  }

  public updateNearValue(newValue: number): void {
    const nearValueId = this.getNearValueId(newValue);

    this.options[nearValueId] = newValue;
    this.emit('UpdatedModelValues', this.options);
  }

  public updateValueByStep({ valueIndex, touchRoute }: IElementTouch): void {
    const { step } = this.options;

    const newValue =
      touchRoute === 'up' ? this.options[valueIndex] + step : this.options[valueIndex] - step;
    const [minimum, maximum] = this.getMinimumAndMaximum(valueIndex);

    if (newValue < minimum) {
      this.options[valueIndex] = minimum;
    } else if (newValue > maximum) {
      this.options[valueIndex] = maximum;
    } else {
      this.options[valueIndex] = newValue;
    }

    this.emit('UpdatedModelValues', this.options);
  }

  private getNearValueId(newValue: number): 'from' | 'to' {
    const { isRange, from, to } = this.options;

    if (!isRange) {
      return 'to';
    }

    const diffFrom = Math.abs(from - newValue);
    const diffTo = Math.abs(to - newValue);

    if (diffFrom === diffTo) {
      if (from > newValue) {
        return 'from';
      }
      return 'to';
    }

    if (diffFrom < diffTo) {
      return 'from';
    }

    return 'to';
  }

  private getNewValueUsingFraction(position: number): number {
    const { min, max } = this.options;

    return (max - min) * position + min;
  }

  private getMinimumAndMaximum(valueIndex: 'to' | 'from'): number[] {
    const { from, to, min, max, isRange } = this.options;

    const minimum = valueIndex === 'from' || !isRange ? min : from;
    const maximum = valueIndex === 'from' ? to : max;

    return [minimum, maximum];
  }

  private changeValueDependingOnStep(newValue: number, valueIndex: 'from' | 'to'): void {
    const { step } = this.options;

    const [minimum, maximum] = this.getMinimumAndMaximum(valueIndex);

    const oldValue = this.options[valueIndex];

    const differenceValue = Math.abs(newValue - oldValue);

    const stepRemainderOfDivision = differenceValue % step;

    if (newValue < minimum) {
      this.options[valueIndex] = this.getRoundingNumber(minimum);
      return;
    }

    if (newValue > maximum) {
      this.options[valueIndex] = this.getRoundingNumber(maximum);
      return;
    }

    if (differenceValue < step / 2) {
      this.options[valueIndex] = this.getRoundingNumber(oldValue);
      return;
    }

    if (stepRemainderOfDivision < step / 2) {
      if (newValue > oldValue) {
        this.options[valueIndex] = this.getRoundingNumber(newValue - stepRemainderOfDivision);
        return;
      }
      this.options[valueIndex] = this.getRoundingNumber(newValue + stepRemainderOfDivision);
      return;
    }

    if (newValue + stepRemainderOfDivision - step < minimum) {
      this.options[valueIndex] = this.getRoundingNumber(minimum);
      return;
    }

    if (newValue - stepRemainderOfDivision + step > maximum) {
      this.options[valueIndex] = this.getRoundingNumber(maximum);
      return;
    }

    if (newValue > oldValue) {
      this.options[valueIndex] = this.getRoundingNumber(newValue - stepRemainderOfDivision + step);
      return;
    }

    this.options[valueIndex] = this.getRoundingNumber(newValue + stepRemainderOfDivision - step);
  }

  private getRoundingNumber(number: number) {
    const { step } = this.options;

    const numberComponents = String(step).split('.');

    if (numberComponents.length === 1) {
      return number;
    }

    const simbolsAfterComma = numberComponents[1].length;

    return Number(number.toFixed(simbolsAfterComma));
  }
}

export { Model };
