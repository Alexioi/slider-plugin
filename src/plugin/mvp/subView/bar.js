import EventEmitter from "event-emitter";

class Bar {
  constructor(container) {
    this.container = container;
  }

  draw() {
    const bar =
      "<div class='slider__bar'><div class='slider__range'></div></div>";

    this.container.append(bar);

    this.$range = this.container.find(".slider__range");
    this.$bar = this.container.find(".slider__bar");

    this.$bar.on("click", () => this.emit("click", this.getPosition(event)));
  }

  getPosition(event) {
    const position = {};

    position.x = event.pageX;
    position.y = event.pageY;

    return position;
  }

  update(width, left, isVertical) {
    if (isVertical) {
      this.$range.css({ height: width + "%", "margin-left": top + "%" });
    } else {
      this.$range.css({ width: width + "%", "margin-left": left + "%" });
    }
  }
}

EventEmitter(Bar.prototype);

export default Bar;
