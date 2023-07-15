import configs from './data.json';
import './page/docs.scss';
import { Panel } from './panel/Panel';
import '../plugin';

const slider = $('.js-panel__example').slider();

$('.js-panel__control').each((i, node) => {
  new Panel($(node), slider[i], configs[i]);
});
