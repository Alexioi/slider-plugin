import './panel.scss';
import { App } from '../../plugin/App';
import { IConfig, IOptions } from '../../plugin/types';
import { searchElements, syncInputs } from './methods';
import { Dom } from './type';

class Panel {
  slider: App;

  private dom: Dom;

  constructor(root: Element, slider: App, config: IConfig) {
    this.slider = slider;

    const { dom } = this.init(root, config);

    this.dom = dom;

    this.attachCallback();
  }

  private init(root: Element, config: IConfig) {
    this.slider.update(config);
    const dom = searchElements(root);

    this.attachEventHandlers(dom);
    syncInputs(this.slider, dom);

    return { dom };
  }

  private attachCallback(): void {
    const that = this;

    this.slider.update({
      onChange: function onChange({ from, to }: IOptions) {
        that.dom.from.value = String(from);
        that.dom.to.value = String(to);
      },
    });
  }

  private attachEventHandlers(dom: Dom): void {
    const { range, vertical, scale, min, max, from, to, step, tip } = dom;

    range.addEventListener('click', this.changeCheckboxValue.bind(this, range, 'isRange'));
    vertical.addEventListener('click', this.changeCheckboxValue.bind(this, vertical, 'isVertical'));
    tip.addEventListener('click', this.changeCheckboxValue.bind(this, tip, 'hasTip'));
    scale.addEventListener('click', this.changeCheckboxValue.bind(this, scale, 'hasScale'));
    min.addEventListener('change', this.changeTextValue.bind(this, min, 'min'));
    max.addEventListener('change', this.changeTextValue.bind(this, max, 'max'));
    from.addEventListener('change', this.changeTextValue.bind(this, from, 'from'));
    to.addEventListener('change', this.changeTextValue.bind(this, to, 'to'));
    step.addEventListener('change', this.changeTextValue.bind(this, step, 'step'));
  }

  private changeCheckboxValue($node: HTMLInputElement, option: string) {
    const value = $node.checked;

    this.slider.update({ [option]: value });

    syncInputs(this.slider, this.dom);
  }

  private changeTextValue = ($node: HTMLInputElement, option: string): void => {
    if (option === 'from' || option === 'to') {
      const from = Number(this.dom.from.value);
      const to = Number(this.dom.to.value);

      this.slider.update({ from, to });
    } else {
      const value = Number($node.value);
      this.slider.update({ [option]: value });
    }

    syncInputs(this.slider, this.dom);
  };
}

export { Panel };
