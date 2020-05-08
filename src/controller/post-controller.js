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

const deletePostsOnClick = () => {
  const iconDelete = document.querySelectorAll('.delete-post');
  if (iconDelete.length) {
    console.log(iconDelete.length);
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

// FUNCIÓN PARA ACTUALIZAR EL TEXTO DEL POST
export const updatePostsOnClick = () => {
  const iconUpdate = document.querySelectorAll('.update-post');

  if (iconUpdate.length) {
    iconUpdate.forEach((objPosts) => {
      objPosts.addEventListener('click', (evento) => {
        evento.preventDefault();
        const idPosts = objPosts.getAttribute('idpost');
        const textPost = document.querySelector(`#textPost-${idPosts}`);
        const iconSave = textPost.parentNode.querySelector('.save');
        textPost.contentEditable = 'true';
        textPost.focus();
        iconSave.classList.remove('hide');
        updatePosts(idPosts, textPost.innerText)
          .then(() => {})
          .catch(() => {});
      });
    });
  }
  const iconSave = document.querySelectorAll('.save');
  if (iconSave.length) {
    iconSave.forEach((objPosts) => {
      objPosts.addEventListener('click', (evento) => {
        evento.preventDefault();
        const idPosts = objPosts.getAttribute('idpost');
        const textPost = document.querySelector(`#textPost-${idPosts}`);
        updatePosts(idPosts, textPost.innerText)
          .then(() => {})
          .catch(() => {});
      });
    });
  }
};

export const readingPosts = (querySnapshot) => {
  const containerHome = document.querySelector('.container-new-post-home');
  const containerProfile = document.querySelector('.container-new-post-profile');
  let container = '';
  if (querySnapshot.empty) {
    container = containerHome || containerProfile;
    container.innerHTML = notYetPost;
  } else {
    const uid = firebase.auth().currentUser.uid;
    let postList = '';
    querySnapshot.forEach((refDoc) => {
      console.log(querySnapshot);
      const post = refDoc.data();
      if (/home/.test(window.location.hash) && post.privacy === '1') {
        postList += templatePost(post.profilePicture, post.names, post.privacy, post.date,
          post.post, post.photo, post.likes, post.comments, refDoc.id, uid, post.uid);
        containerHome.innerHTML = postList;
      } else if (/profile/.test(window.location.hash)) {
        if (post.uid === uid) {
          postList += templatePost(post.profilePicture, post.names, post.privacy, post.date,
            post.post, post.photo, post.likes, post.comments, refDoc.id, uid, post.uid);
          containerProfile.innerHTML = postList;
        }
      }
    });
  }
  updatePostsOnClick();
  deletePostsOnClick();
  btnLikes();
  return container;
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
