import '@plugin';

import { Panel } from '../panel/Panel';
import configs from './data.json';
import { CSSSelectors } from './constants';
import './style.scss';

const sliders = $(CSSSelectors.example).slider();

document.querySelectorAll(CSSSelectors.control).forEach((el, i) => {
  new Panel(el, sliders[i], configs[i]);
});
