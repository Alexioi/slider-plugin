import './runner.scss';

import { EventTypes, TouchRoute } from '../../../../types';
import { EventEmitter } from '../../../../EventEmitter';
import { helpers } from '../../../../helpers';
import { Dom, Props, UpdateOptions } from './type';
import {
  createElements,
  destroy,
  initProps,
  isRangeRenderedRunnerFrom,
  move,
  switchIsRender,
  toggleTarget,
} from './methods';

class Runner extends EventEmitter<EventTypes> {
  private dom: Dom;

  private props: Props;

  constructor(root: HTMLDivElement, type: 'from' | 'to') {
    super();

    this.handlePointerdownRunner = this.handlePointerdownRunner.bind(this);
    this.handleKeydownRunner = this.handleKeydownRunner.bind(this);

    const { dom, props } = this.init(root, type);

    this.dom = dom;
    this.props = props;
  }

  public render(isRange: boolean): void {
    if (isRangeRenderedRunnerFrom(this.props, isRange)) {
      destroy(this.dom, this.props);
      this.props = switchIsRender(this.props);
      return;
    }

    if (this.props.type === 'from' && !isRange) {
      return;
    }

    if (this.props.isRender) {
      return;
    }

    this.dom.root.appendChild(this.dom.runner);
    this.props = switchIsRender(this.props);
  }

  public update(options: UpdateOptions, target: 'from' | 'to') {
    toggleTarget(this.props, this.dom, target);
    move(this.dom, this.props, options);
  }

  private init(root: HTMLDivElement, valueIndex: 'from' | 'to'): { dom: Dom; props: Props } {
    const dom = createElements(root);
    const props = initProps(valueIndex);

    this.attachEventHandlers(dom);

    return { dom, props };
  }

  private attachEventHandlers(dom: Dom) {
    dom.runner.addEventListener('pointerdown', this.handlePointerdownRunner);
    dom.runner.addEventListener('keydown', this.handleKeydownRunner);
  }

  private handleKeydownRunner(keyboardEvent: KeyboardEvent): void {
    const { code } = keyboardEvent;

    const onClickArrow = (touchRoute: TouchRoute): void => {
      keyboardEvent.preventDefault();
      const { type } = this.props;

      this.emit('ChangedRunnerPositionStep', { type, touchRoute });
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

      const { type } = this.props;

      const position = helpers.getPosition(this.dom.root, pointerEvent);

      this.emit('ChangedRunnerPosition', { position, type });
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