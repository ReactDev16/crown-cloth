import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyBoNXGVyAEorleWvVDdkUWMHqO8jecuQ3M",
  authDomain: "crwn-db-f1d73.firebaseapp.com",
  projectId: "crwn-db-f1d73",
  storageBucket: "crwn-db-f1d73.appspot.com",
  messagingSenderId: "540686943362",
  appId: "1:540686943362:web:7030a9bc41ef838f88a09b",
};
export const createUserProfileDocument = async (userAuth, otherData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...otherData,
      });
    } catch (error) {
      console.log("error cretating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
