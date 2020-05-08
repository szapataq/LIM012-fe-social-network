import {
  signOut,
} from '../model/authentication-model.js';

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

export const btnLikes = () => {
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
