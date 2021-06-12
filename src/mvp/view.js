class View {
  constructor(element) {
    this.element = element;
  }

  init(isRange) {
    this.drawSlider();
    this.drawLine();
    this.drawDots(isRange);
  }

  drawSlider() {
    const slider = "<div class='slider'></div>";

    this.element.append(slider);
  }

  drawLine() {
    const line = "<div class='slider__line'></div>";

    this.element.find(".slider").append(line);
  }

  drawDots(isRange) {
    const dot = "<div class='slider__dot'></div>";

    this.element.find(".slider").append(dot);

    if (isRange) {
      this.element.find(".slider").prepend(dot);
    }
  }

  clearSlider() {
    this.element.find(".slider").empty();
  }
}

export default View;
