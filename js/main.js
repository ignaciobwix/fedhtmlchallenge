import {
  debugCards,
  debugThreadsContainer,
  displayCommentsReadableStructure,
} from "./helper/elementsDebuggerHelper.js";

import getPosts from "./services/getPosts.js";
import render from "./render.js";

(async function () {
  const appState = {
    selectedPostId: null,
    data: await getPosts(),
    debugFrontend: false,
  };

  document.addEventListener("keydown", function (e) {
    if (e.key == ".") appState.debugFrontend = !appState.debugFrontend;

    [
      debugCards,
      debugThreadsContainer,
      displayCommentsReadableStructure,
    ].forEach((fn) => fn(appState.debugFrontend));
  });

  render(appState);
})();
