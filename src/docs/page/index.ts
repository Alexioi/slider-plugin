import '@plugin';

import { Panel } from '../panel/Panel';
import configs from './data.json';
import { cssSelectors } from './constants';
import './style.scss';

const sliders = $(cssSelectors.example).slider();

document.querySelectorAll(cssSelectors.control).forEach((el, i) => {
  new Panel(el, sliders[i], configs[i]);
});
