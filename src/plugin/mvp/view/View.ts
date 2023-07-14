import './view.scss';

import { EventTypes, IOptions, ITarget } from '../../types/types';

import Tip from './Tip/Tip';
import Runner from './Runner/Runner';
import Range from './Range/Range';
import Scale from './Scale/Scale';
import { EventEmitter } from '../../EventEmitter';

class View {
  private root: HTMLElement;

  private options: IOptions;

  private eventEmitter: EventEmitter<EventTypes>;

  private barContainer: Element | null = null;

  private range: Range | null = null;

  private tip: Tip | null = null;

  private slider: Element | null = null;

  private runnerFrom!: Runner;

  private runnerTo!: Runner;

  private scale!: Scale;

  private target: ITarget = { valueIndex: 0 };

  constructor(root: HTMLElement, options: IOptions, eventEmitter: EventEmitter<EventTypes>) {
    this.root = root;
    this.options = options;
    this.eventEmitter = eventEmitter;

    this.init();
  }

  public render(options: IOptions): void {
    this.switchTarget(options);

    const { isVertical, hasScale } = options;

    if (isVertical) {
      this.slider?.classList.add('slider_vertical');
    } else {
      this.slider?.classList.remove('slider_vertical');
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

  private init(): void {
    this.createElements();
    const { eventEmitter, slider, barContainer, options, target } = this;

    if (slider === null || barContainer === null) {
      return;
    }

    this.tip = new Tip(slider, options, eventEmitter, target);

    this.range = new Range(barContainer, options, eventEmitter);

    this.scale = new Scale(slider, options, eventEmitter);

    this.runnerFrom = new Runner(barContainer, options, eventEmitter, 0, target);

    this.runnerTo = new Runner(barContainer, options, eventEmitter, 1, target);

    this.render(options);
  }

  private createElements(): void {
    this.slider = document.createElement('div');
    this.slider.classList.add('slider');

    this.barContainer = document.createElement('div');
    this.barContainer.classList.add('slider__bar-container');
    this.root.appendChild(this.slider);

    this.slider.appendChild(this.barContainer);
  }

  private switchTarget({ values, max, min }: IOptions): void {
    const { abs } = Math;
    const isToTarget = abs(min - values[0]) / abs(max - min) < 0.5;

    this.target.valueIndex = isToTarget ? 1 : 0;
  }
}

export default View;
