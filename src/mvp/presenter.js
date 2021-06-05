import Model from "./model";
import View from "./view";

class Presenter {
  constructor(element, options) {
    this.element = element;
    this.options = options;

    this._initMVP();
    this.updateView();
  }

  _initMVP() {
    this.view = new View(this.element);
    this.model = new Model();
  }

  updateView() {
    this.view.addElement(this.options);
  }
}

export default Presenter;
