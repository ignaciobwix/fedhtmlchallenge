import getCommentFooter from "./getAddCommentFooter.js";
import mapComments from "./mapComments.js";

(async function () {
  const data = await (await fetch("../data.json")).json();
  const appState = {
    selectedPostId: null,
    data: data,
  };

  mapComments(appState);
  getCommentFooter(appState);
})();
