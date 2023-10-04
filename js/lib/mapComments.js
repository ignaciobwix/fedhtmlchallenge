import createElement from "./createElement.js";
import getCommentCard from "../components/getCommentCard.js";

export default function mapComments(appState) {
  const { comments } = appState.data;

  comments.forEach((comment) => {
    // const container = createElement(`<div class="component-container"><div>`);
    // container.appendChild(getCommentCard(comment, appState));
    document
      .querySelector("#comments")
      .appendChild(getCommentCard(comment, appState));
  });
}
