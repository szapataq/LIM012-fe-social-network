import {
  templatePost,
} from '../view/templateHomeProfile.js';

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

// const dateformat = require('dateformat');

// const orderDate = () => {
//   const dateNow = new Date();
//   return parseInt(dateformat(dateNow, 'yyyymmddHHMMss'), 0);
// };

const orderDate = () => {
  const dateNow = new Date();
  const year = dateNow.getFullYear();
  const month = dateNow.getMonth();
  const day = dateNow.getDay();
  const hour = dateNow.getHours();
  const minute = dateNow.getMinutes();
  const second = dateNow.getSeconds();
  return parseInt(`${year}${month}${day}${hour}${minute}${second}`, 0);
};

// FUNCIÓN PARA CREAR LOS POSTS
export const createPostDB = (post, privacy) => {
  const db = firebase.firestore();
  return db.collection('posts').add({
    uid: firebase.auth().currentUser.uid,
    names: localStorage.getItem('userName') || firebase.auth().currentUser.displayName,
    profilePicture: localStorage.getItem('userProfileImg') || firebase.auth().currentUser.photoURL,
    post,
    photo: '',
    privacy,
    date: datePostDB(),
    orderDate: orderDate(),
    likes: 0,
    comments: [],
  }).then((refDoc) => {
    console.log(`Id del usuario => ${refDoc.id}`);
  })
    .catch((error) => {
      console.log(error);
    });
};

// FUNCIÓN PARA LEER LOS POSTS
export const readPostDB = () => {
  const db = firebase.firestore();
  return db.collection('posts')
    .orderBy('orderDate', 'desc')
    .get()
    .then((querySnapshot) => {
      let postList = '';
      const container = document.querySelector('.container-new-post');
      querySnapshot.forEach((refDoc) => {
        const post = refDoc.data();
        postList += templatePost(post.profilePicture,
          post.names, post.date, post.post, post.likes, post.comments);
        return postList;
      });
      container.innerHTML = postList;
    });
};
