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
  const day = `0${dateNow.getDate()}`.slice(-2);
  const hour = `0${dateNow.getHours()}`.slice(-2);
  const minute = `0${dateNow.getMinutes()}`.slice(-2);
  const second = `0${dateNow.getSeconds()}`.slice(-2);
  return parseInt(`${year}${month}${day}${hour}${minute}${second}`, 0);
};

// CREATE POSTS
export const createPostDB = (uid, names, profilePicture, post, imgPost, privacy) => firebase.firestore().collection('posts').add({
  uid,
  names,
  profilePicture,
  post,
  photo: imgPost,
  privacy,
  date: datePostDB(),
  orderDate: orderDate(),
  likes: [],
});

// READ POSTS
export const readPostDB = (callback) => {
  firebase.firestore().collection('posts')
    .orderBy('orderDate', 'desc')
    .onSnapshot(callback);
};

// UPDATE POSTS
export const updatePosts = (idpost, textPost) => firebase.firestore().collection('posts').doc(idpost).update({
  post: textPost,
});

// DELETE POSTS
export const deletePosts = idpost => firebase.firestore().collection('posts').doc(idpost).delete();

// CREATE COMMENTS
export const createCommentsDB = (idPost, names, profilePicture, comment) => firebase.firestore().collection('comments').add({
  idPost,
  names,
  profilePicture,
  comment,
  date: datePostDB(),
  orderDate: orderDate(),
});

// READ COMMENTS
export const readCommentsDB = (callback) => {
  firebase.firestore().collection('comments')
    .orderBy('orderDate', 'desc')
    .onSnapshot(callback);
};

// DELETE COMMENTS
export const deleteCommentsDB = idcomment => firebase.firestore().collection('comments').doc(idcomment).delete();

// ADD LIKE
export const addLikeArr = (idPost, uid) => (
  firebase.firestore().collection('posts').doc(idPost)
    .update({ likes: firebase.firestore.FieldValue.arrayUnion(uid) })
);

// ELIMINAR LIKE
export const removeLikeArr = (idPost, uid) => (
  firebase.firestore().collection('posts').doc(idPost)
    .update({ likes: firebase.firestore.FieldValue.arrayRemove(uid) })
);
