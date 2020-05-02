import {
  templateCoders,
} from '../view/templateHomeProfile.js';

// * CRUD -> CREATE, READ, UPDATE, DELETE
// ? (CREATE) FUNCIÓN PARA CREAR USUARIOS EN LA BASE DE DATOS
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
  })
    .catch((error) => {
      console.log(error);
    });
};

// ? (READ) FUNCIÓN PARA LEER USUARIOS EN LA BASE DE DATOS
export const readUserDB = (uid) => {
  const db = firebase.firestore();
  return db.collection('users').where('uid', '==', uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((refDoc) => {
        const user = refDoc.data();
        localStorage.setItem('userCoverImg', user.coverPhoto);
        localStorage.setItem('userProfileImg', user.profilePicture);
        localStorage.setItem('userName', user.names);
        localStorage.setItem('userAbout', user.about);
      });
    });
};

export const readCreateUserDB = (uid, email, coverPhoto, profilePicture, names, about) => {
  const db = firebase.firestore();
  return db.collection('users').where('uid', '==', uid)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        createUserDB(uid, email, coverPhoto, profilePicture, names, about);
        localStorage.setItem('userCoverImg', coverPhoto);
        localStorage.setItem('userProfileImg', profilePicture);
        localStorage.setItem('userName', names);
        localStorage.setItem('userAbout', about);
      } else {
        querySnapshot.forEach((refDoc) => {
          const user = refDoc.data();
          localStorage.setItem('userCoverImg', user.coverPhoto);
          localStorage.setItem('userProfileImg', user.profilePicture);
          localStorage.setItem('userName', user.names);
          localStorage.setItem('userAbout', user.about);
        });
      }
    });
};

// FUNCIÓN PARA LEER LOS USUARIOS REGISTRADOS (ÁREA DE CODERS)
export const readCodersDB = () => {
  const db = firebase.firestore();
  return db.collection('users')
    .get()
    .then((querySnapshot) => {
      let codersList = '';
      const container = document.querySelector('.container-coders');
      querySnapshot.forEach((refDoc) => {
        const coder = refDoc.data();
        codersList += templateCoders(coder.profilePicture, coder.names, coder.about);
        return codersList;
      });
      container.innerHTML = codersList;
    });
};

// // ? (UPDATE) FUNCIÓN PARA ACTUALIZAR USUARIOS EN LA BASE DE DATOS
// export const updateUserDB = () => {
//   const db = firebase.firestore();
// };

// // ? (DELETE) FUNCIÓN PARA ELIMINAR USUARIOS EN LA BASE DE DATOS
// export const deleteUserDB = () => {
//   const db = firebase.firestore();
// };
