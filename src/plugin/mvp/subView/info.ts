import EventEmitter from "event-emitter";

class Info {
  $slider: any;
  $container: any;
  $info: any;
  $infoValueFrom: any;
  $infoValueTo: any;
  emit: any;

  constructor($slider: any) {
    this.$slider = $slider;
  }

  public drawInfo() {
    let info = "<div class='slider__info'></div>";

    this.$container = this.$slider.find(".slider__container");

    this.$container.append(info);

    this.$info = this.$container.find(".slider__info");
  }

  public drawTipFrom() {
    let infoValueFrom = "<div class='slider__tip slider__tip_name-from'></div>";

    this.$info.append(infoValueFrom);

    this.$infoValueFrom = this.$container.find("slider__tip_name-from");
  }

  public drawTipTo() {
    let infoValueTo = "<div class='slider__tip slider__tip_name-to'></div>";

    this.$info.append(infoValueTo);

    this.$infoValueTo = this.$container.find("slider__tip_name-to");
  }
}

EventEmitter(Info.prototype);

export default Info;
