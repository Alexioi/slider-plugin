import EventEmitter from "event-emitter";

import Bar from "./bar";

import { IOptions, IPosition, IBar } from "../interfaces/interfaces";

class View {
  element: JQuery;
  bar: IBar;
  $slider: JQuery;
  emit: any;

  constructor(element: any) {
    this.element = element;
    this.$slider = this.initSlider();
    this.bar = new Bar(this.$slider);

    this.addEventEmitters();
  }

  public updateSlider(options: IOptions) {
    const { isVertical } = options;

    if (isVertical) {
      this.addClassVertical();
    } else {
      this.removeClassVertical();
    }

    this.bar.update(options);
  }

  public updatePositionFrom(options: IOptions) {
    this.bar.updatePositionFrom(options);
  }

  public updatePositionTo(options: IOptions) {
    this.bar.updatePositionTo(options);
  }

  private initSlider(): JQuery {
    const slider = "<div class='slider'></div>";

    this.element.append(slider);

    return this.element.find(".slider");
  }

  private addEventEmitters() {
    this.bar.on("click", (position: IPosition) => this.emit("click", position));

    //   this.scale.on("clickScale", (value: number) =>  this.emit("clickScale", value)
    //   );
  }

  private addClassVertical() {
    this.$slider.addClass("slider_vertical");
  }

  private removeClassVertical() {
    this.$slider.removeClass("slider_vertical");
  }
}

EventEmitter(View.prototype);

export default View;
