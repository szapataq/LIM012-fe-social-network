import {
  signOut,
} from '../model/authentication-model.js';

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
    const svgIcons = document.querySelectorAll('.iconLike');
    if (svgIcons.length) {
      clearInterval(interval);
      svgIcons.forEach((svgIcon) => {
        // eslint-disable-next-line no-undef
        const burst = new mojs.Burst({
          count: 20,
          left: (svgIcon.getBoundingClientRect().left + (svgIcon.clientWidth / 1.4)),
          top: (svgIcon.getBoundingClientRect().top + (svgIcon.clientHeight / 1.4)),
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
