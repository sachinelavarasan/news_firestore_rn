import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwckAoUeNOvgeQ8mwchfY8rnok9Y-4Fx8",
  authDomain: "shopping-app-fe966.firebaseapp.com",
  projectId: "shopping-app-fe966",
  storageBucket: "shopping-app-fe966.appspot.com",
  messagingSenderId: "366687361449",
  appId: "1:366687361449:web:3a3f194072c1226a664cb8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
  app,
  db,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
  auth,
  query,
  where,
  orderBy,
  limit,
};
