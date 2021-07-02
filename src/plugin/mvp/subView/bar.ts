import EventEmitter from "event-emitter";

class Bar {
  container: any;
  $range: any;
  $bar: any;
  emit: any;

  constructor(container: any) {
    this.container = container;
  }

  draw() {
    const bar ="<div class='slider__bar'><div class='slider__range'></div></div>";

    this.container.append(bar);

    this.$range = this.container.find(".slider__range");
    this.$bar = this.container.find(".slider__bar");
  }

  public addClassVertical () {
    this.$bar.addClass('slider__bar_vertical')
  }

  public removeClassVertical () {
    this.$bar.removeClass('slider__bar_vertical')
  }
  
  public moveHorizonRange(width:number, left:number) {
    this.$range.css({ 
      'width': width + "%", 
      'height': '100%',
      "margin-top": '0%',
      "margin-left": left + "%" 
    });
  }

  public moveVerticalRange(width:number, left:number) {
    this.$range.css({ 
      'height': width + "%",
      'width': '100%', 
      "margin-left": "0%",
      "margin-top": left + 'px' 
    });
  }
}

EventEmitter(Bar.prototype);

export default Bar;
