// eslint-disable-next-line max-len
export const createNewUser = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

// eslint-disable-next-line max-len
export const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

// export const userCurrent = () => firebase.auth().currentUser;
export const signOut = () => firebase.auth().signOut();

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

export const signInWithFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};
