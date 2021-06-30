import EventEmitter from "event-emitter";

import Bar from "../subView/bar";
import Runner from "../subView/runner";


import {IClickRate, IOptions, IPosition} from "../interfaces/interfaces"

class View {
  element: any;
  bar: any;
  runner: any;
  $container: any;
  emit: any;

  constructor(element: any) {
    this.element = element;
  }

  initSubView() {
    this.bar = new Bar(this.$container);
    this.runner = new Runner(this.$container);
  }

  addEventEmitters() {
    this.bar.on("click", (position: IPosition) =>
      this.calculatePercentageClicks(position)
    );
    this.runner.on("click", (position: IPosition) =>
      this.calculatePercentageClicks(position)
    );
  }

  calculatePercentageClicks(position: IPosition) {
    const clickRate: IClickRate = {x: 0, y: 0};

    let containerWidth = this.$container.width();
    let containerHeight = this.$container.height();

    clickRate.x = (position.x - this.$container.offset().left) / containerWidth;
    clickRate.y = (position.y - this.$container.offset().top) / containerHeight;
    clickRate.valueName = position.name

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

  update({ isRange, isVertical, step, min, max, from, to }: IOptions) {
    let leftPosition: number,
        widthBar: number,
        rightPosition: number;

    rightPosition = (to - min) / (max - min) * 100;

    if (isRange) {
      leftPosition = (from - min) / (max - min) * 100;
      widthBar = ((to - from) /  (max - min) * 100);
      this.runner.displayLeftRunner();
    } else {
      leftPosition = 0;
      widthBar = (to / (max - min) * 100);
      this.runner.hideLeftRunner();
    }

    this.bar.update(widthBar, leftPosition, isVertical);
    this.runner.update(leftPosition, rightPosition, isVertical, from, to);
  }
}

EventEmitter(View.prototype);

export default View;
