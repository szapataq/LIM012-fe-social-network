import { signIn, signInWithGoogle, signInWithFacebook } from '../model/authentication-model.js';

export const authEmailPass = (email, password) => {
  signIn(email, password)
    .then((res) => {
      if (!res.user.emailVerified) {
        const alertLogInSignUp = document.querySelector('#alertLogInSignUp');
        alertLogInSignUp.innerText = 'Debe Validar su correo para Iniciar Sesión';
        firebase.auth().signOut();
      } else {
        localStorage.setItem('userName', res.user.displayName);
        window.location.hash = '#/home';
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const alertLogInSignUp = document.querySelector('#alertLogInSignUp');
      switch (errorCode) {
        case 'auth/invalid-email':
          alertLogInSignUp.innerText = 'Correo inválido';
          break;
        case 'auth/user-disabled':
          alertLogInSignUp.innerText = 'Comuníquese con el Administrador';
          break;
        case 'auth/user-not-found':
          alertLogInSignUp.innerText = 'Usuario no registrado';
          break;
        case 'auth/wrong-password':
          alertLogInSignUp.innerText = 'El correo o la contraseña ingresados son incorrectos';
          break;
        default:
          alertLogInSignUp.innerText = 'Ha ocurrido un error inesperado';
          break;
      }
    });
};

export const authAccountGoogle = () => {
  signInWithGoogle()
    .then((res) => {
      localStorage.setItem('userName', res.user.displayName);
      localStorage.setItem('userImg', res.user.photoURL);
      window.location.hash = '#/home';
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      const alertLogInSignUp = document.querySelector('#alertLogInSignUp');
      switch (errorCode) {
        case 'auth/account-exists-with-different-credential':
          alertLogInSignUp.innerText = 'Ya existe una cuenta con esta dirección de correo';
          break;
        case 'auth/credential-already-in-use':
          alertLogInSignUp.innerText = 'La cuenta corresponde a una credencial existente';
          break;
        case 'auth/email-already-in-use':
          alertLogInSignUp.innerText = 'El correo corresponde a una credencial existente';
          break;
        default:
          alertLogInSignUp.innerText = 'Error al autenticar con Google';
          break;
      }
    });
};

export const authAccountFacebook = () => {
  signInWithFacebook()
    .then((res) => {
      localStorage.setItem('userName', res.user.displayName);
      localStorage.setItem('userImg', res.user.photoURL);
      window.location.hash = '#/home';
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      const alertLogInSignUp = document.querySelector('#alertLogInSignUp');
      switch (errorCode) {
        case 'auth/account-exists-with-different-credential':
          alertLogInSignUp.innerText = 'Ya existe una cuenta con esta dirección de correo';
          break;
        case 'auth/credential-already-in-use':
          alertLogInSignUp.innerText = 'La cuenta corresponde a una credencial existente';
          break;
        case 'auth/email-already-in-use':
          alertLogInSignUp.innerText = 'El correo corresponde a una credencial existente';
          break;
        default:
          alertLogInSignUp.innerText = 'Error al autenticar con Facebook';
          break;
      }
    });
};
