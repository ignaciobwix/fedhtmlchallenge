export default function createElement(html) {
  const node = new DOMParser().parseFromString(html, "text/html").body
    .firstElementChild;
  return node;
}
