import appendElements from "./appendElements.js";
import getCommentCardComponent from "../components/getCommentCardComponent.js";

export default function mapComments(appState) {
  const { comments } = appState.data;
  const commentsElement = document.querySelector("#comments");
  comments.forEach((comment) => {
    const { card, repliesContainer } = getCommentCardComponent(
      comment,
      appState
    );

    if (repliesContainer) {
      console.log("repliesContainer", repliesContainer);
      appendElements(commentsElement, [card, repliesContainer]);
    } else {
      commentsElement.appendChild(card);
    }
  });
}
