import firebase from 'firebase';


  const firebaseConfig = {
    apiKey: "AIzaSyCX74-2mQJrkJvFZbnC32t_5N0wH0n2XSc",
    authDomain: "sec7-4d979.firebaseapp.com",
    databaseURL: "https://sec7-4d979.firebaseio.com",
    projectId: "sec7-4d979",
    storageBucket: "sec7-4d979.appspot.com",
    messagingSenderId: "333265959777",
    appId: "1:333265959777:web:d249bcf4bc24ca8cdc2320",
    measurementId: "G-XPWB2GKCTB"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  export default fire; 
  firebase.analytics();
