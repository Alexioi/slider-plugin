class Runner {

    constructor(element) {
        this.element = element
    }

    draw () {
        const container = this.element.find('.slider__container')
        const runnerLeft = "<div class='slider__runner slider__runner_position-left'><div class='slider__info'></div></div>"
        const runnerRight = "<div class='slider__runner slider__runner_position-right'><div class='slider__info'></div></div>"

        container.append(runnerLeft)
        container.append(runnerRight)

        this.$runnerLeft = this.element.find('.slider__runner_position-left')
        this.$runnerRight = this.element.find('.slider__runner_position-right')
    }
   

    update(left, right) {
        this.$runnerLeft.css('margin-left', left + '%')
        this.$runnerRight.css('margin-left', right + "%")
    } 

    hideLeftRunner() {
        this.$runnerLeft.css('display', 'none')
    }

    displayLeftRunner() {
        this.$runnerLeft.css('display', 'block')
    }
}

export default Runner;