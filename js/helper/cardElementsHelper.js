export function editCommentHandler(id) {
  const content = document.querySelector(`#card-content-${id}`);

  const button = content.querySelector("button");
  const paragraph = content.querySelector("p");
  paragraph.style.display = "none";

  const textarea = content.querySelector("textarea");
  textarea.value = paragraph.textContent.trim();
  textarea.style.display = "block";

  textarea.addEventListener("change", (event) => {
    paragraph.textContent = event.target.value;
  });

  button.style.display = "block";

  button.addEventListener("click", () => {
    textarea.style.display = "none";
    button.style.display = "none";
    paragraph.style.display = "block";
  });
}
