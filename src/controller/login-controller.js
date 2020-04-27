const authEmailPass = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      if (!res.user.emailVerified) {
        const alertLogInSignUp = document.querySelector('#alertLogInSignUp');
        alertLogInSignUp.innerHTML = 'Debe Validar su correo para Iniciar Sesión';
        firebase.auth().signOut();
      } else {
        // localStorage tiene el metodo setItem('nombre del campo', 'valor del campo')
        // que guarda en el navegador el 'valor del campo' bajo el 'nombre del campo'
        // y que se puede recuperar con el metodo getItem('nombre del campo')
        // los 2 metodos existen tambien en el sessionStorage
        // pero el sessionStorage se elimina al cerrar la pestaña,
        // mientras que el LocalStorage es persistente.
        // ? Deberiamos escoger cual es la mejor opción
        // ! SOLO PARA PRUEBAS
        localStorage.setItem('userName', res.user.displayName);
        window.location.hash = '#/home';
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      const alertLogInSignUp = document.querySelector('#alertLogInSignUp');
      switch (errorCode) {
        case 'auth/invalid-email':
          alertLogInSignUp.innerHTML = 'Correo inválido';
          break;
        case 'auth/user-disabled':
          alertLogInSignUp.innerHTML = 'Comuníquese con el Administrador';
          break;
        case 'auth/user-not-found':
          alertLogInSignUp.innerHTML = 'Usuario no registrado';
          break;
        case 'auth/wrong-password':
          alertLogInSignUp.innerHTML = 'El correo o la contraseña ingresados son incorrectos';
          break;
        default:
          alertLogInSignUp.innerHTML = 'Ha ocurrido un error inesperado';
          break;
      }
    });
};

const authAccountGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
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
          alertLogInSignUp.innerHTML = 'Ya existe una cuenta con esta dirección de correo';
          break;
        case 'auth/credential-already-in-use':
          alertLogInSignUp.innerHTML = 'La cuenta corresponde a una credencial existente';
          break;
        case 'auth/email-already-in-use':
          alertLogInSignUp.innerHTML = 'El correo corresponde a una credencial existente';
          break;
        default:
          alertLogInSignUp.innerHTML = 'Error al autenticar con Google';
          break;
      }
    });
};

const authAccountFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider)
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
          alertLogInSignUp.innerHTML = 'Ya existe una cuenta con esta dirección de correo';
          break;
        case 'auth/credential-already-in-use':
          alertLogInSignUp.innerHTML = 'La cuenta corresponde a una credencial existente';
          break;
        case 'auth/email-already-in-use':
          alertLogInSignUp.innerHTML = 'El correo corresponde a una credencial existente';
          break;
        default:
          alertLogInSignUp.innerHTML = 'Error al autenticar con Facebook';
          break;
      }
    });
};

export const validateBtnEvenListener = () => {
  const btnLogIn = document.querySelector('#btnLogIn');
  const btnGoogle = document.querySelector('#btnGoogle');
  const btnFacebook = document.querySelector('#btnFacebook');
  if (btnLogIn) {
    btnLogIn.addEventListener(('click'), () => {
      const varEmailUser = document.querySelector('#email');
      const varPasswordUser = document.querySelector('#password');
      const emailUser = varEmailUser.value;
      const passwordUser = varPasswordUser.value;
      authEmailPass(emailUser, passwordUser);
    });
  }
  if (btnGoogle) {
    btnGoogle.addEventListener(('click'), () => {
      authAccountGoogle();
    });
  }
  if (btnFacebook) {
    btnFacebook.addEventListener(('click'), () => {
      authAccountFacebook();
    });
  }
};
