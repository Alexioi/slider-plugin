class Runner {
  constructor(container) {
    this.container = container;
  }

  draw() {
    const runnerLeft =
      "<div class='slider__runner slider__runner_position-left'><div class='slider__info'></div></div>";
    const runnerRight =
      "<div class='slider__runner slider__runner_position-right'><div class='slider__info'></div></div>";

    this.container.append(runnerLeft);
    this.container.append(runnerRight);

    this.$runnerLeft = this.container.find(".slider__runner_position-left");
    this.$runnerRight = this.container.find(".slider__runner_position-right");
  }

  update(left, right) {
    this.$runnerLeft.css("margin-left", left + "%");
    this.$runnerRight.css("margin-left", right + "%");
  }

  hideLeftRunner() {
    this.$runnerLeft.css("display", "none");
  }

  displayLeftRunner() {
    this.$runnerLeft.css("display", "block");
  }
}

export default Runner;
