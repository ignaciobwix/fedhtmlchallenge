export default function deepFilterComments(comments, prop, fieldValue) {
  return comments.filter((comment) => {
    if (comment[prop] === fieldValue) {
      return false;
    }

    if (comment?.replies.length) {
      comment.replies = deepFilterComments(comment.replies, fieldValue);
    }

    return true;
  });
}
