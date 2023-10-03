import createElement from "../lib/createElement.js";
import deepFilterComments from "../services/deepFilterComments.js";
import render from "../render.js";
export const getActionsPanel = (id, appState, isCurrentUser) => {
  const actions = createElement(
    `<div class="post-actions actions-area"></div>`
  );

  if (isCurrentUser) {
    const editButton = createElement(
      `<button class="action-button">
        <i class="fas fa-edit"></i>
        <span>Edit</span>
      </button>`
    );
    editButton.addEventListener("click", () => {
      appState.selectedPostId = id;
    });

    const deteleButton = createElement(
      `<button class="action-button delete-button">
      <i class="fa-solid fa-trash"></i>        <span>Detele</span>
      </button>`
    );

    deteleButton.addEventListener("click", function (event) {
      event.preventDefault();
      // !inline immutable chad chunk doens't work :/
      // alert("pressed");

      // render({
      //   ...appState,
      //   selectedPostId: id,
      //   data: {
      //     ...appState.data,
      //     comments: appState.data.comments.filter(
      //       (comment) => comment.id !== id
      //     ),
      //   },
      // });

      appState.selectedPostId = id;
      appState.data.comments = deepFilterComments(
        appState.data.comments,
        "id",
        id
      );

      render(appState);
    });

    actions.appendChild(deteleButton);
    actions.appendChild(editButton);

    return actions;
  }

  const replyButton = createElement(
    `<button class="action-button">
      <i class="fas fa-reply"></i>
      <span>Reply</span>
    </button>`
  );

  replyButton.addEventListener("click", () => {
    appState.selectedPostId = id;
    document.querySelector(".comment-footer").style.display = "grid";
  });

  actions.appendChild(replyButton);

  return actions;
};

export const getScorePanel = (initialScore, id) => {
  let score = initialScore;

  const getButton = (operation) => {
    const button = createElement(
      `<button class="score-button">${
        { sum: "+", sub: "-" }[operation]
      }</button>`
    );

    button.addEventListener("click", () => {
      const factor = operation === "sum" ? 1 : -1;
      score = score + factor;
      document.querySelector(`#score-${id}`).textContent = score;
    });

    return button;
  };

  const sumButton = getButton("sum");
  const subButton = getButton("sub");
  const scoreDisplay = createElement(
    `<div class="score-value" id='score-${id}'>${initialScore}</div>`
  );

  const scoreArea = createElement(`<div class="score-area"></div>`);

  const container = createElement(`<div class="score-container"></div>`);

  container.appendChild(sumButton);
  container.appendChild(scoreDisplay);
  container.appendChild(subButton);
  scoreArea.appendChild(container);
  return scoreArea;
};

export const getUserDetails = (
  userName,
  userImage,
  timeStamp,
  isCurrentUser
) => {
  return createElement(`
    <div class="user-details">
        <img class="post-profile-picture" src=${userImage} alt=${userName}/>
        <h3 class="user-name">${userName} ${
    isCurrentUser ? '<span class="you-label">you</span>' : ""
  } </h3>
        <span class="time-stamp">${timeStamp}</span>
    </div>`);
};
