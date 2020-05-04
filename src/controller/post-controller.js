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

export const createNewPost = (post, privacyPostArea) => {
  const uid = firebase.auth().currentUser.uid;
  const names = localStorage.getItem('userName');
  const profilePic = localStorage.getItem('userProfileImg');
  const photo = sessionStorage.getItem('imgNewPost');

  createPostDB(uid, names, profilePic, post, photo, privacyPostArea)
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
