import { EventEmitter, Callback } from '@helpers/EventEmitter';
import { Config, EventTypes, Options } from '@types';

import { Dom, Libs, SubViews } from './type';
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

  private libs: Libs;

  constructor(root: HTMLElement, config?: Config) {
    super();

    const { dom, subViews, libs } = this.init(root, config);

    this.dom = dom;
    this.subViews = subViews;
    this.libs = libs;
  }

  public updateLibs(config?: Config) {
    if (typeof config?.format === 'undefined') {
      return;
    }

    this.libs = { format: config.format };
  }

  public render(options: Options): void {
    this.props = calculateTarget(options);

    toggleVertical(this.dom, options.isVertical);

    this.subViews.bar.render();
    this.subViews.tip.render(options);
    this.subViews.runnerFrom.render(options);
    this.subViews.runnerTo.render(options);
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
  ): { dom: Dom; subViews: SubViews; libs: Libs } {
    const dom = createElements(root);

    const subViews = initSubViews(dom);

    this.subscribeToRunnerAndTip(subViews);

    const libs =
      typeof config?.format !== 'undefined'
        ? { format: config.format }
        : {
            format: (value: number): string => {
              return String(value);
            },
          };

    return { dom, subViews, libs };
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
    const from = this.libs.format(options.from);
    const to = this.libs.format(options.to);
    const ariaValueText = { from, to };

    this.subViews.tip.update(options, ariaValueText);
    this.subViews.range.update(options);
    this.subViews.runnerFrom.update(options, this.props.target, ariaValueText);
    this.subViews.runnerTo.update(options, this.props.target, ariaValueText);

    return this;
  }
}

export { View };
