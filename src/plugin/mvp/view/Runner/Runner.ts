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

  private init() {
    this.runner = SubView.getElement('slider__runner');
    this.runner.addEventListener('pointerdown', this.attachEventOnMouseDown.bind(this));
  }

  public render(position: number) {
    const { isVertical } = this.options;
    const { target, type } = this;

    this.root.appendChild(this.runner);

    let styleRunner = isVertical ? `top:${position}%;` : `left:${position}%;`;

    styleRunner += target.value === type ? 'z-index: 3;' : 'z-index: 2;';

    this.runner.style.cssText = styleRunner;
  }

  public destroy() {
    this.runner.remove();
  }

  private attachEventOnMouseDown(): void {
    const onMouseMove = (event: PointerEvent) => {
      event.preventDefault();
      this.runner.ondragstart = () => false;

      const { type } = this;

      this.target.value = type;

      const position = SubView.getPosition(this.root, event);

      this.eventEmitter.emit(EventNames.ChangedRunnerPosition, { position, type });
    };

    const onMouseUp = () => {
      document.removeEventListener('pointermove', onMouseMove);
      document.removeEventListener('pointerup', onMouseUp);
    };

    document.addEventListener('pointermove', onMouseMove);

    document.addEventListener('pointerup', onMouseUp);
  }
}

export default Runner;
