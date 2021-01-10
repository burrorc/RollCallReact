import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBBeLhkUNpc7RsxExn_ODHfSRZ67JnWfJ0",
    authDomain: "play-bcd04.firebaseapp.com",
    projectId: "play-bcd04",
    storageBucket: "play-bcd04.appspot.com",
    messagingSenderId: "851275633519",
    appId: "1:851275633519:web:364ebf2fa7b9ef96f68e9a"
  };
  
  firebase.initializeApp(firebaseConfig);

  export const auth = firebase.auth;
  export const db = firebase.firestore();