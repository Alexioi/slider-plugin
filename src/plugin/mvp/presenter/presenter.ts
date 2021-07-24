import { Model, IModel } from "../model/model";
import View from "../view/view";

import EventEmitter from "event-emitter";

import { IOptions, IPosition } from "../interfaces/interfaces";

class Presenter {
  view: any;
  model: IModel;
  element: JQuery;

  constructor(element: any, options: IOptions, defaultOptions: IOptions) {
    this.element = element;
    this.view = new View(this.element);
    this.model = new Model(defaultOptions);

    this.addEventEmitters();
    this.updateOptions(options);
  }

  addEventEmitters() {
    this.model.on("updateModelOptions", (options: IOptions) =>
      this.view.updateSlider(options)
    );
    this.model.on("updateModelFrom", (options: IOptions) =>
      this.view.updatePositionFrom(options)
    );

    this.model.on("updateModelTo", (options: IOptions) =>
      this.view.updatePositionTo(options)
    );

    this.view.on("clickScale", (value: number) =>
      this.model.updateNearValue(value)
    );

    this.view.on("click", (position: IPosition) =>
      this.model.updateValue(position)
    );
  }

  updateOptions(options: IOptions) {
    this.model.verifyAllOptions(options);
  }

  getOptions() {
    return this.model.getOptions();
  }
}

EventEmitter(Presenter.prototype);

export default Presenter;
