type Config = {
  isRange?: boolean;
  isVertical?: boolean;
  hasTip?: boolean;
  hasScale?: boolean;
  step?: number | 'none';
  min?: number;
  max?: number;
  from?: number;
  to?: number;
  onChange?: Function;
  format?: (value: number) => string;
};

type Callbacks = {
  onChange: Function;
};

type Options = {
  isRange: boolean;
  isVertical: boolean;
  hasTip: boolean;
  hasScale: boolean;
  step: number | 'none';
  min: number;
  max: number;
  from: number;
  to: number;
};

type TouchRoute = 'up' | 'down';

type ElementPosition = {
  type: 'from' | 'to';
  position: { x: number; y: number };
};

type MarkParameters = {
  percent: number;
  value: number;
};

type ElementTouch = {
  type: 'from' | 'to';
  touchRoute: TouchRoute;
};

type EventTypes = {
  UpdateModelOptions: Options;
  UpdateModelValues: Options;
  ChangeRunnerPosition: {
    type: 'from' | 'to';
    position: { x: number; y: number };
  };
  ClickScale: { targetNumber: number };
  onChange: Options;
  ChangeRunnerPositionByStep: {
    type: 'from' | 'to';
    touchRoute: 'down' | 'up';
  };
  ChangeNearRunnerPosition: { position: { x: number; y: number } };
};

export {
  EventTypes,
  Config,
  Callbacks,
  Options,
  ElementPosition,
  MarkParameters,
  ElementTouch,
  TouchRoute,
};
