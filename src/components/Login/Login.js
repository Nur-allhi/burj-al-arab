import React, { useContext } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./FireBase.config";
import "./Login.css";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  // google sign in provider:
  var provider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignin = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        const { displayName, email } = result.user;
        const signInUser = { name: displayName, email: email };
        setLoggedInUser(signInUser);
        history.replace(from);
        console.log(displayName, email);
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login-form">
      <h1>This is Login</h1>
      <button onClick={handleGoogleSignin}>G-Sign in</button>
    </div>
  );
};

export default Login;
