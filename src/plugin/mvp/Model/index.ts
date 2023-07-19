import { Validator } from './Validator';

import { EventEmitter } from '../../EventEmitter';
import { IOptions, IConfig, IElementPosition, IElementTouch, EventTypes } from '../../types';
import { calculateValue, updateNearValue, updateOptionsByStep } from './methods';

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

  public calculateValueUsingFraction({ position, type }: IElementPosition): void {
    this.options = calculateValue(position, this.options, type);

    this.emit('UpdatedModelValues', this.options);
  }

  public calculateNearValueUsingFraction(position: { x: number; y: number }): void {
    this.options = calculateValue(position, this.options);

    this.emit('UpdatedModelValues', this.options);
  }

  public updateNearValue(newValue: number): void {
    this.options = updateNearValue(newValue, this.options);

    this.emit('UpdatedModelValues', this.options);
  }

  public updateValueByStep({ type, touchRoute }: IElementTouch): void {
    this.options = updateOptionsByStep(touchRoute, this.options, type);

    this.emit('UpdatedModelValues', this.options);
  }
}

export { Model };
