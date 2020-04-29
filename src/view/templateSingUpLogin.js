export const welcome = '¡Bienvenid@ Coder!';

export const register = '¡Regístrate!';

export const inputWelcome = `
  <input type="email" placeholder="Correo" class="input-login" id="email" autocomplete="off">
  <input type="password" placeholder="Contraseña" class="input-login" id="password">
  <button class="log-in" id="btnLogIn">Iniciar Sesión</button>
  <p>O bien ingresa con...</p>
  <div class="rrss">
    <img src="./img/facebook.png" alt="Ícono Facebook" id="btnFacebook">
    <img src="./img/google.png" alt="Ícono google" id="btnGoogle">
  </div>`;

export const inputSignUp = `      
  <input type="email" placeholder="Nombres y Apellidos" class="input-login" id="names" autocomplete="off">
  <input type="email" placeholder="Correo" class="input-login" id="email" autocomplete="off">
  <input type="password" placeholder="Contraseña" class="input-login" id="password">
  <div class="terms">
    <input type="checkbox" id="termConditions" class="termConditions" />
    <label for="termConditions">Acepto los <a href="./docs/terms-and-conditions.pdf" target="_blank">Términos, Condiciones y Política de Privacidad.</a></label>
  </div>
  <button class="sign-up" id="btnSignUp">Registrarse</button>`;

export const enter = `
  <p>¿Ya tienes una cuenta?<a href='#/login'>Inicia Sesión</a></p>`;

export const bookIn = `
  <p>¿No tienes una cuenta?<a href='#/signup'>Regístrate</a></p>`;
