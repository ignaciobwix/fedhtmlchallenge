import createElement from "./createElement.js";

export const getReplyButton = (id, appState) => {
  const button = createElement(`<button class="reply-button">reply</button>`);
  button.addEventListener("click", () => {
    appState.selectedPostId = id;
    document.querySelector(".comment-footer").style.display = "flex";
  });
  return button;
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

  const container = createElement(`<div class="score-container"></div>`);

  container.appendChild(sumButton);
  container.appendChild(scoreDisplay);
  container.appendChild(subButton);

  return container;
};

export const getCommentContent = (content) => {
  return createElement(`<p class="text-content">${content}</p>`);
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
        <h3 class="user-name">${userName} ${isCurrentUser && "(you)"} </h3>
        <span class="time-stamp">${timeStamp}</span>
    </div>`);
};
