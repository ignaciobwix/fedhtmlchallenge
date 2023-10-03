function deepCountPosts(comments) {
  let count = 0;

  if (comments) {
    count += comments.length;

    comments.forEach((comment) => {
      count += deepCountReplies(comment.replies);
    });
  }

  return count;
}

function deepCountReplies(replies) {
  let count = replies.length;

  replies.forEach((reply) => {
    count += deepCountReplies(reply.replies);
  });

  return count;
}

export default function getNewPostId(comments) {
  return deepCountPosts(comments) + 1;
}
