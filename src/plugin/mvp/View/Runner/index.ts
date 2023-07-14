import './runner.scss';

import { EventTypes, IOptions, ITarget, TouchRoute } from '../../../types';

import { EventEmitter } from '../../../EventEmitter';
import { helpers } from '../../../helpers';
import { Dom } from './type';
import { createElements } from './methods';

class Runner extends EventEmitter<EventTypes> {
  private dom: Dom;

  private valueIndex: 0 | 1;

  private target: ITarget;

  private isRender = false;

  private options: IOptions;

  constructor(root: HTMLDivElement, options: IOptions, valueIndex: 0 | 1, target: ITarget) {
    super();

    this.options = options;

    this.valueIndex = valueIndex;
    this.target = target;

    const { dom } = this.init(root);

    this.dom = dom;
  }

  public render(): void {
    const { target, valueIndex: typeIndex } = this;
    const { isVertical } = this.options;

    if (this.dom.runner instanceof HTMLElement) {
      if (!this.isRender) {
        this.dom.root.appendChild(this.dom.runner);
        this.isRender = true;
      }

      if (target.valueIndex === typeIndex) {
        this.dom.runner.classList.add('slider__runner_targeted');
      } else {
        this.dom.runner.classList.remove('slider__runner_targeted');
      }

      const percent = helpers.calculatePercent(
        this.options.values[typeIndex],
        this.options.min,
        this.options.max,
      );
      const styleRunner = isVertical ? `top:${percent}%;` : `left:${percent}%;`;

      this.dom.runner.style.cssText = styleRunner;
    }
  }

  public destroy(): void {
    this.dom.runner.remove();
    this.isRender = false;
  }

  private init(root: HTMLDivElement): { dom: Dom } {
    const dom = createElements(root);

    dom.runner.addEventListener('pointerdown', this.attachEventOnPointerDown.bind(this));
    dom.runner.addEventListener('keydown', this.attachEventOnPressingKeyboard.bind(this));

    return { dom };
  }

  private attachEventOnPressingKeyboard(keyboardEvent: KeyboardEvent): void {
    const { code } = keyboardEvent;
    const { valueIndex } = this;

    const onClickArrow = (touchRoute: TouchRoute): void => {
      keyboardEvent.preventDefault();
      this.target.valueIndex = valueIndex;
      this.emit('ChangedRunnerPositionStep', { valueIndex, touchRoute });
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

      this.dom.runner.ondragstart = () => false;

      const { valueIndex } = this;

      this.target.valueIndex = valueIndex;

      const position = helpers.getPosition(this.dom.root, pointerEvent, this.options.isVertical);

      this.emit('ChangedRunnerPosition', { position, valueIndex });
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
