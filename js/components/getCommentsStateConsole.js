import appendElements from "../lib/appendElements.js";
import createElement from "../lib/createElement.js";

export default function getCommentsStateConsole(appState) {
  // print human readable JSON representation
  const getNestedStructure = ({ id, replies }) => {
    return createElement(
      `<div class="chunk">${
        replies?.length
          ? `<span class='d'>${id}</span>: <span class='r'>${JSON.stringify(
              replies.map((r) => r.id)
            )}</span>`
          : `<span class='d'>${id}</span>`
      }</div>`
    );
  };

  appendElements(
    document.querySelector("#comments-state-console"),
    appState.data.comments.map(getNestedStructure).flat()
  );
}
