import App from './app/app';
import { IConfig } from './types/types';

declare global {
  interface JQuery {
    slider: (config?: IConfig) => JQuery<App>;
  }
}

$.fn.slider = function initSliders(config?: IConfig) {
  return this.map((i: number, node: HTMLElement) => new App(node, config));
};
