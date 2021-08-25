import $ from 'jquery';

import Panel from './panel/panel';

import '../plugin/plugin';

import './panel/panel.scss';
import './page/docs.scss';

const slider = $('.js-panel__example').slider();

document.querySelectorAll('.panel__control').forEach((node, i) => {
  new Panel(node, slider[i]);
});
