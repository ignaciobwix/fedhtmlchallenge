const getFlexOrNone = (df) => (df ? "flex" : "none");
const getTransparentOrFillWith = (shouldDisplay, color) =>
  `1px dashed ${shouldDisplay ? color : "transparent"}`;

export function debugCards(shouldDisplay = false, showIds = true) {
  const cards = document.querySelectorAll(".card-comment-layout");

  cards.forEach((card) => {
    if (showIds) {
      card.querySelector(".id-label").style.display =
        getFlexOrNone(shouldDisplay);
    }

    card.childNodes.forEach(
      (node) =>
        (node.style.border = getTransparentOrFillWith(shouldDisplay, "red"))
    );
  });
}

export function debugThreadsContainer(shouldDisplay = false) {
  const comments = document.querySelector("#comments");
  comments.style.border = getTransparentOrFillWith(shouldDisplay, "green");
}

export function displayCommentsReadableStructure(shouldDisplay = false) {
  const commentsStateConsole = document.querySelector(
    "#comments-state-console"
  );

  commentsStateConsole.style.display = getFlexOrNone(shouldDisplay);
}
