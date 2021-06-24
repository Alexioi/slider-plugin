import Model from "../model/model";
import View from "../view/view";

import EventEmitter from "event-emitter";


interface IOptions {
  isRange: boolean;
  isVertical: boolean;
  hasTip: boolean;
  hasScale: boolean;
  numberMarks: number;
  step: number;
  min: number;
  max: number;
  from: number;
  to: number;
}

class Presenter {
  options: IOptions;
  view: any;
  model: any;

  constructor(element, options: IOptions) {
    this.element = element;
    this.options = options;

    this.initMVP();
    this.addEventEmitters();
    this.init();
  }

  addEventEmitters() {
    this.model.on("updateModel", (options: IOptions) => this.updateView(options));

    this.view.on("click", (clickRate) =>
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
    const defaultOptions = {
      isRange: false,
      isVertical: false,
      hasTip: false,
      hasScale: false,
      numberMarks: 10,
      step: 1,
      min: 0,
      max: 100,
      from: 40,
      to: 70,
    };

    this.view = new View(this.element);
    this.model = new Model(defaultOptions);
  }
}

EventEmitter(Presenter.prototype);

export default Presenter;
