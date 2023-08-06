import { EventEmitter, Callback } from '@helpers/EventEmitter';
import { Config, EventTypes, Options } from '@types';

import { Dom, SubViews } from './type';
import {
  calculateTarget,
  initSubViews,
  createElements,
  toggleVertical,
} from './methods';
import './style.scss';

class View extends EventEmitter<EventTypes> {
  private dom: Dom;

  private subViews: SubViews;

  private props: { target: 'from' | 'to' } = { target: 'from' };

  constructor(root: HTMLElement, config?: Config) {
    super();

    const { dom, subViews } = this.init(root, config);

    this.dom = dom;
    this.subViews = subViews;
  }

  public updateLibs(config?: Config) {
    this.subViews.tip.updateLibs(config);
  }

  public render(options: Options): void {
    const { isVertical, isRange } = options;

    this.props = calculateTarget(options);

    toggleVertical(this.dom, isVertical);

    this.subViews.bar.render();
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
    subName: 'tip' | 'runnerTo' | 'runnerFrom' | 'scale' | 'bar',
    eventName: K,
    callback: Callback<EventTypes, K>,
  ): void {
    this.subViews[subName].subscribe(eventName, callback);
  }

  private init(
    root: HTMLElement,
    config?: Config,
  ): { dom: Dom; subViews: SubViews } {
    const dom = createElements(root);

    const subViews = initSubViews(dom, config);

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
