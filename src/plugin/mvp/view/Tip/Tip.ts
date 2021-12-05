import './tip.scss';

import createElement from '../../lib/createElement';

type tipOptions = {
  from: number;
  to: number;
  hasTip: boolean;
  isRange: boolean;
};

class Tip {
  private $tipLine: JQuery;

  private $tipFrom: JQuery;

  private $tipTo: JQuery;

  private $tipBoth: JQuery;

  constructor($slider: JQuery) {
    this.$tipLine = createElement($slider, 'div', 'slider__tip-line');
    this.$tipFrom = createElement(this.$tipLine, 'span', 'slider__tip');
    this.$tipBoth = createElement(this.$tipLine, 'span', 'slider__tip');
    this.$tipTo = createElement(this.$tipLine, 'span', 'slider__tip');
  }

  public update(
    { from, to, hasTip, isRange }: tipOptions,
    leftPosition: number,
    rightPosition: number,
  ) {
    this.changePosition(leftPosition, rightPosition);
    this.toggleDisplay(hasTip, isRange);
    this.changeText(from, to);
  }

  private changePosition(leftPosition: number, rightPosition: number) {
    this.$tipFrom.css({ left: `${leftPosition}%`, top: '' });
    this.$tipBoth.css({ left: `${(leftPosition + rightPosition) / 2}%`, top: '' });
    this.$tipTo.css({ left: `${rightPosition}%`, top: '' });
  }

  private changeText(from: number, to: number) {
    const bothText = from === to ? to : `${from} - ${to}`;

    this.$tipFrom.text(from);
    this.$tipTo.text(to);
    this.$tipBoth.text(bothText);
  }

  private toggleDisplay(hasTip: boolean, isRange: boolean) {
    const displayTip = hasTip ? '' : 'hidden';
    this.$tipLine.css({ visibility: displayTip });

    if (!isRange) {
      this.$tipFrom.css({ visibility: 'hidden' });
      this.$tipBoth.css({ visibility: 'hidden' });
      return;
    }

    if (this.$tipFrom.offset()!.left + this.$tipFrom.outerWidth()! >= this.$tipTo.offset()!.left) {
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
