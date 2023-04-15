// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbunvMsMDHMt1GfIKGp2YSG08JdJGpOW8",
  authDomain: "sociablesphere.firebaseapp.com",
  projectId: "sociablesphere",
  storageBucket: "sociablesphere.appspot.com",
  messagingSenderId: "88093454690",
  appId: "1:88093454690:web:62b707cdd4c964365b3c3b",
  measurementId: "G-3H4WF9DWP2",
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, db, storage };
