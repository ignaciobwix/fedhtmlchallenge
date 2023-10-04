import generateComment from "../components/generateComment.js";

export default async function getPosts(mode = "PROD") {
  const data = await (await fetch("../../data.json")).json();

  if (mode === "DEV") {
    const depth = 2;
    const maxDepth = 6;
    const maxReplies = 5;

    data.comments = [...new Array(20).keys()].map((id) =>
      generateComment(id, depth, maxDepth, maxReplies)
    );
  }

  return data;
}
