function generateRandomScore() {
  return Math.floor(Math.random() * 21) - 10;
}

function generateRandomText() {
  return Math.random().toString(36).substring(2);
}

export default function generateComment(
  id,
  depth = 0,
  maxDepth = 0,
  maxReplies = 4
) {
  const comment = {
    id,
    content: generateRandomText(),
    score: generateRandomScore(),
    user: {
      image: {
        png: `https://placehold.co/300x300`,
        webp: `https://placehold.co/300x300`,
      },
      username: generateRandomText(),
    },
    replies: [],
  };

  if (depth < maxDepth) {
    const numReplies = Math.floor(Math.random() * maxReplies);
    for (let i = 1; i <= numReplies; i++) {
      comment.replies.push(
        generateComment(i, comment.username, depth + 1, maxDepth)
      );
    }
  }

  return comment;
}
