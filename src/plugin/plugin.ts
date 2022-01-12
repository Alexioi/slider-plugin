import './plugin.scss';

import App from './mvp/app/app';

$.fn.slider = function initSliders(config?: IConfig) {
  return this.map((i: number, node: HTMLElement) => new App($(node), config));
};
