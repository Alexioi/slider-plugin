import './runner.scss';

import { ENameOfEvent } from '../../enums/enums';
import EventEmitter from '../../EventEmitter/EventEmitter';

import { IRunnerOptions } from '../../interfaces/interfaces';
import createElement from '../../lib/createElement';

class Runner {
  private $runner: JQuery;

  private eventEmitter: EventEmitter;

  private type: string;

  private $slider: JQuery;

  constructor(type: string, $slider: JQuery, eventEmitter: EventEmitter) {
    this.type = type;
    this.$slider = $slider;
    this.eventEmitter = eventEmitter;
    this.$runner = createElement($slider, 'div', 'slider__runner');
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

  private calculateSliderCharacterization() {
    const height = this.$slider.height()!;
    const left = this.$slider.offset()!.left;
    const top = this.$slider.offset()!.top;
    const width = this.$slider.width()!;

    return { height, width, left, top };
  }

  private getPosition(event: any) {
    const { height, width, left, top } = this.calculateSliderCharacterization();

    const x = (event.x - left) / width;
    const y = (event.y - top) / height;

    return { x, y };
  }
}

export default Runner;
