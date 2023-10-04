import deepFilterComments from "../lib/deepFilterComments.js";

export default function deleteCommentById(id, comments) {
  return deepFilterComments(comments, "id", id);
}
