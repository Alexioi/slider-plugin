import './runner.scss';

import { EventTypes, TouchRoute } from '../../../types';
import { EventEmitter } from '../../../EventEmitter';
import { helpers } from '../../../helpers';
import { Dom, Props } from './type';
import { createElements, initProps, switchIsRender } from './methods';

class Runner extends EventEmitter<EventTypes> {
  private dom: Dom;

  private props: Props;

  private isVertical = false;

  constructor(root: HTMLDivElement, valueIndex: 0 | 1, target: 0 | 1) {
    super();

    this.handlePointerdownRunner = this.handlePointerdownRunner.bind(this);
    this.handleKeydownRunner = this.handleKeydownRunner.bind(this);

    const { dom, props } = this.init(root, valueIndex, target);

    this.dom = dom;
    this.props = props;
  }

  public render(isRange: boolean): void {
    if (this.props.valueIndex === 0) {
      if (isRange === false && this.props.isRender !== false) {
        this.destroy();
        return;
      }
    }

    if (this.props.isRender) {
      return;
    }

    this.dom.root.appendChild(this.dom.runner);
    this.props = switchIsRender(this.props);
  }

  private destroy(): void {
    this.dom.runner.remove();
    this.props = switchIsRender(this.props);
  }

  private init(root: HTMLDivElement, valueIndex: 0 | 1, target: 0 | 1): { dom: Dom; props: Props } {
    const dom = createElements(root);
    const props = initProps(valueIndex, target);

    this.attachEventHandlers(dom);

    return { dom, props };
  }

  private attachEventHandlers(dom: Dom) {
    dom.runner.addEventListener('pointerdown', this.handlePointerdownRunner);
    dom.runner.addEventListener('keydown', this.handleKeydownRunner);
  }

  public update({
    isVertical,
    from,
    to,
    min,
    max,
  }: {
    isVertical: boolean;
    from: number;
    to: number;
    min: number;
    max: number;
  }) {
    const { target, valueIndex } = this.props;

    if (target === valueIndex) {
      this.dom.runner.classList.add('slider__runner_targeted');
    } else {
      this.dom.runner.classList.remove('slider__runner_targeted');
    }

    const value = this.props.valueIndex === 0 ? from : to;

    const percent = helpers.calculatePercent(value, min, max);
    const styleRunner = isVertical ? `top:${percent}%;` : `left:${percent}%;`;

    this.dom.runner.style.cssText = styleRunner;
  }

  private handleKeydownRunner(keyboardEvent: KeyboardEvent): void {
    const { code } = keyboardEvent;

    const onClickArrow = (touchRoute: TouchRoute): void => {
      keyboardEvent.preventDefault();
      const { valueIndex } = this.props;

      this.props.target = valueIndex;
      this.emit('ChangedRunnerPositionStep', { valueIndex, touchRoute });
    };

    if (code === 'ArrowUp' || code === 'ArrowRight') {
      onClickArrow('up');
    }

    if (code === 'ArrowDown' || code === 'ArrowLeft') {
      onClickArrow('down');
    }
  }

  private handlePointerdownRunner(): void {
    const onPointerMove = (pointerEvent: PointerEvent): void => {
      pointerEvent.preventDefault();

      this.dom.runner.ondragstart = () => false;

      const { valueIndex } = this.props;

      this.props.target = valueIndex;

      const position = helpers.getPosition(this.dom.root, pointerEvent, this.isVertical);

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

export { Runner };
