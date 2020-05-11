import {
  updateUserData,
  readUserDB,
} from '../model/user-firestore-model.js';

// FUNCIÓN PARA ACTUALIZAR EL TEXTO DEL POST
export const updateUserName = (nodo) => {
  const iconEdit = nodo.querySelector('#editName');
  const iconSave = nodo.querySelector('#saveName');
  const userName = nodo.querySelector('#userName');

  if (iconEdit) {
    iconEdit.addEventListener('click', () => {
      userName.classList.add('editName');
      userName.contentEditable = 'true';
      userName.focus();
      iconEdit.classList.add('hide');
      iconSave.classList.remove('hide');
    });
  }

  iconSave.addEventListener('click', () => {
    const uid = firebase.auth().currentUser.uid;
    readUserDB(uid).then((querySnapshot) => {
      querySnapshot.forEach((user) => {
        userName.classList.remove('editName');
        userName.contentEditable = 'false';
        iconEdit.classList.remove('hide');
        iconSave.classList.add('hide');
        updateUserData(user.id, userName.innerText)
          .then(() => {
            localStorage.setItem('userName', userName.innerText);
            console.log('Actualizado');
          })
          .catch(() => {});
      });
    });
  });
};
