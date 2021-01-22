import firebase from 'firebase';

  const firebaseConfig = {
    apiKey: "AIzaSyAmh1YFZARRHe4gKGMHsQYU1na1mSS0xCQ",
    authDomain: "rollcallrb.firebaseapp.com",
    projectId: "rollcallrb",
    storageBucket: "rollcallrb.appspot.com",
    messagingSenderId: "458287761938",
    appId: "1:458287761938:web:44f5b75dbec0461790e6cb"
  };
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth;
  export const db = firebase.firestore();