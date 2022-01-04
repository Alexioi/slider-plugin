import './runner.scss';

import { ENameOfEvent } from '../../enums/enums';
import EventEmitter from '../../EventEmitter/EventEmitter';

import createElement from '../../lib/createElement';

class Runner {
  private $runner: JQuery;

  private eventEmitter: EventEmitter;

  private type: string;

  private $barContainer: JQuery;

  private isVertical?: boolean;

  constructor(type: string, $barContainer: JQuery, eventEmitter: EventEmitter) {
    this.type = type;
    this.$barContainer = $barContainer;
    this.eventEmitter = eventEmitter;
    this.$runner = createElement($barContainer, 'div', 'slider__runner');
    this.attachEvents();
  }

  public update(isVertical: boolean, isRange: boolean, position: number) {
    this.isVertical = isVertical;
    if (!isRange && this.type === 'from') {
      this.hide();
    } else {
      this.show();
    }

    this.move({ position });
  }

  public move({ position }: { position: number }): void {
    if (this.isVertical) {
      this.$runner.css({ top: `${position}%`, left: '' });
    } else {
      this.$runner.css({ left: `${position}%`, top: '' });
    }
  }

  private hide(): void {
    this.$runner.css({ display: 'none' });
  }

  private show(): void {
    this.$runner.css({ display: '' });
  }

  public addClassTarget(): void {
    this.$runner.css({ 'z-index': 3 });
  }

  public removeClassTarget(): void {
    this.$runner.css({ 'z-index': '' });
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
    const height = this.$barContainer.height()!;
    const left = this.$barContainer.offset()!.left;
    const top = this.$barContainer.offset()!.top;
    const width = this.$barContainer.width()!;

    return { height, width, left, top };
  }

  private getPosition(event: any) {
    const { height, width, left, top } = this.calculateSliderCharacterization();

    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / height;

    return { x, y };
  }
}

export default Runner;
