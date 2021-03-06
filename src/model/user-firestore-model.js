// * CRUD -> CREATE, READ, UPDATE, DELETE
// ? (CREATE) FUNCIÓN PARA CREAR USUARIOS EN LA BASE DE DATOS
export const createUserDB = (uid, email, coverPhoto, profilePicture, names, about) => firebase.firestore().collection('users').add({
  uid,
  email,
  coverPhoto,
  profilePicture,
  names,
  about,
});

// ? (READ) FUNCIÓN PARA LEER USUARIOS EN LA BASE DE DATOS
export const readUserDB = uid => firebase.firestore().collection('users')
  .where('uid', '==', uid)
  .get();

// FUNCIÓN PARA LEER LOS USUARIOS REGISTRADOS (ÁREA DE CODERS)
export const readCodersDB = (callback) => {
  firebase.firestore().collection('users').onSnapshot(callback);
};

// UPDATE USER DATA NAME
export const updateUserDataName = (uid, names) => firebase.firestore().collection('users').doc(uid).update({
  names,
});

// UPDATE USER DATA ABOUT
export const updateUserDataAbout = (uid, about) => firebase.firestore().collection('users').doc(uid).update({
  about,
});
