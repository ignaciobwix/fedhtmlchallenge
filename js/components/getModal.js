import appendElements from "../lib/appendElements.js";
import createElement from "../lib/createElement.js";
// !todo should be a form -> submit, prevent default, etc...
import deepFilterComments from "../services/deepFilterComments.js";
import render from "../render.js";

export default function getModal(appState) {
  const componentState = {
    dialog: createElement(`
      <dialog class="modal">
      </dialog>
    `),
    cancelButton: createElement(`<button>Cancel</button>`),
    acceptButton: createElement(`<button>Accept</button>`),
  };

  componentState.cancelButton.addEventListener("change", (event) => {
    componentState.dialog.close();
  });

  componentState.acceptButton.addEventListener("click", function (event) {
    appState.data.comments = deepFilterComments(
      appState.data.comments,
      "id",
      appState.selectedPostId
    );

    render(appState);
  });

  appendElements(componentState.dialog, [
    componentState.cancelButton,
    componentState.acceptButton,
  ]);

  document.querySelector("#root").appendChild(componentState.dialog);
}
