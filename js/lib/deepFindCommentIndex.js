// this has to upsert directly bc comments[index][index][index][index][index][index][index]
export default function deepFindCommentIndex(comments, prop, fieldValue) {
  return comments.findIndex((comment) => {
    if (comment[prop] === fieldValue) {
      return true;
    }

    if (comment?.replies.length) {
      comment.replies = deepFindCommentIndex(comment.replies, fieldValue);
    }

    return false;
  });
}
