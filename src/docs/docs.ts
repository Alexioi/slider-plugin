import './panel/panel.scss';
import './page/docs.scss';

import Panel from './panel/panel';
import '../plugin/plugin';

const slider = $('.js-panel__example').slider();

$('.panel__control').each((i, node) => {
  new Panel($(node), slider[i]);
});
