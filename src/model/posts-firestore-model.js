import {
  templatePost,
} from '../view/templateHomeProfile.js';

import {
  btnLikes,
} from '../controller/homeProfile-controller.js';

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
  const month = `0${dateNow.getMonth()}`.slice(-2);
  const day = `0${dateNow.getDay()}`.slice(-2);
  const hour = `0${dateNow.getHours()}`.slice(-2);
  const minute = `0${dateNow.getMinutes()}`.slice(-2);
  const second = `0${dateNow.getSeconds()}`.slice(-2);
  return parseInt(`${year}${month}${day}${hour}${minute}${second}`, 0);
};

// FUNCIÓN PARA CREAR LOS POSTS
export const createPostDB = (post, privacy) => {
  firebase.firestore().collection('posts').add({
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
/* export const readPostDB = () => {
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
}; */

export const readPostDB = () => {
  firebase.firestore().collection('posts')
    .orderBy('orderDate', 'desc')
    .onSnapshot((querySnapshot) => {
      let postList = '';
      const container = document.querySelector('.container-new-post');
      querySnapshot.forEach((refDoc) => {
        const post = refDoc.data();
        postList += templatePost(post.profilePicture,
          post.names, post.date, post.post, post.likes, post.comments);
        return postList;
      });
      container.innerHTML = postList;
      btnLikes();
    });
};

export const shareImgPost = (file, uid) => {
  const refStorage = firebase.storage().ref(`imgPosts/${uid}/${file.name}`);
  const taskStorage = refStorage.put(file);

  const stateSnapshot = (snapshot) => {
    const percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
    console.log(percent);
    // $('.determinate').attr('style', `width: ${percent}%`);
  };

  const catchError = (err) => { console.log(err.message); };

  const fileReady = () => {
    taskStorage.snapshot.ref.getDownloadURL()
      .then((url) => {
        console.log(url);
        sessionStorage.setItem('imgNewPost', url);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  taskStorage.on('state_changed', stateSnapshot, catchError, fileReady);
};

export const deleteNote = idpost => firebase.firestore().collection('posts').doc(idpost).delete();
