import EventEmitter from "event-emitter";

import {IPosition} from "../interfaces/interfaces";

class Runner {
    container: any;
    $runnerFrom: any;
    $runnerTo: any;
    emit: any;

    constructor(container: any) {
        this.container = container;
    }

    public drawRunnerFrom() {
        const runnerFrom = "<div class='slider__runner slider__runner_name-from'></div>";

        this.container.append(runnerFrom);

        this.$runnerFrom = this.container.find(".slider__runner_name-from");

        this.attachEventRunner(this.$runnerFrom);
    }

    public drawRunnerTo() {
        const runnerTo = "<div class='slider__runner slider__runner_name-to'></div>";

        this.container.append(runnerTo);

        this.$runnerTo = this.container.find(".slider__runner_name-to");

        this.attachEventRunner(this.$runnerTo);
    }

    public destroyRunners () {
        if (typeof this.$runnerFrom !== 'undefined') {
            this.$runnerFrom.remove()
        }

        if (typeof this.$runnerTo !== 'undefined') {
            this.$runnerTo.remove()
        } 
    }

    private attachEventRunner(node: any) {
        let nodeName: string

        nodeName = node.hasClass('slider__runner_name-from') ? 'from': 'to'
       
        node.ondragstart = function() {
            return false;
        };

        node.on("mousedown", () => {
            $(document).on("mousemove", () => {
                this.emit("click", this.getPosition(event, nodeName));
            });
            $(document).on("mouseup", () => $(document).off("mousemove"));
        });
    }

    private getPosition(event: any, runnerName: string) {
        const position: IPosition = {x: 0, y: 0, name: ''};

        position.name = runnerName

        position.x = event.pageX;
        position.y = event.pageY;

        return position;
    }

    update(left: number, right: number, from: number, to: number) {
        this.$runnerFrom.css("margin-left", left + "%");
        this.$runnerTo.css("margin-left", right + "%");
    }

    updatePositionRunnerFrom() {

    }

    updatePositionRunnerTo() {

    }
}

EventEmitter(Runner.prototype);

export default Runner;
