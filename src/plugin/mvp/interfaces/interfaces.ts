interface IOptions {
  [index: string]: boolean | number;
  isRange: boolean;
  isVertical: boolean;
  hasTip: boolean;
  numberMarks: number;
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

interface IRunner {
  move(options: IRunnerOptions): void;
  show(): void;
  hide(): void;
  update(nasTip: boolean): void;
  on: any;
}

interface ITip {
  setValue(value: number): void;
  hide(): void;
  show(): void;
}

interface IRange {
  move(options: IRangeOptions): void;
}

interface IBar {
  update(options: IOptions): void;
  updatePositionFrom(options: IOptions): void;
  updatePositionTo(options: IOptions): void;
  on: any;
}

export {
  IRunner,
  IOptions,
  IRunnerOptions,
  IPosition,
  IRange,
  IBar,
  ITip,
  IRangeOptions,
};
