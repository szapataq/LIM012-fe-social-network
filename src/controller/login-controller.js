export const validateBtnLogIn = () => {
  const btnLogIn = document.querySelector('#btnLogIn');
  if (btnLogIn) {
    btnLogIn.addEventListener(('click'), () => {
      console.log('cambiando el hash');
      window.location.hash = '#/home';
    });
  }
};
