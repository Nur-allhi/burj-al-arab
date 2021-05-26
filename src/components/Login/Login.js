import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./FireBase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Login = () => {
  // google sign in provider:
  var provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        // var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={handleGoogleSignin}>G-Sign in</button>
    </div>
  );
};

export default Login;
