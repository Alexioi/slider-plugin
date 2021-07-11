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
  name: string;
}

export { IOptions, IClickRate, IPosition };
