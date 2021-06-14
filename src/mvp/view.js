import EventEmitter from "event-emitter";

class View {
  constructor(element) {
    this.element = element;

    this._addEventEmitters();
  }

  _addEventEmitters() {
    this.on("drawSlider", (options) => this.drawSlider(options));
  }

  drawSlider(options) {
    const slider = `
      <div class='slider'>
        <div class='slider__dot slider__dot_from'></div>
        <div class='slider__line'></div>
        <div class='slider__dot slider__dot_to'></div>
      </div>
    `;

    this.element.empty();
    this.element.append(slider);

    if (options.isRange) {
      this.element.find(".slider__dot_from").css({ display: "block" });
    } else {
      this.element.find(".slider__dot_from").css({ display: "none" });
    }
  }
}

EventEmitter(View.prototype);

export default View;
