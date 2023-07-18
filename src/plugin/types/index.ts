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

type TouchRoute = 'up' | 'down';

interface IElementPosition {
  type: 'from' | 'to';
  position: { x: number; y: number };
}

interface IMarkParameters {
  percent: number;
  value: number;
}

interface ITarget {
  type: 'from' | 'to';
}

interface IElementTouch {
  type: 'from' | 'to';
  touchRoute: TouchRoute;
}

type EventTypes = {
  UpdatedModelOptions: IOptions;
  UpdatedModelValues: IOptions;
  ChangedRunnerPosition: {
    type: 'from' | 'to';
    position: { x: number; y: number };
  };
  ClickScale: { targetNumber: number };
  onChange: IOptions;
  ChangedRunnerPositionStep: {
    type: 'from' | 'to';
    touchRoute: 'down' | 'up';
  };
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
