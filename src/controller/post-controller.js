import {
  createPostDB,
  updatePosts,
  deletePosts,
} from '../model/posts-firestore-model.js';

import {
  templatePost,
  notYetPost,
} from '../view/templateHomeProfile.js';

import {
  btnLikes,
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
const deletePostsOnClick = () => {
  const iconDelete = document.querySelectorAll('.delete-post');
  if (iconDelete.length) {
    iconDelete.forEach((objPosts) => {
      objPosts.addEventListener('click', () => {
        const idPosts = objPosts.getAttribute('idpost');
        deletePosts(idPosts)
          .then(() => {
          })
          .catch(() => {
          });
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
  const privacyPost = sessionStorage.getItem('privacy') || privacyPostArea || 1;

  createPostDB(uid, names, profilePic, post, photo, privacyPost)
    .then(() => {
      sessionStorage.removeItem('imgNewPost');
      // console.log('Document written with ID: ', docRef.id);
    })
    .catch(() => {
      // console.log(error);
    });
};

export const readingPosts = (querySnapshot) => {
  const container = document.querySelector('.container-new-post');
  if (querySnapshot.empty) {
    container.innerHTML = notYetPost;
  } else {
    const uid = firebase.auth().currentUser.uid;
    let postList = '';
    querySnapshot.forEach((refDoc) => {
      const post = refDoc.data();
      postList += templatePost(post.profilePicture, post.names, post.privacy, post.date,
        post.post, post.photo, post.likes, post.comments, refDoc.id, uid, post.uid);
      container.innerHTML = postList;
      return postList;
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
