import './plugin.scss';

import { IOptions } from './mvp/interfaces/interfaces';

import App from './mvp/app/app';

declare global {
  interface JQuery {
    slider: (options: IOptions) => JQuery[];
  }
}

$.fn.slider = function initSlider(options: IOptions) {
  const apps = [];

  apps.push(
    this.each((i: number) => {
      const node = this.slice(i, i + 1);

      const app = new App(node, options);

      apps.push(app);
    })
  );

  return apps;
};
