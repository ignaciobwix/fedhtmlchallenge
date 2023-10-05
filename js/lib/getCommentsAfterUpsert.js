export default function getCommentsAfterUpsert(
  comments,
  id,
  updatedComment,
  replace = false
) {
  const updateCommentRecursive = (selectedComments) => {
    for (
      let commentIndex = 0;
      commentIndex < selectedComments.length;
      commentIndex++
    ) {
      const currentComment = selectedComments[commentIndex];
      const found = currentComment.id === id;

      if (found) {
        if (replace) {
          selectedComments[commentIndex] = {
            ...currentComment,
            ...updatedComment,
          };
          break;
        } else {
          //append
          if (!currentComment.replies) {
            currentComment.replies = [updatedComment];
            break;
          } else {
            currentComment.replies.push(updatedComment);
            break;
          }
        }
      }

      if (currentComment.replies) {
        updateCommentRecursive(currentComment.replies);
      }
    }
  };

  updateCommentRecursive(comments);

  return comments;
}
