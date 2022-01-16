// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDs6BLIcWFV5mDTLHSbAyPFGvWV-AksKik",
//   authDomain: "todov2-72e85.firebaseapp.com",
//   projectId: "todov2-72e85",
//   storageBucket: "todov2-72e85.appspot.com",
//   messagingSenderId: "947462663166",
//   appId: "1:947462663166:web:4911c44b41fbcccb9aeeaf",
//   measurementId: "G-T39K93PXR2"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCwsS7InvKfw3PLh0d5WK-a14Zp3HVshRg",
  authDomain: "test-bec13.firebaseapp.com",
  projectId: "test-bec13",
  storageBucket: "test-bec13.appspot.com",
  messagingSenderId: "1026775984650",
  appId: "1:1026775984650:web:2cd905d5fb4a3ce2d64df3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); 

export default app;