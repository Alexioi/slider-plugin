import Presenter from "../presenter/presenter";

import {IOptions} from "../interfaces/interfaces"

class App {
    element: any;
    options: IOptions;
    presenter: any;

    constructor(element: any, options: IOptions) {
        this.element = element;
        this.options = options || {};
    
        this.init();
      }

      init() {
        const defaultOptions: IOptions = {
            isRange: true,
            isVertical: false,
            hasTip: false,
            hasScale: false,
            numberMarks: 10,
            step: 10,
            min: 0,
            max: 103,
            from: 40,
            to: 70,
          };

          this.presenter = new Presenter(this.element, this.options, defaultOptions)
      }

      updateOptions(options: IOptions) {
        this.presenter.updateOptions(options);
      }

      getOptions() {
        return this.presenter.getOptions()
      }
}

export default App