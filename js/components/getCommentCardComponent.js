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
  const contentHasTag = content.startsWith("@");

  const prependTag = (content) => {
    const strings = content.split(" ");
    return `<span class="user-tag">${strings.shift()}</span> ${strings.join(
      " "
    )}`;
  };

  const componentState = {
    idLabel: createElement(`
    <div class="id-label">
      <span>${id}</span>
    </div>`),
    card: createElement(`<div class="card card-comment-layout"></div>`),
    commentHeader: createElement(
      `<div class="comment-header header-area"></div>`
    ),
    actions: getActionsPanel(id, appState, isCurrentUser),
    userSection: getUserDetails(username, webp, createdAt, isCurrentUser),
    commentContent: createElement(
      `
      <div class="content-area" id="card-content-${id}">
        <p class="text-content">
          ${contentHasTag ? prependTag(content) : content}
        </p>
        ${
          isCurrentUser
            ? `<textarea class="edit-area"></textarea><button class="send-button update-content-button">Send</button>`
            : ""
        }
      </div>
      `
    ),
    scorePanel: getScorePanel(score, id),
    repliesContainer: null,
  };

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
      const nestedComponentState = getCommentCardComponent(
        commentReply,
        appState
      );
      // se renderiza el container, pero no el hijo
      componentState.repliesContainer.appendChild(
        nestedComponentState.repliesContainer
          ? nestedComponentState.repliesContainer
          : nestedComponentState.card
      );
    });
  }

  return componentState;
}

/*
const appendReplies = (repliesToMap) => {
    if (repliesToMap?.length) {
      componentState.repliesContainer = createElement(
        `<div class="replies-container"></div>`
      );

      repliesToMap.forEach((commentReply) => {
        const nestedComponentState = getCommentCardComponent(
          commentReply,
          appState
        );

        if (nestedComponentState.repliesContainer) {
          componentState.repliesContainer.appendChild(
            nestedComponentState.repliesContainer
          );
        } else {
          componentState.repliesContainer.appendChild(
            nestedComponentState.card
          );

          if (nestedComponentState.card.repliesContainer) {
            appendReplies(nestedComponentState.card.repliesContent);
          }
        }
      });
    }
  };

  appendReplies(replies);
*/
