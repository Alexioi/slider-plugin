import Model from "../model/model";
import View from "../view/view";

import EventEmitter from "event-emitter";

import { IOptions, IClickRate } from "../interfaces/interfaces";

class Presenter {
  options: IOptions;
  view: any;
  model: any;
  element: any;
  defaultOptions: IOptions;

  constructor(element: any, options: IOptions, defaultOptions: IOptions) {
    this.element = element;
    this.options = options;
    this.defaultOptions = defaultOptions;

    this.initMVP();
    this.addEventEmitters();
    this.init();
  }

  addEventEmitters() {
    this.model.on("updateModelOptions", (options: IOptions) =>
      this.view.updateVisible(options)
    );
    this.model.on("updateModelValues", (options: IOptions) =>
      this.view.updatePosition(options)
    );

    this.view.on("click", (clickRate: IClickRate) =>
      this.model.updateValue(clickRate)
    );
  }

  updateOptions(options: IOptions) {
    this.model.updateOptions(options);
  }

  getOptions() {
    return this.model.getOptions();
  }

  drawView() {
    this.view.draw();
  }

  init() {
    this.view.draw();
    this.model.updateOptions(this.options);
  }

  initMVP() {
    this.view = new View(this.element);
    this.model = new Model(this.defaultOptions);
  }
}

EventEmitter(Presenter.prototype);

export default Presenter;
