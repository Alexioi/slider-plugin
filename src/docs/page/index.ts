import configs from './data.json';
import './docs.scss';
import { Panel } from '../panel/Panel';
import '@plugin';

const sliders = $('.js-panel__example').slider();

document.querySelectorAll('.js-panel__control').forEach((node, i) => {
  new Panel(node, sliders[i], configs[i]);
});
