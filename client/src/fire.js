import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA2plNPY-gbGcVN7cvOxDM1Rw14RiRazJc",
    authDomain: "dig-in-9981c.firebaseapp.com",
    projectId: "dig-in-9981c",
    storageBucket: "dig-in-9981c.appspot.com",
    messagingSenderId: "442441693550",
    appId: "1:442441693550:web:955913d25e5365c78ae97f",
    measurementId: "G-FSC5E4VPX0"
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(config);
  firebase.analytics();


  export default fire;