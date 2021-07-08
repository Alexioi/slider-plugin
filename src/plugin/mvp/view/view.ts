import EventEmitter from "event-emitter";

import Bar from "../subView/bar";
import Info from "../subView/info";
import Scale from "../subView/scale";

import { IClickRate, IOptions, IPosition } from "../interfaces/interfaces";

class View {
  element: JQuery;
  bar: any;
  info: any;
  scale: any;
  $slider!: any;
  $container!: any;
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
    const slider = "<div class='slider'></div>";

    this.element.append(slider);

    this.$slider = this.element.find(".slider");

    this.updateSlider();
  }

  updateSlider() {
    const sliderContainer = "<div class='slider__container'></div>";

    this.$slider.append(sliderContainer);

    this.$container = this.element.find(".slider__container");

    this.initSubView();
    this.addEventEmitters();
  }

  destroyContainer() {
    this.$container.remove();
  }

  updateVisible(options: IOptions): void {
    let { isRange, isVertical, hasTip, min, max, numberMarks } = options;

    this.destroyContainer();
    this.updateSlider();

    if (hasTip) {
      this.info.drawInfo();
    }

    this.bar.drawBar();

    if (isRange) {
      if (hasTip) {
        this.info.drawTipFrom();
      }
      this.bar.drawRunnerFrom();
    }

    if (hasTip) {
      this.info.drawTipTo();
    }

    this.bar.drawRunnerTo();

    if (isVertical) {
      this.addClassVertical();
    } else {
      this.removeClassVertical();
    }

    this.scale.drawScale();

    let counter: number, sliderWidth: number, rate: number;

    sliderWidth = max - min

      numberMarks = numberMarks -1

      if (numberMarks > 0) {
          this.scale.drawSerif(min);
          isVertical ? this.scale.moveBottomSerif(0) : this.scale.moveLeftSerif(0)
          this.scale.drawSerif(max);
          isVertical ? this.scale.moveBottomSerif(100) :  this.scale.moveLeftSerif(100)


          for (let i = 0; i < numberMarks; i++) {

              counter = Math.round(min + ((max - min) / numberMarks) * i);

              this.scale.drawSerif(counter);

              rate = Math.abs(counter / sliderWidth * 100)

              if (isVertical) {
                  this.scale.moveBottomSerif(rate)
              } else {
              this.scale.moveLeftSerif(rate)}
          }
      }



    this.updatePosition(options);
  }

  updatePosition({
    min,
    max,
    from,
    to,
    isVertical,
    hasTip,
    isRange,
  }: IOptions) {
    let leftPosition: number, widthBar: number, rightPosition: number;

    rightPosition = ((to - min) / (max - min)) * 100;
    leftPosition = ((from - min) / (max - min)) * 100;
    widthBar = ((to - from) / (max - min)) * 100;

    if (hasTip) {
      if (isRange) {
        this.info.addValueTipFrom(from);
      }

      this.info.addValueTipTo(to);
    }

    if (isVertical) {
      this.bar.moveVerticalRange(widthBar, leftPosition);
      this.bar.moveBottomRunners(leftPosition, rightPosition);
      this.info.moveBottomTips(leftPosition, rightPosition);
    } else {
      this.bar.moveHorizonRange(widthBar, leftPosition);
      this.bar.moveRightRunners(leftPosition, rightPosition);
      this.info.moveRightTips(leftPosition, rightPosition);
    }
  }

  private addClassVertical() {
    this.$slider.addClass("slider_vertical");
  }

  private removeClassVertical() {
    this.$slider.removeClass("slider_vertical");
  }

  private initSubView() {
    this.bar = new Bar(this.$slider);
    this.info = new Info(this.$slider);
    this.scale = new Scale(this.$slider);
  }

  private addEventEmitters() {
    this.bar.on("click", (position: IPosition) =>
      this.calculatePercentageClicks(position)
    );
  }
}

EventEmitter(View.prototype);

export default View;