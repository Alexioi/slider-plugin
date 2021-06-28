import EventEmitter from "event-emitter";
import {IPosition} from "../interfaces/interfaces";

class Runner {
    container: any;
    $runnerLeft: any;
    $runnerRight: any;
    $runner: any;
    $info: any;
    emit: any;

    constructor(container: any) {
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

        this.$runner = this.container.find(".slider__runner");

        this.$info = this.container.find(".slider__info");

        this.$runner.on("mousedown", () => {
            this.$runner.on("mousemove", () => {
                this.emit("click", this.getPosition(event));
                this.$runner.on("mouseover", () => $(document).off("mousemove"));
            });
        });
    }

    getPosition(event: any) {
        const position: IPosition = {x: 0, y: 0, name: ''};

        if (event.target.className.toString().indexOf('right') !== -1) {
            position.name = 'to'
        } else {
            position.name = 'from'
        }

        position.x = event.pageX;
        position.y = event.pageY;

        return position;
    }

    update(left: number, right: number, isVertical: number, from: number, to: number) {
        if (isVertical) {
            this.$runnerLeft.css("margin-top", left + "%");
            this.$runnerRight.css("margin-top", right + "%");
        } else {
            this.$runnerLeft.css("margin-left", left + "%");
            this.$runnerRight.css("margin-left", right + "%");
        }

        this.$info.first().text(from)
        this.$info.last().text(to)
    }

    hideLeftRunner() {
        this.$runnerLeft.css("display", "none");
    }

    displayLeftRunner() {
        this.$runnerLeft.css("display", "block");
    }
}

EventEmitter(Runner.prototype);

export default Runner;
