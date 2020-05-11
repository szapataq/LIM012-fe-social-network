export const templateComment = (names, profilePicture, comment, date, idComment) => {
  const containerComments = document.createElement('div');
  containerComments.className = 'name-comment';

  const template = `
     <img src="${profilePicture}" alt="" class="user-comment">
     <div class="info-user-comment">
       <h4 class="nameUser">${names}</h4>
       <p class="dateComment">${date}</p>
       <p class="p-comment">${comment}</p>
     </div>
     <spam class="comment">
      <i id="options-${idComment}" class="fas fa-ellipsis-h"></i>
     </spam>
     <div class="tooltip-container hide" id="show-toolTip-${idComment}">
      <div class="arrow"></div>
        <div class="tooltip">
          <div class="opt"> <i class="fas fa-edit icon-tool"></i> <spam>Editar</spam></div>
          <div class="opt"> <i class="fas fa-trash-alt icon-tool"></i><spam>Eliminar</spam></div>
        </div>
      </div>`;

  containerComments.innerHTML = template;
  const editDelete = containerComments.querySelector(`#options-${idComment}`);
  editDelete.addEventListener(('click'), () => {
    const toolContainer = document.querySelector(`#show-toolTip-${idComment}`);
    toolContainer.classList.toggle('hide');
  });
  return containerComments;
};
