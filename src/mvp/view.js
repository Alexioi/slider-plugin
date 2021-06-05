class View {
  constructor(element) {
    this.element = element;
  }

  addElement(options) {
    let elementContent = "";
    let isRange = options?.isRange || false;

    if (isRange) {
      elementContent = `
        <div class='slider'>
          <div class='slider__line'>
            <span class='slider__dot'></span>
            <span class='slider__dot slider__dot_align-right'></span>
          </div>
        </div>
      `;
    } else {
      elementContent = `
        <div class='slider'>
          <div class='slider__line'>
            <span class='slider__dot slider__dot_align-right'></span>
          </div>
        </div>
      `;
    }

    this.element.append(elementContent);
  }
}

export default View;
