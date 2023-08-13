import { EventEmitter } from '@helpers/EventEmitter';
import { ElementTouch, EventTypes, Options } from '@types';

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

  constructor(root: HTMLElement) {
    super();

    const { dom, subViews } = this.init(root);

    this.dom = dom;
    this.subViews = subViews;
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

  private init(root: HTMLElement): { dom: Dom; subViews: SubViews } {
    const dom = createElements(root);

    const subViews = initSubViews(dom);

    this.attachEventEmittersToSubView(subViews);

    return { dom, subViews };
  }

  private attachEventEmittersToSubView({
    runnerFrom,
    runnerTo,
    tip,
    bar,
    scale,
  }: SubViews): View {
    const notifyAboutChangeRunnerPosition = ({
      position,
      type,
    }: {
      position: { x: number; y: number };
      type: 'to' | 'from';
    }) => {
      this.props = { target: type };
      this.emit('ChangeRunnerPosition', { position, type });
    };

    const notifyAboutBarClick = ({
      position,
    }: {
      position: { x: number; y: number };
    }) => {
      this.emit('ChangeNearRunnerPosition', { position });
    };

    const notifyClickedScale = ({ targetNumber }: { targetNumber: number }) => {
      this.emit('ClickScale', { targetNumber });
    };

    const notifyAboutTouchValue = ({ type, touchRoute }: ElementTouch) => {
      this.emit('ChangeRunnerPositionByStep', { type, touchRoute });
    };

    const notifyAboutChangeNearRunnerPosition = ({
      position,
    }: {
      position: { x: number; y: number };
    }) => {
      this.emit('ChangeNearRunnerPosition', { position });
    };

    runnerFrom.subscribe(
      'ChangeRunnerPosition',
      notifyAboutChangeRunnerPosition,
    );
    runnerTo.subscribe('ChangeRunnerPosition', notifyAboutChangeRunnerPosition);
    runnerFrom.subscribe('ChangeRunnerPositionByStep', notifyAboutTouchValue);
    runnerTo.subscribe('ChangeRunnerPositionByStep', notifyAboutTouchValue);

    tip.subscribe('ChangeRunnerPosition', notifyAboutChangeRunnerPosition);
    tip.subscribe('ChangeRunnerPosition', notifyAboutChangeRunnerPosition);
    tip.subscribe(
      'ChangeNearRunnerPosition',
      notifyAboutChangeNearRunnerPosition,
    );

    bar.subscribe('ChangeNearRunnerPosition', notifyAboutBarClick);

    scale.subscribe('ClickScale', notifyClickedScale);

    return this;
  }

  private updateSubViews(options: Options): View {
    const from = options.format(options.from);
    const to = options.format(options.to);
    const ariaValueText = { from, to };

    this.subViews.tip.update(options, ariaValueText);
    this.subViews.range.update(options);
    this.subViews.runnerFrom.update(options, this.props.target, ariaValueText);
    this.subViews.runnerTo.update(options, this.props.target, ariaValueText);

    return this;
  }
}

export { View };
