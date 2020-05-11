import { components } from '../view/index-components.js';

const changeView = (route) => {
  const mainContainer = document.querySelector('main');
  const header = document.querySelector('header');
  mainContainer.innerHTML = '';
  header.innerHTML = '';

  switch (route) {
    case '':
    case '#/login':
    case '#/signup': mainContainer.appendChild(components.logInSignUp());
      break;
    case '#/home':
    case '#/profile':
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          window.location.hash = '#/login';
        } else {
          mainContainer.appendChild(components.homeProfile());
        }
      });
      break;
    default:
      mainContainer.appendChild(components.different());
      break;
  }
};

export { changeView };
