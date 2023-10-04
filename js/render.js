import getCommentFooter from "./components/getAddCommentFooter.js";
import getCommentsStateConsole from "./components/getCommentsStateConsole.js";
import mapComments from "./lib/mapComments.js";

export default function render(appState) {
  console.count("render");
  document.querySelector("#comments").innerHTML = "";

  [mapComments, getCommentFooter, getCommentsStateConsole].forEach(
    (component) => component(appState)
  );
}
