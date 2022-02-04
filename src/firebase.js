import firebase from "firebase/app";
import "firebase/auth"


export const auth = firebase.initializeApp ({
  apiKey: "AIzaSyDgsyNRY71xKVUM14pSHFoWo3In9T5ZPao",
  authDomain: "universe-7e5f0.firebaseapp.com",
  projectId: "universe-7e5f0",
  storageBucket: "universe-7e5f0.appspot.com",
  messagingSenderId: "345335155777",
  appId: "1:345335155777:web:19cb27015079fd23e1cac0"
}).auth();