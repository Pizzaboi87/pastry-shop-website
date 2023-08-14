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
import { getDatabase, ref, set, get, push, onValue } from "firebase/database";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
  deleteObject as storageDeleteObject,
} from "firebase/storage";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  getDocs,
  collection,
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

export const deleteCurrentUser = async (currentUser) => {
  const userDocRef = doc(db, "users", currentUser.uid);

  try {
    await deleteDoc(userDocRef);
    await deleteUser(currentUser);
  } catch (error) {
    console.error("Error during the delete of user's data: ", error);
    throw error;
  }
};

export const deleteUserFromDatabase = async (currentUser) => {
  const docRef = doc(db, "users", currentUser.uid);

  try {
    await deleteDoc(docRef);
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

export const getAllPost = async () => {
  const blogPostsRef = ref(database, "blogPosts/");
  return new Promise((resolve, reject) => {
    onValue(
      blogPostsRef,
      (snapshot) => {
        const blogPosts = snapshot.val();
        resolve(blogPosts);
      },
      (error) => {
        reject(error);
      }
    );
  });
};

export const getAllComments = async () => {
  const commentsRef = ref(database, "comments/");
  return new Promise((resolve, reject) => {
    onValue(
      commentsRef,
      (snapshot) => {
        const comments = snapshot.val();
        resolve(comments);
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
  const commentsRef = ref(database, "comments");

  try {
    const snapshot = await get(commentsRef);
    const commentData = snapshot.val();

    if (commentData && commentData[comment.id]) {
      const existingComment = commentData[comment.id];

      if (JSON.stringify(existingComment) !== JSON.stringify(comment)) {
        await set(ref(database, `comments/${comment.id}`), comment);
      }
    } else {
      await set(ref(database, `comments/${comment.id}`), comment);
    }
  } catch (error) {
    console.error("An error occurred while storing comment data.", error);
  }
};

export const storePostData = async (post) => {
  const blogPostsRef = ref(database, "blogPosts");

  try {
    const snapshot = await get(blogPostsRef);
    const postData = snapshot.val();

    if (postData && postData[post.postid]) {
      const existingPost = postData[post.postid];

      if (JSON.stringify(existingPost) !== JSON.stringify(post)) {
        await set(ref(database, `blogPosts/${post.postid}`), post);
      }
    } else {
      await set(ref(database, `blogPosts/${post.postid}`), post);
    }
  } catch (error) {
    console.error("An error occurred while storing post data.", error);
  }
};

export const uploadBlogPost = async (form) => {
  if (!form.imageFile.name) {
    try {
      await storePostData(form);
      console.log("Blog post uploaded successfully!");
    } catch (error) {
      console.error("Error uploading blog post:", error);
    }
  } else {
    try {
      await storeImage(
        form.imageFile,
        `blog/${form.postid}.${form.imageFile.name.split(".").pop()}`
      );
      await storePostData(form);
      console.log("Blog post image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading blog post image:", error);
    }
  }
};

export const deletePost = async (postid) => {
  const blogPostsRef = ref(database, "blogPosts");
  const snapshot = await get(blogPostsRef);
  let existingIndex = -1;

  snapshot.forEach((childSnapshot) => {
    const postSnapshot = childSnapshot.val();
    if (postSnapshot.postid === postid) {
      existingIndex = childSnapshot.key;
    }
  });

  if (existingIndex !== -1) {
    await set(ref(database, `blogPosts/${existingIndex}`), null);

    const imageRef = refStorage(
      storage,
      `blog/${postid}.${snapshot.val()[existingIndex].image.split(".").pop()}`
    );

    try {
      await storageDeleteObject(imageRef);
    } catch (error) {
      console.error("An error occurred while deleting image.", error);
    }
  }
};

export const deleteComment = async (id) => {
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
    await set(ref(database, `comments/${existingIndex}`), null);
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
