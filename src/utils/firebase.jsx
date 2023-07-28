import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get, push, onValue } from "firebase/database";
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
  getDocs,
  collection,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSsqJaZjP8kHuHpXb4kLIeOjnBdi8BI3s",
  authDomain: "le-ciel-sucre.firebaseapp.com",
  databaseURL:
    "https://le-ciel-sucre-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "le-ciel-sucre",
  storageBucket: "le-ciel-sucre.appspot.com",
  messagingSenderId: "913143865836",
  appId: "1:913143865836:web:13b1ed7ad0d412473460c9",
};

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
const database = getDatabase();

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

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
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

export const showName = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userSnapShot = await getDoc(userDocRef);

    if (userSnapShot.exists()) {
      const userName = userSnapShot.data().displayName;
      return userName;
    } else {
      throw new Error("User not found!");
    }
  } catch (error) {
    console.error("Error during the fetch of user's name: ", error);
    throw error;
  }
};

export const getAllUser = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const userList = querySnapshot.docs.map((doc) => doc.data());
  return userList;
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

export const getStoredImage = async (image) => {
  const imageRef = refStorage(storage, image);
  const downloadURL = await getDownloadURL(imageRef);
  return downloadURL;
};

export const storeImage = async (imageFile, imagePath) => {
  const storageRef = refStorage(storage, imagePath);
  return uploadBytes(storageRef, imageFile);
};

export const storePostData = async (post) => {
  const blogPostsRef = ref(database, "blogPosts");
  const snapshot = await get(blogPostsRef);
  let existingIndex = -1;

  snapshot.forEach((childSnapshot) => {
    const postSnapshot = childSnapshot.val();
    if (postSnapshot.postid === post.postid) {
      existingIndex = childSnapshot.key;
    }
  });

  if (existingIndex !== -1) {
    const existingBlogForm = snapshot.child(existingIndex).val();
    if (JSON.stringify(existingBlogForm) !== JSON.stringify(post)) {
      await set(ref(database, `blogPosts/${existingIndex}`), post);
    }
  } else {
    const newIndex = push(blogPostsRef).key;
    await set(ref(database, `blogPosts/${newIndex}`), post);
  }
};

export const uploadBlogPost = async (form) => {
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
};
