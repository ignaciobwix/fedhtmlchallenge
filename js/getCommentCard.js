import {
  getActionsPanel,
  getCommentContent,
  getScorePanel,
  getUserDetails,
} from "./cardElements.js";

import createElement from "./createElement.js";

export default function getCommentCard(comment, appState) {
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
    commentHeader: createElement(`<div class="comment-header"></div>`),
    actions: getActionsPanel(id, appState, isCurrentUser),
    userSection: getUserDetails(username, webp, createdAt, isCurrentUser),
    colWrapper: createElement(`<div></div>`),
  };

  const commentHeader = createElement(`<div class="comment-header"></div>`);
  const actions = getActionsPanel(id, appState, isCurrentUser);
  const userSection = getUserDetails(username, webp, createdAt, isCurrentUser);

  commentHeader.appendChild(userSection);
  commentHeader.appendChild(actions);

  const commentContent = getCommentContent(content);
  const colWrapper = createElement(`<div></div>`);
  colWrapper.appendChild(commentHeader);
  colWrapper.appendChild(commentContent);

  const scorePanel = getScorePanel(score, id);

  const card = createElement(`<div class="card"></div>`);
  card.appendChild(scorePanel);
  card.appendChild(colWrapper);

  if (replies?.length) {
    const repliesContainer = createElement(
      `<div class="replies-container"></div>`
    );

    document.querySelector("#root").appendChild(repliesContainer);

    replies.forEach((commentReply) => {
      const child = getCommentCard(commentReply, appState);

      const wrapper = createElement(`<div class="component-container"></div>`);

      wrapper.appendChild(child);
      repliesContainer.appendChild(wrapper);
    });
  }

  return card;
}
