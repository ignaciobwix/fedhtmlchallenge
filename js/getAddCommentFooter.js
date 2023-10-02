import createElement from "./createElement.js";

export default function getCommentFooter(currentUser) {
  const {
    username,
    image: { webp },
  } = currentUser;

  const textarea = getTextInput();
  const button = getSendButton();
  const footer = createElement(
    `<footer class="comment-footer component-container">
      <img alt="${username}" src="${webp}" />
    </footer>`
  );

  footer.appendChild(textarea);
  footer.appendChild(button);
  document.querySelector("#root").appendChild(footer);
}

const getTextInput = () => {
  const textarea = createElement(`<textarea placeholder="Add a comment..."/>`);
  textarea.addEventListener("change", (event) => {
    console.log(event.target.value);
  });
  return textarea;
};

// !todo should be a form submit prevent default, etc...
const getSendButton = () => {
  const button = createElement(`<button>Send</button>`);
  button.addEventListener("click", (event) => {
    console.log(event.target.value);
  });
  return button;
};
