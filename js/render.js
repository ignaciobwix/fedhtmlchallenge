import getCommentFooter from "./components/getAddCommentFooter.js";
import getCommentsStateConsole from "./components/getCommentsStateConsole.js";
import getModal from "./components/getModal.js";
import mapComments from "./lib/mapComments.js";

export default function render(appState) {
  document.querySelector("#comments").innerHTML = "";

  [getModal, mapComments, getCommentFooter, getCommentsStateConsole].forEach(
    (component) => component(appState)
  );
}
