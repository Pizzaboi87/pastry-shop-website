import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.VITE_FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "le-ciel-sucre.appspot.com",
  databaseURL:
    "https://le-ciel-sucre-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.firestore();
const storage = admin.storage();

export default async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized", result: false });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (decodedToken.uid !== process.env.VITE_ADMIN_UID) {
      return res
        .status(403)
        .json({ message: "Permission denied.", result: false });
    }

    const userUIDToDelete = req.headers["user-id"];

    try {
      const userDoc = await db.collection("users").doc(userUIDToDelete).get();
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

      res
        .status(200)
        .json({ message: "User deleted successfully.", result: true });
    } catch (error) {
      console.error("Error deleting user and profile image:", error);
      res.status(500).json({ message: "An error occurred.", result: false });
    }
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(401).json({ message: "Unauthorized", result: false });
  }
};
