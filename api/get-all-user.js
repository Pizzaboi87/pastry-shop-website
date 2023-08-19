import { authMiddleware, firestore } from "../src/utils/authMiddleware.js";

const getAllUserHandler = async (req, res) => {
  const userSnapshot = await firestore.collection("users").get();
  const users = userSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  res.status(200).json({ users });
};

export default async (req, res) => {
  authMiddleware(req, res, () => getAllUserHandler(req, res));
};
