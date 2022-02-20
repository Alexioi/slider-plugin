import './page/docs.scss';

import Panel from './panel/panel';
import '../plugin/plugin';

const slider = $('.js-panel__example').slider();

const configs = [
  {
    isRange: true,
    isVertical: false,
    hasTip: true,
    hasScale: true,
    step: 10,
    min: -100,
    max: 100,
    from: -50,
    to: 40,
  },
  {
    isRange: true,
    isVertical: true,
    hasTip: true,
    hasScale: true,
    step: 10,
    min: 100,
    max: 200,
    from: 100,
    to: 150,
  },
  {
    isRange: true,
    isVertical: false,
    hasTip: true,
    hasScale: true,
    step: 10,
    min: -100,
    max: 100,
    from: -50,
    to: 40,
  },
  {
    isRange: true,
    isVertical: false,
    hasTip: true,
    hasScale: true,
    step: 10,
    min: -100,
    max: 100,
    from: -50,
    to: 40,
  },
];

$('.js-panel__control').each((i, node) => {
  new Panel($(node), slider[i], configs[i]);
});
