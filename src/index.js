import "./style.scss";

import Model from "./MVP/model";
import View from "./MVP/view";

(function ($) {
  jQuery.fn.test = function () {
    this.append(
      `
      <div class='slider'>
        <div class='slider__line'>
          <span class='slider__dot'></span>
        </div>
        <div class='slider__line slider__line_align-right'>
          <span class='slider__dot slider__dot_align-right'></span>
        </div>  
      </div>  
      `
    );
  };
})(jQuery);
