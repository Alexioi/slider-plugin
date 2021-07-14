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

  public updateSlider (options: IOptions) {
    const {isVertical} = options

    if(isVertical) {
      this.addClassVertical()
    } else {
      this.removeClassVertical()
    }

    this.updatePositionFrom(options);
    this.updatePositionTo(options);
  }

  private initSlider (): JQuery {
    const slider = "<div class='slider'></div>";

    this.element.append(slider);

    return this.element.find(".slider");
  }


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

  public updatePositionFrom({
    min,
    max,
    from,
    to
  }: IOptions) {
    let positionFrom = this.calculatePositionFrom(from, min, max)
    let width = this.calculateBarWidth(from, to, min, max)

    this.bar.moveRange(positionFrom, width)
    this.bar.moveRunnerFrom(positionFrom)
  }

  public updatePositionTo({
    min,
    max,
    from,
    to,
  }: IOptions) {
    let positionFrom = this.calculatePositionFrom(from, min, max)
    let positionTo = this.calculatePositionTo(to, min, max)
    let width = this.calculateBarWidth(from, to, min, max)
    
    this.bar.moveRange(positionFrom, width)
    this.bar.moveRunnerTo(positionTo)
  }
  
  private calculatePositionFrom(from: number, min: number, max: number) {
    return ((from - min) / (max - min)) * 100;
  }

  private calculatePositionTo(to: number, min: number, max: number) {
    return ((to - min) / (max - min)) * 100;
  }

  private calculateBarWidth (from: number, to: number, min: number, max: number) { 
   return  ((to - from) / (max - min)) * 100;
  }

  private addClassVertical() {
    this.$slider.addClass("slider_vertical");
  }

  private removeClassVertical() {
    this.$slider.removeClass("slider_vertical");
  }

  private addEventEmitters() {
    this.bar.on("click", (position: IPosition) =>
     this.emit("click", position)
    )
    
  //   this.scale.on("clickScale", (value: number) =>  this.emit("clickScale", value)
  //   );
  }
}

EventEmitter(View.prototype);

export default View;
