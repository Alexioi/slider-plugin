import $ from 'jquery';

import Panel from './panel/panel';

import '../plugin/plugin';

import './panel/panel.scss';
import './page/docs.scss';

const slider = $('.js-panel__example').slider({
  isRange: true,
  isVertical: false,
  hasTip: true,
  hasScale: true,
  step: 10,
  min: 0,
  max: 100,
  from: 40,
  to: 70,
});

document.querySelectorAll('.panel__control').forEach((node, i) => {
  new Panel(node, slider[i]);
});
