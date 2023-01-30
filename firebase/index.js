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

const firebaseConfig = {};

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
