import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  deleteUser,
  onAuthStateChanged,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { getDatabase, ref, set, get, onValue } from "firebase/database";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export const database = getDatabase();

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapShot = await getDoc(userDocRef);

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const id = uuidv4();
    const uid = userAuth.uid;
    const selectedLang = "eng";
    const selectedTheme = "pink";
    const selectedCurr = "eur";
    const newsletter = false;
    const photoExtension = "";

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        id,
        uid,
        selectedLang,
        selectedTheme,
        selectedCurr,
        newsletter,
        photoExtension,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error during create the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signInWithGoogleRedirect = async () => {
  await signInWithRedirect(auth, googleProvider);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getUserData = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnapShot = await getDoc(userDocRef);

    if (userSnapShot.exists()) {
      const userData = userSnapShot.data();
      return userData;
    }
  } catch (error) {
    console.error("Error during the fetch of user's data: ", error);
    throw error;
  }
};

export const uploadUserImage = async (uid, imageFile) => {
  try {
    const fileExtension = imageFile.name.split(".").pop();
    const userData = { photoExtension: fileExtension };
    await updateUserData(uid, userData);

    const storageRef = refStorage(
      storage,
      `profileImage/${uid}/profile.${fileExtension}`
    );
    await uploadBytes(storageRef, imageFile);
  } catch (error) {
    console.error("An error occured during image uploading:", error);
  }
};

export const getUserImage = async (uid) => {
  const fileExtensionRef = doc(db, `users/${uid}/`);
  const snapshot = await getDoc(fileExtensionRef);
  const fileExtension = snapshot.data().photoExtension;

  try {
    const imageRef = refStorage(
      storage,
      `profileImage/${uid}/profile.${fileExtension}`
    );

    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error("An error occurred while downloading photo URL.", error);
  }
};

export const updateUserData = async (uid, data) => {
  const userDocRef = doc(db, "users", uid);

  try {
    await setDoc(userDocRef, data, { merge: true });
  } catch (error) {
    console.error("Error during the update of user's data: ", error);
    throw error;
  }
};

export const deleteMyself = async (currentUser) => {
  const userDocRef = doc(db, "users", currentUser.uid);

  try {
    await deleteDoc(userDocRef);
    await deleteUser(currentUser);
  } catch (error) {
    console.error("Error during the delete of user's data: ", error);
    throw error;
  }
};

export const reauthenticateUser = async (currentUser, password) => {
  try {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    await reauthenticateWithCredential(currentUser, credential);
    return credential;
  } catch (error) {
    console.error("Error during the reauthentication of user: ", error);
    throw error;
  }
};

export const updateUserPassword = async (
  currentUser,
  password,
  newPassword
) => {
  try {
    await reauthenticateUser(currentUser, password);
    await updatePassword(currentUser, newPassword);
  } catch (error) {
    console.error("Error during the update of user's password: ", error);
    throw error;
  }
};

export const getData = async (branch) => {
  const dataRef = ref(database, branch);
  return new Promise((resolve, reject) => {
    onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const getStoredImage = async (image) => {
  const imageRef = refStorage(storage, image);

  try {
    const downloadURL = await getDownloadURL(imageRef);
    return downloadURL;
  } catch (error) {
    console.error("An error occurred while downloading photo URL.", error);
    const downloadURL =
      "https://firebasestorage.googleapis.com/v0/b/le-ciel-sucre.appspot.com/o/blog%2Fmacarons.webp?alt=media&token=9cef76b3-69ba-45b4-89ca-3853533414eb";
    return downloadURL;
  }
};

export const storeImage = async (imageFile, imagePath) => {
  const storageRef = refStorage(storage, imagePath);
  return uploadBytes(storageRef, imageFile);
};

export const storeComment = async (comment) => {
  try {
    await set(ref(database, `comments/${comment.id}`), comment);
    return true;
  } catch (error) {
    console.error("An error occurred while storing comment data.", error);
    return false;
  }
};

export const changeCommentStatus = async (id, isPublished) => {
  const commentsRef = ref(database, "comments");
  const snapshot = await get(commentsRef);
  let existingIndex = -1;

  snapshot.forEach((childSnapshot) => {
    const commentSnapshot = childSnapshot.val();
    if (commentSnapshot.id === id) {
      existingIndex = childSnapshot.key;
    }
  });

  if (existingIndex !== -1) {
    await set(
      ref(database, `comments/${existingIndex}/isPublished`),
      isPublished
    );
  }
};
