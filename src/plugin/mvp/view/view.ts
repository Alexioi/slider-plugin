import EventEmitter from '../EventEmitter/EventEmitter';

import Tip from './Tip/Tip';
import createElement from '../lib/createElement';
import Runner from './Runner/Runner';
import Range from './Range/Range';
import Scale from './Scale/Scale';

class View {
  private $barContainer: JQuery;

  private range: Range;

  private tip: Tip;

  private $slider: JQuery;

  private runnerFrom: Runner;

  private runnerTo: Runner;

  private scale: Scale;

  constructor(element: JQuery, eventEmitter: EventEmitter) {
    this.$slider = createElement(element, 'div', 'slider');
    this.$barContainer = this.createBarContainer();
    this.tip = new Tip(this.$slider);
    this.range = new Range(this.$barContainer);
    this.runnerFrom = new Runner('from', this.$barContainer, eventEmitter);
    this.runnerTo = new Runner('to', this.$barContainer, eventEmitter);
    this.scale = new Scale(this.$slider, eventEmitter);
  }

  private createBarContainer() {
    const element = '<div class="slider__bar-container"></div>';

    this.$slider.append(element);

    return this.$slider.find('.slider__bar-container');
  }

  public update(options: IOptions): void {
    const { isVertical, isRange, from, to, min, max, hasScale } = options;
    const leftPosition = View.calculatePosition(from, min, max);
    const rightPosition = View.calculatePosition(to, min, max);

    if (isVertical) {
      this.addClassVertical();
    } else {
      this.removeClassVertical();
    }

    this.runnerFrom.update(isVertical, isRange, leftPosition);
    this.runnerTo.update(isVertical, isRange, rightPosition);
    this.range.update({ isVertical, leftPosition, rightPosition });
    this.scale.update({ hasScale, isVertical, min, max });
  }

  public updatePositionFrom(options: IOptions): void {
    const { from, min, max, to, hasTip, isRange } = options;
    const leftPosition = View.calculatePosition(from, min, max);
    const rightPosition = View.calculatePosition(to, min, max);

    this.tip.update({ from, to, hasTip, isRange }, leftPosition, rightPosition);

    this.runnerFrom.move({ position: leftPosition });
    this.range.move({ leftPosition, rightPosition });
  }

  public updatePositionTo(options: IOptions): void {
    const { from, to, hasTip, isRange, min, max } = options;
    const leftPosition = View.calculatePosition(from, min, max);
    const rightPosition = View.calculatePosition(to, min, max);

    this.tip.update({ from, to, hasTip, isRange }, leftPosition, rightPosition);

    this.runnerTo.move({ position: rightPosition });
    this.range.move({ leftPosition, rightPosition });
  }

  private addClassVertical() {
    this.$slider.addClass('slider_vertical');
  }

  private removeClassVertical() {
    this.$slider.removeClass('slider_vertical');
  }

  private static calculatePosition(value: number, min: number, max: number) {
    return ((value - min) / (max - min)) * 100;
  }
}

export default View;
