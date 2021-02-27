import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyDRK8Mon5N5sq8wjKwWWBYqIHFMBalGY0E",
  authDomain: "mega-8e8b9.firebaseapp.com",
  databaseURL: "https://mega-8e8b9-default-rtdb.firebaseio.com",
  projectId: "mega-8e8b9",
  storageBucket: "mega-8e8b9.appspot.com",
  messagingSenderId: "485212529783",
  appId: "1:485212529783:web:3cdb39f1f24bcb220b5272",
  measurementId: "G-PQ972F60MN"
};

  //Inicializador de firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {firebase, db, auth,storage}