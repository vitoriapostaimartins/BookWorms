//---------------------------------------------------------------------
// Your web app's Firebase configuration;
// Speficies which firebase project your application is connected with.
//---------------------------------------------------------------------

var firebaseConfig = {

  // Your API stuff goes here;  get it from firebase console
  apiKey: "AIzaSyDTP9Vy2ioIxzOo9ASWoe9n4_tH8UNxqxA",
  authDomain: "bookworms-3fd21.firebaseapp.com",
  databaseURL: "https://bookworms-3fd21.firebaseio.com",
  projectId: "bookworms-3fd21",
  storageBucket: "bookworms-3fd21.appspot.com",
  messagingSenderId: "968201168067",
  appId: "1:968201168067:web:02c23923ebda9d32302e76"

};

// Initialize Firebase
// Henceforce, any reference to the database can be made with "db"
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();