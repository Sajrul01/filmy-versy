import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBuwefYMh3eUMJK2qMhXqFxgk2KflQ0U30",
  authDomain: "filmyversy-eb615.firebaseapp.com",
  projectId: "filmyversy-eb615",
  storageBucket: "filmyversy-eb615.appspot.com",
  messagingSenderId: "658338561233",
  appId: "1:658338561233:web:4104ab1f7f4f47c06519f0"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;