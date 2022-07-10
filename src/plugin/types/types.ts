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

type TypeNameRunners = 'from' | 'to';

interface IElementPosition {
  type: TypeNameRunners;
  position: number;
}

interface IMarkParameters {
  percent: number;
  text: string;
}

interface ITarget {
  value: TypeNameRunners;
}

export { IConfig, ICallbacks, IOptions, IElementPosition, IMarkParameters, ITarget };
