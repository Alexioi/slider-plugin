import './view.scss';

import { IOptions, ITarget } from '../../types/types';

import Tip from './Tip/Tip';
import Runner from './Runner/Runner';
import Range from './Range/Range';
import Scale from './Scale/Scale';
import EventEmitter from '../../EventEmitter/EventEmitter';

class View {
  private root: HTMLElement;

  private barContainer: HTMLDivElement;

  private range: Range;

  private tip: Tip;

  private slider: HTMLDivElement;

  private runnerFrom: Runner;

  private runnerTo: Runner;

  private scale: Scale;

  private isRender = false;

  private options: IOptions;

  private target: ITarget = { value: 'to' };

  constructor(node: HTMLElement, eventEmitter: EventEmitter, options: IOptions) {
    this.options = options;
    this.root = node;

    const isFrom = this.options.from < (this.options.max - this.options.min) / 2;

    this.target.value = isFrom ? 'to' : 'from';

    this.slider = document.createElement('div');
    this.slider.classList.add('slider');

    this.barContainer = document.createElement('div');
    this.barContainer.classList.add('slider__bar-container');

    this.tip = new Tip(this.slider);
    this.range = new Range(this.barContainer);
    this.scale = new Scale(this.slider, eventEmitter);
    this.runnerFrom = new Runner(
      this.barContainer,
      this.options,
      eventEmitter,
      'from',
      this.target,
    );
    this.runnerTo = new Runner(this.barContainer, this.options, eventEmitter, 'to', this.target);
  }

  public render(options: IOptions): void {
    const { isVertical, isRange, from, to, min, max, hasScale, hasTip } = options;

    this.options = options;
    if (!this.isRender) {
      this.root.appendChild(this.slider);
      this.slider.appendChild(this.barContainer);

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
      this.tip.render({ from, to, isRange, isVertical, leftPosition, rightPosition });
    } else {
      this.tip.destroy();
    }

    if (isRange) {
      this.runnerFrom.render(leftPosition);
      this.range.render({ isVertical, positions: [leftPosition, rightPosition] });
    } else {
      this.runnerFrom.destroy();
      this.range.render({ isVertical, positions: [rightPosition] });
    }

    this.runnerTo.render(rightPosition);

    if (hasScale) {
      this.scale.render({ min, max, isVertical });
    } else {
      this.scale.destroy();
    }
  }

  private addClassVertical() {
    this.slider.classList.add('slider_vertical');
  }

  private removeClassVertical() {
    this.slider.classList.remove('slider_vertical');
  }

  private static calculatePosition(value: number, min: number, max: number): number {
    return ((value - min) / (max - min)) * 100;
  }
}

export default View;
