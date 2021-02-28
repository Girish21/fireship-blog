import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { Post } from '../types'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_APPID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

const auth = firebase.auth()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

const storage = firebase.storage()
const firestore = firebase.firestore()

const parseToJSON = (doc: firebase.firestore.DocumentSnapshot) => {
  const data = doc.data()

  if (!data) return {}

  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  }
}

const fromMillis = firebase.firestore.Timestamp.fromMillis
const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

const parseTime = (post: any) => {
  if (!post) return undefined

  return {
    ...post,
    createdAt: post.createdAt.toMillis(),
    updatedAt: post.updatedAt.toMillis(),
  }
}

export {
  auth,
  firestore,
  googleAuthProvider,
  storage,
  parseToJSON,
  fromMillis,
  parseTime,
  serverTimestamp,
}
