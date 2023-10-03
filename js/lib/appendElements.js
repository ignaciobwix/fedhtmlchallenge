export default function appendElements(parent, children) {
  children.map((c) => parent.appendChild(c));
  return parent;
}
