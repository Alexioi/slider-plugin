import Validator from './validator/Validator';

import EventEmitter from '../../EventEmitter/EventEmitter';
import { IOptions, IConfig, IElementPosition, IElementTouch } from '../../types/types';

class Model {
  private options: IOptions;

  private eventEmitter: EventEmitter;

  private validator: Validator;

  constructor(options: IOptions, eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.options = options;
    this.validator = new Validator(this.options);
  }

  public updateOptions(config: IConfig): void {
    this.validator.validateOptions(config);

    this.eventEmitter.emit({
      eventName: 'UpdatedModelOptions',
      eventArguments: this.options,
    });
  }

  public getOptions(): IOptions {
    return this.options;
  }

  public calculateValueUsingFraction({ position, valueIndex }: IElementPosition): void {
    const newValue = this.getNewValueUsingFraction(position);

    this.changeValueDependingOnStep(newValue, valueIndex);

    this.eventEmitter.emit({
      eventName: 'UpdatedModelValues',
      eventArguments: this.options,
    });
  }

  public calculateNearValueUsingFraction(position: number): void {
    const newValue = this.getNewValueUsingFraction(position);

    const nearValueId = this.getNearValueId(newValue);

    this.changeValueDependingOnStep(newValue, nearValueId);

    this.eventEmitter.emit({
      eventName: 'UpdatedModelValues',
      eventArguments: this.options,
    });
  }

  public updateNearValue(newValue: number): void {
    const nearValueId = this.getNearValueId(newValue);

    this.options.values[nearValueId] = newValue;
    this.eventEmitter.emit({
      eventName: 'UpdatedModelValues',
      eventArguments: this.options,
    });
  }

  public updateValueByStep({ valueIndex, touchRoute }: IElementTouch): void {
    const { step, values } = this.options;

    const newValue = touchRoute === 'up' ? values[valueIndex] + step : values[valueIndex] - step;
    const [minimum, maximum] = this.getMinimumAndMaximum(valueIndex);

    if (newValue < minimum) {
      this.options.values[valueIndex] = minimum;
    } else if (newValue > maximum) {
      this.options.values[valueIndex] = maximum;
    } else {
      this.options.values[valueIndex] = newValue;
    }

    this.eventEmitter.emit({
      eventName: 'UpdatedModelValues',
      eventArguments: this.options,
    });
  }

  private getNearValueId(newValue: number): 0 | 1 {
    const { isRange, values } = this.options;

    if (!isRange) {
      return 1;
    }

    const diffFrom = Math.abs(values[0] - newValue);
    const diffTo = Math.abs(values[1] - newValue);

    if (diffFrom === diffTo) {
      if (values[0] > newValue) {
        return 0;
      }
      return 1;
    }

    if (diffFrom < diffTo) {
      return 0;
    }

    return 1;
  }

  private getNewValueUsingFraction(position: number): number {
    const { min, max } = this.options;

    return (max - min) * position + min;
  }

  private getMinimumAndMaximum(valueIndex: number): number[] {
    const { values, min, max, isRange } = this.options;

    const minimum = valueIndex === 0 || !isRange ? min : values[0];
    const maximum = valueIndex === 0 ? values[1] : max;

    return [minimum, maximum];
  }

  private changeValueDependingOnStep(newValue: number, valueIndex: number): void {
    const { step } = this.options;

    const [minimum, maximum] = this.getMinimumAndMaximum(valueIndex);

    const oldValue = this.options.values[valueIndex];

    const differenceValue = Math.abs(newValue - oldValue);

    const stepRemainderOfDivision = differenceValue % step;

    if (newValue < minimum) {
      this.options.values[valueIndex] = minimum;
      return;
    }

    if (newValue > maximum) {
      this.options.values[valueIndex] = maximum;
      return;
    }

    if (differenceValue < step / 2) {
      this.options.values[valueIndex] = oldValue;
      return;
    }

    if (stepRemainderOfDivision < step / 2) {
      if (newValue > oldValue) {
        this.options.values[valueIndex] = newValue - stepRemainderOfDivision;
        return;
      }
      this.options.values[valueIndex] = newValue + stepRemainderOfDivision;
      return;
    }

    if (newValue + stepRemainderOfDivision - step < minimum) {
      this.options.values[valueIndex] = minimum;
      return;
    }

    if (newValue - stepRemainderOfDivision + step > maximum) {
      this.options.values[valueIndex] = maximum;
      return;
    }

    if (newValue > oldValue) {
      this.options.values[valueIndex] = newValue - stepRemainderOfDivision + step;
      return;
    }

    this.options.values[valueIndex] = newValue + stepRemainderOfDivision - step;
  }
}

export default Model;
