import './tip.scss';

class Tip {
  private $slider: JQuery;

  private $tipLine: JQuery;

  private $tipFrom: JQuery;

  private $tipTo: JQuery;

  private $tipBoth: JQuery;

  private isRenderTip = false;

  private isRenderRangeTip = false;

  private isRenderVerticalTip = false;

  constructor($slider: JQuery) {
    this.$slider = $slider;
    this.$tipLine = $('<div>', { class: 'slider__tip-line' });
    this.$tipFrom = $('<span>', { class: 'slider__tip' });
    this.$tipBoth = $('<span>', { class: 'slider__tip' });
    this.$tipTo = $('<span>', { class: 'slider__tip' });
  }

  public render(
    { from, to, isRange, isVertical }: any,
    leftPosition: number,
    rightPosition: number,
  ) {
    if (!this.isRenderTip) {
      this.$slider.prepend(this.$tipLine);
      this.$tipLine.append(this.$tipTo);
      this.isRenderTip = true;
    }

    if (isRange && !this.isRenderRangeTip) {
      this.$tipLine.append(this.$tipFrom);
      this.$tipLine.append(this.$tipBoth);
      this.isRenderRangeTip = true;
    }

    if (!isRange && this.isRenderRangeTip) {
      this.$tipFrom.remove();
      this.$tipBoth.remove();
      this.isRenderRangeTip = false;
    }

    if (isVertical && !this.isRenderVerticalTip) {
      this.$tipLine.addClass('slider__tip-line_vertical');
      this.isRenderVerticalTip = true;
    }

    if (!isVertical && this.isRenderVerticalTip) {
      this.$tipLine.removeClass('slider__tip-line_vertical');
      this.isRenderVerticalTip = false;
    }

    this.changePosition(leftPosition, rightPosition);
    this.toggleDisplay();
    this.changeText(from, to);
  }

  public destroy() {
    if (this.isRenderTip === false) {
      return;
    }

    this.$tipFrom.remove();
    this.$tipBoth.remove();
    this.$tipTo.remove();
    this.$tipLine.remove();
    this.isRenderRangeTip = false;
    this.isRenderTip = false;
  }

  private changePosition(leftPosition: number, rightPosition: number) {
    const positionRightTip = this.isRenderVerticalTip
      ? { left: '', top: `${rightPosition}%` }
      : { left: `${rightPosition}%`, top: '' };

    this.$tipTo.css(positionRightTip);

    if (!this.isRenderRangeTip) {
      return;
    }

    const positionLeftTip = this.isRenderVerticalTip
      ? { left: '', top: `${leftPosition}%` }
      : { left: `${leftPosition}%`, top: '' };

    const positionBothTip = this.isRenderVerticalTip
      ? { left: '', top: `${(leftPosition + rightPosition) / 2}%` }
      : { left: `${(leftPosition + rightPosition) / 2}%`, top: '' };

    this.$tipFrom.css(positionLeftTip);
    this.$tipBoth.css(positionBothTip);
  }

  private changeText(from: number, to: number) {
    this.$tipTo.text(to);

    if (!this.isRenderRangeTip) {
      return;
    }

    const bothText = from === to ? to : `${from} - ${to}`;

    this.$tipFrom.text(from);
    this.$tipBoth.text(bothText);
  }

  private toggleDisplay() {
    if (!this.isRenderRangeTip) {
      return;
    }

    const positionTipTo = this.$tipTo[0].getBoundingClientRect();
    const positionTipFrom = this.$tipFrom[0].getBoundingClientRect();

    const isTipFromOverlapsTipTo = this.isRenderVerticalTip
      ? positionTipFrom.y + positionTipFrom.height >= positionTipTo.y
      : positionTipFrom.x + positionTipFrom.width >= positionTipTo.x;

    if (isTipFromOverlapsTipTo) {
      this.$tipFrom.css({ visibility: 'hidden' });
      this.$tipTo.css({ visibility: 'hidden' });
      this.$tipBoth.css({ visibility: '' });
      return;
    }

    this.$tipFrom.css({ visibility: '' });
    this.$tipTo.css({ visibility: '' });
    this.$tipBoth.css({ visibility: 'hidden' });
  }
}

export default Tip;
