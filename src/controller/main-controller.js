const logOut = () => {
  firebase.auth().signOut()
    .then(() => {
      localStorage.removeItem('userName');
      localStorage.removeItem('userImg');
      window.location.hash = '#/login';
    });
};

export const listenersMain = () => {
  const btnLogOut = document.querySelector('#log-out');
  if (btnLogOut) {
    btnLogOut.addEventListener('click', () => {
      logOut();
    });
  }
};
