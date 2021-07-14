import EventEmitter from "event-emitter";

import Runner from "./runner/runner";
import Range from "./range/range";

import { IPosition, IRunner, IRange } from "../../interfaces/interfaces";

class Bar {
  $slider: JQuery;
  range: IRange;
  $bar: JQuery;
  runners: IRunner;
  emit: any;
  on: any;

  constructor(slider: JQuery) {
    this.$slider = slider;
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

  public moveRunnerFrom(value: number) {
    this.runners.moveRunnerFrom(value); 
  }

  public moveRunnerTo(value: number) {
    this.runners.moveRunnerTo(value);
  }

  public moveRange(position: number, width: number) {
    this.range.moveRange(position, width)
  }

   private addEventEmitters() {
    this.runners.on("click", (position: IPosition) =>
      this.calculatePercentageClicks(position)
    );
   }

  private calculatePercentageClicks(position: IPosition) {
    let x: number, y: number, valueName: string;

    x = (position.x - this.$bar.offset().left) / this.$bar.width();
    y = (position.y - this.$bar.offset().top) / this.$bar.height();
   
    valueName = position.runnerName;
    

    this.emit("click", { x, y, valueName});
  }
    
  }

EventEmitter(Bar.prototype);

export default Bar;
