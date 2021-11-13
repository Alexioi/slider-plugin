import EventEmitter from '../EventEmitter/EventEmitter';

import Bar from './bar/bar';

import { IOptions } from '../interfaces/interfaces';
import Tip from './Tip/Tip';
import createElement from '../lib/createElement';
import Runner from './Runner/Runner';

class View {
  private bar: Bar;

  private tip: Tip;

  private $slider: JQuery;

  private runnerFrom: Runner;

  private runnerTo: Runner;

  private eventEmitter: EventEmitter;

  constructor(element: JQuery, eventEmitter: EventEmitter) {
    this.eventEmitter = eventEmitter;
    this.$slider = createElement(element, 'div', 'slider');
    this.tip = new Tip(this.$slider);
    this.bar = new Bar(this.$slider, this.eventEmitter);
    this.runnerFrom = new Runner('from', this.$slider, this.eventEmitter);
    this.runnerTo = new Runner('to', this.$slider, this.eventEmitter);
  }

  public update(options: IOptions): void {
    const { isVertical } = options;

    this.tip.update(options);

    if (isVertical) {
      this.addClassVertical();
    } else {
      this.removeClassVertical();
    }
    const sliderCharacterization = this.calculateSliderCharacterization(options);

    this.runnerFrom.setSliderCharacterization(sliderCharacterization);
    this.runnerTo.setSliderCharacterization(sliderCharacterization);

    this.bar.update(options);

    this.updateValue(options);
  }

  public updateValue({ from, to, min, max, isVertical }: IOptions) {
    const leftPosition = View.calculatePosition(from, min, max);
    const rightPosition = View.calculatePosition(to, min, max);

    this.runnerFrom.move({ isVertical, position: leftPosition });
    this.runnerTo.move({ isVertical, position: rightPosition });
  }

  public updatePositionFrom(options: IOptions): void {
    this.tip.changeValue(options);
    this.bar.updatePositionFrom(options);
  }

  public updatePositionTo(options: IOptions): void {
    this.tip.changeValue(options);
    this.bar.updatePositionTo(options);
  }

  private addClassVertical() {
    this.$slider.addClass('slider_vertical');
  }

  private removeClassVertical() {
    this.$slider.removeClass('slider_vertical');
  }

  private calculateSliderCharacterization({ isVertical }: IOptions) {
    if (isVertical) {
      const length = this.$slider.height()!;
      const offset = this.$slider.offset()!.top;

      return { length, offset };
    }

    const length = this.$slider.width()!;
    const offset = this.$slider.offset()!.left;

    return { length, offset };
  }

  private static calculatePosition(value: number, min: number, max: number) {
    return ((value - min) / (max - min)) * 100;
  }
}

export default View;
