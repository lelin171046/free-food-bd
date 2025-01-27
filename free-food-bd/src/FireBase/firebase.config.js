// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhUttdcKvqhdGY9r5KMSblSl-g3o_Bwh4",
  authDomain: "free-food-bd.firebaseapp.com",
  projectId: "free-food-bd",
  storageBucket: "free-food-bd.firebasestorage.app",
  messagingSenderId: "949770972054",
  appId: "1:949770972054:web:e537a166b7f81c07490bb7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;