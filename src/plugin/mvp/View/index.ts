import './view.scss';

import { EventTypes, IOptions } from '../../types';

import { EventEmitter } from '../../EventEmitter';
import { Dom, SubViews } from './type';
import { createElements, initSubViews } from './methods';
import { RunnerId } from './enums';

class View extends EventEmitter<EventTypes> {
  private dom: Dom;

  public subViews: SubViews;

  private target: 0 | 1 = 0;

  constructor(root: HTMLElement) {
    super();

    const { dom, subViews } = this.init(root);

    this.dom = dom;
    this.subViews = subViews;
  }

  public render(options: IOptions): void {
    this.switchTarget(options);

    const { isVertical, hasScale, min, max, isRange, hasTip } = options;

    if (isVertical) {
      this.dom.slider.classList.add('slider_vertical');
    } else {
      this.dom.slider.classList.remove('slider_vertical');
    }

    this.subViews.tip.render(hasTip, isRange, isVertical);
    this.subViews.runnerFrom.render(isRange);
    this.subViews.runnerTo.render(isRange);
    this.subViews.range.render();
    this.subViews.scale.render({ hasScale, min, max, isVertical });

    this.changeValues(options);
  }

  public changeValues(options: IOptions): void {
    const { min, max, isRange, isVertical, values } = options;
    const [from, to] = values;

    this.subViews.tip.update({ min, max, isRange, isVertical, from, to });
    this.subViews.range.update({ min, max, isVertical, isRange, from, to });
    this.subViews.runnerFrom.update({ isVertical, min, max, from, to });
    this.subViews.runnerTo.update({ isVertical, min, max, from, to });
  }

  private init(root: HTMLElement): { dom: Dom; subViews: SubViews } {
    const dom = createElements(root);
    const { target } = this;

    const subViews = initSubViews(dom, target);

    return { dom, subViews };
  }

  private switchTarget({ values, max, min }: IOptions): void {
    const { abs } = Math;
    const isToTarget = abs(min - values[RunnerId.From]) / abs(max - min) < 0.5;

    this.target = isToTarget ? 1 : 0;
  }
}

export { View };
