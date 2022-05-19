import firebase from "firebase/app";
import "firebase/firestore";
import 'firebase/storage'
import "firebase/auth";
import "firebase/functions";

import flamelink from "flamelink";
import 'flamelink/content'
import 'flamelink/storage'
import 'flamelink/users'

const firebaseConfig = {
    apiKey: "AIzaSyCqD5TJJ_25WcHLIH71gPFTuZkQXb8OrgE",
    authDomain: "eklipse-development.firebaseapp.com",
    projectId: "eklipse-development",
    storageBucket: "eklipse-development.appspot.com",
    messagingSenderId: "149104158406",
    appId: "1:149104158406:web:d3cdf4f365cf2bb672d9c7",
    measurementId: "G-KXVB5TP0VQ"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const app = flamelink({
  firebaseApp,
  env: 'production', // optional, defaults to `production`
  locale: 'en-US', // optional, defaults to `en-US`
  dbType: 'cf' // optional, defaults to `rtdb` - can be 'rtdb' or 'cf' (Realtime DB vs Cloud Firestore)
})

// utils
const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();
const provider = firebase.auth;

export { app, db, auth, functions, provider };