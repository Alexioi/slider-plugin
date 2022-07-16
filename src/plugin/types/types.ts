interface IConfig {
  isRange?: boolean;
  isVertical?: boolean;
  hasTip?: boolean;
  hasScale?: boolean;
  step?: number;
  min?: number;
  max?: number;
  values?: number[];
  onChange?: Function;
}

interface ICallbacks {
  onChange: Function;
}

interface IOptions {
  isRange: boolean;
  isVertical: boolean;
  hasTip: boolean;
  hasScale: boolean;
  step: number;
  min: number;
  max: number;
  values: number[];
}

type ValuesIndex = 0 | 1;

interface IElementPosition {
  valueIndex: ValuesIndex;
  position: number;
}

interface IMarkParameters {
  percent: number;
  text: string;
}

interface ITarget {
  valueIndex: ValuesIndex;
}

export { IConfig, ICallbacks, IOptions, IElementPosition, IMarkParameters, ITarget };
