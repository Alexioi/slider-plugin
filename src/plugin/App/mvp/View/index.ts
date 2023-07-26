import { EventEmitter, Callback } from '@helpers/EventEmitter';
import { EventTypes, Options } from '@types';

import { Dom, SubViews } from './type';
import {
  calculateTarget,
  initSubViews,
  createElements,
  toggleVertical,
} from './methods';
import './view.scss';

class View extends EventEmitter<EventTypes> {
  private dom: Dom;

  private subViews: SubViews;

  private props: { target: 'from' | 'to' } = { target: 'from' };

  constructor(root: HTMLElement) {
    super();

    const { dom, subViews } = this.init(root);

    this.dom = dom;
    this.subViews = subViews;
  }

  public render(options: Options): void {
    const { isVertical, isRange } = options;

    this.props = calculateTarget(options);

    toggleVertical(this.dom, isVertical);

    this.subViews.tip.render(options);
    this.subViews.runnerFrom.render(isRange);
    this.subViews.runnerTo.render(isRange);
    this.subViews.range.render();
    this.subViews.scale.render(options);

    this.updateSubViews(options);
  }

  public update(options: Options): void {
    this.updateSubViews(options);
  }

  public subscribeSubCViewToEvents<K extends keyof EventTypes>(
    subName: 'tip' | 'runnerTo' | 'runnerFrom' | 'scale',
    eventName: K,
    callback: Callback<EventTypes, K>,
  ): void {
    this.subViews[subName].subscribe(eventName, callback);
  }

  private init(root: HTMLElement): { dom: Dom; subViews: SubViews } {
    const dom = createElements(root);

    const subViews = initSubViews(dom);

    this.subscribeToRunnerAndTip(subViews);

    return { dom, subViews };
  }

  private subscribeToRunnerAndTip({
    runnerFrom,
    runnerTo,
    tip,
  }: SubViews): View {
    const notifyAboutChangeRunnerPosition = ({
      type,
    }: {
      type: 'to' | 'from';
    }) => {
      this.props = { target: type };
    };

    runnerFrom.subscribe(
      'ChangeRunnerPosition',
      notifyAboutChangeRunnerPosition,
    );
    runnerTo.subscribe('ChangeRunnerPosition', notifyAboutChangeRunnerPosition);
    tip.subscribe('ChangeRunnerPosition', notifyAboutChangeRunnerPosition);

    return this;
  }

  private updateSubViews(options: Options): View {
    this.subViews.tip.update(options);
    this.subViews.range.update(options);
    this.subViews.runnerFrom.update(options, this.props.target);
    this.subViews.runnerTo.update(options, this.props.target);

    return this;
  }
}

export { View };
