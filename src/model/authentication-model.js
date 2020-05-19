export const signIn = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);

export const createNewUser = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);


export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signOut = () => firebase.auth().signOut();
