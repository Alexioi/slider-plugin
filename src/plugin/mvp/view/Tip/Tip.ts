import './tip.scss';

import { IOptions } from '../../interfaces/interfaces';
import createElement from '../../lib/createElement';

class Tip {
  private $slider: JQuery;

  private $tipLine!: JQuery;

  private $tipFrom!: JQuery;

  private $tipTo!: JQuery;

  private $tipBoth!: JQuery;

  constructor($slider: JQuery) {
    this.$slider = $slider;

    this.init();
  }

  public update = (options: IOptions) => {
    const { from, to, hasTip, isRange } = options;

    this.toggleDisplay(hasTip, isRange);
    this.changeText(from, to);
  };

  public changeValue = (options: IOptions) => {
    const { from, to } = options;

    this.changeText(from, to);
  };

  private init() {
    this.$tipLine = createElement(this.$slider, 'div', 'slider__tip-line');
    this.$tipFrom = createElement(this.$tipLine, 'span', 'slider__tip-from');
    this.$tipBoth = createElement(this.$tipLine, 'span', 'slider__tip-both');
    this.$tipTo = createElement(this.$tipLine, 'span', 'slider__tip-to');
  }

  private changeText(from: number, to: number) {
    this.$tipFrom.text(from);
    this.$tipTo.text(to);
    this.$tipBoth.text(`${from} - ${to}`);
  }

  private toggleDisplay(hasTip: boolean, isRange: boolean) {
    const displayTip = hasTip ? '' : 'none';
    const displayFromAndBoth = isRange ? '' : 'none';

    this.$tipLine.css({ display: displayTip });
    this.$tipFrom.css({ display: displayFromAndBoth });
    this.$tipBoth.css({ display: displayFromAndBoth });
  }
}

export default Tip;
