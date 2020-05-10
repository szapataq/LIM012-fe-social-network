export const templateComment = (names, profilePicture, comment, date) => {
  const containerComments = document.createElement('div');
  containerComments.className = 'name-comment';

  const template = `
     <img src="${profilePicture}" alt="" class="user-comment">
     <div>
       <h4 class="nameUser">${names}</h4>
       <p class="dateComment">${date}</p>
       <p class="p-comment">${comment}</p>
     </div>
     <div class="simulator-select">
       <span><i class="fas fa-ellipsis-v"></i></span>
        <ul>
          <li>✎ Editar</li>
          <li>✖ Eliminar</li>
        </ul>
     </div>`;

  containerComments.innerHTML = template;
  return containerComments;
};
