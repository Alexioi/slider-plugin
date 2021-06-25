import "./plugin.scss";

import { IOptions } from "./mvp/interfaces/interfaces";

import App from "./mvp/app/app"

declare const $: any;

$.fn.slider = function (options: IOptions) {
  return new App(this, options);
};
