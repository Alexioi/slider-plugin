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
  }

  update({ isRange, isVertical, step, min, max, from, to }: IOptions) {

    this.runner.destroyRunners()
    
    if (isRange) {
      this.runner.drawRunnerFrom()
      this.runner.drawRunnerTo()
    } else {
      this.runner.drawRunnerTo()
    }

    if (isVertical) {
      this.bar.addClassVertical()
    } else {
      this.bar.removeClassVertical()
    }

    this.updatePosition({
      min: min,
      max: max,
      from: from,
      to: to,
      isVertical,
    })
  }

  updatePosition({min, max, from, to, isVertical,}: any) {
    let leftPosition: number,
        widthBar: number,
        rightPosition: number;

    rightPosition = (to - min) / (max - min) * 100;
    leftPosition = (from - min) / (max - min) * 100;
    widthBar = ((to - from) /  (max - min) * 100);


    let positionFrom: number = this.$container.height() * leftPosition / 100
    let positionTo: number = this.$container.height() * rightPosition / 100

    if (isVertical) {
      this.bar.moveVerticalRange(widthBar, positionFrom);
      this.runner.moveBottomRunners(positionFrom, positionTo)
    } else {
      this.bar.moveHorizonRange(widthBar, leftPosition);
      this.runner.moveRightRunners(leftPosition, rightPosition)
    }
  }

  private initSubView() {
    this.bar = new Bar(this.$container);
    this.runner = new Runner(this.$container);
  }

  private addEventEmitters() {
    this.bar.on("click", (position: IPosition) =>
      this.calculatePercentageClicks(position)
    );
    this.runner.on("click", (position: IPosition) =>
      this.calculatePercentageClicks(position)
    );
  }
}

EventEmitter(View.prototype);

export default View;
