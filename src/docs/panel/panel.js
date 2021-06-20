class Panel {
  constructor(control, slider) {
    this.control = control;
    this.slider = slider;
    this.range = this.control.querySelector(".panel__range-checkbox");
    this.example = this.control.querySelector(".panel__example");

    this.addEventHandler();
  }

  addEventHandler() {
    this.range.addEventListener("click", () => this.changeRange());
  }

  changeRange() {
    if (this.range.checked) {
      this.slider.updateOptions({ isRange: true });
    } else {
      this.slider.updateOptions({ isRange: false });
    }
  }
}

const slider = $(".panel__example").slider({ isRange: true });

document.querySelectorAll(".panel__control").forEach((node) => {
  new Panel(node, slider);
});
