import getCommentFooter from "./getAddCommentFooter.js";
import mapComments from "./mapComments.js";

(async function () {
  const response = await fetch("../data.json");
  const data = await response.json();
  const appState = {
    selectedPostId: null,
    data: data,
  };

  mapComments(appState);
  getCommentFooter(appState);
})();
