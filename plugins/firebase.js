import * as firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-storage'

// firebaseのconfig情報をペースト
const firebaseConfig = {
  apiKey: 'AIzaSyBowQPLl_2txOUmJfTd9ek9usvhG2Z59R0',
  authDomain: 'rune-generator.firebaseapp.com',
  databaseURL: 'https://rune-generator.firebaseio.com',
  projectId: 'rune-generator',
  storageBucket: 'rune-generator.appspot.com',
  messagingSenderId: '563458965490',
  appId: '1:563458965490:web:8bbe001ba88d315966b56b',
  measurementId: 'G-B4KFEMW3NR'
}
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const storage = firebase.storage()
