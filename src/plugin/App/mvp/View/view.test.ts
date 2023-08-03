/**
 * @jest-environment jsdom
 */

import { View } from '.';
import { defaultConfig } from '../../sliderOptions';

describe('View', () => {
  const div = document.createElement('div');
  document.body.append(div);

  const view = new View(div);

  it('should render', () => {
    view.render({
      ...defaultConfig,
      hasScale: true,
      hasTip: true,
    });

    const slider = document.querySelector('.slider');

    if (slider === null) {
      fail('slider equal null');
    }

    expect(slider.querySelector('.slider__tip-line')).not.toBeNull();
    expect(slider.querySelector('.slider__runner')).not.toBeNull();
    expect(slider.querySelector('.slider__range')).not.toBeNull();
    expect(slider.querySelector('.slider__scale')).not.toBeNull();
  });

  it('should render vertical', () => {
    view.render({
      ...defaultConfig,
      isVertical: true,
    });

    const verticalSlider = document.querySelector('.slider_vertical');

    if (verticalSlider === null) {
      fail('slider equal null');
    }

    expect(verticalSlider.classList.contains('slider_vertical')).toBeTruthy();
  });
});
