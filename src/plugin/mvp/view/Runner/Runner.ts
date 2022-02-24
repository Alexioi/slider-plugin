import './runner.scss';

import ENamesOfEvents from '../../enums/enums';

class Runner implements IRunner {
  private $runner: JQuery;

  private eventEmitter: IEventEmitter;

  private type: string;

  private $barContainer: JQuery;

  private isRender = false;

  constructor(type: string, $barContainer: JQuery, eventEmitter: IEventEmitter) {
    this.type = type;
    this.$barContainer = $barContainer;
    this.eventEmitter = eventEmitter;
    this.$runner = $('<div>', { class: 'slider__runner' });
  }

  public render({ position, isVertical, zIndex }: IRunnerOptions) {
    if (!this.isRender) {
      this.$barContainer.append(this.$runner);
      this.$runner.on('dragstart', false);
      this.$runner.on('mousedown', this.attachEventMouseDown);
      this.isRender = true;
    }

    if (isVertical) {
      this.$runner.css({ top: `${position}%`, left: '' });
    } else {
      this.$runner.css({ left: `${position}%`, top: '' });
    }

    if (zIndex) {
      this.$runner.css({ zIndex: 3 });
    } else {
      this.$runner.css({ zIndex: 2 });
    }
  }

  public destroy() {
    if (this.isRender) {
      this.$runner.off('dragstart', 'mousedown');
      this.$runner.off('mousedown', this.attachEventMouseDown);
      this.$runner.detach();
      this.isRender = false;
    }
  }

  private attachEventMouseDown = (): void => {
    $(document).on('mousemove', this.attachEventMouseMove);
    $(document).on('mouseup', this.attachEventMouseUp);
  };

  private attachEventMouseMove = (): void => {
    const position = this.getPosition(<MouseEvent>event);

    const { type } = this;

    this.eventEmitter.emit(ENamesOfEvents.ChangedRunnerPosition, { position, type });
  };

  private attachEventMouseUp = (): void => {
    $(document).off('mousemove');
  };

  private getPosition(event: MouseEvent) {
    const { height, width, left, top } = this.$barContainer[0].getBoundingClientRect();

    const x = (event.clientX - left) / width;
    const y = (event.clientY - top) / height;

    return { x, y };
  }
}

export default Runner;