import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.VITE_FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "le-ciel-sucre.appspot.com",
  databaseURL:
    "https://le-ciel-sucre-default-rtdb.europe-west1.firebasedatabase.app",
});

const db = admin.database();
const storage = admin.storage();

export default async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (decodedToken.uid !== process.env.VITE_ADMIN_UID) {
      return res.status(403).json({ message: "Permission denied." });
    }

    const postIdToDelete = req.headers["post-id"];
    const postRef = db.ref(`blogPosts/${postIdToDelete}`);

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
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
