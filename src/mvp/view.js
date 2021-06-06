class View {
  constructor(element) {
    this.element = element;
  }

  drawElement(isRange) {
    let elementContent = `
        <div class='slider'>
          <div class='slider__line'>
            <span class='slider__dot slider__dot_align-right'></span>
          </div>
        </div>
      `;

    this.element.append(elementContent);

    if (isRange) {
      this.element
        .find(".slider__line")
        .prepend("<span class='slider__dot'></span>");
    }
  }
}

export default View;
