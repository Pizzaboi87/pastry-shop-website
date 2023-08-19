import { authMiddleware, database } from "../src/utils/authMiddleware.js";

const deleteCommentHandler = async (req, res) => {
  const commentIdToDelete = req.headers["comment-id"];
  const commentRef = database.ref(`comments/${commentIdToDelete}`);

  try {
    const commentSnapshot = await commentRef.once("value");
    const commentData = commentSnapshot.val();

    if (!commentData) {
      return res.status(404).json({ message: "Comment not found." });
    }

    await commentRef.remove();

    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "An error occurred." });
  }
};

export default async (req, res) => {
  await authMiddleware(req, res, () => deleteCommentHandler(req, res));
};
