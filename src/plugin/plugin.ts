import './plugin.scss';

import { IConfig } from './mvp/interfaces/interfaces';

import App from './mvp/app/app';

declare global {
  interface JQuery {
    slider: (config?: IConfig) => JQuery<App>;
  }
}

$.fn.slider = function initSliders(config?: IConfig) {
  return this.map((i: number, node: HTMLElement) => new App($(node), config));
};
