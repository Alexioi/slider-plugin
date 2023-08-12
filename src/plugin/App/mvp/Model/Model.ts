import { EventEmitter } from '@helpers/EventEmitter';
import {
  Options,
  Config,
  ElementPosition,
  ElementTouch,
  EventTypes,
} from '@types';

import { validate } from './validate';
import {
  calculateValue,
  updateNearValue,
  updateOptionsByStep,
} from './methods';

class Model extends EventEmitter<EventTypes> {
  private options: Options;

  constructor(options: Options, config?: Partial<Config>) {
    super();

    this.options = validate(options, config);
  }

  public updateOptions(config?: Partial<Config>): void {
    this.options = validate(this.options, config);

    this.emit('UpdateModelOptions', this.options);
  }

  public getOptions(): Options {
    return this.options;
  }

  public calculateValueUsingFraction(
    { position, type }: ElementPosition,
    isCheckSensitive: boolean,
  ): void {
    this.options = calculateValue(
      position,
      this.options,
      isCheckSensitive,
      type,
    );

    this.emit('UpdateModelValues', this.options);
  }

  public calculateNearValueUsingFraction(
    position: {
      x: number;
      y: number;
    },
    isCheckSensitive: boolean,
  ): void {
    this.options = calculateValue(position, this.options, isCheckSensitive);

    this.emit('UpdateModelValues', this.options);
  }

  public updateNearValue(newValue: number): void {
    this.options = updateNearValue(newValue, this.options);

    this.emit('UpdateModelValues', this.options);
  }

  public updateValueByStep({ type, touchRoute }: ElementTouch): void {
    this.options = updateOptionsByStep(touchRoute, this.options, type);

    this.emit('UpdateModelValues', this.options);
  }
}

export { Model };
