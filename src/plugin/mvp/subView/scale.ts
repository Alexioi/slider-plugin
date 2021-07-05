import EventEmitter from "event-emitter";

class Scale {
  $slider: any;
  $container: any;
  $scale: any;
  $serif: any;
  emit: any;

  constructor($slider: any) {
    this.$slider = $slider;
  }

  public drawScale() {
    let scale = "<div class='slider__scale'></div>";

    this.$container = this.$slider.find(".slider__container");

    this.$container.append(scale);

    this.$scale = this.$container.find(".slider__scale");
  }

  public drawSerif(counter: number) {
    let serif = `<span class='slider__serif'>${counter}</span>`;

    this.$scale.append(serif);

    this.$serif = this.$container.find(".slider__serif");
  }

  public moveLeftSerif(position: number) {
      this.$serif.last().css('left', position + '%')
  }

    public moveBottomSerif(position: number) {
        this.$serif.last().css('top', position + '%')
    }
}

EventEmitter(Scale.prototype);

export default Scale;
