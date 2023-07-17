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

type ValuesIndex = 0 | 1;

type TouchRoute = 'up' | 'down';

interface IElementPosition {
  valueIndex: 'from' | 'to';
  position: { x: number; y: number };
}

interface IMarkParameters {
  percent: number;
  text: string;
}

interface ITarget {
  valueIndex: ValuesIndex;
}

interface IElementTouch {
  valueIndex: 'from' | 'to';
  touchRoute: TouchRoute;
}

type EventTypes = {
  UpdatedModelOptions: IOptions;
  UpdatedModelValues: IOptions;
  ChangedRunnerPosition: IElementPosition;
  ClickScale: { targetNumber: number };
  onChange: IOptions;
  ChangedRunnerPositionStep: IElementTouch;
  ChangedNearRunnerPosition: { position: { x: number; y: number } };
};

export {
  EventTypes,
  IConfig,
  ICallbacks,
  IOptions,
  IElementPosition,
  IMarkParameters,
  ITarget,
  IElementTouch,
  TouchRoute,
};
