class Panel {
  constructor(control, slider) {
    this.control = control;
    this.slider = slider;
    this.range = this.control.querySelector(".panel__range-checkbox");
    this.vertical = this.control.querySelector(".panel__vertical-checkbox");
    this.example = this.control.querySelector(".panel__example");

    this.addEventHandler();
  }

  addEventHandler() {
    this.range.addEventListener("click", () => this.changeRange());
    this.vertical.addEventListener("click", () => this.changeVertical());
  }

  changeRange() {
    if (this.range.checked) {
      this.slider.updateOptions({ isRange: true });
    } else {
      this.slider.updateOptions({ isRange: false });
    }
  }

  changeVertical() {
    if (this.vertical.checked) {
      this.slider.updateOptions({ isVertical: true });
    } else {
      this.slider.updateOptions({ isVertical: false });
    }
  }
}

const slider = $(".panel__example").slider({
  isRange: true,
  isVertical: false,
});

document.querySelectorAll(".panel__control").forEach((node) => {
  new Panel(node, slider);
});
