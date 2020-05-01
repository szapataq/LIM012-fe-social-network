import { signOut } from '../model/authentication-model.js';

export const signOutUser = () => {
  signOut()
    .then(() => {
      localStorage.removeItem('userName');
      localStorage.removeItem('userProfileImg');
      window.location.hash = '#/login';
    });
};
