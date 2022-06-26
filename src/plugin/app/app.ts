import EventEmitter from '../EventEmitter/EventEmitter';
import Model from '../mvp/model/model';
import View from '../mvp/view/view';
import Presenter from '../mvp/presenter/presenter';
import sliderOptions from './sliderOptions';

class App implements IApp {
  private callbacks: ICallbacks;

  private model: IModel;

  private view: View;

  private presenter: Presenter;

  private eventEmitter: EventEmitter;

  constructor(element: JQuery, config: IConfig | undefined) {
    this.callbacks = { ...sliderOptions.callbacks };

    this.eventEmitter = new EventEmitter();
    this.model = new Model(this.eventEmitter);
    this.view = new View(element, this.eventEmitter);
    this.presenter = new Presenter(this.view, this.model, this.eventEmitter);
    this.attachEventEmitters();

    this.update(config);
  }

  public update(config: IConfig | undefined): void {
    if (typeof config === 'undefined') {
      return;
    }

    if (typeof config.onChange !== 'undefined') {
      this.callbacks.onChange = config.onChange;
    }

    this.presenter.updateOptions(config);
  }

  public getOptions(): IOptions {
    return this.presenter.getOptions();
  }

  private attachEventEmitters(): void {
    this.eventEmitter.subscribe('onChange', (options: IOptions) => {
      this.callbacks.onChange(options);
    });
  }
}

export default App;
