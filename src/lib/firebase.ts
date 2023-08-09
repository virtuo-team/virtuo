import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBU3KMHNNgOa45TYTp4e7Mv0tWAV8GZslo",
  authDomain: "virtuo-yicte.firebaseapp.com",
  projectId: "virtuo-yicte",
  storageBucket: "virtuo-yicte.appspot.com",
  messagingSenderId: "252560612987",
  appId: "1:252560612987:web:9b1eb74689feac516fccde"
};

export let firebaseApp: FirebaseApp | undefined;
if (!getApps().length) { firebaseApp = initializeApp(firebaseConfig);}
export const firebaseAuth = getAuth(firebaseApp!);
export const db = getFirestore(firebaseApp!);