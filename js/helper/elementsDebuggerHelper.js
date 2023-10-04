export function debugCards(shouldDisplay = false, showIds = true) {
  const cards = document.querySelectorAll(".card-comment-layout");

  cards.forEach((card) => {
    if (showIds) {
      card.querySelector(".id-label").style.display = shouldDisplay
        ? "flex"
        : "none";
    }

    card.childNodes.forEach(
      (node) =>
        (node.style.border = shouldDisplay
          ? "1px dashed red"
          : "1px solid transparent")
    );
  });
}

export function debugThreadsContainer(shouldDisplay = false) {
  document.querySelector("#comments").style.border = shouldDisplay
    ? "1px solid green"
    : "1px solid transparent";
}

export function displayCommentsReadableStructure(shouldDisplay = false) {
  document.querySelector("#comments-state-console").style.display =
    shouldDisplay ? "flex" : "none";
}
