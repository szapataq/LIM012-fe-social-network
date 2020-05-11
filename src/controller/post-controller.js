import {
  createPostDB,
  updatePosts,
  deletePosts,
} from '../model/posts-firestore-model.js';

import {
  templatePost,
  notYetPost,
} from '../view/templateHomeProfile.js';


// FUNCIÓN PARA BORRAR EL TEXTO DEL POST
const deletePostsOnClick = () => {
  const iconDelete = document.querySelectorAll('.delete-post');
  if (iconDelete.length) {
    console.log(iconDelete.length);
    iconDelete.forEach((objPosts) => {
      objPosts.addEventListener('click', () => {
        const idPosts = objPosts.getAttribute('idpost');
        deletePosts(idPosts)
          .then(() => {})
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
        updatePosts(idPosts, textPost.innerText)
          .then(() => {})
          .catch(() => {});
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
        textPost.contentEditable = 'false';
        objPosts.classList.add('hide');
        updatePosts(idPosts, textPost.innerText)
          .then(() => {})
          .catch(() => {});
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


export const readingPosts = (querySnapshot) => {
  const container = document.querySelector('.container-new-post-home') || document.querySelector('.container-new-post-profile');
  if (querySnapshot.empty) {
    container.innerHTML = notYetPost;
  } else {
    const uid = firebase.auth().currentUser.uid;
    container.innerHTML = '';
    querySnapshot.forEach((refDoc) => {
      const post = refDoc.data();
      if (/home/.test(window.location.hash) && post.privacy === '1') {
        const divPost = templatePost(post.profilePicture, post.names, post.privacy, post.date,
          post.post, post.photo, post.likes, refDoc.id, uid, post.uid);
        container.appendChild(divPost);
      } else if (/profile/.test(window.location.hash)) {
        if (post.uid === uid) {
          const divPost = templatePost(post.profilePicture, post.names, post.privacy, post.date,
            post.post, post.photo, post.likes, refDoc.id, uid, post.uid);
          container.appendChild(divPost);
        }
      }
    });
  }

  if (container.innerHTML === '') {
    container.innerHTML = notYetPost;
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
