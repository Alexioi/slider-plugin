interface Config {
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

interface Callbacks {
  onChange: Function;
}

interface Options {
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

interface ElementPosition {
  type: 'from' | 'to';
  position: { x: number; y: number };
}

interface MarkParameters {
  percent: number;
  value: number;
}

interface Target {
  type: 'from' | 'to';
}

interface ElementTouch {
  type: 'from' | 'to';
  touchRoute: TouchRoute;
}

type EventTypes = {
  UpdatedModelOptions: Options;
  UpdatedModelValues: Options;
  ChangedRunnerPosition: {
    type: 'from' | 'to';
    position: { x: number; y: number };
  };
  ClickScale: { targetNumber: number };
  onChange: Options;
  ChangedRunnerPositionStep: {
    type: 'from' | 'to';
    touchRoute: 'down' | 'up';
  };
  ChangedNearRunnerPosition: { position: { x: number; y: number } };
};

export {
  EventTypes,
  Config,
  Callbacks,
  Options,
  ElementPosition,
  MarkParameters,
  Target,
  ElementTouch,
  TouchRoute,
};
