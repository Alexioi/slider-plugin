import { ENameOfEvent } from '../../enums/enums';
import EventEmitter from '../../EventEmitter/EventEmitter';

import { IRunnerOptions } from '../../interfaces/interfaces';
import createElement from '../../lib/createElement';

class Runner {
  private $slider: JQuery;

  private $runner: JQuery;

  private eventEmitter: EventEmitter;

  private sliderWidth: number;

  private sliderMargin: number;

  private type: string;

  constructor(
    type: string,
    $slider: JQuery,
    eventEmitter: EventEmitter,
    sliderWidth: number,
    sliderMargin: number,
  ) {
    this.type = type;
    this.eventEmitter = eventEmitter;
    this.sliderWidth = sliderWidth;
    this.sliderMargin = sliderMargin;
    this.$slider = $slider;
    this.$runner = createElement(
      this.$slider,
      'div',
      'slider__runner',
      `slider__runner_type-${this.type}`,
    );
    this.attachEvents();
  }

  public move({ isVertical, position }: IRunnerOptions): void {
    if (isVertical) {
      this.moveVertically(position);
    } else {
      this.moveHorizontally(position);
    }
  }

  public hide(): void {
    this.$runner.css({ display: 'none' });
  }

  public show(): void {
    this.$runner.css({ display: '' });
  }

  public addClassTarget(): void {
    this.$runner.css({ 'z-index': 3 });
  }

  public removeClassTarget(): void {
    this.$runner.css({ 'z-index': '' });
  }

  private moveHorizontally(position: number) {
    this.$runner.css({ left: `${position}%`, top: '' });
  }

  private moveVertically(position: number) {
    this.$runner.css({ top: `${position}%`, left: '' });
  }

  private attachEvents() {
    this.$runner.on('dragstart', false);

    this.$runner.on('mousedown', this.attachEventMouseDown);
  }

  private attachEventMouseDown = (): void => {
    $(document).on('mousemove', this.attachEventMouseMove);
    $(document).on('mouseup', this.attachEventMouseUp);
  };

  private attachEventMouseMove = (): void => {
    const position = this.getPosition(event);

    if (this.type === 'from') {
      this.eventEmitter.emit(ENameOfEvent.ChangedRunnerFromPosition, position);
    }

    if (this.type === 'to') {
      this.eventEmitter.emit(ENameOfEvent.ChangedRunnerToPosition, position);
    }
  };

  private attachEventMouseUp = (): void => {
    $(document).off('mousemove');
  };

  private getPosition(event: any) {
    const x = (event.x - this.sliderMargin) / this.sliderWidth;
    const y = event.pageY;

    return { x, y };
  }
}

export default Runner;
