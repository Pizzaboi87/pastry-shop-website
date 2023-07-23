import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	EmailAuthProvider,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, onValue } from "firebase/database";
import {
	getStorage,
	ref as refStorage,
	uploadBytes,
	getDownloadURL,
} from "firebase/storage";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);

//Better function should be written, name needed for other functionality
export const showName = async (uid) => {
	const userDocRef = doc(db, "users", uid);
	const userSnapShot = await getDoc(userDocRef);
	const userName =
		userSnapShot._document.data.value.mapValue.fields.displayName.stringValue;
	return userName;
};
