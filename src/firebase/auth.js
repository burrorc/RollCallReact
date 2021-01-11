import { auth } from "./firebase";

export function signup(email, password) {
  return auth().createUserWithEmailAndPassword(email, password);
}

export function login(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function googleLogin() {
  const provider = new auth.GoogleAuthProvider();
  return auth().signInWithPopup(provider);
}

export function signInWithFacebook(){
  const provider = new auth.FacebookAuthProvider();
  return auth().signInWithRedirect(provider);
}

export function signOut(){
  return auth().signOut();
}
