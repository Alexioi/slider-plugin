import './view.scss';

import { EventTypes, IOptions, ITarget } from '../../types';

import Tip from './Tip';
import Runner from './Runner';
import Range from './Range';
import Scale from './Scale';
import { EventEmitter } from '../../EventEmitter';
import { Dom } from './type';
import { createElements } from './methods';

class View extends EventEmitter<EventTypes> {
  private dom: Dom;

  public range: Range | null = null;

  public tip: Tip | null = null;

  private options: IOptions;

  public runnerFrom!: Runner;

  public runnerTo!: Runner;

  public scale!: Scale;

  private target: ITarget = { valueIndex: 0 };

  constructor(root: HTMLElement, options: IOptions) {
    super();

    this.options = options;

    const { dom } = this.init(root);

    this.dom = dom;

    this.render(options);
  }

  public render(options: IOptions): void {
    this.switchTarget(options);

    const { isVertical, hasScale } = options;

    if (isVertical) {
      this.dom.slider.classList.add('slider_vertical');
    } else {
      this.dom.slider.classList.remove('slider_vertical');
    }

    if (hasScale) {
      this.scale.render();
    } else {
      this.scale.destroy();
    }

    this.changeValues(options);
  }

  public changeValues(options: IOptions): void {
    this.options = options;
    const { isRange, hasTip } = options;

    if (hasTip) {
      this.tip?.render();
    } else {
      this.tip?.destroy();
    }

    this.range?.render();

    if (isRange) {
      this.runnerFrom.render();
    } else {
      this.runnerFrom.destroy();
    }

    this.runnerTo.render();
  }

  private init(root: HTMLElement): { dom: Dom } {
    const dom = createElements(root);
    const { options, target } = this;

    this.tip = new Tip(dom.slider, options, target);

    this.range = new Range(dom.barContainer, options);

    this.scale = new Scale(dom.slider, options);

    this.runnerFrom = new Runner(dom.barContainer, options, 0, target);

    this.runnerTo = new Runner(dom.barContainer, options, 1, target);

    return { dom };
  }

  private switchTarget({ values, max, min }: IOptions): void {
    const { abs } = Math;
    const isToTarget = abs(min - values[0]) / abs(max - min) < 0.5;

    this.target.valueIndex = isToTarget ? 1 : 0;
  }
}

export default View;
