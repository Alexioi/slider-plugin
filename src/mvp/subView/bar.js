class Bar {

    constructor(element) {
        this.element = element
    }

    draw () {
        const container = this.element.find('.slider__container')
        const bar = "<div class='slider__bar'><div class='slider__range'></div></div>"

        container.append(bar)
    }
   

    update(width, left) {
        const range = this.element.find('.slider__range')

        range.css('width', width + "%")
        range.css('margin-left', left + '%')
    } 
}

export default Bar;