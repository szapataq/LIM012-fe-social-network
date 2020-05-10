import {
  createCommentsDB,
  // readCommentsDB,
} from '../model/posts-firestore-model.js';

import {
  templateComment,
} from '../view/templateComment.js';

// FUNCIÓN PARA CREAR COMENTARIO
export const createNewComment = (idPost, comment) => {
  const names = localStorage.getItem('userName');
  const profilePic = localStorage.getItem('userProfileImg');

  return createCommentsDB(idPost, names, profilePic, comment)
    .then((res) => {
      console.log(res.id);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const readingComment = (querySnapshot) => {
  const idComments = new Set();
  let container;
  querySnapshot.forEach((refDoc) => {
    idComments.add(refDoc.data().idPost);
  });
  idComments.forEach((id) => {
    container = document.querySelector(`#containerComment-${id}`);
    const numComments = document.querySelector(`.numComments-${id}`);
    if (container) {
      container.innerHTML = '';
      numComments.innerText = '0';
      querySnapshot.forEach((refDoc) => {
        const comment = refDoc.data();
        if (id === comment.idPost) {
          numComments.innerText = parseInt(numComments.innerText, 0) + 1;
          const divComment = templateComment(comment.names,
            comment.profilePicture, comment.comment, comment.date);
          container.appendChild(divComment);
        }
      });

      if (parseInt(numComments.innerText, 0) === 1) {
        numComments.innerText = `${numComments.innerText} Comentario`;
      } else {
        numComments.innerText = `${numComments.innerText} Comentarios`;
      }
    }
  });

  return container;
};
