import { EventTypes, TouchRoute } from '@types';
import { EventEmitter } from '@helpers/EventEmitter';
import { helpers } from '@helpers';

import { Dom, Props, UpdateOptions } from './type';
import {
  changeAria,
  createElements,
  destroy,
  initProps,
  move,
  toggleTarget,
} from './methods';
import './style.scss';

class Runner extends EventEmitter<EventTypes> {
  private dom: Dom;

  private props: Props;

  constructor(root: HTMLDivElement, type: 'from' | 'to') {
    super();

    this.handleRunnerPointerdown = this.handleRunnerPointerdown.bind(this);
    this.handleRunnerKeydown = this.handleRunnerKeydown.bind(this);

    const { dom, props } = this.init(root, type);

    this.dom = dom;
    this.props = props;
  }

  public render({
    isRange,
    isVertical,
    min,
    max,
  }: {
    isRange: boolean;
    isVertical: boolean;
    min: number;
    max: number;
  }): void {
    if (this.props.type === 'from' && !isRange) {
      destroy(this.dom);
      return;
    }

    changeAria(this.dom, isVertical, min, max);

    this.dom.root.append(this.dom.runner);
  }

  public update(
    options: UpdateOptions,
    target: 'from' | 'to',
    ariaValueText: { from: string; to: string },
  ) {
    toggleTarget(this.props, this.dom, target);
    move(this.dom, this.props, options, ariaValueText);
  }

  private init(
    root: HTMLDivElement,
    valueIndex: 'from' | 'to',
  ): { dom: Dom; props: Props } {
    const dom = createElements(root);
    const props = initProps(valueIndex);

    this.attachEventHandlers(dom);

    return { dom, props };
  }

  private attachEventHandlers(dom: Dom) {
    dom.runner.addEventListener('pointerdown', this.handleRunnerPointerdown);
    dom.runner.addEventListener('keydown', this.handleRunnerKeydown);
  }

  private handleRunnerPointerdown(): void {
    const handlePointerMove = (pointerEvent: PointerEvent): void => {
      pointerEvent.preventDefault();

      this.dom.runner.ondragstart = () => false;

      const { type } = this.props;

      const position = helpers.getPosition(this.dom.root, pointerEvent);

      this.emit('ChangeRunnerPosition', { position, type });
    };

    const handlePointerUp = (): void => {
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);
  }

  private handleRunnerKeydown(keyboardEvent: KeyboardEvent): void {
    const { code } = keyboardEvent;

    const handleArrowClick = (touchRoute: TouchRoute): void => {
      keyboardEvent.preventDefault();
      const { type } = this.props;

      this.emit('ChangeRunnerPositionByStep', { type, touchRoute });
    };

    if (code === 'ArrowDown' || code === 'ArrowRight') {
      handleArrowClick('up');
    }

    if (code === 'ArrowUp' || code === 'ArrowLeft') {
      handleArrowClick('down');
    }
  }
}

export { Runner };
