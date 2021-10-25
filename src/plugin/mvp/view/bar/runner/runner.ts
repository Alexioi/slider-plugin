import { ENameOfEvent } from '../../../enums/enums';
import EventEmitter from '../../../EventEmitter/EventEmitter';

import { IRunnerOptions } from '../../../interfaces/interfaces';

import Tip from './tip/tip';

class Runner {
  private $bar: JQuery;

  private $runner: JQuery;

  private tip: Tip;

  private eventEmitter: EventEmitter;

  private sliderWidth: number;

  private sliderMargin: number;

  private type: string;

  constructor(
    type: string,
    $bar: JQuery,
    eventEmitter: EventEmitter,
    sliderWidth: number,
    sliderMargin: number,
  ) {
    this.type = type;
    this.eventEmitter = eventEmitter;
    this.sliderWidth = sliderWidth;
    this.sliderMargin = sliderMargin;
    this.$bar = $bar;
    this.$runner = this.init();
    this.tip = new Tip(this.$runner);
  }

  public move({ value, isVertical, position }: IRunnerOptions): void {
    this.tip.update(value);

    if (isVertical) {
      this.moveVertically(position);
    } else {
      this.moveHorizontally(position);
    }
  }

  public update(hasTip: boolean): void {
    if (hasTip) {
      this.tip.show();
    } else {
      this.tip.hide();
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

  private init(): JQuery {
    const runner = "<div class='slider__runner'></div>";

    this.$bar.append(runner);

    const $runner = this.$bar.find('.slider__runner').last();

    this.attachEvents($runner);

    return $runner;
  }

  private attachEvents(node: JQuery) {
    node.on('dragstart', false);

    node.on('mousedown', this.attachEventMouseDown);
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
