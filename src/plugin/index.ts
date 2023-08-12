import { App } from './App';
import { Config, Options } from './types';

declare global {
  interface JQuery {
    slider: (config?: Partial<Config>) => JQuery<App>;
  }
}

$.fn.slider = function initSliders(config) {
  return this.map((i, el) => new App(el, config));
};

export { App, Config, Options };
