import EventEmitter from "event-emitter";

import { IPosition } from "../interfaces/interfaces";

class Bar {
  container: any;
  $range: any;
  $bar: any;
  $runnerFrom: any;
  $runnerTo: any;
  emit: any;

  constructor(container: any) {
    this.container = container;
  }

  public drawBar() {
    const bar = "<div class='slider__bar'></div>";

    this.container.append(bar);

    this.$bar = this.container.find(".slider__bar");

    this.drawRange();
  }

  private drawRange() {
    const range = "<div class='slider__range'></div>";

    this.$bar.append(range);

    this.$range = this.container.find(".slider__range");
  }

  public drawRunnerFrom() {
    const runnerFrom =
      "<div class='slider__runner slider__runner_name-from'></div>";

    this.$bar.append(runnerFrom);

    this.$runnerFrom = this.container.find(".slider__runner_name-from");

    this.attachEventRunner(this.$runnerFrom);
  }

  public drawRunnerTo() {
    const runnerTo =
      "<div class='slider__runner slider__runner_name-to'></div>";

    this.$bar.append(runnerTo);

    this.$runnerTo = this.container.find(".slider__runner_name-to");

    this.attachEventRunner(this.$runnerTo);
  }

  public destroyRunners() {
    if (typeof this.$runnerFrom !== "undefined") {
      this.$runnerFrom.remove();
    }

    if (typeof this.$runnerTo !== "undefined") {
      this.$runnerTo.remove();
    }
  }

  public addRunnersClassVertical() {
    this.$runnerFrom.addClass("slider__runner_vertical");
    this.$runnerTo.addClass("slider__runner_vertical");
  }

  private attachEventRunner(node: any) {
    let nodeName: string;

    nodeName = node.hasClass("slider__runner_name-from") ? "from" : "to";

    node.ondragstart = function () {
      return false;
    };

    node.on("mousedown", () => {
      $(document).on("mousemove", () => {
        this.emit("click", this.getPosition(event, nodeName));
      });
      $(document).on("mouseup", () => $(document).off("mousemove"));
    });
  }

  private getPosition(event: any, runnerName: string) {
    const position: IPosition = { x: 0, y: 0, name: "" };

    position.name = runnerName;

    position.x = event.pageX;
    position.y = event.pageY;

    return position;
  }

  public moveRightRunners(positionFrom: number, positionTo: number) {
    this.$runnerFrom.css("left", positionFrom + "%");
    this.$runnerTo.css("left", positionTo + "%");
  }

  public moveBottomRunners(positionFrom: number, positionTo: number) {
    this.$runnerFrom.css("top", positionFrom + "%");
    this.$runnerTo.css("top", positionTo + "%");
  }

  public addClassVertical() {
    this.$bar.addClass("slider__bar_vertical");
  }

  public removeClassVertical() {
    this.$bar.removeClass("slider__bar_vertical");
  }

  public moveHorizonRange(width: number, left: number) {
    this.$range.css({
      width: width + "%",
      height: "100%",
      top: "0%",
      left: left + "%",
    });
  }

  public moveVerticalRange(width: number, left: number) {
    this.$range.css({
      height: width + "%",
      width: "100%",
      left: "0%",
      top: left + "%",
    });
  }
}

EventEmitter(Bar.prototype);

export default Bar;
