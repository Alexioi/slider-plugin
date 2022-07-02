import './runner.scss';

import { IRunnerOptions } from '../../../types/types';

import EventNames from '../../../types/enums';
import EventEmitter from '../../../EventEmitter/EventEmitter';

class Runner {
  private runner: HTMLDivElement;

  private eventEmitter: EventEmitter;

  private type: string;

  private root: HTMLDivElement;

  private isMobile = false;

  constructor(type: string, node: HTMLDivElement, eventEmitter: EventEmitter) {
    this.type = type;
    this.root = node;
    this.eventEmitter = eventEmitter;
    this.runner = document.createElement('div');
    this.runner.classList.add('slider__runner');
  }

  public static disableDragstart = () => {
    return false;
  };

  public render({ position, isVertical, zIndex }: IRunnerOptions) {
    this.root.appendChild(this.runner);
    this.runner.addEventListener('dragstart', Runner.disableDragstart);
    this.runner.addEventListener('mousedown', this.attachEventMouseDown);

    if (isVertical) {
      this.runner.style.cssText = `top:${position}%`;
    } else {
      this.runner.style.cssText = `left:${position}%`;
    }

    if (zIndex) {
      this.runner.style.cssText += 'z-index: 3';
    } else {
      this.runner.style.cssText += 'z-index: 2';
    }
  }

  public destroy() {}

  private attachEventMouseDown = (): void => {
    if (this.isMobile) {
      $(document).on('touchmove', this.attachEventMouseMove);
    } else {
      $(document).on('mousemove', this.attachEventMouseMove);
    }

    $(document).on('mouseup', this.attachEventMouseUp);
  };

  private attachEventMouseMove = (): void => {
    const position = this.getPosition(<MouseEvent>event);

    const { type } = this;

    this.eventEmitter.emit(EventNames.ChangedRunnerPosition, { position, type });
  };

  private attachEventMouseUp = (): void => {
    $(document).off('mousemove');
  };

  private getPosition(event: Event) {
    const { height, width, left, top } = this.root.getBoundingClientRect();

    // @ts-ignore
    const { clientX, clientY } = this.isMobile ? event.touches[0] : event;

    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    return { x, y };
  }
}

export default Runner;
