import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBRTCYTf6TH1DaVXboaqTvVOT1DRtS2_Y8",
  authDomain: "credcalc-93e53.firebaseapp.com",
  projectId: "credcalc-93e53",
  storageBucket: "credcalc-93e53.appspot.com",
  messagingSenderId: "350742667448",
  appId: "1:350742667448:web:1d320dff9d1c412f71944d",
  //measurementId: "G-15B1JBH1XP"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
