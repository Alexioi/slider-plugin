import EventEmitter from "event-emitter";

import Bar from "./subView/bar";


class View {
  constructor(element) {
    this.element = element;

    // this._addEventEmitters();
    this.initSubView();
  }

  initSubView() {
    this.bar = new Bar(this.element)
  }

  // _addEventEmitters() {
  //   this.on("drawSlider", (options) => this.drawSlider(options));
  // }

  draw() {
    const sliderContainer = "<div class='slider__container'></div>"

    this.element.append(sliderContainer);
  }

  update() {
    this.bar.emit('test')
  }

  // drawSlider(options) {
  //   const slider = `
  //     <div class='slider'>
  //       <div class='slider__dot slider__dot_from'></div>
  //       <div class='slider__line'></div>
  //       <div class='slider__dot slider__dot_to'></div>
  //     </div>
  //   `;

  //   this.element.empty();
  //   this.element.append(slider);

  //   if (options.isRange) {
  //     this.element.find(".slider__dot_from").css({ display: "block" });
  //   } else {
  //     this.element.find(".slider__dot_from").css({ display: "none" });
  //   }
  // }
}

EventEmitter(View.prototype);

export default View;
