export const datePostDB = () => {
  const datePost = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  const timePost = {
    hour12: 'true',
    hour: 'numeric',
    minute: 'numeric',
  };

  const date = new Date().toLocaleDateString('es-Es', datePost);
  const time = new Date().toLocaleTimeString('es-Es', timePost);
  const dateTime = `${date} ${time}`;

  return dateTime;
};

const orderDate = () => {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = `0${dateNow.getMonth()}`.slice(-2);
  const day = `0${dateNow.getDay()}`.slice(-2);
  const hour = `0${dateNow.getHours()}`.slice(-2);
  const minute = `0${dateNow.getMinutes()}`.slice(-2);
  const second = `0${dateNow.getSeconds()}`.slice(-2);
  return parseInt(`${year}${month}${day}${hour}${minute}${second}`, 0);
};

// FUNCIÓN PARA CREAR LOS POSTS
export const createPostDB = (uid, names, profilePicture, post, imgPost, privacy) => firebase.firestore().collection('posts').add({
  uid,
  names,
  profilePicture,
  post,
  photo: imgPost,
  privacy,
  date: datePostDB(),
  orderDate: orderDate(),
  likes: 0,
  comments: [],
});

// FUNCIÓN PARA LEER LOS POSTS EN PERFIL
export const readPostDB = (callback) => {
  firebase.firestore().collection('posts')
    .orderBy('orderDate', 'desc')
    .onSnapshot(callback);
};

// FUNCIÓN PARA LEER LOS POSTS EN EL HOME
export const readPostDBToHome = (callback) => {
  firebase.firestore().collection('posts')
    .orderBy('orderDate', 'desc')
    .where('privacy', '==', '1')
    .onSnapshot(callback);
};

// FUNCIÓN PARA BORRAR LOS POSTS
export const deletePosts = idpost => firebase.firestore().collection('posts').doc(idpost).delete();

// FUNCIÓN PARA ACTUALIZAR LOS POSTS
export const updatePosts = (idpost, textPost) => firebase.firestore().collection('posts').doc(idpost).update({ post: textPost });
