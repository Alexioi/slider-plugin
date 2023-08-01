import { EventTypes, TouchRoute } from '@types';
import { EventEmitter } from '@helpers/EventEmitter';
import { helpers } from '@helpers';

import { Dom, Props, UpdateOptions } from './type';
import {
  createElements,
  destroy,
  initProps,
  move,
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
    if (this.props.type === 'from' && !isRange) {
      destroy(this.dom);
      return;
    }

    this.dom.root.append(this.dom.runner);
  }

  public update(options: UpdateOptions, target: 'from' | 'to') {
    toggleTarget(this.props, this.dom, target);
    move(this.dom, this.props, options);
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
    dom.runner.addEventListener('pointerdown', this.handlePointerdownRunner);
    dom.runner.addEventListener('keydown', this.handleKeydownRunner);
  }

  private handleKeydownRunner(keyboardEvent: KeyboardEvent): void {
    const { code } = keyboardEvent;

    const handleClickArrow = (touchRoute: TouchRoute): void => {
      keyboardEvent.preventDefault();
      const { type } = this.props;

      this.emit('ChangeRunnerPositionByStep', { type, touchRoute });
    };

    if (code === 'ArrowDown' || code === 'ArrowRight') {
      handleClickArrow('up');
    }

    if (code === 'ArrowUp' || code === 'ArrowLeft') {
      handleClickArrow('down');
    }
  }

  private handlePointerdownRunner(): void {
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
}

export { Runner };
