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
