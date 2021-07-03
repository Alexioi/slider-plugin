import EventEmitter from "event-emitter";

import Bar from "../subView/bar";

import { IClickRate, IOptions, IPosition } from "../interfaces/interfaces";

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
    const clickRate: IClickRate = { x: 0, y: 0 };

    let containerWidth = this.$container.width();
    let containerHeight = this.$container.height();

    clickRate.x = (position.x - this.$container.offset().left) / containerWidth;
    clickRate.y = (position.y - this.$container.offset().top) / containerHeight;
    clickRate.valueName = position.name;

    this.emit("click", clickRate);
  }

  draw() {
    const sliderContainer = "<div class='slider__container'></div>";

    this.element.append(sliderContainer);

    this.$container = this.element.find(".slider__container");

    this.initSubView();
    this.addEventEmitters();

    this.bar.drawBar();
  }

  updateVisible(options: IOptions): void {
    let { isRange, isVertical, step, min, max, from, to } = options;

    this.bar.destroyRunners();

    if (isRange) {
      this.bar.drawRunnerFrom();
      this.bar.drawRunnerTo();
    } else {
      this.bar.drawRunnerTo();
    }

    if (isVertical) {
      this.bar.addClassVertical();
      this.bar.addRunnersClassVertical();
    } else {
      this.bar.removeClassVertical();
    }

    this.updatePosition(options);
  }

  updatePosition({ min, max, from, to, isVertical }: IOptions) {
    let leftPosition: number, widthBar: number, rightPosition: number;

    rightPosition = ((to - min) / (max - min)) * 100;
    leftPosition = ((from - min) / (max - min)) * 100;
    widthBar = ((to - from) / (max - min)) * 100;

    if (isVertical) {
      this.bar.moveVerticalRange(widthBar, leftPosition);
      this.bar.moveBottomRunners(leftPosition, rightPosition);
    } else {
      this.bar.moveHorizonRange(widthBar, leftPosition);
      this.bar.moveRightRunners(leftPosition, rightPosition);
    }
  }

  private initSubView() {
    this.bar = new Bar(this.$container);
  }

  private addEventEmitters() {
    this.bar.on("click", (position: IPosition) =>
      this.calculatePercentageClicks(position)
    );
  }
}

EventEmitter(View.prototype);

export default View;
