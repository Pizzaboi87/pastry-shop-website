import { authMiddleware, database } from "../src/utils/authMiddleware.js";

const storePostHandler = async (req, res) => {
  const blogPostsRef = database.ref("blogPosts");
  const post = JSON.parse(req.body);

  try {
    await blogPostsRef.child(post.postid).set(post);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error verifying during post uploading:", error);
    res.status(401).json({ message: "Upload error" });
  }
};

export default async (req, res) => {
  await authMiddleware(req, res, () => storePostHandler(req, res));
};
