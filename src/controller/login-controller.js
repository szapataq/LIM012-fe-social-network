const authEmailPass = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((res) => {
      if (!res.user.emailVerified) {
        const errorSignUp = document.querySelector('#errorSignUp');
        errorSignUp.innerHTML = 'Debe realizar la verificación de cuenta en su correo';
        firebase.auth().signOut();
      } else {
        window.location.hash = '#/home';
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      const errorSignUp = document.querySelector('#errorSignUp');
      switch (errorCode) {
        case 'auth/invalid-email':
          errorSignUp.innerHTML = 'Correo inválido';
          break;
        case 'auth/user-disabled':
          errorSignUp.innerHTML = 'Comuníquese con el administrador';
          break;
        case 'auth/user-not-found':
          errorSignUp.innerHTML = 'Usuario no registrado';
          break;
        case 'auth/wrong-password':
          errorSignUp.innerHTML = 'El correo o la contraseña son incorrectos';
          break;
        default:
          errorSignUp.innerHTML = 'Ha ocurrido un error inesperado';
          break;
      }
    });
};

export const validateBtnLogIn = () => {
  const btnLogIn = document.querySelector('#btnLogIn');
  if (btnLogIn) {
    btnLogIn.addEventListener(('click'), () => {
      const varEmailUser = document.querySelector('#email');
      const varPasswordUser = document.querySelector('#password');
      const emailUser = varEmailUser.value;
      const passwordUser = varPasswordUser.value;
      authEmailPass(emailUser, passwordUser);
    });
  }
};
