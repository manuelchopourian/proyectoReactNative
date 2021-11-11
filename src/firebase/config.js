import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBnkGc7ouB-SZq69PXXZuvMake7NrMxLDk",
    authDomain: "proyectoreactnative-25308.firebaseapp.com",
    projectId: "proyectoreactnative-25308",
    storageBucket: "proyectoreactnative-25308.appspot.com",
    messagingSenderId: "57499448394",
    appId: "1:57499448394:web:c58928d536696ed7ea62b3"
  };

  app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore()