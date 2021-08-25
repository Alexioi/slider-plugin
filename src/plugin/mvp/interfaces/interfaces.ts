interface IConfig {
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

interface IOptions {
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

interface IRunnerOptions {
  isVertical: boolean;
  position: number;
  value: number;
}

interface IRangeOptions {
  isVertical: boolean;
  position: number;
  width: number;
}

interface IPosition {
  x: number;
  y: number;
  runnerName: string;
}

export { IConfig, IOptions, IRunnerOptions, IPosition, IRangeOptions };
