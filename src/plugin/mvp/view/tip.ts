import { IOptions } from "../interfaces/interfaces";

class Tip {
  $runner: JQuery;
  $tip: JQuery;

  constructor($runner: JQuery) {
    this.$runner = $runner;
    this.$tip = this.init();
  }

  public setValue(value: number) {
    this.$tip.text(value);
  }

  public hide() {
    this.$tip.css({ display: "none" });
  }

  public show() {
    this.$tip.css({ display: "" });
  }

  private init(): JQuery {
    const tip = `<div class='slider__tip'></div>`;

    this.$runner.append(tip);

    return this.$runner.find(`.slider__tip`);
  }
}

export default Tip;
