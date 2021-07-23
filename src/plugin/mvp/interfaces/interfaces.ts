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
  hasTip: boolean;
  min: number;
  max: number;
  value: number;
}

interface IClickRate {
  x: number;
  y: number;
  valueName: string;
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

interface IRange {
  moveRange(options: IOptions): void;
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
  IClickRate,
  IPosition,
  IRange,
  IBar,
};
