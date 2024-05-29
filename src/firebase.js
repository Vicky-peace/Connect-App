// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCv3mAqThNb02fNPRz6iTXfS-xiKn6ehs",
  authDomain: "connectapp-1b987.firebaseapp.com",
  projectId: "connectapp-1b987",
  storageBucket: "connectapp-1b987.appspot.com",
  messagingSenderId: "200243359919",
  appId: "1:200243359919:web:65ed5b50ac9a089a03a45a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const storage = getStorage(app)

export default app;