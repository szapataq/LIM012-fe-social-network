import {
  createNewComment,
  readingComment,
} from '../controller/comments-controller.js';

import {
  readCommentsDB,
  addLikeArr,
  removeLikeArr,
} from '../model/posts-firestore-model.js';

// PLANTILLA ELEMENTOS DEL MENU DESPLEGABLE (HEADER)
export const homeHeader = `
  <a href="#/home"><img src="./img/home.png" alt="Home" class="icons-cp">
  <span>Inicio</span></a>`;

export const profile = `
  <a href="#/profile"><img src="./img/profile.png" alt="Profile" class="icons-cp usercp">
  <span>Perfil</span></a>`;

export const optionsMobile = `
  <div class="items itemsHover">${homeHeader}</div>
  <div class="items itemsHover">${profile}</div>`;

// FUNCIÓN DE NÚMERO ALEATORIO PARA ASIGNAR FOTOS DE PORTADA Y PERFIL
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const imgProfileUserDefault = `./img/profilePictureRandom/iconUser_${getRandomInt(1, 10)}.png`;
export const imgCoverUserDefault = `./img/ImgRandom/image_${getRandomInt(1, 15)}.png`;

// PLANTILLA CONTENEDOR COMPARTIR POST
export const postArea = `
  <div class="new-post">
    <textarea rows="4" cols="50" placeholder="¿Qué quieres compartir?" id="postArea"></textarea>
    <div class="containerProgress">
      <div class="progress"></div>
    </div>
    <div class="hide divImg">
      <span class="deleteImg">❌</span>
      <img class="picPost"/>
    </div>
    <div class="container-functions">
      <div class="camera-privacity">
      <input type="file" id="photoPost" class="hide" accept="image/*">
      <label for="photoPost"><img src="./img/camera.png" class="camera"></label>        
        <div class="privacidad">
          <select id="privacyPostArea">
            <option value="1">🌐 Público</option>
            <option value="2">🔒 Solo yo </option>
          </select>
        </div>
      </div>
      <button id="btnSharePost"> Compartir</button>
    </div>
  </div>`;

export const postHomeMobile = () => `
  <div class="own-post">
    <div class="title-new-post-own">
      <img src="${localStorage.getItem('userProfileImg') || imgProfileUserDefault}" alt="" class="user-foto">
      <div class="comun-ocupation">
        <h4>${localStorage.getItem('userName')}</h4>
        <img src="${sessionStorage.getItem('privacy') === '2' ? './img/private.png' : './img/public.png'}" alt="privacidad" id="privPost">
      </div>
      <div class="simulator-select" id="privacyPostArea">
        <span><i class="fas fa-ellipsis-v"></i></span>
        <ul>
          <li data-value="1" id="public">🌐 Público</li>
          <li data-value="2" id="private">🔒 Solo yo</li>
        </ul>
      </div>
    </div>
    <div class="new-post">
      <textarea rows="4" cols="50" placeholder="¿Qué quieres compartir?" id="postArea"></textarea>
      <div class="hide divImg">
      <span class="deleteImg">❌</span>
      <img class="picPost"/>
      </div>
      <div class="container-functions">
        <div class="containerProgress">
          <div class="progress"></div>
        </div>
        <div class="camera-privacity">
        <input type="file" id="photoPost" class="hide" accept="image/*">
        <label for="photoPost"><img src="./img/camera.png" class="camera"></label>
        </div>
        <button id="btnSharePost"> Compartir</button>
      </div>
    </div>
  </div>`;

// PLANTILLA SECCIÓN DE DATOS DEL USUARIO
const iconEdit = () => {
  let icon = '';
  if (/profile/.test(window.location.hash)) {
    icon = '<img src="./img/edit.png" class="edit">';
  }
  return icon;
};

export const userLoggedIn = () => `
  <figure>
    <img src="${localStorage.getItem('userCoverImg') || imgCoverUserDefault}" alt="cover image" class="img-general">
  </figure>
  <img src="${localStorage.getItem('userProfileImg') || imgProfileUserDefault}" class="photo">
  <div class="user-data">
    <div class="container-info">
      <div class="name">
        <p>${localStorage.getItem('userName')}</p>
        ${iconEdit()}
      </div>
      <div class="description">
        <p>&lt;/&gt;${localStorage.getItem('userAbout') || 'Developer'}</p>
        ${iconEdit()}
      </div>
    </div>
  </div>`;

// FUNCIÓN PARA VALIDAR SI HAY UNA IMG EN EL POST
const validateImgPost = (imgPost, textPost, id) => {
  let post = '';
  if (imgPost) {
    post = `
    <div class="text-post"> 
      <p id="textPost-${id}" class="textPost">${textPost}</p>
      <div class="save hide" idpost="${id}"><i class="far fa-save"></i></div>
    </div>
    <img src="${imgPost}" alt="Imagen del post" class="imgPost">
    `;
  } else {
    post = `
    <div class="text-post"> 
      <p id="textPost-${id}" class="textPost">${textPost}</p>
      <div class="save hide" idpost="${id}"><i class="far fa-save"></i></div>
    </div>`;
  }
  return post;
};

// FUNCIÓN QUE ENLAZA EL ÍCONO DE PRIV CON EL SELECT
const changePrivacyPost = (privacy) => {
  let priv = '';
  if (privacy === '1') {
    priv = './img/public.png';
  } else {
    priv = './img/private.png';
  }
  return priv;
};

// PLANTILLA POSTS EN EL MURO
export const templatePost = (photoUrl, names, privacy, date, textPost,
  imgPost, likes, id, uididUser, uidPost) => {
  const eachPost = document.createElement('div');
  eachPost.classList.add('each-post');

  const template = `
    <div class="title-new-post">
      <img src="${photoUrl}" alt="" class="user-foto">
      <div>
        <h4>${names}</h4> 
        <div class="time">
          <p>${date}</p>
          <img src="${changePrivacyPost(privacy)}" alt="privacidad">
        </div>
      </div>
      
      ${uididUser === uidPost ? `
      <div class="simulator-select">
        <span><i class="fas fa-ellipsis-v"></i></span>
        <ul>
          <li class="icon-edit update-post" idpost="${id}">✎ Editar</li>
          <li class="delete-post" idpost="${id}">✖ Eliminar</li>
        </ul>
      </div>`
    : ''}
    </div>
    <div class="body-post">
    ${validateImgPost(imgPost, textPost, id)}
    </div>
    <div class="like-comment">
      <div>
        <svg id="icon" class="iconLike" fill="#5C5C5C" height="26" viewBox="0 0 48 48" width="26">
          <path clip-rule="evenodd"
          d="M34.3 3.5C27.2 3.5 24 8.8 24 8.8s-3.2-5.3-10.3-5.3C6.4 3.5.5 9.9.5 17.8s6.1 12.4 12.2 17.8c9.2 8.2 9.8 8.9 11.3 8.9s2.1-.7 11.3-8.9c6.2-5.5 12.2-10 12.2-17.8 0-7.9-5.9-14.3-13.2-14.3zm-1 29.8c-5.4 4.8-8.3 7.5-9.3 8.1-1-.7-4.6-3.9-9.3-8.1-5.5-4.9-11.2-9-11.2-15.6 0-6.2 4.6-11.3 10.2-11.3 4.1 0 6.3 2 7.9 4.2 3.6 5.1 1.2 5.1 4.8 0 1.6-2.2 3.8-4.2 7.9-4.2 5.6 0 10.2 5.1 10.2 11.3 0 6.7-5.7 10.8-11.2 15.6z"
          fill-rule="eveodd" />
          <path clip-rule="evenodd"
          d="M35.3 35.6c-9.2 8.2-9.8 8.9-11.3 8.9s-2.1-.7-11.3-8.9C6.5 30.1.5 25.6.5 17.8.5 9.9 6.4 3.5 13.7 3.5 20.8 3.5 24 8.8 24 8.8s3.2-5.3 10.3-5.3c7.3 0 13.2 6.4 13.2 14.3 0 7.8-6.1 12.3-12.2 17.8z"
          fill-rule="evenodd" />
       </svg>
        <img src="./img/comment.png" alt="ícono comentarios" class="icon-comment">
      </div>
      <p>${likes.length} Me Gusta <span class="numComments-${id}">0 Comentarios</span></p>
    </div>
    <div class="hide new-comment">
      <img src="${localStorage.getItem('userProfileImg')}" alt="" class="user-comment">
      <input type="text" placeholder="Agrega un comentario..." class="inputComment">
      <svg aria-label="Compartir publicación" class="icon-send _8-yf5 " fill="#b1b1b1" height="24" viewBox="0 0 48 48" width="24"><path d="M46.5 3.5h-45C.6 3.5.2 4.6.8 5.2l16 15.8 5.5 22.8c.2.9 1.4 1 1.8.3L47.4 5c.4-.7-.1-1.5-.9-1.5zm-40.1 3h33.5L19.1 18c-.4.2-.9.1-1.2-.2L6.4 6.5zm17.7 31.8l-4-16.6c-.1-.4.1-.9.5-1.1L41.5 9 24.1 38.3z"></path><path d="M14.7 48.4l2.9-.7"></path></svg>
    </div>
    <div id="containerComment-${id}" class="hide container-comments"></div>`;

  eachPost.innerHTML = template;

  const varComment = eachPost.querySelector('.inputComment');
  const addNewComment = eachPost.querySelector('.new-comment');
  const iconSendComment = eachPost.querySelector('.icon-send');

  // EVENTO PARA DESPLEGAR EL ÁREA DE COMENTARIOS
  const iconComment = eachPost.querySelector('.icon-comment');
  if (iconComment) {
    iconComment.addEventListener('click', () => {
      const areaComments = eachPost.querySelector('.container-comments');
      if (addNewComment) {
        addNewComment.classList.toggle('hide');
      }
      if (areaComments) areaComments.classList.toggle('hide');
    });
  }

  if (varComment) {
    varComment.addEventListener('keyup', () => {
      if (varComment.value) {
        iconSendComment.classList.add('activeSend');
      } else {
        iconSendComment.classList.remove('activeSend');
      }
    });
  }

  if (iconSendComment) {
    iconSendComment.addEventListener('click', () => {
      const commentValue = varComment.value.trim();
      if (!commentValue) {
        // iconSendComment.setAttribute('disabled', true);
      } else {
        createNewComment(id, commentValue);
        varComment.value = '';
      }
    });
  }

  const svgIcon = eachPost.querySelector('.iconLike');

  if (svgIcon) {
    svgIcon.addEventListener('click', () => {
      if (likes.includes(uididUser)) {
        removeLikeArr(id, uididUser);
      } else {
        addLikeArr(id, uididUser);
      }
    });

    if (likes.includes(uididUser)) {
      svgIcon.classList.add('svg-filled');
    }
  }

  readCommentsDB(readingComment);

  return eachPost;
};

// PLANTILLA ÁREA DE CODERS
export const templateCoders = (photoUrl, names, about) => `
  <div class="info-coder">
    <img src="${photoUrl}" class="user-comment">
    <div class="name-ocupation">
      <div class="comun-coders">
        <p>${names}</p>
      </div>
      <p class="dev">&lt;/&gt;${about}</p>
    </div>
  </div>`;

// PLANTILLA TODAVÍA NO HAY PUBLICACIONES
export const notYetPost = `
<div class="containerNoPost">
  <p class="noPost">Todavía no hay publicaciones</p>
  <img src="./img/not-yet-post.png" alt="No hay ningún post" class="noPostImg">
</div>`;
