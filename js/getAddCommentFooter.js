// !todo should be a form -> submit, prevent default, etc...

import createElement from "./createElement.js";
import postComment from "./postComment.js";

export default function getCommentFooter(appState) {
  const {
    username,
    image: { webp },
  } = appState.data.currentUser;

  const componentState = {
    footer: createElement(
      `<footer class="comment-footer component-container">
        <img class="own-profile-picture" alt="${username}" src="${webp}" />
      </footer>`
    ),
    textarea: createElement(
      `<textarea class="comment-textarea" placeholder="Add a comment..."/>`
    ),
    button: createElement(
      `<button type="button" class="send-button">Send</button>`
    ),
    postTextContent: "",
  };

  componentState.textarea.addEventListener("change", (event) => {
    componentState.postTextContent = event.target.value;
  });

  componentState.button.addEventListener("click", function (event) {
    postComment(event, componentState.postTextContent, appState);
  });

  componentState.footer.appendChild(componentState.textarea);
  componentState.footer.appendChild(componentState.button);
  document.querySelector("#root").appendChild(componentState.footer);
}
