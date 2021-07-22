import EventEmitter from "event-emitter";
import { IOptions } from "../interfaces/interfaces";

class Runner {
  $bar: JQuery;
  $runnerFrom: JQuery;
  $runnerTo: JQuery;
  emit: any;
  on: any;

  constructor($bar: JQuery) {
    this.$bar = $bar;
    this.$runnerFrom = this.initRunner("from");
    this.$runnerTo = this.initRunner("to");
  }

  public moveRunnerFrom(options: IOptions): void {
    const { from, isVertical } = options;

    const position = this.calculatePosition(from, options);

    if (isVertical) {
      this.moveVerticallyRunnerFrom(position);
    } else {
      this.moveHorizontallyRunnerFrom(position);
    }
  }

  public moveRunnerTo(options: IOptions): void {
    const { to, isVertical } = options;

    const position = this.calculatePosition(to, options);

    if (isVertical) {
      this.moveVerticallyRunnerTo(position);
    } else {
      this.moveHorizontallyRunnerTo(position);
    }
  }

  public hideRunnerFrom() {
    this.$runnerFrom.css({ display: "none" });
  }

  public showRunnerFrom() {
    this.$runnerFrom.css({ display: "block" });
  }

  private calculatePosition(value: number, { min, max }: IOptions) {
    return ((value - min) / (max - min)) * 100;
  }

  private moveHorizontallyRunnerFrom(position: number) {
    this.$runnerFrom.css({ left: `${position}%`, top: "" });
  }

  private moveHorizontallyRunnerTo(position: number) {
    this.$runnerTo.css({ left: `${position}%`, top: "" });
  }

  private moveVerticallyRunnerFrom(position: number) {
    this.$runnerFrom.css({ top: `${position}%`, left: "" });
  }

  private moveVerticallyRunnerTo(position: number) {
    this.$runnerTo.css({ top: `${position}%`, left: "" });
  }

  private initRunner(name: string): JQuery {
    const runner = `<div class='slider__runner slider__runner_name-${name}'></div>`;

    this.$bar.append(runner);

    let $runner = this.$bar.find(`.slider__runner_name-${name}`);

    this.attachEventRunner($runner);

    return $runner;
  }

  private attachEventRunner(node: JQuery) {
    let nodeName: string;

    nodeName = node.hasClass("slider__runner_name-from") ? "from" : "to";

    node.on("dragstart", () => false);

    node.on("mousedown", () => {
      $(document).on("mousemove", () => {
        this.emit("click", this.getPosition(event, nodeName));
      });
      $(document).on("mouseup", () => $(document).off("mousemove"));
    });
  }

  private getPosition(event: any, runnerName: string) {
    let x = event.pageX;
    let y = event.pageY;

    return { x, y, runnerName };
  }
}

EventEmitter(Runner.prototype);

export default Runner;
