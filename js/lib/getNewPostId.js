function deepCountPosts(comments) {
  if (!comments) return 0;
  let count = comments?.length ?? 0;

  comments.forEach((comment) => {
    if (comment?.replies.length) {
      count += deepCountReplies(comment.replies);
    }
  });

  return count;
}

function deepCountReplies(replies) {
  if (!replies) return 0;

  let count = replies?.length ?? 0;

  replies.forEach((reply) => {
    count += deepCountReplies(reply?.replies);
  });

  return count;
}

export default function getNewPostId(comments) {
  return deepCountPosts(comments) + 1;
}
