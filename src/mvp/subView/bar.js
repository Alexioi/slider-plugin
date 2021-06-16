import EventEmitter from "event-emitter";

class Bar {

    constructor(element) {
        this.element = element

        this.addEventEmitters()
    }

    addEventEmitters() {
        this.on("test", () =>
          this.test()
        );
      }

    test () {
        console.log('test')
    }

}

EventEmitter(Bar.prototype);

export default Bar;