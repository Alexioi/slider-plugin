class Panel {
  constructor(control, slider) {
    this.control = control;
    this.slider = slider;
    this.range = this.control.querySelector(".panel__range-checkbox");
    this.vertical = this.control.querySelector(".panel__vertical-checkbox");
    this.min = this.control.querySelector(".panel__min-checkbox");
    this.max = this.control.querySelector(".panel__max-checkbox");
    this.from = this.control.querySelector(".panel__from-checkbox");
    this.to = this.control.querySelector(".panel__to-checkbox");
    this.step = this.control.querySelector(".panel__step-checkbox");
    this.example = this.control.querySelector(".panel__example");

    this.addEventHandler();
  }

  addEventHandler() {
    this.range.addEventListener("click", () => this.changeRange());
    this.vertical.addEventListener("click", () => this.changeVertical());
    this.min.addEventListener("input", () => this.changeMin());
    this.max.addEventListener("input", () => this.changeMax());
    this.from.addEventListener("input", () => this.changeFrom());
    this.to.addEventListener("input", () => this.changeTo());
    this.step.addEventListener("input", () => this.changeStep());
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

  changeMin() {
    let value = Number(this.min.value)
    this.slider.updateOptions({ min: value });
  }

  changeMax() {
    let value = Number(this.max.value)
    this.slider.updateOptions({ max: value });
  }

  changeFrom() {
    let value = Number(this.from.value)
    this.slider.updateOptions({ from: value });
  }

  changeTo() {
    let value = Number(this.to.value)
    this.slider.updateOptions({ to: value });
  }

  changeStep() {
    let value = Number(this.step.value)
    this.slider.updateOptions({ step: value });
  }
}

const slider = $(".panel__example").slider({
  isRange: true,
  isVertical: false,
});

document.querySelectorAll(".panel__control").forEach((node) => {
  new Panel(node, slider);
});
