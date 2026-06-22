import { initializeApp } from "firebase/app"

import {
  getFirestore
} from "firebase/firestore"

const firebaseConfig = {

  apiKey:
  "AIzaSyDekGvhLbr6e-1buMZb66Vt4uJ2xBXEfCA",

  authDomain:
  "streamflix-d860b.firebaseapp.com",

  projectId:
  "streamflix-d860b",

  storageBucket:
  "streamflix-d860b.firebasestorage.app",

  messagingSenderId:
  "667496389728",

  appId:
  "1:667496389728:web:272b97bb9bef55d38c7705"

}

const app =
initializeApp(firebaseConfig)

export const db =
getFirestore(app)