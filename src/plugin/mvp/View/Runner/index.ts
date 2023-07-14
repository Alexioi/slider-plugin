import './runner.scss';

import { EventTypes, IOptions, ITarget, TouchRoute } from '../../../types/types';

import { EventEmitter } from '../../../EventEmitter';
import SubView from '../SubView';

class Runner extends SubView {
  private runner: HTMLDivElement | null = null;

  private valueIndex: 0 | 1;

  private target: ITarget;

  private isRender = false;

  constructor(
    root: Element,
    options: IOptions,
    eventEmitter: EventEmitter<EventTypes>,
    valueIndex: 0 | 1,
    target: ITarget,
  ) {
    super(root, options, eventEmitter);

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

      const percent = this.calculatePercent(this.options.values[typeIndex]);
      const styleRunner = isVertical ? `top:${percent}%;` : `left:${percent}%;`;

      this.runner.style.cssText = styleRunner;
    }
  }

  public destroy(): void {
    this.runner?.remove();
    this.isRender = false;
  }

  private init(): void {
    this.runner = SubView.getElement('slider__runner');
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

      const position = this.getPosition(this.root, pointerEvent);

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
