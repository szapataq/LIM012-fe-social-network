import { signOut } from '../model/authentication-model.js';

const authSignOut = () => {
  signOut()
    .then(() => {
      localStorage.removeItem('userName');
      localStorage.removeItem('userImg');
      window.location.hash = '#/';
    });
};

export const listenersMain = () => {
  const btnLogOut = document.querySelector('#log-out');
  if (btnLogOut) {
    btnLogOut.addEventListener('click', () => {
      authSignOut();
    });
  }
};
