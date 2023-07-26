import '@plugin';

import { Panel } from '../panel/Panel';
import configs from './data.json';
import { cssSelectors } from './constants';
import './docs.scss';

const sliders = $(cssSelectors.example).slider();

document.querySelectorAll(cssSelectors.control).forEach((node, i) => {
  new Panel(node, sliders[i], configs[i]);
});
