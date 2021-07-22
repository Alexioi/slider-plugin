import EventEmitter from "event-emitter";

import Runner from "./runner";
import Range from "./range";

import { IPosition, IRunner, IRange, IOptions } from "../interfaces/interfaces";

class Bar {
  private $slider: JQuery;
  private range: IRange;
  private $bar: JQuery;
  private runners: IRunner;
  emit: any;
  on: any;

  constructor($slider: JQuery) {
    this.$slider = $slider;
    this.$bar = this.init();
    this.range = new Range(this.$bar);
    this.runners = new Runner(this.$bar);
    this.addEventEmitters();
  }

  private init(): JQuery {
    const bar = "<div class='slider__bar'></div>";

    this.$slider.append(bar);

    return this.$slider.find(".slider__bar");
  }

  public update(options: IOptions) {
    const { isRange } = options;

    if (isRange) {
      this.runners.showRunnerFrom();
    } else {
      this.runners.hideRunnerFrom();
    }

    this.updatePositionFrom(options);
    this.updatePositionTo(options);
  }

  public updatePositionFrom(options: IOptions) {
    this.runners.moveRunnerFrom(options);
    this.range.moveRange(options);
  }

  public updatePositionTo(options: IOptions) {
    this.runners.moveRunnerTo(options);
    this.range.moveRange(options);
  }

  private addEventEmitters() {
    this.runners.on("click", (position: IPosition) =>
      this.calculatePercentageClicks(position)
    );
  }

  private calculatePercentageClicks(position: IPosition) {
    let x: number, y: number, valueName: string;

    x = (position.x - this.$bar.offset().left) / <number>this.$bar.width();
    y = (position.y - this.$bar.offset().top) / <number>this.$bar.height();

    valueName = position.runnerName;

    this.emit("click", { x, y, valueName });
  }
}

EventEmitter(Bar.prototype);

export default Bar;
