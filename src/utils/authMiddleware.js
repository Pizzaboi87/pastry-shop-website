import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.VITE_FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "le-ciel-sucre.appspot.com",
  databaseURL:
    "https://le-ciel-sucre-default-rtdb.europe-west1.firebasedatabase.app",
});

export const database = admin.database();
export const storage = admin.storage();
export const firestore = admin.firestore();

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized User" });
  }

  const idToken = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    if (decodedToken.uid !== process.env.VITE_ADMIN_UID) {
      return res.status(403).json({ message: "Permission denied." });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
