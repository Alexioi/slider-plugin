import Model from "../model/model";
import View from "../view/view";

import EventEmitter from "event-emitter";

import {IOptions, IClickRate} from "../interfaces/interfaces"

class Presenter {
  options: IOptions;
  view: any;
  model: any;
  element: any;
  defaultOptions: IOptions;

  constructor(element: any, options: IOptions, defaultOptions: IOptions) {
    this.element = element;
    this.options = options;
    this.defaultOptions = defaultOptions

    this.initMVP();
    this.addEventEmitters();
    this.init();
  }

  addEventEmitters() {
    this.model.on("updateModel", (options: IOptions) => this.updateView(options));

    this.view.on("click", (clickRate: IClickRate) =>
      this.model.changePositionDependingPercentage(clickRate)
    );
  }

  updateOptions(options: IOptions) {
    this.model.updateOptions(options);
  }

  drawView() {
    this.view.draw();
  }

  updateView(options: IOptions) {
    this.view.update(options);
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
