import { components } from '../view/index-components.js';

const changeView = (route) => {
  const mainContainer = document.querySelector('main');
  const header = document.querySelector('header');
  /* const currentUser = firebase.auth().currentUser; */
  mainContainer.innerHTML = '';
  header.innerHTML = '';
  switch (route) {
    case '':
    case '#/login':
    case '#/signup': mainContainer.appendChild(components.logInSignUp());
      break;
    case '#/home':
    case '#/profile': mainContainer.appendChild(components.homeProfile());
      /* if (currentUser) {
        mainContainer.appendChild(components.home());
        listenersMain();
      } else {
        window.location.hash = '#/login';
      } */
      break;
    default:
      mainContainer.appendChild(components.different());
      break;
  }
};
export { changeView };
