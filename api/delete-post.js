import {
  authMiddleware,
  database,
  storage,
} from "../src/utils/authMiddleware.js";

const deletePostHandler = async (req, res) => {
  const postIdToDelete = req.headers["post-id"];
  const postRef = database.ref(`blogPosts/${postIdToDelete}`);

  try {
    const postSnapshot = await postRef.once("value");
    const postData = postSnapshot.val();

    if (!postData) {
      return res.status(404).json({ message: "Post not found." });
    }

    const bucket = storage.bucket();
    const file = bucket.file(
      `blog/${postIdToDelete}.${postData.image.split(".").pop()}`
    );

    await file.delete();
    await postRef.remove();

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post and image:", error);
    res.status(500).json({ message: "An error occurred." });
  }
};

export default async (req, res) => {
  await authMiddleware(req, res, () => deletePostHandler(req, res));
};
