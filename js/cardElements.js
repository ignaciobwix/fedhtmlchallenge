import createElement from "./createElement.js";
import deepFilterComments from "./deepFilterComments.js";
import render from "./render.js";
export const getActionsPanel = (id, appState, isCurrentUser) => {
  const actions = createElement(
    `<div class="post-actions actions-area"></div>`
  );

  if (isCurrentUser) {
    const editButton = createElement(
      `<button class="action-button">Edit</button>`
    );
    editButton.addEventListener("click", () => {
      appState.selectedPostId = id;
    });

    const deteleButton = createElement(
      `<button class="action-button delete-button">Detele</button>`
    );

    deteleButton.addEventListener("click", function (event) {
      event.preventDefault();
      // !inline immutable chad chunk doens't work :/
      alert("pressed");

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
    `<button class="action-button">Reply</button>`
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

  const container = createElement(
    `<div class="score-container score-area"></div>`
  );

  container.appendChild(sumButton);
  container.appendChild(scoreDisplay);
  container.appendChild(subButton);

  return container;
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
