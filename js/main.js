import getCommentFooter from "./components/getAddCommentFooter.js";
import getModal from "./components/getModal.js";
import mapComments from "./lib/mapComments.js";

(async function () {
  const data = await (await fetch("../data.json")).json();
  const appState = {
    selectedPostId: null,
    data: data,
    renderBoxBorders: false,
  };

  document.addEventListener("keydown", function (e) {
    if (e.key == ".") appState.renderBoxBorders = !appState.renderBoxBorders;

    document.querySelectorAll(".card").forEach((card) => {
      card.childNodes.forEach(
        (node) =>
          (node.style.border = appState.renderBoxBorders
            ? "1px dashed red"
            : "1px solid transparent")
      );
    });

    document.querySelector("#root").style.border = appState.renderBoxBorders
      ? "1px solid green"
      : "1px solid transparent";
  });

  getModal(appState);
  mapComments(appState);
  getCommentFooter(appState);
})();
