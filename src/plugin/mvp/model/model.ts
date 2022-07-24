import Validator from './validator/Validator';

import EventEmitter from '../../EventEmitter/EventEmitter';
import { IOptions, IConfig, IElementPosition } from '../../types/types';

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
    const { min, max } = this.options;

    const newValue = (max - min) * position + min;

    this.changeValueDependingOnStep(newValue, valueIndex);

    this.eventEmitter.emit({
      eventName: 'UpdatedModelValues',
      eventArguments: this.options,
    });
  }

  public updateNearValue(newValue: number): void {
    const { isRange, values } = this.options;

    const diffFrom = Math.abs(values[0] - newValue);
    const diffTo = Math.abs(values[1] - newValue);

    if (!isRange) {
      this.options.values[1] = newValue;
      this.eventEmitter.emit({
        eventName: 'UpdatedModelValues',
        eventArguments: this.options,
      });
      return;
    }

    if (diffTo <= diffFrom) {
      this.options.values[1] = newValue;
      this.eventEmitter.emit({
        eventName: 'UpdatedModelValues',
        eventArguments: this.options,
      });
      return;
    }

    this.options.values[0] = newValue;
    this.eventEmitter.emit({
      eventName: 'UpdatedModelValues',
      eventArguments: this.options,
    });
  }

  public updateValueToByStep(): void {
    const { step, values, max } = this.options;

    const newValue = values[1] + step;

    if (newValue > max) {
      this.options.values[1] = max;
    } else {
      this.options.values[1] = newValue;
    }

    this.eventEmitter.emit({
      eventName: 'UpdatedModelValues',
      eventArguments: this.options,
    });
  }

  public updateValueFromByStep(): void {
    const { step, values, min } = this.options;

    const newValue = values[1] + step;

    if (newValue > min) {
      this.options.values[0] = min;
    } else {
      this.options.values[0] = newValue;
    }

    this.eventEmitter.emit({
      eventName: 'UpdatedModelValues',
      eventArguments: this.options,
    });
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
