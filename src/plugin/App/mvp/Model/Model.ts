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

  private callbacks: Pick<Config, 'onChange'> = { onChange: () => {} };

  constructor(options: Options, config?: Partial<Config>) {
    super();

    const { newOptions, callbacks } = validate(options, this.callbacks, config);

    this.options = newOptions;
    this.callbacks = callbacks;
  }

  public updateConfig(config?: Partial<Config>): void {
    const { newOptions, callbacks } = validate(
      this.options,
      this.callbacks,
      config,
    );

    this.options = newOptions;
    this.callbacks = callbacks;

    this.callbacks.onChange(this.options);
    this.emit('UpdateModelOptions', this.options);
  }

  public getConfig(): Config {
    return { ...this.options, ...this.callbacks };
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

    this.callbacks.onChange(this.options);
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

    this.callbacks.onChange(this.options);
    this.emit('UpdateModelValues', this.options);
  }

  public updateNearValue(newValue: number): void {
    this.options = updateNearValue(newValue, this.options);

    this.callbacks.onChange(this.options);
    this.emit('UpdateModelValues', this.options);
  }

  public updateValueByStep({ type, touchRoute }: ElementTouch): void {
    this.options = updateOptionsByStep(touchRoute, this.options, type);

    this.callbacks.onChange(this.options);
    this.emit('UpdateModelValues', this.options);
  }
}

export { Model };
