export const templateComment = (names, profilePicture, comment,
  date, idComment, uidUser, uidComment) => {
  const containerComments = document.createElement('div');
  containerComments.className = 'name-comment';

  const template = `
     <img src="${profilePicture}" alt="" class="user-comment">
     <div class="info-user-comment">
       <h4 class="nameUser">${names}</h4>
       <p class="dateComment">${date}</p>
       <div class="text-post">
          <p class="p-comment" id="textComment-${idComment}">${comment}</p>
          <div class="save-comment hide" idcomment="${idComment}"><i class="far fa-save"></i></div>
       </div>
     </div>
     ${uidUser === uidComment ? `
     <spam class="comment">
     <i id="options-${idComment}" class="fas fa-ellipsis-h"></i>
    </spam>
    <div class="tooltip-container hide" id="show-toolTip-${idComment}">
       <div class="arrow"></div>
       <div class="tooltip">
         <div idcomment="${idComment}" class="opt update-comment edit-${idComment}"> <i class="fas fa-edit icon-tool"></i> <span>Editar</span></div>
         <div idcomment="${idComment}" class="opt del"> <i class="fas fa-trash-alt icon-tool"></i><span>Eliminar</span></div>
       </div>
    </div>` : ''}`;

  containerComments.innerHTML = template;
  const editDelete = containerComments.querySelector(`#options-${idComment}`);
  if (editDelete) {
    editDelete.addEventListener(('click'), () => {
      const toolContainer = document.querySelector(`#show-toolTip-${idComment}`);
      toolContainer.classList.toggle('hide');
    });
  }
  const editComment = containerComments.querySelector(`.edit-${idComment}`);
  if (editComment) {
    editComment.addEventListener(('click'), () => {
      const toolContainer = document.querySelector(`#show-toolTip-${idComment}`);
      toolContainer.classList.toggle('hide');
    });
  }

  return containerComments;
};
