import './runner.scss';

import enums from '../../../enums/enums';

class Runner implements IRunner {
  private $runner: JQuery;

  private eventEmitter: IEventEmitter;

  private type: string;

  private $barContainer: JQuery;

  private isRender = false;

  private isMobile = false;

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

    // @ts-ignore
    this.isMobile = navigator.userAgentData.mobile;

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

    this.eventEmitter.emit(enums.EventNames.ChangedRunnerPosition, { position, type });
  };

  private attachEventMouseUp = (): void => {
    $(document).off('mousemove');
  };

  private getPosition(event: Event) {
    const { height, width, left, top } = this.$barContainer[0].getBoundingClientRect();

    // @ts-ignore
    const { clientX, clientY } = this.isMobile ? event.touches[0] : event;

    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    return { x, y };
  }
}

export default Runner;
