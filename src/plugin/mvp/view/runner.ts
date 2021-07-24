import EventEmitter from "event-emitter";
import { IRunnerOptions, ITip } from "../interfaces/interfaces";

import Tip from "./tip";

class Runner {
  $bar: JQuery;
  $runner: JQuery;
  tip: ITip;
  emit: any;
  on: any;

  constructor($bar: JQuery) {
    this.$bar = $bar;
    this.$runner = this.init();
    this.tip = new Tip(this.$runner);
  }

  public move({ value, isVertical, position }: IRunnerOptions): void {
    this.tip.setValue(value);

    if (isVertical) {
      this.moveVertically(position);
    } else {
      this.moveHorizontally(position);
    }
  }

  public update(hasTip: boolean) {
    if (hasTip) {
      this.tip.show();
    } else {
      this.tip.hide();
    }
  }

  public hide() {
    this.$runner.css({ display: "none" });
  }

  public show() {
    this.$runner.css({ display: "" });
  }

  private moveHorizontally(position: number) {
    this.$runner.css({ left: `${position}%`, top: "" });
  }

  private moveVertically(position: number) {
    this.$runner.css({ top: `${position}%`, left: "" });
  }

  private init(): JQuery {
    const runner = `<div class='slider__runner'></div>`;

    this.$bar.append(runner);

    let $runner = this.$bar.find(`.slider__runner`).last();

    this.attachEventRunner($runner);

    return $runner;
  }

  private attachEventRunner(node: JQuery) {
    node.on("dragstart", () => false);

    node.on("mousedown", () => {
      $(document).on("mousemove", () => {
        this.emit("click", this.getPosition(event));
      });
      $(document).on("mouseup", () => $(document).off("mousemove"));
    });
  }

  private getPosition(event: any) {
    let x = event.pageX;
    let y = event.pageY;

    return { x, y };
  }
}

EventEmitter(Runner.prototype);

export default Runner;
