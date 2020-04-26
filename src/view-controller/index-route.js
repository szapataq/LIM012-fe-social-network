import { components } from '../view/index-components.js';
import { validateBtnLogIn } from '../controller/login-controller.js';
import { validateBtnSignUp } from '../controller/register-controller.js';

const changeView = (route) => {
  const mainContainer = document.querySelector('main');
  const header = document.querySelector('header');
  mainContainer.innerHTML = '';
  header.innerHTML = '';
  switch (route) {
    case '':
    case '#/login': mainContainer.appendChild(components.login());
      validateBtnLogIn();
      break;
    case '#/signup':
      mainContainer.appendChild(components.login());
      validateBtnSignUp();
      break;
    case '#/home': mainContainer.appendChild(components.home());
      break;
    case '#/profile': mainContainer.appendChild(components.home());
      break;
    default: break;
  }
};

export { changeView };
