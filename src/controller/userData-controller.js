import {
  readUserDB,
  updateUserDataName,
  updateUserDataAbout,
} from '../model/user-firestore-model.js';

// FUNCIÓN PARA ACTUALIZAR EL NOMBRE DEL USUARIO
export const updateUserName = (nodo) => {
  const iconEdit = nodo.querySelector('#editName');
  const iconSave = nodo.querySelector('#saveName');
  const userName = nodo.querySelector('#userName');

  if (iconEdit) {
    iconEdit.addEventListener('click', () => {
      userName.classList.add('editNameAbout');
      userName.contentEditable = 'true';
      userName.focus();
      iconEdit.classList.add('hide');
      iconSave.classList.remove('hide');
    });
  }

  if (iconSave) {
    iconSave.addEventListener('click', () => {
      const uid = firebase.auth().currentUser.uid;
      readUserDB(uid).then((querySnapshot) => {
        querySnapshot.forEach((user) => {
          userName.classList.remove('editNameAbout');
          userName.contentEditable = 'false';
          iconEdit.classList.remove('hide');
          iconSave.classList.add('hide');
          updateUserDataName(user.id, userName.innerText)
            .then(() => {
              localStorage.setItem('userName', userName.innerText);
              // console.log('Actualizado');
            })
            .catch(() => {});
        });
      });
    });
  }
};

// FUNCIÓN PARA ACTUALIZAR LA DESCRIPCIÓN
export const updateUserAbout = (nodo) => {
  const iconEdit = nodo.querySelector('#editAbout');
  const iconSave = nodo.querySelector('#saveAbout');
  const userAbout = nodo.querySelector('#userAbout');

  if (iconEdit) {
    iconEdit.addEventListener('click', () => {
      userAbout.classList.add('editNameAbout');
      userAbout.contentEditable = 'true';
      userAbout.focus();
      iconEdit.classList.add('hide');
      iconSave.classList.remove('hide');
      iconSave.classList.add('iconSv');
    });
  }

  if (iconSave) {
    iconSave.addEventListener('click', () => {
      const uid = firebase.auth().currentUser.uid;
      readUserDB(uid).then((querySnapshot) => {
        querySnapshot.forEach((user) => {
          userAbout.classList.remove('editNameAbout');
          userAbout.contentEditable = 'false';
          iconEdit.classList.remove('hide');
          iconSave.classList.add('hide');
          updateUserDataAbout(user.id, userAbout.innerText)
            .then(() => {
              localStorage.setItem('userAbout', userAbout.innerText);
              // console.log('Actualizado');
            })
            .catch(() => {});
        });
      });
    });
  }
};
