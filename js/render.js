import getCommentFooter from "./components/getAddCommentFooter.js";
import mapComments from "./lib/mapComments.js";

export default function render(appState) {
  console.count("render");
  document.querySelector("#root").innerHTML = "";
  mapComments(appState);
  getCommentFooter(appState);
}
