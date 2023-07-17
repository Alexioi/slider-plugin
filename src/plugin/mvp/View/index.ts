import './view.scss';

import { EventTypes, IOptions } from '../../types';

import { EventEmitter } from '../../EventEmitter';
import { Dom, SubViews } from './type';
import { calculateTarget, init } from './methods';

class View extends EventEmitter<EventTypes> {
  private dom: Dom;

  public subViews: SubViews;

  private props: { target: 'from' | 'to' } = { target: 'from' };

  constructor(root: HTMLElement) {
    super();

    const { dom, subViews } = init(root);

    this.dom = dom;
    this.subViews = subViews;

    this.subscribeToRunnerAndTip();
  }

  public render(options: IOptions): void {
    const { isVertical, hasScale, min, max, isRange, hasTip, values } = options;
    const [from] = values;

    if (isVertical) {
      this.dom.slider.classList.add('slider_vertical');
    } else {
      this.dom.slider.classList.remove('slider_vertical');
    }

    this.props = calculateTarget(from, min, max);

    this.subViews.tip.render(hasTip, isRange, isVertical);
    this.subViews.runnerFrom.render(isRange);
    this.subViews.runnerTo.render(isRange);
    this.subViews.range.render();
    this.subViews.scale.render({ hasScale, min, max, isVertical });

    this.update(options);
  }

  public update(options: IOptions): void {
    const { min, max, isRange, isVertical, values } = options;
    const [from, to] = values;

    this.subViews.tip.update({ min, max, isRange, isVertical, from, to });
    this.subViews.range.update({ min, max, isVertical, isRange, from, to });
    this.subViews.runnerFrom.update({ isVertical, min, max, from, to }, this.props.target);
    this.subViews.runnerTo.update({ isVertical, min, max, from, to }, this.props.target);
  }

  private subscribeToRunnerAndTip(): View {
    this.subViews.runnerFrom.subscribe(
      'ChangedRunnerPosition',
      ({ valueIndex }: { valueIndex: 'to' | 'from' }) => {
        this.props = { target: valueIndex };
      },
    );

    this.subViews.runnerTo.subscribe(
      'ChangedRunnerPosition',
      ({ valueIndex }: { valueIndex: 'to' | 'from' }) => {
        this.props = { target: valueIndex };
      },
    );

    return this;
  }
}

export { View };
