import './runner.scss';

import { ENameOfEvent } from '../../enums/enums';
import EventEmitter from '../../EventEmitter/EventEmitter';

import { IRunnerOptions, IOptions } from '../../interfaces/interfaces';
import createElement from '../../lib/createElement';

class Runner {
  private $slider: JQuery;

  private $runner: JQuery;

  private eventEmitter: EventEmitter;

  private type: string;

  private sliderCharacterization = { length: 0, offset: 0 };

  constructor(type: string, $slider: JQuery, eventEmitter: EventEmitter) {
    this.type = type;
    this.eventEmitter = eventEmitter;
    this.$slider = $slider;
    this.$runner = createElement(this.$slider, 'div', 'slider__runner');
    this.attachEvents();
  }

  public move({ isVertical, position }: IRunnerOptions): void {
    if (isVertical) {
      this.moveVertically(position);
    } else {
      this.moveHorizontally(position);
    }
  }

  public setSliderCharacterization(sliderCharacterization: { length: number; offset: number }) {
    this.sliderCharacterization = sliderCharacterization;
    console.log(sliderCharacterization);
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

  private calculateSliderCharacterization({ isVertical }: IOptions) {
    if (isVertical) {
      const length = this.$slider.height()!;
      const offset = this.$slider.offset()!.top;

      return { length, offset };
    }

    const length = this.$slider.width()!;
    const offset = this.$slider.offset()!.left;

    return { length, offset };
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
    const { length, offset } = this.sliderCharacterization;

    const x = (event.x - offset) / length;
    const y = (event.y - offset) / length;

    return { x, y };
  }
}

export default Runner;
