import {
  device,
} from '../utiles/utilitarias.js';

import {
  createPostDB,
  updatePosts,
  deletePosts,
  readComments,
  deleteCommentsDB,
  updatePersonalData,
  readPostProfile,
} from '../model/posts-firestore-model.js';

import {
  delFileStorage,
} from '../model/storage-firestore-model.js';

import {
  templatePost,
  notYetPost,
} from '../view/templateHomeProfile.js';

// ELIMINAR COMENTAROS DEL POST ELIMINADO
const deleteAllComments = (comments, idPost) => {
  comments.forEach((comment) => {
    if (idPost === comment.idPost) {
      deleteCommentsDB(comment.id);
    }
  });
};

// PARA TRAER EL UID Y EL NOMBRE DE LA FOTO
export const cutURL = (url) => {
  const urlDecode = decodeURIComponent(url);
  const urlA = urlDecode.split('?');
  const urlB = urlA[0].split('/');
  return {
    uid: urlB[8],
    photoURL: urlB[9],
  };
};

// FUNCIÓN PARA BORRAR TEXTO DEL POST
const deletePostsOnClick = () => {
  const iconDelete = document.querySelectorAll('.delete-post');
  if (iconDelete.length) {
    iconDelete.forEach((objPosts) => {
      objPosts.addEventListener('click', () => {
        const idPosts = objPosts.getAttribute('idpost');
        const imgElement = document.querySelector(`.img-${idPosts}`);
        deletePosts(idPosts)
          .then(() => {
            readComments(deleteAllComments, idPosts);
            if (imgElement) {
              const objFile = cutURL(imgElement.src);
              delFileStorage(objFile.photoURL, objFile.uid);
            }
          })
          .catch(() => {});
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
      });
    });
  }

  // FUNCIÓN PARA GUARDAR LA ACTUALIZACIÓN DEL POST
  const iconSave = document.querySelectorAll('.save');
  if (iconSave.length) {
    iconSave.forEach((objPosts) => {
      objPosts.addEventListener('click', (evento) => {
        evento.preventDefault();
        const idPosts = objPosts.getAttribute('idpost');
        const textPost = document.querySelector(`#textPost-${idPosts}`);
        if (textPost.innerText.trim() !== '') {
          textPost.contentEditable = 'false';
          objPosts.classList.add('hide');
          const post = textPost.innerText.trim();
          updatePosts(idPosts, post);
        }
      });
    });
  }

  // FUNCIÓN PARA INHABILITAR EL BTN SI EL CAMPO ESTÁ VACÍO
  const textPost = document.querySelectorAll('.textPost');
  if (textPost.length) {
    textPost.forEach((objTextPost) => {
      objTextPost.addEventListener('keyup', () => {
        const icon = objTextPost.parentNode.querySelector('.save');
        if (icon) {
          if (objTextPost.innerText.trim() === '') {
            icon.classList.add('activeSave');
          } else {
            icon.classList.remove('activeSave');
          }
        }
      });
    });
  }
};

const btnLikes = () => {
  const interval = setInterval(() => {
    const svgIcons = document.querySelectorAll('.iconLike');
    if (svgIcons.length) {
      clearInterval(interval);
      svgIcons.forEach((svgIcon) => {
        // eslint-disable-next-line no-undef
        const burst = new mojs.Burst({
          count: 20,
          left: (svgIcon.getBoundingClientRect().left + (svgIcon.clientWidth / 2)),
          top: (svgIcon.getBoundingClientRect().top + (svgIcon.clientHeight / 2)),
          children: {
            shape: ['circle', 'polygon', 'rect'],
            fill: ['#6886c5', '#ffe0ac', '#ffacb7'],
            degreeShift: 'rand(-360, 360)',
            delay: 'stagger(0,30)',
          },
          duration: 400,
        });
        svgIcon.addEventListener('click', (e) => {
          e.currentTarget.classList.toggle('svg-filled');
          burst.replay();
        });
      });
    }
  }, 1000);
};

// SHOW OPTIONS COMMENT
const showOpt = () => {
  const containerPost = document.querySelectorAll('.title-new-post');
  if (device() === 'Desktop') {
    if (containerPost.length) {
      containerPost.forEach((objPosts) => {
        objPosts.addEventListener('mouseover', () => {
          const opt = objPosts.querySelector('.comment');
          if (opt && !opt.classList.contains('active')) {
            opt.classList.remove('hide');
          }
        });
        objPosts.addEventListener('mouseleave', () => {
          const opt = objPosts.querySelector('.comment');
          if (opt && !opt.classList.contains('active')) {
            opt.classList.add('hide');
          }
        });
      });
    }
  } else {
    containerPost.forEach((objPosts) => {
      const opt = objPosts.querySelector('.comment');
      if (opt) opt.classList.remove('hide');
    });
  }
};

// FUNCIÓN PARA LEER LOS POSTS EN INICIO (PÚBLICOS)
export const publicPosts = (posts) => {
  const container = document.querySelector('.container-new-post-home');
  if (container) {
    if (posts.length === 0) {
      container.innerHTML = notYetPost;
    } else {
      const uid = firebase.auth().currentUser.uid;
      container.innerHTML = '';
      posts.forEach((post) => {
        const divPost = templatePost(post.profilePicture, post.names, post.privacy, post.date,
          post.post, post.photo, post.likes, post.id, uid, post.uid);
        container.appendChild(divPost);
      });
    }

    if (container.innerHTML === '') {
      container.innerHTML = notYetPost;
    }

    updatePostsOnClick();
    deletePostsOnClick();
    btnLikes();
    showOpt();
  }

  return container;
};

// FUNCIÓN PARA LEER LOS POSTS EN EL PERFIL
export const postProfile = (posts) => {
  const container = document.querySelector('.container-new-post-profile');
  if (container) {
    if (posts.length === 0) {
      container.innerHTML = notYetPost;
    } else {
      const uid = firebase.auth().currentUser.uid;
      container.innerHTML = '';
      posts.forEach((post) => {
        const divPost = templatePost(post.profilePicture, post.names, post.privacy, post.date,
          post.post, post.photo, post.likes, post.id, uid, post.uid);
        container.appendChild(divPost);
      });
    }

    if (container.innerHTML === '') {
      container.innerHTML = notYetPost;
    }

    updatePostsOnClick();
    deletePostsOnClick();
    btnLikes();
    showOpt();
  }

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
