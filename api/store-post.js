import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.VITE_FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://le-ciel-sucre-default-rtdb.europe-west1.firebasedatabase.app",
});

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

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};
