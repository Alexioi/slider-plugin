import EventEmitter from "event-emitter";

import Runner from "./runner";
import Range from "./range";

import { IPosition, IRunner, IRange, IOptions } from "../interfaces/interfaces";

class Bar {
  private $slider: JQuery;
  private range: IRange;
  private $bar: JQuery;
  private runnerFrom: IRunner;
  private runnerTo: IRunner;
  emit: any;
  on: any;

  constructor($slider: JQuery) {
    this.$slider = $slider;
    this.$bar = this.init();
    this.range = new Range(this.$bar);
    this.runnerFrom = new Runner(this.$bar);
    this.runnerTo = new Runner(this.$bar);
    this.addEventEmitters();
  }

  private init(): JQuery {
    const bar = "<div class='slider__bar'></div>";

    this.$slider.append(bar);

    return this.$slider.find(".slider__bar");
  }

  public update(options: IOptions) {
    const { hasTip, isRange } = options;

    if (isRange) {
      this.runnerFrom.show();
    } else {
      this.runnerFrom.hide();
    }

    this.runnerFrom.update(hasTip);
    this.runnerTo.update(hasTip);

    this.updatePositionFrom(options);
    this.updatePositionTo(options);
  }

  public updatePositionFrom({ isVertical, hasTip, min, max, from }: IOptions) {
    this.runnerFrom.move({ isVertical, hasTip, min, max, value: from });
    // this.range.moveRange(options);
  }

  public updatePositionTo({ isVertical, hasTip, min, max, to }: IOptions) {
    this.runnerTo.move({ isVertical, hasTip, min, max, value: to });
    // this.range.moveRange(options);
  }

  private addEventEmitters() {
    this.runnerFrom.on("click", (position: IPosition) =>
      this.calculatePercentageClicks(position, "from")
    );

    this.runnerTo.on("click", (position: IPosition) =>
      this.calculatePercentageClicks(position, "to")
    );
  }

  private calculatePercentageClicks(position: IPosition, valueName: string) {
    let x: number, y: number;

    x = (position.x - this.$bar.offset().left) / <number>this.$bar.width();
    y = (position.y - this.$bar.offset().top) / <number>this.$bar.height();

    this.emit("click", { x, y, valueName });
  }
}

EventEmitter(Bar.prototype);

export default Bar;
