import firebase from 'firebase';


  const firebaseConfig = {
    apiKey: "AIzaSyCn-CKUkY0M-La40uCpHiuRka_GkNV9M-U",
    authDomain: "sec-proj-4df88.firebaseapp.com",
    databaseURL: "https://sec-proj-4df88.firebaseio.com",
    projectId: "sec-proj-4df88",
    storageBucket: "sec-proj-4df88.appspot.com",
    messagingSenderId: "9485789342",
    appId: "1:9485789342:web:e13248652594d45c23338f",
    measurementId: "G-YDQ2ZW9M13"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire; 
  firebase.analytics();
