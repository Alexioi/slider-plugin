import EventEmitter from "event-emitter";

import Bar from "./subView/bar";
import Runner from "./subView/runner";


class View {
  constructor(element) {
    this.element = element;

    this.initSubView();
    this.addEventEmitters();
  }

  initSubView() {
    this.bar = new Bar(this.element)
    this.runner = new Runner(this.element)
  }

  addEventEmitters() {
    this.bar.on("click", (x, y) =>
      this.emit("click", x, y)
    );
  }

  draw() {
    const sliderContainer = "<div class='slider__container'></div>"

    this.element.append(sliderContainer);

    this.bar.draw()
    this.runner.draw()
  }

  update(options) {
    const {
      isRange,
      isVertical, 
      step,
      min,
      max,  
      from, 
      to,
    } = options

    let leftPosition = 0
    let widthBar = 0
    let rightPosition 

    rightPosition = to / (max - min) * 100 
    
    if (isRange) {
      leftPosition = from / (max - min) * 100 
      widthBar = (to - from) / (max - min) * 100 
      this.runner.displayLeftRunner()
    } else {
      leftPosition = 0
      widthBar =  to / (max - min) * 100 
      this.runner.hideLeftRunner()
    }
    
    this.bar.update(widthBar, leftPosition)
    this.runner.update(leftPosition, rightPosition)
  }
}

EventEmitter(View.prototype);

export default View;
