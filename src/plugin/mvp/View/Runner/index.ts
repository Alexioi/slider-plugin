import './runner.scss';

import { EventTypes, IOptions, ITarget, TouchRoute } from '../../../types';

import { EventEmitter } from '../../../EventEmitter';
import { helpers } from '../../../helpers';

class Runner {
  private runner: HTMLDivElement | null = null;

  private valueIndex: 0 | 1;

  private target: ITarget;

  private isRender = false;

  private eventEmitter: EventEmitter<EventTypes>;

  private options: IOptions;

  private root: Element;

  constructor(
    root: Element,
    options: IOptions,
    eventEmitter: EventEmitter<EventTypes>,
    valueIndex: 0 | 1,
    target: ITarget,
  ) {
    this.root = root;

    this.options = options;

    this.eventEmitter = eventEmitter;

    this.valueIndex = valueIndex;
    this.target = target;

    this.init();
  }

  public render(): void {
    const { target, valueIndex: typeIndex } = this;
    const { isVertical } = this.options;

    if (this.runner instanceof HTMLElement) {
      if (!this.isRender) {
        this.root.appendChild(this.runner);
        this.isRender = true;
      }

      if (target.valueIndex === typeIndex) {
        this.runner.classList.add('slider__runner_targeted');
      } else {
        this.runner.classList.remove('slider__runner_targeted');
      }

      const percent = helpers.calculatePercent(
        this.options.values[typeIndex],
        this.options.min,
        this.options.max,
      );
      const styleRunner = isVertical ? `top:${percent}%;` : `left:${percent}%;`;

      this.runner.style.cssText = styleRunner;
    }
  }

  public destroy(): void {
    this.runner?.remove();
    this.isRender = false;
  }

  private init(): void {
    this.runner = helpers.createElement('slider__runner');
    this.runner.setAttribute('tabindex', '0');
    this.runner.addEventListener('pointerdown', this.attachEventOnPointerDown.bind(this));
    this.runner.addEventListener('keydown', this.attachEventOnPressingKeyboard.bind(this));
  }

  private attachEventOnPressingKeyboard(keyboardEvent: KeyboardEvent): void {
    const { code } = keyboardEvent;
    const { valueIndex } = this;

    const onClickArrow = (touchRoute: TouchRoute): void => {
      keyboardEvent.preventDefault();
      this.target.valueIndex = valueIndex;
      this.eventEmitter.emit('ChangedRunnerPositionStep', { valueIndex, touchRoute });
    };

    if (code === 'ArrowUp' || code === 'ArrowRight') {
      onClickArrow('up');
    }

    if (code === 'ArrowDown' || code === 'ArrowLeft') {
      onClickArrow('down');
    }
  }

  private attachEventOnPointerDown(): void {
    const onPointerMove = (pointerEvent: PointerEvent): void => {
      pointerEvent.preventDefault();
      if (this.runner === null) {
        return;
      }

      this.runner.ondragstart = () => false;

      const { valueIndex } = this;

      this.target.valueIndex = valueIndex;

      const position = helpers.getPosition(this.root, pointerEvent, this.options.isVertical);

      this.eventEmitter.emit('ChangedRunnerPosition', { position, valueIndex });
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
