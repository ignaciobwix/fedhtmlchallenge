import getCommentFooter from "./components/getAddCommentFooter.js";
import getCommentsStateConsole from "./components/getCommentsStateConsole.js";
import getModal from "./components/getModal.js";
import mapComments from "./lib/mapComments.js";

export default function render(appState) {
  const comments = document.querySelector("#comments");
  comments.innerHTML = "";

  [getModal, mapComments, getCommentFooter, getCommentsStateConsole].forEach(
    (component) => component(appState)
  );

  if (comments.lastChild) {
    comments.lastChild.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
}
