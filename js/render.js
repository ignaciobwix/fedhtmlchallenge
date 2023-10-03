import getCommentFooter from "./getAddCommentFooter.js";
import mapComments from "./mapComments.js";

export default function render(appState) {
  console.count("render");
  document.querySelector("#root").innerHTML = "";
  mapComments(appState);
  getCommentFooter(appState);
}
