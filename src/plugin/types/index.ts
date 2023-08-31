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

type ModelEvents = {
  updateOptions: Options;
  updateValues: Options;
  onChange: Options;
};

type ViewEvents = {
  changeRunnerPosition: {
    type: 'from' | 'to';
    position: { x: number; y: number };
  };
  clickScale: { targetNumber: number };
  changeRunnerPositionByStep: {
    type: 'from' | 'to';
    touchRoute: 'down' | 'up';
  };
  changeNearRunnerPosition: { position: { x: number; y: number } };
};

export {
  Config,
  Options,
  ElementPosition,
  MarkParameters,
  ElementTouch,
  TouchRoute,
  ModelEvents,
  ViewEvents,
};
