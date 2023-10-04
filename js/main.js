import getCommentFooter from "./components/getAddCommentFooter.js";
import getCommentsStateConsole from "./components/getCommentsStateConsole.js";
import getModal from "./components/getModal.js";
import getPosts from "./services/getPosts.js";
import mapComments from "./lib/mapComments.js";

(async function () {
  // const data = await (await fetch("../data.json")).json();
  const appState = {
    selectedPostId: null,
    data: await getPosts(),
    debugFrontend: false,
  };

  document.addEventListener("keydown", function (e) {
    if (e.key == ".") appState.debugFrontend = !appState.debugFrontend;

    document.querySelectorAll(".card-comment-layout").forEach((card) => {
      card.querySelector(".id-label").style.display = appState.debugFrontend
        ? "flex"
        : "none";

      card.childNodes.forEach(
        (node) =>
          (node.style.border = appState.debugFrontend
            ? "1px dashed red"
            : "1px solid transparent")
      );
    });

    document.querySelector("#comments").style.border = appState.debugFrontend
      ? "1px solid green"
      : "1px solid transparent";

    document.querySelector("#comments-state-console").style.display =
      appState.debugFrontend ? "flex" : "none";
  });

  getModal(appState);
  mapComments(appState);
  getCommentFooter(appState);
  getCommentsStateConsole(appState);
})();
