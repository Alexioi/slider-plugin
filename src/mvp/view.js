class View {
  constructor(element) {
    this.element = element;
  }

  drawSlider() {
    const slider = `
      <div class='slider'>
        <div class='slider__dot slider__dot_from'></div>
        <div class='slider__line'></div>
        <div class='slider__dot slider__dot_to'></div>
      </div>
    `;

    this.element.append(slider);
  }

  displayFromDots() {
    const sliderDotFrom = this.element.find(".slider__dot_from");

    sliderDotFrom.css({ display: "block" });
  }

  hideFromDots() {
    const sliderDotFrom = this.element.find(".slider__dot_from");

    sliderDotFrom.css({ display: "none" });
  }
}

export default View;
