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
  format: (value: number) => string;
};

type Config = Options & {
  onChange: (options: Options) => void;
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
  Options,
  ElementPosition,
  MarkParameters,
  ElementTouch,
  TouchRoute,
};
