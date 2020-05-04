import {
  createPostDB,
} from '../model/posts-firestore-model.js';

import {
  templatePost,
} from '../view/templateHomeProfile.js';

import {
  btnLikes,
  deletePostsOnClick,
} from './homeProfile-controller.js';

const priv = document.querySelector('#private');
const pub = document.querySelector('#public');

if (priv) {
  pub.addEventListener('click', () => {
    sessionStorage.setItem('privacy', 1);
  });
}

if (pub) {
  priv.addEventListener('click', () => {
    sessionStorage.setItem('privacy', 2);
  });
}


export const createNewPost = (post, privacyPostArea) => {
  const uid = firebase.auth().currentUser.uid;
  const names = localStorage.getItem('userName');
  const profilePic = localStorage.getItem('userProfileImg');
  const photo = sessionStorage.getItem('imgNewPost');
  const privacyPost = sessionStorage.getItem('privacy') || privacyPostArea || 1;

  createPostDB(uid, names, profilePic, post, photo, privacyPost)
    .then((docRef) => {
      sessionStorage.removeItem('imgNewPost');
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const readingPosts = (querySnapshot) => {
  let postList = '';
  const container = document.querySelector('.container-new-post');
  querySnapshot.forEach((refDoc) => {
    const post = refDoc.data();
    postList += templatePost(post.profilePicture,
      post.names, post.date, post.post, post.photo, post.likes, post.comments, refDoc.id);
    return postList;
  });
  container.innerHTML = postList;
  deletePostsOnClick();
  btnLikes();
};
