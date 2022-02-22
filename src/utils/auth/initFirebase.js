/*
Uses firebaseConfig to initialize app on every run.
Called on every page which interacts with Firebase.

This uses the public api key to access the firebase project as a client.
  Database security relies on Firestore rules.
The most recent firebaseConfig and instructions to setup the Firebase SDK
  can be found under project settings, towards the bottom of the "General" section.
*/

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: "AIzaSyAX-hvjUkvd2ff9lGhcRvkCpezUkCxfpCs",
  authDomain: "freelance-beach-cleanup.firebaseapp.com",
  projectId: "freelance-beach-cleanup",
  storageBucket: "freelance-beach-cleanup.appspot.com",
  messagingSenderId: "261461764075",
  appId: "1:261461764075:web:b2d17843d4e5b19a711bae",
  measurementId: "G-5SVG8C4Z65"
};

export default function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    if(!isNode) {
      // firebase.analytics();
    }
  }
}