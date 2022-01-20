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

  constructor(element: JQuery, eventEmitter: IEventEmitter) {
    this.$slider = createElement(element, 'div', 'slider');
    this.tip = new Tip(this.$slider);
    this.$barContainer = this.createBarContainer();
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
    const { isVertical, isRange, from, to, min, max, hasScale, hasTip } = options;
    const leftPosition = View.calculatePosition(from, min, max);
    const rightPosition = View.calculatePosition(to, min, max);

    if (isVertical) {
      this.addClassVertical();
    } else {
      this.removeClassVertical();
    }

    if (hasTip) {
      this.tip.render({ from, to, hasTip, isRange, isVertical }, leftPosition, rightPosition);
    } else {
      this.tip.destroy();
    }

    this.runnerFrom.update(isVertical, isRange, leftPosition);
    this.runnerTo.update(isVertical, isRange, rightPosition);
    if (isRange) {
      this.range.render({ isVertical, positions: [leftPosition, rightPosition] });
    } else {
      this.range.render({ isVertical, positions: [rightPosition] });
    }
    this.scale.update({ hasScale, isVertical, min, max });
  }

  public updatePositionFrom(options: IOptions): void {
    const { from, min, max, to, hasTip, isRange, isVertical } = options;
    const leftPosition = View.calculatePosition(from, min, max);
    const rightPosition = View.calculatePosition(to, min, max);

    if (hasTip) {
      this.tip.render({ from, to, hasTip, isRange, isVertical }, leftPosition, rightPosition);
    } else {
      this.tip.destroy();
    }

    this.runnerFrom.move({ position: leftPosition });
    if (isRange) {
      this.range.render({ isVertical, positions: [leftPosition, rightPosition] });
    } else {
      this.range.render({ isVertical, positions: [rightPosition] });
    }
  }

  public updatePositionTo(options: IOptions): void {
    const { from, to, hasTip, isRange, min, max, isVertical } = options;
    const leftPosition = View.calculatePosition(from, min, max);
    const rightPosition = View.calculatePosition(to, min, max);

    if (hasTip) {
      this.tip.render({ from, to, hasTip, isRange, isVertical }, leftPosition, rightPosition);
    } else {
      this.tip.destroy();
    }

    this.runnerTo.move({ position: rightPosition });
    if (isRange) {
      this.range.render({ isVertical, positions: [leftPosition, rightPosition] });
    } else {
      this.range.render({ isVertical, positions: [rightPosition] });
    }
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
