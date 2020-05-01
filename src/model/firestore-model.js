export const createUserDB = (uid, email, coverPhoto, profilePicture, names, about) => {
  const db = firebase.firestore();
  return db.collection('users').add({
    uid,
    email,
    coverPhoto,
    profilePicture,
    names,
    about,
  }).then((refDoc) => {
    console.log(`Id del usuario => ${refDoc.id}`);
  }).catch((error) => {
    console.log(error);
  });
};
