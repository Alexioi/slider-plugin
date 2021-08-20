import EventEmitter from '../EventEmitter/EventEmitter';

import { IRunnerOptions } from '../interfaces/interfaces';

import Tip from './tip';

class Runner extends EventEmitter {
  private $bar: JQuery;

  private $runner: JQuery;

  private tip: Tip;

  constructor($bar: JQuery) {
    super();

    this.$bar = $bar;
    this.$runner = this.init();
    this.tip = new Tip(this.$runner);
  }

  public move({ value, isVertical, position }: IRunnerOptions): void {
    this.tip.setValue(value);

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

    this.emit('click', position);
  };

  private attachEventMouseUp = (): void => {
    $(document).off('mousemove');
  };

  private getPosition(event: any) {
    const x = event.pageX;
    const y = event.pageY;

    return { x, y };
  }
}

export default Runner;
