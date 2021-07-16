import EventEmitter from "event-emitter";

class Runner {
  $bar: JQuery;
  $runnerFrom: JQuery;
  $runnerTo: JQuery;
  emit: any;
  on: any;

  constructor($bar: JQuery) {
    this.$bar = $bar;
    this.$runnerFrom = this.initRunner('from');
    this.$runnerTo =  this.initRunner('to');
  }

  public moveRunnerFrom(position: number) {
    this.$runnerFrom.css({left: `${position}%`,
                          top: ''});
  }

  public moveRunnerTo(position: number) {
    this.$runnerTo.css({left: `${position}%`,
    top: ''});
  }

  public moveTopRunnerFrom(position: number) {
    this.$runnerFrom.css({top: `${position}%`,
    left: ""});
  }

  public moveTopRunnerTo(position: number) {
    this.$runnerTo.css({top: `${position}%`,
    left: ''});
  }

  private initRunner(name: string): JQuery {
    const runner = `<div class='slider__runner slider__runner_name-${name}'></div>`;

    this.$bar.append(runner);

    let $runner = this.$bar.find(`.slider__runner_name-${name}`);
    
    this.attachEventRunner($runner);

    return $runner
  }

   private attachEventRunner(node: JQuery) {
    let nodeName: string;

    nodeName = node.hasClass("slider__runner_name-from") ? "from" : "to";

   

    node.on("dragstart", () => false);

    node.on("mousedown", () => {
      $(document).on("mousemove", () => {
        this.emit("click", this.getPosition(event, nodeName));
      });
      $(document).on("mouseup", () => $(document).off("mousemove"));
    });
  }

    private getPosition(event: any, runnerName: string) {

    let x = event.pageX;
    let y = event.pageY;

    return {x, y, runnerName};
  }
}

EventEmitter(Runner.prototype);

export default Runner;