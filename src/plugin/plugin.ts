import './plugin.scss';

import { IConfig } from './mvp/interfaces/interfaces';

import App from './mvp/app/app';

declare global {
  interface JQuery {
    slider: (config?: IConfig) => JQuery[];
  }
}

$.fn.slider = function initSlider(config?: IConfig) {
  const apps = [];

  apps.push(
    this.each((i: number) => {
      const node = this.slice(i, i + 1);

      const app = new App(node, config);

      apps.push(app);
    })
  );

  return apps;
};
