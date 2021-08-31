import './plugin.scss';

import { IConfig } from './mvp/interfaces/interfaces';

import App from './mvp/app/app';

declare global {
  interface JQuery {
    slider: (config?: IConfig) => Array<App>;
  }
}

$.fn.slider = function initSliders(config?: IConfig) {
  const apps: Array<App> = [];

  this.each((i: number, node: HTMLElement) => {
    const app = new App(node, config);

    apps.push(app);
  });

  return apps;
};
