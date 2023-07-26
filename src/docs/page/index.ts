import '@plugin';

import { Panel } from '../panel/Panel';
import configs from './data.json';
import './docs.scss';
import { cssSelectors } from './constants';

const sliders = $(cssSelectors.example).slider();

document.querySelectorAll(cssSelectors.control).forEach((node, i) => {
  new Panel(node, sliders[i], configs[i]);
});
