class View {
  constructor(element) {
    this.element = element;
  }

  drawSlider(isRange) {
    const slider = `
      <div class='slider'>
        <div class='slider__dot slider__dot_from'></div>
        <div class='slider__line'></div>
        <div class='slider__dot slider__dot_to'></div>
      </div>
    `;

    this.element.append(slider);

    this.toggleFromDots(isRange);
  }

  toggleFromDots(isRange) {
    const sliderDotFrom = this.element.find(".slider__dot_from");

    if (isRange) {
      sliderDotFrom.css({ display: "block" });
    } else {
      sliderDotFrom.css({ display: "none" });
    }
  }

  drawSliderContent(isRange) {
    const line = "";
    const dot = "";

    this.clearSlider();

    this.element.find(".slider").append(line);
    this.element.find(".slider").append(dot);

    if (isRange) {
      this.element.find(".slider").append(dot);
    }
  }

  clearSlider() {
    this.element.find(".slider").empty();
  }
}

export default View;
