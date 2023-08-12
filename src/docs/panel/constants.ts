const cssSelectors = {
  range: '.js-panel__input_name-range',
  vertical: '.js-panel__input_name-vertical',
  scale: '.js-panel__input_name-scale',
  min: '.js-panel__input_name-min',
  max: '.js-panel__input_name-max',
  from: '.js-panel__input_name-from',
  to: '.js-panel__input_name-to',
  step: '.js-panel__input_name-step',
  tip: '.js-panel__input_name-tip',
  indicator: '.js-panel__indicator',
  decoratedIndicator: 'panel__indicator_decorated',
  format: '.js-panel__select_name-format',
};

const formatOptions = [
  { name: 'none' },
  { name: 'before' },
  { name: 'after' },
  { name: 'x2' },
  { name: 'toFixed0' },
  { name: 'toFixed2' },
  { name: 'toFixed4' },
];

const formatName = {
  none: 'none',
  before: 'before',
  after: 'after',
  x2: 'x2',
  toFixed0: 'toFixed0',
  toFixed2: 'toFixed2',
  toFixed4: 'toFixed4',
};

const name = {
  isRange: 'isRange',
  isVertical: 'isVertical',
  hasScale: 'hasScale',
  min: 'min',
  max: 'max',
  from: 'from',
  to: 'to',
  step: 'step',
  hasTip: 'hasTip',
  indicator: 'indicator',
  format: 'format',
};

export { cssSelectors, formatOptions, formatName, name };
