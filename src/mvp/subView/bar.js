import EventEmitter from "event-emitter";

class Bar {
  constructor(element) {
    this.element = element;
  }

  draw() {
    this.$container = this.element.find(".slider__container");

    const bar =
      "<div class='slider__bar'><div class='slider__range'></div></div>";

    this.$container.append(bar);

    this.$range = this.element.find(".slider__range");
    this.$bar = this.element.find(".slider__bar");

    this.$bar.on("click", () => this.emit("click", this.getPosition(event)));
  }

  getPosition(event) {
    let clickX = event.pageX;
    let clickY = event.pageY;
    let barX = this.$bar.offset().left;
    let barY = this.$bar.offset().top;

    const position = {};

    position.x = clickX - barX;
    position.y = clickY - barY;
    position.barWidth = this.$bar.width();
    position.barHeight = this.$bar.height();

    return position;
  }

  update(width, left) {
    this.$range.css("width", width + "%");
    this.$range.css("margin-left", left + "%");
  }
}

EventEmitter(Bar.prototype);

export default Bar;
