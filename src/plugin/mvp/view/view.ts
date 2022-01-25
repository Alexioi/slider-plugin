import './view.scss';

import Tip from './Tip/Tip';
import Runner from './Runner/Runner';
import Range from './Range/Range';
import Scale from './Scale/Scale';

class View {
  private node: JQuery;

  private $barContainer: JQuery;

  private range: Range;

  private tip: Tip;

  private $slider: JQuery;

  private runnerFrom: Runner;

  private runnerTo: Runner;

  private scale: Scale;

  private isRender = false;

  constructor(node: JQuery, eventEmitter: IEventEmitter) {
    this.node = node;
    this.$slider = $('<div>', { class: 'slider' });
    this.$barContainer = $('<div>', { class: 'slider__bar-container' });
    this.tip = new Tip(this.$slider);
    this.range = new Range(this.$barContainer);
    this.runnerFrom = new Runner('from', this.$barContainer, eventEmitter);
    this.runnerTo = new Runner('to', this.$barContainer, eventEmitter);
    this.scale = new Scale(this.$slider, eventEmitter);
  }

  public render(
    { isVertical, isRange, from, to, min, max, hasScale, hasTip, step }: IOptions,
    whichRunnerChanged?: 'from' | 'to',
  ): void {
    if (!this.isRender) {
      this.node.append(this.$slider);
      this.$slider.append(this.$barContainer);
      this.isRender = true;
    }

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

    const [zIndexFrom, zIndexTO] = this.getRunnerZIndex(isRange, leftPosition, whichRunnerChanged);

    if (isRange) {
      this.runnerFrom.render({ position: leftPosition, isVertical, zIndex: zIndexFrom });
      this.range.render({ isVertical, positions: [leftPosition, rightPosition] });
    } else {
      this.runnerFrom.destroy();
      this.range.render({ isVertical, positions: [rightPosition] });
    }

    this.runnerTo.render({ position: rightPosition, isVertical, zIndex: zIndexTO });

    if (hasScale) {
      this.scale.render({ min, max, isVertical, step });
    } else {
      this.scale.destroy();
    }
  }

  private getRunnerZIndex(
    isRange: boolean,
    leftPosition: number,
    whichRunnerChanged?: 'from' | 'to',
  ): boolean[] {
    if (typeof whichRunnerChanged === 'undefined' && leftPosition > 50) {
      return [true, false];
    }

    if (!isRange) {
      return [false, true];
    }

    if (whichRunnerChanged === 'from') {
      return [true, false];
    }

    return [false, true];
  }

  private addClassVertical() {
    this.$slider.addClass('slider_vertical');
  }

  private removeClassVertical() {
    this.$slider.removeClass('slider_vertical');
  }

  private static calculatePosition(value: number, min: number, max: number): number {
    return ((value - min) / (max - min)) * 100;
  }
}

export default View;
