import {
  getActionsPanel,
  getScorePanel,
  getUserDetails,
} from "./cardElements.js";

import appendElements from "./appendElements.js";
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
    card: createElement(`<div class="card"></div>`),
    commentHeader: createElement(
      `<div class="comment-header header-area"></div>`
    ),
    actions: getActionsPanel(id, appState, isCurrentUser),
    userSection: getUserDetails(username, webp, createdAt, isCurrentUser),
    colWrapper: createElement(`<div></div>`),
    commentContent: createElement(
      `<p class="text-content content-area">${content}</p>`
    ),
    scorePanel: getScorePanel(score, id),
    repliesContainer: null,
  };
  // !mmm extra node q puede estar en comment header fn
  componentState.commentHeader.appendChild(componentState.userSection);
  // componentState.commentHeader = appendElements(componentState.commentHeader, [
  //   componentState.userSection,
  //   componentState.actions,
  // ]);

  // componentState.colWrapper = appendElements(componentState.colWrapper, [
  //   componentState.commentHeader,
  //   componentState.commentContent,
  // ]);

  // componentState.card = appendElements(componentState.card, [
  //   componentState.scorePanel,
  //   componentState.colWrapper,
  //   // componentState.actions,
  // ]);

  if (replies?.length) {
    componentState.repliesContainer = createElement(
      `<div class="replies-container"></div>`
    );

    document
      .querySelector("#root")
      .appendChild(componentState.repliesContainer);

    replies.forEach((commentReply) => {
      const wrapper = createElement(`<div class="component-container"></div>`);
      wrapper.appendChild(getCommentCard(commentReply, appState));
      componentState.repliesContainer.appendChild(wrapper);
    });
  }

  componentState.card = appendElements(componentState.card, [
    componentState.scorePanel,
    componentState.commentHeader,
    componentState.actions,
    componentState.commentContent,
  ]);
  return componentState.card;
}

/*
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
*/
