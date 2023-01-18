import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDWqri9sTT4D7jCKhOIQtV64co688AHvT0",
  authDomain: "hackyeah-3d3ac.firebaseapp.com",
  projectId: "hackyeah-3d3ac",
  storageBucket: "hackyeah-3d3ac.appspot.com",
  messagingSenderId: "351334000312",
  appId: "1:351334000312:web:36f1c0ccfb72bc6b81364d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);

export default app;