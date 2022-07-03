import './runner.scss';

import { IRunnerOptions } from '../../../types/types';

import EventNames from '../../../types/enums';
import EventEmitter from '../../../EventEmitter/EventEmitter';
import SubView from '../SubView/SubView';

class Runner extends SubView {
  private runner: HTMLDivElement;

  private type: string;

  constructor(type: string, node: HTMLDivElement, eventEmitter: EventEmitter) {
    super(node, eventEmitter);

    this.type = type;

    this.runner = document.createElement('div');
    this.runner.classList.add('slider__runner');
  }

  public render({ position, isVertical, zIndex }: IRunnerOptions) {
    this.root.appendChild(this.runner);

    this.runner.addEventListener('pointerdown', this.attachEventMouseDown);

    let styleRunner = isVertical ? `top:${position}%;` : `left:${position}%;`;

    styleRunner += zIndex ? 'z-index: 3;' : 'z-index: 2;';

    this.runner.style.cssText = styleRunner;
  }

  public destroy() {
    this.runner.remove();
  }

  private attachEventMouseDown = (): void => {
    document.addEventListener('pointermove', this.attachEventMouseMove.bind(this));

    document.addEventListener('pointerup', this.attachEventMouseUp.bind(this));
  };

  private attachEventMouseMove(event: PointerEvent): void {
    event.preventDefault();
    this.runner.ondragstart = () => false;
    const position = SubView.getPosition(this.root, event);

    const { type } = this;

    this.eventEmitter.emit(EventNames.ChangedRunnerPosition, { position, type });
  }

  private attachEventMouseUp = (): void => {
    document.removeEventListener('pointermove', this.attachEventMouseMove.bind(this));
  };
}

export default Runner;
