import firebase from 'firebase/app'
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBsca3QQj94Y2TKXaMBsoslbBucYHSsq28",
    authDomain: "videomagazine-300ce.firebaseapp.com",
    databaseURL: "https://videomagazine-300ce.firebaseio.com",
    projectId: "videomagazine-300ce",
    storageBucket: "videomagazine-300ce.appspot.com",
    messagingSenderId: "1002861072522",
    appId: "1:1002861072522:web:fd542c7d8d335741539d73" 
};

  // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);
 
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

export const db = firebase.firestore()