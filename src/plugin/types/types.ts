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

interface ICallbacks {
  onChange: Function;
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

interface ITipOptions {
  from: number;
  to: number;
  isRange: boolean;
  isVertical: boolean;
  leftPosition: number;
  rightPosition: number;
}

interface IScaleOptions {
  min: number;
  max: number;
  isVertical: boolean;
}

interface IPosition {
  x: number;
  y: number;
}

type TypeNameRunners = 'from' | 'to';

interface IElementPosition {
  type: TypeNameRunners;
  position: IPosition;
}

interface IRangeOptions {
  isVertical: boolean;
  positions: number[];
}

interface IMarkParameters {
  percent: number;
  text: string;
}

interface ITarget {
  value: 'from' | 'to';
}

export {
  IConfig,
  ICallbacks,
  IOptions,
  ITipOptions,
  IScaleOptions,
  IElementPosition,
  IRangeOptions,
  IPosition,
  IMarkParameters,
  ITarget,
};
