import App from './App';
import { IConfig } from './types/types';

declare global {
  interface JQuery {
    slider: (config?: IConfig) => JQuery<App>;
  }
}

$.fn.slider = function initSliders(config) {
  return this.map((i, node) => new App(node, config));
};
