import {
  signOut,
} from '../model/authentication-model.js';
// eslint-disable-next-line import/no-cycle
import {
  deletePosts,
} from '../model/posts-firestore-model.js';

import {
  readCodersDB,
} from '../model/user-firestore-model.js';

import {
  templateCoders,
} from '../view/templateHomeProfile.js';

export const signOutUser = () => {
  signOut()
    .then(() => {
      localStorage.removeItem('userCoverImg');
      localStorage.removeItem('userProfileImg');
      localStorage.removeItem('userName');
      localStorage.removeItem('userAbout');
      window.location.hash = '#/login';
    });
};

export const btnLikes = () => {
  const interval = setInterval(() => {
    console.log('intento');
    const svgIcons = document.querySelectorAll('.iconLike');
    if (svgIcons.length) {
      console.log('termina');
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

export const deletePostsOnClick = () => {
  const iconDelete = document.querySelectorAll('.delete-post');
  if (iconDelete.length) {
    iconDelete.forEach((objPosts) => {
      objPosts.addEventListener('click', () => {
        const idPosts = objPosts.getAttribute('idpost');
        deletePosts(idPosts)
          .then(() => {
            console.log('eliminado satisfactoriamente');
          })
          .catch((error) => {
            console.error('error al eliminar', error);
          });
      });
    });
  }
};

export const codersArea = () => {
  readCodersDB((querySnapshot) => {
    let codersList = '';
    const container = document.querySelector('.container-coders');
    querySnapshot.forEach((refDoc) => {
      const coder = refDoc.data();
      codersList += templateCoders(coder.profilePicture, coder.names, coder.about);
      return codersList;
    });
    container.innerHTML = codersList;
  });
};
