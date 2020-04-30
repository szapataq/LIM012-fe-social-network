import {
  welcome,
  register,
  inputWelcome,
  inputSignUp,
  enter,
  bookIn,
} from './templateSingUpLogin.js';
import { authEmailPass, authAccountGoogle, authAccountFacebook } from '../controller/login-controller.js';

export default () => {
  const viewLogin = `
  <div id="main" class="main">
    <section class="index-img-message">
      <img src="./img/social-network.png" alt="social network" class="index-img">
      <!--cambiar por <p>-->
      <h1 class="index-message">En CoderPlace encontrarás el contenido que está marcando tendencia en el mundo de la
      programación. Además podrás comunicarte y compartir con programadores de todo el mundo.
      ¿Qué esperas? ¡No te pierdas las novedades!</h1>
    </section>
    <section class="card-login">
      <div>
        <img src="./img/social-network.png" alt="social network" class="img-login-mobile">
        <div class="icon-coderplace">
          <img src="./img/icono-coderplace.png" alt="Ícono CoderPlace">
          <h1>&lt;CoderPlace/&gt;</h1>
        </div>
        <h4 class="welcome">${(/signup/.test(window.location.hash)) ? register : welcome}</h4>
      </div>
      <div class="container-inputs">${(/signup/.test(window.location.hash)) ? inputSignUp : inputWelcome}</div>
      <span class="alertLogInSignUp" id="alertLogInSignUp"></span>
      <div class="register">${(/signup/.test(window.location.hash)) ? enter : bookIn}</div>
    </section>
  </div>`;

  const divCenter = document.createElement('div');
  divCenter.className = 'center';
  divCenter.innerHTML = viewLogin;

  const btnLogIn = divCenter.querySelector('#btnLogIn');
  const btnGoogle = divCenter.querySelector('#btnGoogle');
  const btnFacebook = divCenter.querySelector('#btnFacebook');

  btnLogIn.addEventListener(('click'), () => {
    const varEmailUser = divCenter.querySelector('#email');
    const varPasswordUser = divCenter.querySelector('#password');
    const emailUser = varEmailUser.value;
    const passwordUser = varPasswordUser.value;
    const alertLogInSignUp = divCenter.querySelector('#alertLogInSignUp');
    alertLogInSignUp.classList.remove('alertSignUpOk');
    if (emailUser === '') {
      alertLogInSignUp.innerText = 'Debe ingresar su email';
    } else if (passwordUser === '') {
      alertLogInSignUp.innerText = 'Debe ingresar su contraseña';
    } else {
      authEmailPass(emailUser, passwordUser);
    }
  });

  btnGoogle.addEventListener(('click'), () => {
    authAccountGoogle();
  });

  btnFacebook.addEventListener(('click'), () => {
    authAccountFacebook();
  });

  return divCenter;
};
