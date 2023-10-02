import createElement from "./createElement.js";

export default function getCommentCard(comment, currentUser) {
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

  const isCurrentUser = currentUser?.username === username;

  const commentHeader = createElement(`<div class="comment-header"></div>`);

  const replyButton = getReplyButton(id);
  const userSection = getUserDetails(username, webp, createdAt, isCurrentUser);

  commentHeader.appendChild(userSection);
  commentHeader.appendChild(replyButton);

  const scorePanel = getScorePanel(score, id);
  const commentContent = getCommentContent(content);
  const detailsRow = createElement(`<div class="details-row"></div>`);

  detailsRow.appendChild(scorePanel);
  detailsRow.appendChild(commentHeader);

  const card = createElement(`<div class="card"></div>`);
  card.appendChild(detailsRow);
  card.appendChild(commentContent);

  if (replies?.length) {
    const repliesContainer = createElement(
      `<div class="replies-container"></div>`
    );

    document.querySelector("#root").appendChild(repliesContainer);

    replies.forEach((rpl) => {
      const child = getCommentCard(rpl, currentUser);

      const wrapper = createElement(`<div class="component-container"></div>`);

      wrapper.appendChild(child);
      repliesContainer.appendChild(wrapper);
    });
  }

  return card;
}

const getUserDetails = (userName, userImage, timeStamp, isCurrentUser) => {
  return createElement(`
    <div class="user-details">
        <img src=${userImage} alt=${userName}/>
        <h3>${userName} ${isCurrentUser && "(you)"} </h3>
        <span>${timeStamp}</span>
    </div>`);
};

const getReplyButton = (id) => {
  const button = createElement(`<button class="reply-button">reply</button>`);
  button.addEventListener("click", () => {
    alert(id);
  });
  return button;
};

const getScorePanel = (initialScore, id) => {
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

const getCommentContent = (content) => {
  return createElement(`<div class="text-content">${content}</div>`);
};
