function generateRandomScore() {
  return Math.floor(Math.random() * 21) - 10;
}

function generateRandomText() {
  return Math.random().toString(36).substring(2);
}

export default function generateComment(id, depth, maxDepth, maxReplies = 4) {
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

// function generateCommentThread() {
//   const maxDepth = 3; // Maximum depth of nested comments
//   const maxReplies = 4;
//   const commentThread = {
//     currentUser: {
//       image: {
//         png: "./images/avatars/image-juliusomo.png",
//         webp: "./images/avatars/image-juliusomo.webp",
//       },
//       username: "juliusomo",
//     },
//     comments: [generateComment(1, "juliusomo", 0, maxDepth, maxReplies)],
//   };

//   return JSON.stringify(commentThread, null, 2);
// }

// console.log(generateCommentThread());
