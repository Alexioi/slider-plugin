import EventEmitter from "event-emitter";
import { event } from "jquery";

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

    this.$infoValueFrom = this.$container.find(".slider__tip_name-from");
  }

  public drawTipTo() {
    let infoValueTo = "<div class='slider__tip slider__tip_name-to'></div>";

    this.$info.append(infoValueTo);

    this.$infoValueTo = this.$container.find(".slider__tip_name-to");
  }

  public addValueTipFrom(value: number) {
    this.$infoValueFrom.text(value);
  }

  public addValueTipTo(value: number) {
    this.$infoValueTo.text(value);
  }

  public moveRightTips(positionFrom: number, positionTo: number) {
    if (typeof this.$infoValueFrom !== "undefined") {
      this.$infoValueFrom.css("left", positionFrom + "%");
    }
    if (typeof this.$infoValueTo !== "undefined") {
      this.$infoValueTo.css("left", positionTo + "%");
    }
  }

  public moveBottomTips(positionFrom: number, positionTo: number) {
    if (typeof this.$infoValueFrom !== "undefined") {
      this.$infoValueFrom.css("top", positionFrom + "%");
    }
    if (typeof this.$infoValueTo !== "undefined") {
      this.$infoValueTo.css("top", positionTo + "%");
    }
  }
}

EventEmitter(Info.prototype);

export default Info;
