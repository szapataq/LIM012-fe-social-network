import { createNewUser } from '../model/authentication-model.js';

export const createUser = (email, password, names) => {
  createNewUser(email, password)
    .then((res) => {
      res.user.updateProfile({
        displayName: names,
      });
      const alertLogInSignUp = document.querySelector('#alertLogInSignUp');
      const configuration = {
        url: 'http://localhost:5501/src/',
      };
      res.user.sendEmailVerification(configuration).catch(() => {
        alertLogInSignUp.innerText = 'Ha ocurrido un error al crear la cuenta';
      });
      firebase.auth().signOut();
      alertLogInSignUp.classList.add('alertSignUpOk');
      alertLogInSignUp.innerText = 'Cuenta creada satisfactoriamente, se le ha enviado un correo para validar su cuenta';
    })
    .catch((error) => {
      /* console.error(error); */
      const errorCode = error.code;
      const alertLogInSignUp = document.querySelector('#alertLogInSignUp');
      switch (errorCode) {
        case 'auth/email-already-in-use':
          alertLogInSignUp.innerText = 'Ya existe una cuenta con este correo';
          break;
        case 'auth/invalid-email':
          alertLogInSignUp.innerText = 'Ingrese un correo válido (por ejemplo alguien@example.com)';
          break;
        case 'auth/operation-not-allowed':
          alertLogInSignUp.innerText = 'Comuníquese con el Administrador';
          break;
        case 'auth/weak-password':
          alertLogInSignUp.innerText = 'La clave debe ser de mínimo 6 dígitos';
          break;
        default:
          alertLogInSignUp.innerText = 'Ha ocurrido un error inesperado';
          break;
      }
    });
};

export const createAccount = () => {
  const varNameUser = document.querySelector('#names');
  const varEmailUser = document.querySelector('#email');
  const varPasswordUser = document.querySelector('#password');
  const varTermConditions = document.querySelector('#termConditions');
  const nameUser = varNameUser.value;
  const emailUser = varEmailUser.value;
  const passwordUser = varPasswordUser.value;
  const termConditions = varTermConditions.checked;
  const alertLogInSignUp = document.querySelector('#alertLogInSignUp');
  alertLogInSignUp.classList.remove('alertSignUpOk');
  if (nameUser === '') {
    alertLogInSignUp.innerText = 'Debe ingresar su nombre';
  } else if (emailUser === '') {
    alertLogInSignUp.innerText = 'Debe ingresar su email';
  } else if (passwordUser === '') {
    alertLogInSignUp.innerText = 'Debe ingresar su contraseña';
  } else if (!termConditions) {
    alertLogInSignUp.innerText = 'Debe aceptar lo términos y condiciones';
  } else {
    createUser(emailUser, passwordUser, nameUser);
  }
};

export const validateBtnSignUp = () => {
  const btnSignUp = document.querySelector('#btnSignUp');
  if (btnSignUp) {
    btnSignUp.addEventListener(('click'), () => {
      createAccount();
    });
  }
};
