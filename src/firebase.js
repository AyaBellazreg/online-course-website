import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth()
export default app
