import './runner.scss';

import { IOptions, ITarget } from '../../../types/types';

import EventNames from '../../../types/enums';
import EventEmitter from '../../../EventEmitter/EventEmitter';
import SubView from '../SubView/SubView';

class Runner extends SubView {
  private runner!: HTMLDivElement;

  private type: 'from' | 'to';

  private target: ITarget;

  constructor(
    node: HTMLDivElement,
    options: IOptions,
    eventEmitter: EventEmitter,
    type: 'from' | 'to',
    target: ITarget,
  ) {
    super(node, options, eventEmitter);

    this.type = type;
    this.target = target;

    this.init();
  }

  public render(): void {
    const { target, type } = this;
    const { isVertical } = this.options;

    this.root.appendChild(this.runner);

    if (target.value === type) {
      this.runner.classList.add('slider__runner_targeted');
    } else {
      this.runner.classList.remove('slider__runner_targeted');
    }

    const percent = this.calculatePercent(this.options[type]);
    const styleRunner = isVertical ? `top:${percent}%;` : `left:${percent}%;`;

    this.runner.style.cssText = styleRunner;
  }

  public destroy(): void {
    this.runner.remove();
  }

  private init(): void {
    this.runner = SubView.getElement('slider__runner');
    this.runner.addEventListener('pointerdown', this.attachEventOnPointerDown.bind(this));
  }

  private attachEventOnPointerDown(): void {
    const onPointerMove = (pointerEvent: PointerEvent): void => {
      pointerEvent.preventDefault();
      this.runner.ondragstart = () => false;

      const { type } = this;
      this.target.value = type;

      const position = SubView.getPosition(this.root, pointerEvent);
      this.eventEmitter.emit(EventNames.ChangedRunnerPosition, { position, type });
    };

    const onPointerUp = (): void => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
  }
}

export default Runner;
