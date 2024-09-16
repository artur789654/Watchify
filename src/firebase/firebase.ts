import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqyDg5uFgffbJHBe1cY7-aP91xxUysoIk",
  authDomain: "wachify-1eb19.firebaseapp.com",
  projectId: "wachify-1eb19",
  storageBucket: "wachify-1eb19.appspot.com",
  messagingSenderId: "44625080976",
  appId: "1:44625080976:web:3407b0a568a8a40ca61e15",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export default app;
