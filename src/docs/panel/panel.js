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
    this.tip = this.control.querySelector(".panel__tip-checkbox");
    this.numberMarks = this.control.querySelector(".panel__number-marks-checkbox");

    this.addEventHandler();
    this.verifyInput();
  }

  addEventHandler() {
    this.range.addEventListener("click", () => this.changeRange());
    this.vertical.addEventListener("click", () => this.changeVertical());
    this.min.addEventListener("input", () => this.changeMin());
    this.max.addEventListener("input", () => this.changeMax());
    this.from.addEventListener("input", () => this.changeFrom());
    this.to.addEventListener("input", () => this.changeTo());
    this.step.addEventListener("input", () => this.changeStep());
    this.tip.addEventListener("click", () => this.changeTip());
    this.numberMarks.addEventListener("input", () => this.changeNumberMarks());
  }

  changeRange() {
    if (this.range.checked) {
      this.slider.updateOptions({ isRange: true });
    } else {
      this.slider.updateOptions({ isRange: false });
    }

    this.verifyInput();
  }

  changeTip() {
    if (this.tip.checked) {
      this.slider.updateOptions({ hasTip: true });
    } else {
      this.slider.updateOptions({ hasTip: false });
    }

    this.verifyInput();
  }

  changeNumberMarks() {
      let value = Number(this.numberMarks.value);
      this.slider.updateOptions({ numberMarks: value });

      this.verifyInput();
    }

  changeVertical() {
    if (this.vertical.checked) {
      this.slider.updateOptions({ isVertical: true });
    } else {
      this.slider.updateOptions({ isVertical: false });
    }

    this.verifyInput();
  }

  changeMin() {
    let value = Number(this.min.value);
    this.slider.updateOptions({ min: value });

    this.verifyInput();
  }

  changeMax() {
    let value = Number(this.max.value);
    this.slider.updateOptions({ max: value });

    this.verifyInput();
  }

  changeFrom() {
    let value = Number(this.from.value);
    this.slider.updateOptions({ from: value });

    this.verifyInput();
  }

  changeTo() {
    let value = Number(this.to.value);
    this.slider.updateOptions({ to: value });

    this.verifyInput();
  }

  changeStep() {
    let value = Number(this.step.value);
    this.slider.updateOptions({ step: value });

    this.verifyInput();
  }

  verifyInput() {
    let options = this.slider.getOptions();

    this.range.checked = options.isRange;
    this.vertical.checked = options.isVertical;
    this.min.value = options.min;
    this.max.value = options.max;
    this.from.value = options.from;
    this.to.value = options.to;
    this.step.value = options.step;
    this.tip.checked = options.hasTip;
    this.numberMarks.value = options.numberMarks;
  }
}

const slider = $(".panel__example").slider({ hasTip: true });

document.querySelectorAll(".panel__control").forEach((node) => {
  new Panel(node, slider);
});
