import getCommentFooter from "./getAddCommentFooter.js";
import mapComments from "./mapComments.js";

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
            ? "1px solid red"
            : "none")
      );
    });
  });

  mapComments(appState);
  getCommentFooter(appState);
})();
