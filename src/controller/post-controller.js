import {
  createPostDB,
  updatePosts,
} from '../model/posts-firestore-model.js';

import {
  templatePost,
  notYetPost,
} from '../view/templateHomeProfile.js';

import {
  btnLikes,
  deletePostsOnClick,
} from './homeProfile-controller.js';

// FUNCIÓN PARA ACTUALIZAR EL TEXTO DEL POST
export const updatePostsOnClick = () => {
  const iconUpdate = document.querySelectorAll('.update-post');
  if (iconUpdate.length) {
    iconUpdate.forEach((objPosts) => {
      objPosts.addEventListener('click', (evento) => {
        evento.preventDefault();
        const idPosts = objPosts.getAttribute('idpost');
        const textPost = document.querySelector(`#textPost-${idPosts}`);
        textPost.contentEditable = 'true';
        textPost.focus();
        updatePosts(idPosts, textPost.innerText)
          .then(() => {})
          .catch(() => {});
      });
    });
  }
};

// FUNCIÓN PARA CREAR POST
export const createNewPost = (post, privacyPostArea) => {
  const uid = firebase.auth().currentUser.uid;
  const names = localStorage.getItem('userName');
  const profilePic = localStorage.getItem('userProfileImg');
  const photo = sessionStorage.getItem('imgNewPost');
  const privacyPost = privacyPostArea || sessionStorage.getItem('privacy') || '1';

  createPostDB(uid, names, profilePic, post, photo, privacyPost)
    .then(() => {
      sessionStorage.removeItem('imgNewPost');
      // console.log('Document written with ID: ', docRef.id);
    })
    .catch(() => {
      // console.log(error);
    });
};

// FUNCIÓN PARA LEER LOS POSTS
export const readingPosts = (querySnapshot) => {
  const containerHome = document.querySelector('.container-new-post-home');
  const containerProfile = document.querySelector('.container-new-post');

  let container;
  if (/home/.test(window.location.hash)) {
    container = containerHome;
  } else {
    container = containerProfile;
  }

  if (querySnapshot.empty) {
    container.innerHTML = notYetPost;
  } else {
    const uid = firebase.auth().currentUser.uid;
    let postList = '';
    querySnapshot.forEach((refDoc) => {
      const post = refDoc.data();
      if (/home/.test(window.location.hash) && post.privacy === '1') {
        postList += templatePost(post.profilePicture, post.names, post.privacy, post.date,
          post.post, post.photo, post.likes, post.comments, refDoc.id, uid, post.uid);
        container.innerHTML = postList;
      } else if (/profile/.test(window.location.hash)) {
        postList += templatePost(post.profilePicture, post.names, post.privacy, post.date,
          post.post, post.photo, post.likes, post.comments, refDoc.id, uid, post.uid);
        container.innerHTML = postList;
      }
    });
  }
  updatePostsOnClick();
  deletePostsOnClick();
  btnLikes();
};

// EVENTOS DEL MODAL
const close = document.querySelector('.close');
const modal = document.querySelector('.modal');
const cancel = document.querySelector('.cancel');
const modalFlex = document.querySelector('.modal-flex');
window.addEventListener('click', (evento) => {
  if (evento.target === modalFlex || close || cancel) {
    modal.classList.add('ocultar');
  }
});
