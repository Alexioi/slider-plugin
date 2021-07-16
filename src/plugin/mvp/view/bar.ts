import EventEmitter from "event-emitter";

import Runner from "./runner";
import Range from "./range";

import { IPosition, IRunner, IRange, IOptions } from "../interfaces/interfaces";

class Bar {
  $slider: JQuery;
  range: IRange;
  private $bar: JQuery;
  runners: IRunner;
  emit: any;
  on: any;

  constructor($slider: JQuery) {
    this.$slider = $slider;
    this.$bar = this.initBar()
    this.range = new Range(this.$bar)
    this.runners = new Runner(this.$bar)
    this.addEventEmitters()
  }

  private initBar(): JQuery {
    const bar = "<div class='slider__bar'></div>";

    this.$slider.append(bar);

    return this.$slider.find(".slider__bar");
  }

  public updatePositionFrom({
    min,
    max,
    from,
    to,
    isVertical
  }: IOptions) {
    let positionFrom = this.calculatePositionFrom(from, min, max)
    let width = this.calculateBarWidth(from, to, min, max)

   
    if (isVertical) {
      this.runners.moveTopRunnerFrom(positionFrom)
    } else { this.runners.moveRunnerFrom(positionFrom)
      this.range.moveRange(positionFrom, width)
    }
   
  }

  public updatePositionTo({
    min,
    max,
    from,
    to,
    isVertical
  }: IOptions) {
    let positionFrom = this.calculatePositionFrom(from, min, max)
    let positionTo = this.calculatePositionTo(to, min, max)
    let width = this.calculateBarWidth(from, to, min, max)
    
    
    if (isVertical) {
      this.runners.moveTopRunnerTo(positionTo)
    } else { this.runners.moveRunnerTo(positionTo)
      this.range.moveRange(positionFrom, width)
    }
   
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

   private addEventEmitters() {
    this.runners.on("click", (position: IPosition) =>
      this.calculatePercentageClicks(position)
    );
   }

  private calculatePercentageClicks(position: IPosition) {
    let x: number, y: number, valueName: string;

    x = (position.x - <number>this.$bar.offset().left) / <number>this.$bar.width();
    y = (position.y - this.$bar.offset().top) / <number>this.$bar.height();
   
    valueName = position.runnerName;
    

    this.emit("click", { x, y, valueName});
  }
    
  }

EventEmitter(Bar.prototype);

export default Bar;
