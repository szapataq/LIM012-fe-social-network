const logOut = () => {
  firebase.auth().signOut()
    .then(() => {
      localStorage.removeItem('userName');
      localStorage.removeItem('userImg');
      window.location.hash = '#/login';
    });
};

const btnLogOut = document.querySelector('#log-out');
btnLogOut.addEventListener(('click'), () => {
  logOut();
});
