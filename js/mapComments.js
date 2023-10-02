import createElement from "./createElement.js";
import getCommentCard from "./getCommentCard.js";

export default function mapComments(comments, currentUser) {
  comments.forEach((comment) => {
    const container = createElement(`<div class="component-container"><div>`);
    container.appendChild(getCommentCard(comment, currentUser));
    document.querySelector("#root").appendChild(container);
  });
}
