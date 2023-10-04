import appendElements from "../lib/appendElements.js";
import createElement from "../lib/createElement.js";
import deleteCommentById from "../services/deleteCommentById.js";
// !todo should be a form -> submit, prevent default, etc...
import render from "../render.js";
export default function getModal(appState) {
  const componentState = {
    dialog: createElement(`
      <dialog class="modal">
        <h3 class="dialog-title">Delete comment</h3>
        <div class="dialog-content">
          <p>
            Are you sure you want to delete this comment? 
            This will remove the comment and can't be undone.
          </p>
          <div class="dialog-buttons"></div>
        </div>
      </dialog>
    `),
    cancelButton: createElement(
      `<button class="dialog-button dialog-cancel-button">
        NO, CANCEL
      </button>`
    ),
    acceptButton: createElement(
      `<button class="dialog-button dialog-delete-button">
        YES, DELETE
      </button>`
    ),
  };

  componentState.cancelButton.addEventListener("click", () => {
    componentState.dialog.close();
  });

  componentState.acceptButton.addEventListener("click", function () {
    appState.data.comments = deleteCommentById(
      appState.selectedPostId,
      appState.data.comments
    );

    componentState.dialog.close();

    render(appState);
  });

  appendElements(
    componentState.dialog
      .querySelector(".dialog-content")
      .querySelector(".dialog-buttons"),
    [componentState.cancelButton, componentState.acceptButton]
  );

  document.querySelector("#root").appendChild(componentState.dialog);
}
