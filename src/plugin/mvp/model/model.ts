import EventNames from '../../types/enums';
import Validator from './validator/Validator';
import sliderOptions from '../../app/sliderOptions';
import EventEmitter from '../../EventEmitter/EventEmitter';
import { IOptions, IConfig, IElementPosition } from '../../types/types';

class Model {
  private options: IOptions;

  private eventEmitter: EventEmitter;

  private validator: Validator;

  constructor(eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.options = { ...sliderOptions.defaultConfig };
    this.validator = new Validator(this.options);
  }

  public updateOptions(config: IConfig): void {
    this.validator.validateOptions(config);

    this.eventEmitter.emit({
      eventName: EventNames.UpdatedModelOptions,
      eventArguments: this.options,
    });
  }

  public getOptions(): IOptions {
    return this.options;
  }

  public calculateValueUsingFraction({ position, type }: IElementPosition): void {
    const { min, max } = this.options;

    const newValue = (max - min) * position + min;

    this.changeValueDependingOnStep(newValue, type);

    this.eventEmitter.emit({
      eventName: EventNames.UpdatedModelOptions,
      eventArguments: this.options,
    });
  }

  public updateNearValue(newValue: number): void {
    const { isRange, from, to } = this.options;

    const diffFrom = Math.abs(from - newValue);
    const diffTo = Math.abs(to - newValue);

    if (!isRange) {
      this.options.to = newValue;
      this.eventEmitter.emit({
        eventName: EventNames.UpdatedModelOptions,
        eventArguments: this.options,
      });
      return;
    }

    if (diffTo <= diffFrom) {
      this.options.to = newValue;
      this.eventEmitter.emit({
        eventName: EventNames.UpdatedModelOptions,
        eventArguments: this.options,
      });
      return;
    }

    this.options.from = newValue;
    this.eventEmitter.emit({
      eventName: EventNames.UpdatedModelOptions,
      eventArguments: this.options,
    });
  }

  public updateValueToByStep(): void {
    const { step, to, max } = this.options;

    const newValue = to + step;

    if (newValue > max) {
      this.options.to = max;
    } else {
      this.options.to = newValue;
    }

    this.eventEmitter.emit({
      eventName: 'UpdatedModelOptions',
      eventArguments: this.options,
    });
  }

  public updateValueFromByStep(): void {
    const { step, to, min } = this.options;

    const newValue = to + step;

    if (newValue > min) {
      this.options.from = min;
    } else {
      this.options.from = newValue;
    }

    this.eventEmitter.emit({
      eventName: 'UpdatedModelOptions',
      eventArguments: this.options,
    });
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

    if (newValue + stepRemainderOfDivision - step < minimum) {
      this.options[valueName] = minimum;
      return;
    }

    if (newValue - stepRemainderOfDivision + step > maximum) {
      this.options[valueName] = maximum;
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
