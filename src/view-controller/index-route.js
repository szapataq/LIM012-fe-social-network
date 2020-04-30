import { components } from '../view/index-components.js';
import { validateBtnEvenListener } from '../controller/login-controller.js';
import { validateBtnSignUp } from '../controller/signup-controller.js';
/* import { listenersMain } from '../controller/main-controller.js'; */

const changeView = (route) => {
  const mainContainer = document.querySelector('main');
  const header = document.querySelector('header');
  /* const currentUser = firebase.auth().currentUser; */
  mainContainer.innerHTML = '';
  header.innerHTML = '';
  switch (route) {
    case '':
    case '#/login': mainContainer.appendChild(components.login());
      validateBtnEvenListener();
      break;
    case '#/signup':
      mainContainer.appendChild(components.login());
      validateBtnSignUp();
      break;
    case '#/home':
    case '#/profile': mainContainer.appendChild(components.home());
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
