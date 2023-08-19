import {
  authMiddleware,
  storage,
  firestore,
} from "../src/utils/authMiddleware.js";

const deleteUserHandler = async (req, res) => {
  const userUIDToDelete = req.headers["user-id"];

  try {
    const userDoc = await firestore
      .collection("users")
      .doc(userUIDToDelete)
      .get();
    const userData = userDoc.data();

    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    } else if (!!userData.photoExtension) {
      const bucket = storage.bucket();
      const file = bucket.file(
        `profileImage/${userUIDToDelete}/profile.${userData.photoExtension}`
      );

      await file.delete();
    }

    await admin.auth().deleteUser(userUIDToDelete);
    await userDoc.ref.delete();

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user and profile image:", error);
    res.status(500).json({ message: "An error occurred." });
  }
};

export default async (req, res) => {
  await authMiddleware(req, res, () => deleteUserHandler(req, res));
};
