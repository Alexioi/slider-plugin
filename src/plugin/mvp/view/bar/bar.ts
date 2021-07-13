import EventEmitter from "event-emitter";

import Runner from "./runner/runner";

import { IPosition, IRunner } from "../../interfaces/interfaces";

class Bar {
  $slider: JQuery;
  // $range: any;
  $bar: JQuery;
  runners: IRunner;
  emit: any;
  on: any;

  constructor(slider: JQuery) {
    this.$slider = slider;
    this.$bar = this.initBar()
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

   private addEventEmitters() {
    this.runners.on("click", (position: IPosition) =>
      this.calculatePercentageClicks(position)
    );
   }

  private calculatePercentageClicks(position: IPosition) {
    let x: number, y: number;

    x = (position.x - this.$bar.offset().left) / this.$bar.width();
    y = (position.y - this.$bar.offset().top) / this.$bar.height();
    let valueName = position.runnerName;
    

    this.emit("click", { x, y, valueName});
  }
    
  }
 
  // public drawBar() {
  //   this.drawRange();
  // }

  // private drawRange() {
  //   const range = "<div class='slider__range'></div>";

  //   this.$bar.append(range);

  //   this.$range = this.$slider.find(".slider__range");
  // }

  // public drawRunnerFrom() {
  //   const runnerFrom =
  //     "<div class='slider__runner slider__runner_name-from'></div>";

  //   this.$bar.append(runnerFrom);

  //   this.$runnerFrom = this.$slider.find(".slider__runner_name-from");

  //   this.attachEventRunner(this.$runnerFrom);
  // }

  // public drawRunnerTo() {
  //   const runnerTo =
  //     "<div class='slider__runner slider__runner_name-to'></div>";

  //   this.$bar.append(runnerTo);

  //   this.$runnerTo = this.$slider.find(".slider__runner_name-to");

  //   this.attachEventRunner(this.$runnerTo);
  // }

  // private attachEventRunner(node: any) {
  //   let nodeName: string;

  //   nodeName = node.hasClass("slider__runner_name-from") ? "from" : "to";

  //   node.on("dragstart", () => false);

  //   node.on("mousedown", () => {
  //     $(document).on("mousemove", () => {
  //       this.emit("click", this.getPosition(event, nodeName));
  //     });
  //     $(document).on("mouseup", () => $(document).off("mousemove"));
  //   });
  // }

  // private getPosition(event: any, runnerName: string) {
  //   const position: IPosition = { x: 0, y: 0, name: "" };

  //   position.name = runnerName;

  //   position.x = event.pageX;
  //   position.y = event.pageY;

  //   return position;
  // }

  // public moveRightRunners(positionFrom: number, positionTo: number) {
  //   if (typeof this.$runnerFrom !== "undefined") {
  //     this.$runnerFrom.css("left", positionFrom + "%");
  //   }
  //   this.$runnerTo.css("left", positionTo + "%");
  // }

  // public moveBottomRunners(positionFrom: number, positionTo: number) {
  //   if (typeof this.$runnerFrom !== "undefined") {
  //     this.$runnerFrom.css("top", positionFrom + "%");
  //   }
  //   this.$runnerTo.css("top", positionTo + "%");
  // }

  // public moveHorizonRange(width: number, left: number) {
  //   this.$range.css({
  //     width: width + "%",
  //     height: "100%",
  //     top: "0%",
  //     left: left + "%",
  //   });
  // }

  // public moveVerticalRange(width: number, left: number) {
  //   this.$range.css({
  //     height: width + "%",
  //     width: "100%",
  //     left: "0%",
  //     top: left + "%",
  //   });
  // }
// }

EventEmitter(Bar.prototype);

export default Bar;
