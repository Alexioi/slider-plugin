import { App } from './App';
import { Config, Options } from './types';

declare global {
  interface JQuery {
    slider: (config?: Config) => JQuery<App>;
  }
}

$.fn.slider = function initSliders(config) {
  return this.map((i, node) => new App(node, config));
};

export { App, Config, Options };
