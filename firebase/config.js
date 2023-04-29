import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCbunvMsMDHMt1GfIKGp2YSG08JdJGpOW8",
  authDomain: "sociablesphere.firebaseapp.com",
  projectId: "sociablesphere",
  storageBucket: "sociablesphere.appspot.com",
  messagingSenderId: "88093454690",
  appId: "1:88093454690:web:62b707cdd4c964365b3c3b",
  measurementId: "G-3H4WF9DWP2",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, db, storage };
