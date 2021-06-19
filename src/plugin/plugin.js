import "./plugin.scss";

import Presenter from "./mvp/presenter";

$.fn.slider = function (options) {
  return new Presenter(this, options);
};
