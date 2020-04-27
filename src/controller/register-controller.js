const createUser = (email, password, names) => {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((res) => {
      res.user.updateProfile({
        displayName: names,
      });
      const errorSignUp = document.querySelector('#errorSignUp');
      const configuration = {
        url: 'http://localhost:5501/src/',
      };
      res.user.sendEmailVerification(configuration).catch(() => {
        errorSignUp.innerHTML = 'Ha ocurrido un error al crear la cuenta';
      });
      firebase.auth().signOut();
      errorSignUp.innerHTML = 'Cuenta creada satisfactoriamente';
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      const errorSignUp = document.querySelector('#errorSignUp');
      switch (errorCode) {
        case 'auth/email-already-in-use':
          errorSignUp.innerHTML = 'Ya existe una cuenta con este correo';
          break;
        case 'auth/invalid-email':
          errorSignUp.innerHTML = 'Ingrese un correo válido (por ejemplo alguien@example.com)';
          break;
        case 'auth/operation-not-allowed':
          errorSignUp.innerHTML = 'Comuníquese con el administrador';
          break;
        case 'auth/weak-password':
          errorSignUp.innerHTML = 'La clave debe ser de mínimo 6 dígitos y al menos un número';
          break;
        default:
          errorSignUp.innerHTML = 'Ha ocurrido un error inesperado';
          break;
      }
    });
};

export const createAccount = () => {
  const varNameUser = document.querySelector('#names');
  const varEmailUser = document.querySelector('#email');
  const varPasswordUser = document.querySelector('#password');
  const nameUser = varNameUser.value;
  const emailUser = varEmailUser.value;
  const passwordUser = varPasswordUser.value;
  createUser(emailUser, passwordUser, nameUser);
};

export const validateBtnSignUp = () => {
  const btnSignUp = document.querySelector('#btnSignUp');
  if (btnSignUp) {
    btnSignUp.addEventListener(('click'), () => {
      createAccount();
    });
  }
};
