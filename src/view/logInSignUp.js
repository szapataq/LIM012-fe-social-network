import {
  welcome,
  register,
  inputWelcome,
  inputSignUp,
  enter,
  bookIn,
} from './templateSingUpLogin.js';

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
  return divCenter;
};
