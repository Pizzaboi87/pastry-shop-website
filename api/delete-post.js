import {
  authMiddleware,
  database,
  storage,
} from "../src/utils/authMiddleware.js";

const deletePostHandler = async (req, res) => {
  const postIdToDelete = req.headers["post-id"];
  const languages = ["eng", "fra", "esp", "hun"];

  try {
    const postRef = database.ref(`blogPosts/eng/${postIdToDelete}`);
    const postSnapshot = await postRef.once("value");
    const postData = postSnapshot.val();

    if (!postData) {
      return res.status(404).json({ message: "Post not found." });
    }

    const imageExtension = postData.image.split(".").pop();
    const bucket = storage.bucket();
    const file = bucket.file(`blog/${postIdToDelete}.${imageExtension}`);

    await file.delete();

    const deletePromises = languages.map(async (language) => {
      const postRef = database.ref(`blogPosts/${language}/${postIdToDelete}`);
      const postSnapshot = await postRef.once("value");
      const postData = postSnapshot.val();

      if (postData) {
        await postRef.remove();
      }
    });

    await Promise.all(deletePromises);

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post and image:", error);
    res.status(500).json({ message: "An error occurred." });
  }
};

export default async (req, res) => {
  await authMiddleware(req, res, () => deletePostHandler(req, res));
};
