/// <reference types="JQuery" />

declare interface JQuery {
  slider: (config?: IConfig) => JQuery<IApp>;
}

declare interface IConfig {
  isRange?: boolean;
  isVertical?: boolean;
  hasTip?: boolean;
  hasScale?: boolean;
  step?: number;
  min?: number;
  max?: number;
  from?: number;
  to?: number;
  onChange?: Function;
}

declare interface ICallbacks {
  onChange: Function;
}

declare interface IOptions {
  [index: string]: boolean | number;
  isRange: boolean;
  isVertical: boolean;
  hasTip: boolean;
  hasScale: boolean;
  step: number;
  min: number;
  max: number;
  from: number;
  to: number;
}

declare interface IRunnerOptions {
  isVertical: boolean;
  position: number;
}

declare interface IRangeOptions {
  isVertical: boolean;
  position: number;
  width: number;
}

declare interface IPosition {
  x: number;
  y: number;
}
