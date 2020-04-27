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
