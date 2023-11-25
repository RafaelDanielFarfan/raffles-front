import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCvzm1prlRugWYfINwyczPLji4PRLyD_Lg",
//   authDomain: "rifa-app-aa411.firebaseapp.com",
//   projectId: "rifa-app-aa411",
//   storageBucket: "rifa-app-aa411.appspot.com",
//   messagingSenderId: "333777992910",
//   appId: "1:333777992910:web:e811191ccfb1ff697d649f",
//   measurementId: "G-VG98GT8YFG"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBJDf1DqJVAVOCyxsZm10TfXNaz-w3Ms6Y",
  authDomain: "rifa-olga.firebaseapp.com",
  databaseURL: "https://rifa-olga-default-rtdb.firebaseio.com",
  projectId: "rifa-olga",
  storageBucket: "rifa-olga.appspot.com",
  messagingSenderId: "1042575036162",
  appId: "1:1042575036162:web:43d5a1a6ec462c1f24bc1b"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);
