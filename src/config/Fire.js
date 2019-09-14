import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBgFx6YJTnlCWpI-25-TZvEFCp6y5qkVKU",
  authDomain: "acaichat-a1c59.firebaseapp.com",
  databaseURL: "https://acaichat-a1c59.firebaseio.com",
  projectId: "acaichat-a1c59",
  storageBucket: "",
  messagingSenderId: "754639974564"
};
const fire = firebase.initializeApp(config);

export default fire;
