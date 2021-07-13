import EventEmitter from "event-emitter";

import Bar from "./bar/bar";
import Info from "./subView/info";
import Scale from "./subView/scale";

import { IOptions, IPosition } from "../interfaces/interfaces";

class View {
  element: JQuery;
  bar: any;
  info: any;
  scale: any;
  $slider: JQuery;
  emit: any;

  constructor(element: any) {
    this.element = element;
    this.$slider = this.initSlider()
    this.bar = new Bar(this.$slider);
    this.info = new Info(this.$slider);
    this.scale = new Scale(this.$slider);

    this.addEventEmitters();
  }

  // calculatePercentageClicks(position: IPosition) {
  //   let containerWidth: number, containerHeight: number;

  //   containerWidth = this.$slider.width();
  //   containerHeight = this.$slider.height();

  //   let x = (position.x - this.$slider.offset().left) / containerWidth;
  //   let y = (position.y - this.$slider.offset().top) / containerHeight;
  //   let valueName = position.name;

  //   this.emit("click", { x, y, valueName});
  // }

  public updateSlider (options: IOptions) {
    const {isVertical} = options

    if(isVertical) {
      this.addClassVertical()
    } else {
      this.removeClassVertical()
    }
  }

  private initSlider (): JQuery {
    const slider = "<div class='slider'></div>";

    this.element.append(slider);

    return this.element.find(".slider");
  }

  // draw() {
  //   const slider = "<div class='slider'></div>";

  //   this.element.append(slider);

  //   this.$slider = this.element.find(".slider");

  //   this.updateSlider();
  // }

  // public updateSlider() {
    // const sliderContainer = "<div class='slider__container'></div>";

    // this.$slider.append(sliderContainer);

    // this.$container = this.element.find(".slider__container");

    // this.initSubView();
  // }

  // destroyContainer() {
  //   this.$container.remove();
  // }

  updateVisible(options: IOptions): void {
    let { isRange, isVertical, hasTip, min, max, numberMarks } = options;

  //   // this.destroyContainer();
  //   // this.updateSlider();

  //   if (hasTip) {
  //     this.info.drawInfo();
  //   }

  //   this.bar.drawBar();

  //   if (isRange) {
  //     if (hasTip) {
  //       this.info.drawTipFrom();
  //     }
  //     this.bar.drawRunnerFrom();
  //   }

  //   if (hasTip) {
  //     this.info.drawTipTo();
  //   }

  //   this.bar.drawRunnerTo();

  //   if (isVertical) {
  //     this.addClassVertical();
  //   } else {
  //     this.removeClassVertical();
  //   }

  //   this.scale.drawScale();

  //   let counter: number, sliderWidth: number, rate: number;

  //   sliderWidth = max - min;

  //   numberMarks = numberMarks - 1;

  //   if (numberMarks > 0) {
  //     this.scale.drawSerif(min);
  //     isVertical ? this.scale.moveBottomSerif(0) : this.scale.moveLeftSerif(0);
  //     this.scale.drawSerif(max);
  //     isVertical
  //       ? this.scale.moveBottomSerif(100)
  //       : this.scale.moveLeftSerif(100);

  //     for (let i = 0; i < numberMarks; i++) {
  //       counter = Math.round(min + ((max - min) / numberMarks) * i);

  //       this.scale.drawSerif(counter);

  //       rate = Math.abs((counter / sliderWidth) * 100);

  //       if (isVertical) {
  //         this.scale.moveBottomSerif(rate);
  //       } else {
  //         this.scale.moveLeftSerif(rate);
  //       }
  //     }
    // }

    this.updatePositionFrom(options);
    this.updatePositionTo(options);
  }

  public updatePositionFrom({
    min,
    max,
    from,
    to,
    isVertical,
    hasTip,
    isRange,
  }: IOptions) {
    let positionFrom = this.calculatePositionFrom(from, min, max)

    this.bar.moveRunnerFrom(positionFrom)
  }

  public updatePositionTo({
    min,
    max,
    from,
    to,
    isVertical,
    hasTip,
    isRange,
  }: IOptions) {
    let positionTo = this.calculatePositionTo(to, min, max)
    

    this.bar.moveRunnerTo(positionTo)
  }

  private calculatePositionFrom(from: number, min: number, max: number) {
    return ((from - min) / (max - min)) * 100;
  }

  private calculatePositionTo(to: number, min: number, max: number) {
    return ((to - min) / (max - min)) * 100;
  }

  // updatePosition({
  //   min,
  //   max,
  //   from,
  //   to,
  //   isVertical,
  //   hasTip,
  //   isRange,
  // }: IOptions) {
  //   let leftPosition: number, widthBar: number, rightPosition: number;

  //   rightPosition = ((to - min) / (max - min)) * 100;
  //   leftPosition = ((from - min) / (max - min)) * 100;
  //   widthBar = ((to - from) / (max - min)) * 100;

    // if (hasTip) {
    //   if (isRange) {
    //     this.info.addValueTipFrom(from);
    //   }

    //   this.info.addValueTipTo(to);
    // }
    // if(isRange) {
    //   this.bar.moveRunnerFrom(leftPosition)
    // } 

    // this.bar.moveRunnerTo(rightPosition)
    
   

    // if (isVertical) {
    //   this.bar.moveVerticalRange(widthBar, leftPosition);
    //   this.bar.moveBottomRunners(leftPosition, rightPosition);
    //   this.info.moveBottomTips(leftPosition, rightPosition);
    // } else {
    //   this.bar.moveHorizonRange(widthBar, leftPosition);
    //   this.bar.moveRightRunners(leftPosition, rightPosition);
    //   this.info.moveRightTips(leftPosition, rightPosition);
    // }
  // }

  private addClassVertical() {
    this.$slider.addClass("slider_vertical");
  }

  private removeClassVertical() {
    this.$slider.removeClass("slider_vertical");
  }

  private addEventEmitters() {
  //   this.bar.on("click", (position: IPosition) =>
  //     this.calculatePercentageClicks(position)
  //   );

    this.bar.on("click", (position: IPosition) =>
    // console.log(position)
    this.emit("click", position)
    )
    
  //   this.scale.on("clickScale", (value: number) =>  this.emit("clickScale", value)
  //   );
  }
}

EventEmitter(View.prototype);

export default View;
