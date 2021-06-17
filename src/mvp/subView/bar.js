import EventEmitter from "event-emitter";

class Bar {

    constructor(element) {
        this.element = element
    }

    draw () {
        const container = this.element.find('.slider__container')
        const bar = "<div class='slider__bar'><div class='slider__range'></div></div>"

        container.append(bar)

        this.$range = this.element.find('.slider__range')
        this.$bar = this.element.find('.slider__bar')

        this.$bar.on('click', () => 
        this.emit('click', event.layerX, event.layerY))
    }
   

    update(width, left) {
        this.$range.css('width', width + "%")
        this.$range.css('margin-left', left + '%')
    } 
}

EventEmitter(Bar.prototype);

export default Bar;