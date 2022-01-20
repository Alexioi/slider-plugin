class Range {
  private $barContainer: JQuery;

  private $range: JQuery;

  private isRender = false;

  private isRenderVerticalView = false;

  constructor($barContainer: JQuery) {
    this.$barContainer = $barContainer;
    this.$range = $('<div>', { class: 'slider__range' });
  }

  public render({ isVertical, positions }: any) {
    if (!this.isRender) {
      this.$barContainer.append(this.$range);

      this.isRender = true;
    }

    if (isVertical && !this.isRenderVerticalView) {
      this.$range.css({
        top: '',
        bottom: '',
      });

      this.isRenderVerticalView = true;
    }

    if (!isVertical && this.isRenderVerticalView) {
      this.$range.css({
        left: '',
        right: '',
      });

      this.isRenderVerticalView = false;
    }

    const startPosition = positions.length === 1 ? '0%' : `${positions[0]}%`;
    const finishPosition =
      positions.length === 1 ? `${100 - positions[0]}%` : `${100 - positions[1]}%`;

    if (this.isRenderVerticalView) {
      this.$range.css({
        top: startPosition,
        bottom: finishPosition,
      });
    } else {
      this.$range.css({
        left: startPosition,
        right: finishPosition,
      });
    }
  }
}

export default Range;
