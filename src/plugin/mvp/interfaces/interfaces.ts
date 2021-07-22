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
  moveRunnerFrom(options: IOptions): void;
  moveRunnerTo(options: IOptions): void;
  showRunnerFrom(): void;
  hideRunnerFrom(): void;
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

export { IRunner, IOptions, IClickRate, IPosition, IRange, IBar };
