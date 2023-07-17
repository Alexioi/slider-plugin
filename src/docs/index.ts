import configs from './data.json';
import './page/docs.scss';
import { Panel } from './panel/Panel';
import '../plugin';

const slider = $('.js-panel__example').slider();

document.querySelectorAll('.js-panel__control').forEach((node, i) => {
  new Panel(node, slider[i], configs[i]);
});
