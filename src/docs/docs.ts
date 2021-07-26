import Panel from "./panel/panel";

import $ from "jquery";

import "../plugin/plugin";

import "./page/docs.scss";
import "./panel/panel.scss";

const slider = $(".js-panel__example").slider();

document.querySelectorAll(".panel__control").forEach((node, i) => {
  new Panel(node, slider[i]);
});
