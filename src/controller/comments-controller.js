import {
  createCommentsDB,
  // readCommentsDB,
  deleteCommentsDB,
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

// DELETE COMMENT
export const deleteCommentOnClick = () => {
  const iconDelete = document.querySelectorAll('.del');
  if (iconDelete.length) {
    iconDelete.forEach((objComment) => {
      objComment.addEventListener('click', () => {
        const idcomment = objComment.getAttribute('idcomment');
        console.log(idcomment);
        deleteCommentsDB(idcomment)
          .then(() => {})
          .catch(() => {});
      });
    });
  }
};

export const readingComment = (comments, idPost) => {
  const container = document.querySelector(`#containerComment-${idPost}`);
  const numComments = document.querySelector(`.numComments-${idPost}`);
  if (container) {
    container.innerHTML = '';
    numComments.innerText = '0';
    comments.forEach((comment) => {
      if (idPost === comment.idPost) {
        numComments.innerText = parseInt(numComments.innerText, 0) + 1;
        const divComment = templateComment(comment.names,
          comment.profilePicture, comment.comment, comment.date, comment.id);
        container.appendChild(divComment);
      }
    });

    if (parseInt(numComments.innerText, 0) === 1) {
      numComments.innerText = `${numComments.innerText} Comentario`;
    } else {
      numComments.innerText = `${numComments.innerText} Comentarios`;
    }
  }

  deleteCommentOnClick();

  return container;
};
