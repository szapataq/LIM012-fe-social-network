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
export const readCodersDB = () => firebase.firestore().collection('users').get();
