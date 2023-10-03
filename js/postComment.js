import getNewPostId from "./getNewPostId.js";
import render from "./render.js";

export default function postComment(event, postTextContent, appState) {
  event.preventDefault();

  const { data, selectedPostId } = appState;
  const comments = data.comments;

  const postIndex = comments.findIndex(
    (comment) => comment.id === selectedPostId
  );

  const replies = comments[postIndex]?.replies || [];

  const newComment = {
    id: Math.random(), //getNewPostId(comments),
    content: postTextContent,
    createdAt: "now",
    score: 0,
    user: data.currentUser,
    replies: [],
  };

  const updatedReplies = [...replies, newComment];
  const updatedPost = { ...comments[postIndex], replies: updatedReplies };

  const updatedComments = [...comments];
  updatedComments[postIndex] = updatedPost;

  appState.data.comments = updatedComments;

  render(appState);
}