import './plugin.scss';

import { IOptions } from './mvp/interfaces/interfaces';

import App from './mvp/app/app';

declare var $: any;

(function ($) {
  $.fn.slider = function (options: IOptions) {
    let apps: any = [];

    apps.push(
      this.each((i: number) => {
        let node = this.slice(i, i + 1);

        let app = new App(node, options);

        apps.push(app);
      })
    );

    return apps;
  };
})(jQuery);
