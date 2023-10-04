import {
  getActionsPanel,
  getScorePanel,
  getUserDetails,
} from "./cardElements.js";

import appendElements from "../lib/appendElements.js";
import createElement from "../lib/createElement.js";

export default function getCommentCardComponent(comment, appState) {
  const {
    id,
    content,
    createdAt,
    score,
    user: {
      image: { webp },
      username,
    },
    replies,
  } = comment;
  const { currentUser } = appState.data;
  const isCurrentUser = currentUser?.username === username;

  const componentState = {
    idLabel: createElement(`<div class="id-label">
      <span>${id}</span>
    </div>`),
    card: createElement(`<div class="card card-comment-layout"></div>`),
    commentHeader: createElement(
      `<div class="comment-header header-area"></div>`
    ),
    actions: getActionsPanel(id, appState, isCurrentUser),
    userSection: getUserDetails(username, webp, createdAt, isCurrentUser),
    commentContent: createElement(
      `<p class="text-content content-area">${content}</p>`
    ),
    scorePanel: getScorePanel(score, id),
    repliesContainer: null,
  };
  // !mmm extra node q puede estar en comment header fn
  componentState.commentHeader.appendChild(componentState.userSection);

  componentState.card = appendElements(componentState.card, [
    componentState.idLabel,
    componentState.scorePanel,
    componentState.commentHeader,
    componentState.actions,
    componentState.commentContent,
  ]);

  if (replies?.length) {
    componentState.repliesContainer = createElement(
      `<div class="replies-container"></div>`
    );

    replies.forEach((commentReply) => {
      componentState.repliesContainer.appendChild(
        getCommentCardComponent(commentReply, appState).card
      );
    });
  }

  return componentState;
}
