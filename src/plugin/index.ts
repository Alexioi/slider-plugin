import { App } from './App';
import { Config } from './types';

declare global {
  interface JQuery {
    slider: (config?: Config) => JQuery<App>;
  }
}

$.fn.slider = function initSliders(config) {
  return this.map((i, node) => new App(node, config));
};
