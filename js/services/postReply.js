import getCommentsAfterUpsert from "../lib/getCommentsAfterUpsert.js";
import getNewPostId from "../lib/getNewPostId.js";
import render from "../render.js";

export default function postReply(event, postTextContent, appState) {
  if (!postTextContent) return;
  event.preventDefault();

  const { data, selectedPostId } = appState;

  appState.data.comments = getCommentsAfterUpsert(
    data.comments,
    selectedPostId,
    {
      id: getNewPostId(data.comments),
      content: postTextContent,
      createdAt: "now",
      score: 0,
      user: data.currentUser,
      replies: [],
    },
    false
  );

  console.log(appState.data.comments);
  render(appState);
}
