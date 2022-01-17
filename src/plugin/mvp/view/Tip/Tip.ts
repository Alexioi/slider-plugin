import './tip.scss';

class Tip {
  private $slider: JQuery;

  private $tipLine: JQuery;

  private $tipFrom: JQuery;

  private $tipTo: JQuery;

  private $tipBoth: JQuery;

  private isRender = false;

  constructor($slider: JQuery) {
    this.$slider = $slider;
    this.$tipLine = $('<div>', { class: 'slider__tip-line' });
    this.$tipFrom = $('<span>', { class: 'slider__tip' });
    this.$tipBoth = $('<span>', { class: 'slider__tip' });
    this.$tipTo = $('<span>', { class: 'slider__tip' });
  }

  public update(
    { from, to, hasTip, isRange, isVertical }: any,
    leftPosition: number,
    rightPosition: number,
  ) {
    if (!this.isRender) {
      this.$slider.prepend(this.$tipLine);
      this.$tipLine.append(this.$tipFrom);
      this.$tipLine.append(this.$tipBoth);
      this.$tipLine.append(this.$tipTo);
      this.isRender = true;
    }

    if (isVertical) {
      this.$tipLine.addClass('slider__tip-line_vertical');
    } else {
      this.$tipLine.removeClass('slider__tip-line_vertical');
    }

    this.changePosition(leftPosition, rightPosition, isVertical);
    this.toggleDisplay(hasTip, isRange, isVertical);
    this.changeText(from, to);
  }

  private changePosition(leftPosition: number, rightPosition: number, isVertical: boolean) {
    let positionLeftTip, positionBothTip, positionRightTip;

    if (isVertical) {
      positionLeftTip = { left: '', top: `${leftPosition}%` };
      positionBothTip = { left: '', top: `${(leftPosition + rightPosition) / 2}%` };
      positionRightTip = { left: '', top: `${rightPosition}%` };
    } else {
      positionLeftTip = { left: `${leftPosition}%`, top: '' };
      positionBothTip = { left: `${(leftPosition + rightPosition) / 2}%`, top: '' };
      positionRightTip = { left: `${rightPosition}%`, top: '' };
    }

    this.$tipFrom.css(positionLeftTip);
    this.$tipBoth.css(positionBothTip);
    this.$tipTo.css(positionRightTip);
  }

  private changeText(from: number, to: number) {
    const bothText = from === to ? to : `${from} - ${to}`;

    this.$tipFrom.text(from);
    this.$tipTo.text(to);
    this.$tipBoth.text(bothText);
  }

  private toggleDisplay(hasTip: boolean, isRange: boolean, isVertical: boolean) {
    const displayTip = hasTip ? '' : 'hidden';
    this.$tipLine.css({ visibility: displayTip });

    if (!isRange) {
      this.$tipFrom.css({ visibility: 'hidden' });
      this.$tipBoth.css({ visibility: 'hidden' });
      return;
    }

    const positionTipFrom = this.$tipFrom[0].getBoundingClientRect();
    const positionTipTo = this.$tipTo[0].getBoundingClientRect();
    const isTipFromOverlapsTipTo = isVertical
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
