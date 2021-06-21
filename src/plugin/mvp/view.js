import EventEmitter from "event-emitter";

import Bar from "./subView/bar";
import Runner from "./subView/runner";

class View {
  constructor(element) {
    this.element = element;
  }

  initSubView() {
    this.bar = new Bar(this.$container);
    this.runner = new Runner(this.$container);
  }

  addEventEmitters() {
    this.bar.on("click", (position) =>
      this.calculatePercentageClicks(position)
    );
    this.runner.on("click", (position) =>
      this.calculatePercentageClicks(position)
    );
  }

  calculatePercentageClicks(position) {
    const clickRate = {};

    let containerWidth = this.$container.width();
    let containerHeight = this.$container.height();

    clickRate.x = (position.x - this.$container.offset().left) / containerWidth;
    clickRate.y = (position.y - this.$container.offset().top) / containerHeight;

    this.emit("click", clickRate);
  }

  draw() {
    const sliderContainer = "<div class='slider__container'></div>";

    this.element.append(sliderContainer);

    this.$container = this.element.find(".slider__container");

    this.initSubView();
    this.addEventEmitters();

    this.bar.draw();
    this.runner.draw();
  }

  update(options) {
    const { isRange, isVertical, step, min, max, from, to } = options;

    let leftPosition = 0;
    let widthBar = 0;
    let rightPosition;

    rightPosition = (to / (max - min)) * 100;

    if (isRange) {
      leftPosition = (from / (max - min)) * 100;
      widthBar = ((to - from) / (max - min)) * 100;
      this.runner.displayLeftRunner();
    } else {
      leftPosition = 0;
      widthBar = (to / (max - min)) * 100;
      this.runner.hideLeftRunner();
    }

    this.bar.update(widthBar, leftPosition, isVertical);
    this.runner.update(leftPosition, rightPosition, isVertical);
  }
}

EventEmitter(View.prototype);

export default View;
