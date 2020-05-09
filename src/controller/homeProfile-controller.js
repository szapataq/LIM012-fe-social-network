import {
  signOut,
} from '../model/authentication-model.js';

import {
  readCodersDB,
} from '../model/user-firestore-model.js';

import {
  templateCoders,
} from '../view/templateHomeProfile.js';

export const signOutUser = () => {
  signOut()
    .then(() => {
      localStorage.removeItem('userCoverImg');
      localStorage.removeItem('userProfileImg');
      localStorage.removeItem('userName');
      localStorage.removeItem('userAbout');
      window.location.hash = '#/login';
    });
};

export const codersArea = () => {
  readCodersDB((querySnapshot) => {
    let codersList = '';
    const container = document.querySelector('.container-coders');
    querySnapshot.forEach((refDoc) => {
      const coder = refDoc.data();
      codersList += templateCoders(coder.profilePicture, coder.names, coder.about);
      return codersList;
    });
    container.innerHTML = codersList;
  });
};
