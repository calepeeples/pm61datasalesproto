import * as firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { functions } from "firebase";

let config = {
  apiKey: "AIzaSyDXz_18SgM4OxrGGVKoBtP5_mqPS5R2Y5E",
  authDomain: "pm61proto.firebaseapp.com",
  databaseURL: "https://pm61proto.firebaseio.com",
  projectId: "pm61proto",
  storageBucket: "pm61proto.appspot.com",
  messagingSenderId: "536922060334",
  appId: "1:536922060334:web:1edbe3e2c3be2e8d93d1bf",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export default firebase.database();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
