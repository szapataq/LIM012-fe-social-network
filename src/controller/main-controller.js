import { signOut } from '../model/authentication-model.js';

export const signOutUser = () => {
  signOut()
    .then(() => {
      localStorage.removeItem('userName');
      localStorage.removeItem('userImg');
      window.location.hash = '#/login';
    });
};
