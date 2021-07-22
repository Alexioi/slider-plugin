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
  moveRunnerFrom(position: number): void;
  moveRunnerTo(position: number): void;
  moveTopRunnerFrom(value: number): void;
  moveTopRunnerTo(value: number): void;
  on: any;
}

interface IRange {
  moveRange(position: number, width: number): void;
  moveTopRange(position: number, width: number): void;
}

export { IRunner, IOptions, IClickRate, IPosition, IRange };
