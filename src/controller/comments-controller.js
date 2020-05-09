import {
  createCommentsDB,
} from '../model/posts-firestore-model.js';

// FUNCIÓN PARA CREAR COMENTARIO
export const createNewComment = (idPost) => {
  const names = localStorage.getItem('userName');
  const profilePic = localStorage.getItem('userProfileImg');
  const varComment = document.querySelector(`#inputComment-${idPost}`);
  const commentValue = varComment.value;

  createCommentsDB(idPost, names, profilePic, commentValue)
    .then((res) => {
      console.log(res.id);
    })
    .catch((error) => {
      console.log(error);
    });
};
