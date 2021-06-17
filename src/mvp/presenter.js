import Model from "./model";
import View from "./view";

import EventEmitter from "event-emitter";

class Presenter {
  constructor(element, options) {
    this.element = element;
    this.options = options;

    this.initMVP();
    this.addEventEmitters();
    this.init();
  }

  addEventEmitters() {
    this.model.on("updateModel", (options) =>
      this.updateView(options)
    );

    this.view.on("click", (x, y) => console.log(x, y))
  }

  updateOptions(options) {
    this.model.update(options);
  }

  drawView () {
    this.view.draw()
  }

  updateView (options) {
    this.view.update(options)
  }

  init() {
    this.view.draw()
    this.model.update(this.options) 
  }

  initMVP() {
    this.view = new View(this.element);
    this.model = new Model();
  }
}

EventEmitter(Presenter.prototype);

export default Presenter;
